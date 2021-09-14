import React, { useEffect } from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
// import axios from "axios";
import { HiOutlineSave } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  edittingAlertRule,
  edittingAlertRuleFileName,
  edittingAlertRuleDescription,
  beforeEdittingAlertRule,
} from "../../../store/actions/exporterActions";
// import { API_SURVER } from "../../../config";
// import { useParams } from "react-router";

const ExporterTabCodeEditor = ({
  fileName,
  fileDescription,
  fileContent,
  handleMode,
  type,
}) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const edittingAlert = useSelector((store) => store.alertRuleEdittingReducer);

  useEffect(() => {
    dispatch(
      beforeEdittingAlertRule(
        fileName === ""
          ? {
              fileName: "",
              description: "",
              content: "",
            }
          : {
              fileName: fileName.slice(0, -5),
              description: fileDescription,
              content: fileContent,
            }
      )
    );
    dispatch(edittingAlertRule(fileName === "" ? "" : fileContent));
    dispatch(
      edittingAlertRuleDescription(fileName === "" ? "" : fileDescription)
    );
    dispatch(
      edittingAlertRuleFileName(fileName === "" ? "" : fileName.slice(0, -5))
    );
  }, [fileName]);

  const onChange = (value) => {
    dispatch(edittingAlertRule(value));
  };

  const handleFileInfo = ({ target }) => {
    if (target.id === "codeEdit") {
      dispatch(edittingAlertRule(target.value));
    } else if (target.id === "fileName") {
      dispatch(edittingAlertRuleFileName(target.value));
    } else if (target.id === "description") {
      dispatch(edittingAlertRuleDescription(target.value));
    }
  };

  const handlefetchGithub = () => {
    console.log(edittingAlert, "저장할거야");
    // axios({
    //   method: "POST",
    //   url: `${API_SURVER}/exporter/${id}/tab`,
    //   headers: {
    //     Authorization: sessionStorage.getItem("access_token"),
    //   },
    //   data: {
    //     codeFileName: `${title}${type}`,
    //     "code-SHA": codeSha,
    //     mdFileName: `${title}${type}.md`,
    //     mdFile: wholeEncode,
    //     "md-SHA": mdSha,
    //     message:
    //       mdSha === null ? `CREATE ${title}${type}` : `UPDATE ${title}${type}`,
    //   }
    // })
    //   .then(() => {
    // handleMode();
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
          <FileName dark={changeTheme}>
            <Input
              id="fileName"
              value={edittingAlert.fileName}
              type="text"
              placeholder="fileName"
              dark={changeTheme}
              onChange={handleFileInfo}
            />
            <p> {type}</p>
          </FileName>
          <Input
            id="description"
            as="textarea"
            name="content"
            placeholder="description"
            value={edittingAlert.description}
            cols="150"
            rows="3"
            dark={changeTheme}
            onChange={handleFileInfo}
          />
        </Inputbox>
        <AceEditor
          id="codeEider"
          width="100%"
          height="100%"
          placeholder="Enter code"
          mode="javascript"
          theme={!changeTheme ? "github" : "twilight"}
          name="blah2"
          // onLoad={this.onLoad}
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          value={edittingAlert.content}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: false,
            tabSize: 2,
            overscrollBehaviorX: "none",
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
export default ExporterTabCodeEditor;

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
    color: ${(props) => (props.dark ? "#ffffff" : "#black")};
  }
`;

const Input = styled.input`
  margin: 5px 0px;
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin: 5px 0px;
  }
  width: ${(props) => (props.placeholder === "fileName" ? "400px" : "100%")};
  height: ${(props) => (props.as ? "" : "30px")};
  resize: ${(props) => (props.as ? "none" : "")};
  word-break: keep-all;
  margin: ${(props) =>
    props.placeholder === "fileName" ? "" : "20px 0px 20px"};
  border: ${(props) =>
    props.dark ? "1px solid #ffffff" : "1px solid rgba(0, 0, 0, 0.2)"};
  border-radius: 4px;
  padding-left: 15px;
  background-color: ${(props) => (props.dark ? "#18191a" : "#ffffff")};
  color: ${(props) => (props.dark ? "#ffffff" : "#black")};
  font-size: ${(props) => (props.placeholder === "fileName" ? "20px" : "15px")};
  letter-spacing: 0.08rem;
`;
