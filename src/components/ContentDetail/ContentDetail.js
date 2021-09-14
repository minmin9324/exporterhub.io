import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useLocalStorage from "react-use-localstorage";
import axios from "axios";
import styled from "styled-components";
import Exporter from "./components/Exporter";
import Dashboard from "./components/Dashboard";
import Alert from "./components/Alert";
import Helm from "./components/Helm";
import { EXPORTER_API } from "../../config";
import OpenSourceInfo from "./components/OpenSourceInfo";
import { useSelector } from "react-redux";
const TABMENU = [
  { id: 0, tabName: "Exporter (Hands on)" },
  { id: 1, tabName: "Exporter (IaC)" },
  { id: 2, tabName: "Alerting rule" },
  { id: 3, tabName: "Grafana dashboard" },
];
const ContentDetail = () => {
  const { id } = useParams();
  const [test, setTest] = useLocalStorage("activeTab", 0);
  const [exporterInfo, setExporterInfo] = useState([]);
  const [forkState, setForkState] = useState();
  const [starState, setStarState] = useState();
  const [starNumber, setStarNumber] = useState();
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const ACTIVECONTENT_OBJ = {
    0: <Exporter readmeContent={exporterInfo.readme} />,
    1: <Helm title={exporterInfo.title} />,
    2: <Alert title={exporterInfo.title} type="_alert" />,
    3: <Dashboard title={exporterInfo.title} />,
  };
  const TOKEN = sessionStorage.getItem("access_token");
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [forkState]);
  const fetchData = () => {
    const HEADER = TOKEN && { Authorization: TOKEN };
    axios({
      method: "GET",
      url: `${EXPORTER_API}/${id}`,
      headers: HEADER,
    })
      .then((res) => {
        setExporterInfo(res.data.data);
        setForkState(res.data.data.is_bucket);
        setStarState(res.data.data.is_star);
        setStarNumber(res.data.data.stars);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleActiveTab = (id) => {
    setTest(id);
  };
  window.onpopstate = function (event) {
    localStorage.setItem("activeTab", 0);
  };
  return (
    <>
      <Header dark={changeTheme}>
        <Container>
          {exporterInfo && (
            <OpenSourceInfo
              exporterInfo={exporterInfo}
              forkState={forkState}
              starState={starState}
              setStarState={setStarState}
              setForkState={setForkState}
              starNumber={starNumber}
              setStarNumber={setStarNumber}
            />
          )}
        </Container>
      </Header>
      <Nav dark={changeTheme}>
        <Container>
          <TabList>
            {TABMENU.map((tab) => {
              return (
                <Tab
                  dark={changeTheme}
                  key={tab.id}
                  active={test == tab.id}
                  // active={localStorage.getItem("activeTab") == tab.id}
                  onClick={() => handleActiveTab(tab.id)}
                >
                  <span>{tab.tabName}</span>
                </Tab>
              );
            })}
          </TabList>
        </Container>
      </Nav>
      <Main dark={changeTheme}>{ACTIVECONTENT_OBJ[test]}</Main>
    </>
  );
};
const Header = styled.header`
  padding: 80px 0;
  background-color: ${(props) => (props.dark ? "#18191A" : "FFFFFF")};
`;
const Nav = styled.nav`
  width: 100%;
  border-bottom: ${(props) =>
    props.dark ? "1px solid #242526" : "1px solid #eaecef"};
  background-color: ${(props) => props.dark && "#18191a"};
`;
const TabList = styled.ul`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.media.mobile} {
    height: 65px;
    align-items: flex-end;
  }
`;
const Tab = styled.li`
  width: max-content;
  padding: 17px 25px;
  border-bottom: ${(props) =>
    props.active ? "5px solid #6AC4A5" : "5px solid #00000000"};
  color: ${(props) => (props.dark ? "#f5f6f7" : "#808080")};
  color: ${(props) => props.active && "#6AC4A5"};
  font-size: 17px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;

  @media ${({ theme }) => theme.media.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 100%;
    padding: 17px 0;
    font-size: 14px;
  }
`;

const Main = styled.main`
  min-height: calc(100vh - 436px);
  padding: 90px 0 50px;
  background-color: ${(props) => (props.dark ? "#18191a" : "#f7f9fc")};
  @media ${({ theme }) => theme.media.mobile} {
    padding: 60px 15px 50px;
  }
`;
const Container = styled.div`
  ${({ theme }) => theme.container}
  position: relative;
`;
export default ContentDetail;
