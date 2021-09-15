import { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "axios";
import ExporterTabDataviewer from "./ExporterTabDataviewer";
import { useSelector } from "react-redux";
// import { useParams } from "react-router";
// import { API_SURVER } from "../../../config";
import ExporterDetailTabList from "../../Sider/ExporterDetailTabList";

const ExporterTab = ({ title, type }) => {
  // const { id } = useParams();
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  // const [mdSha, setMdSha] = useState();
  // const [codeSha, setCodeSha] = useState();
  const [exporterCsv, setExporterCsv] = useState("default");
  const [isEditMode, setIsEditMode] = useState(false);
  const [modify, setModify] = useState(false);
  const [select, setSelect] = useState(0);

  const handleMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setModify(false);
    }
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // const TOKEN = sessionStorage.getItem("access_token");
    // const HEADER = TOKEN && { Authorization: TOKEN };

    // axios({
    //   method: "GET",
    //   url: `${API_SURVER}/exporter/${id}/tab?type={type}`,
    //   headers: HEADER,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     setExporterCsv(
    //       res.data.md_content === null ? "N/A" : res.data.md_content
    //     );
    // setMdSha(res.data.md_sha);
    // setCodeSha(res.data.code_sha);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    setExporterCsv(alertRule === null ? [] : alertRule);
    alertRule.length !== 0 ? setSelect(alertRule[0].id) : setSelect(0);
  };

  return (
    <Div>
      <div>
        <TabListbox dark={changeTheme}>
          <ExporterDetailTabList
            modify={modify}
            exporterCsv={exporterCsv}
            setSelect={setSelect}
            select={select}
            isEditMode={isEditMode}
            setModify={setModify}
            handleMode={handleMode}
          />
        </TabListbox>
      </div>
      <Container>
        <div>
          <MobileTabListbox dark={changeTheme}>
            <ExporterDetailTabList
              mobile={true}
              modify={modify}
              exporterCsv={exporterCsv}
              setSelect={setSelect}
              select={select}
              isEditMode={isEditMode}
              setModify={setModify}
              handleMode={handleMode}
            />
          </MobileTabListbox>
        </div>
        <ExporterTabDataviewer
          select={select}
          isEditMode={isEditMode}
          modify={modify}
          handleMode={handleMode}
          title={title}
          type={type}
          exporterCsv={exporterCsv}
        ></ExporterTabDataviewer>
      </Container>
    </Div>
  );
};
export default ExporterTab;

const Div = styled.div`
  ${({ theme }) => theme.container};
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const TabListbox = styled.ul`
  width: 200px;
  margin-top: 60px;
  line-height: 1.5;
  background-color: ${(props) => (props.dark ? "#242526" : "#ffffff")};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media ${({ theme }) => theme.media.mobile} {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MobileTabListbox = styled.ul`
  display: none;
  line-height: 1.5;
  @media ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.container}
  position: relative;
  width: 800px;
`;

const alertRule = [
  {
    id: 3,
    description:
      "Node memory is filling up (< 10% left)  VALUE = {{ $value }} LABELS = {{ $labels }}",
    yamlContent: `expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100 < 10
                for: 2m
                labels:
                  severity: warning
                annotations:
                  summary: Host out of memory (instance {{ $labels.instance }})
                  description: "Node memory is filling up (< 10% left)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}
            "`,
    githubInfo:
      "https://github.com/NexClipper/exporterhub.io/tree/main/contents/Node-Exporter/HostOutOfMemory.yaml",
  },
  {
    id: 5,
    description:
      "Host network interfaces are probably sending too much data  (< 10% left)  VALUE = {{ $value }} LABELS = {{ $labels }}",
    yamlContent: ` expr: sum by (instance) (rate(node_network_transmit_bytes_total[2m])) / 1024 / 1024 > 100
                for: 5m
                labels:
                  severity: warning
                annotations:
                  summary: Host unusual network throughput out (instance {{ $labels.instance }})
                  description: "Host network interfaces are probably sending too much data (> 100 MB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
            `,
    githubInfo:
      "https://github.com/NexClipper/exporterhub.io/tree/main/contents/Node-Exporter/HostMemoryUnderMemoryPressure.yaml",
  },
  {
    id: 6,
    description:
      "Host network interfaces are probably receiving too much data ",
    yamlContent: ` expr: sum by (instance) (rate(node_network_receive_bytes_total[2m])) / 1024 / 1024 > 100
                for: 5m
                labels:
                  severity: warning
                annotations:
                  summary: Host unusual network throughput in (instance {{ $labels.instance }})
                  description: "Host network interfaces are probably receiving too much data (> 100 MB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
            `,
    githubInfo:
      "https://github.com/NexClipper/exporterhub.io/tree/main/contents/Node-Exporter/HostUnusualNetworkThroughputIn.yaml",
  },
];
