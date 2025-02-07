import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
// import axios from "axios";
import { HiOutlineSave } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { edittingAlertRule } from "../../../store/actions/exporterActions";
// import { API_SURVER } from "../../../config";
import { useParams } from "react-router";

const AlertRuleCodeEditor = ({ alertInfo, setBeforeEditting, handleMode }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const edittingAlert = useSelector((store) => store.alertRuleEdittingReducer);
  const [fileInfo, setFileInfo] = useState({ fileName: "", description: "" });
  console.log(fileInfo);
  useEffect(() => {
    setBeforeEditting(alertInfo === "" ? "" : alertInfo[0].yamlContent);
    setFileInfo(
      alertInfo === ""
        ? {
            description: "",
            fileName: "",
          }
        : {
            description: alertInfo[0].description,
            fileName: alertInfo[0].githubInfo.slice(
              alertInfo[0].githubInfo.lastIndexOf("/") + 1,
              -5
            ),
          }
    );
    dispatch(
      edittingAlertRule(alertInfo === "" ? "" : alertInfo[0].yamlContent)
    );
  }, [alertInfo]);

  const onChange = (value) => {
    dispatch(edittingAlertRule(value));
  };

  const handleFileInfo = ({ target }) => {
    setFileInfo((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };

  const handlefetchGithub = () => {
    // axios({
    //   method: "POST",
    //   url: `${API_SURVER}/exporter/${id}/tab`,
    //   headers: {
    //     Authorization: sessionStorage.getItem("access_token"),
    //   },
    //   data: {
    //
    //   },
    // })
    //   .then(() => {
    handleMode();
    //   })
    //   .catch((err) => {
    //     handleMode();
    // });
    //   };
  };

  return (
    <Container dark={changeTheme}>
      <EditorContainer>
        <Inputbox className="prevent">
          <FileName>
            <Input
              id="fileName"
              value={fileInfo.fileName}
              type="text"
              placeholder="fileName"
              dark={changeTheme}
              onChange={handleFileInfo}
            />
            <p> .yaml</p>
          </FileName>
          <Input
            id="description"
            as="textarea"
            name="content"
            placeholder="description"
            cols="150"
            rows="3"
            value={fileInfo.description}
            dark={changeTheme}
            onChange={handleFileInfo}
          />
          {/* <Input
            id="description"
            value={fileInfo.description}
            type="text"
            placeholder="description"
            dark={changeTheme}
            onChange={handleFileInfo}
          /> */}
        </Inputbox>
        <AceEditor
          id="codeEider"
          width="100%"
          height="100%"
          placeholder="Placeholder Text"
          mode="javascript"
          theme="github"
          name="blah2"
          // onLoad={this.onLoad}
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          value={edittingAlert}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: false,
            tabSize: 2,
          }}
        />
      </EditorContainer>
      <Button onClick={handlefetchGithub}>
        <span>
          <HiOutlineSave />
        </span>
        <span>Save</span>
      </Button>
    </Container>
  );
};
export default AlertRuleCodeEditor;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 3px;

  .ace_editor,
  .ace_editor * {
    font-family: "Monaco", "Menlo", "Ubuntu Mono", "Droid Sans Mono", "Consolas",
      monospace !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    letter-spacing: 0 !important;
    line-height: 1.3 !important;
    /* background-color: red; */
  }
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 800px; */
  height: 400px;
  margin-top: 30px;
`;

const Button = styled.button`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;

  span {
    font-size: 12px;

    &:first-child {
      position: relative;
      top: 1px;
      margin-right: 5px;
      font-size: 13px;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    top: -110px;
    right: 0px;
    width: 80px;
  }
`;

const Inputbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  p {
    padding-left: 7px;
  }
`;

const Input = styled.input`
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin: 0;
  }
  width: ${(props) => (props.placeholder === "fileName" ? "400px" : "100%")};
  height: ${(props) => (props.as ? "" : "30px")};
  resize: ${(props) => (props.as ? "none" : "")};
  word-break: keep-all;
  margin: ${(props) =>
    props.placeholder === "fileName" ? "" : "20px 0px 20px"};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-left: 15px;
  background-color: ${(props) => (props.dark ? "#18191a" : "#ffffff")};
  color: ${(props) => (props.dark ? "#ffffff" : "#black")};
  font-size: ${(props) => (props.placeholder === "fileName" ? "20px" : "15px")};
  letter-spacing: 0.08rem;
`;
