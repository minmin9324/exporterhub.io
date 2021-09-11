import { useSelector } from "react-redux";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { BiUndo } from "react-icons/bi";
import AlertRuleCodeEditor from "./AlertRuleCodeEditor";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NoData from "./NoData";
import { Fragment } from "react";
const AlertRuleDataviewer = ({
  modify,
  handleMode,
  title,
  type,
  isEditMode,
  alertRuleCsvInfo,
  select,
  setBeforeEditting,
  setEdittingData,
}) => {
  console.log(alertRuleCsvInfo);

  const isAdmin = useSelector((store) => store.adminReducer);
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const emty =
    alertRuleCsvInfo !== "default" ? alertRuleCsvInfo.length === 0 : false;

  const alertInfo =
    select !== "New" &&
    alertRuleCsvInfo !== "default" &&
    alertRuleCsvInfo.length !== 0
      ? alertRuleCsvInfo.filter((alert) => alert.id === select)
      : "";

  return (
    <>
      <Header>
        <ContentTitle dark={changeTheme}>
          {title}
          {type}
        </ContentTitle>
        {isAdmin && (
          <div>
            <Button onClick={handleMode}>
              <span>{!isEditMode ? <FiEdit /> : <BiUndo />}</span>
              <span>{!isEditMode ? "edit" : "Back"}</span>
            </Button>
          </div>
        )}
      </Header>

      <div>
        {!modify ? (
          <Data dark={changeTheme}>
            {alertRuleCsvInfo === "default" ? (
              <Loading>
                <AiOutlineLoading3Quarters className="spinner" />
              </Loading>
            ) : (
              <Fragment>
                {emty === false && alertInfo !== "" ? (
                  <Fragment>
                    <h5>
                      {alertInfo[0].githubInfo.slice(
                        alertInfo[0].githubInfo.lastIndexOf("/") + 1
                      )}
                    </h5>
                    <p>{"description : " + alertInfo[0].description}</p>
                    <Content dark={changeTheme}>
                      {alertInfo[0].yamlContent}
                    </Content>
                  </Fragment>
                ) : (
                  <NoData mdSha={!emty} />
                )}
              </Fragment>
            )}
          </Data>
        ) : (
          <AlertRuleCodeEditor
            select={select}
            setBeforeEditting={setBeforeEditting}
            setEdittingData={setEdittingData}
            alertInfo={alertInfo}
            handleMode={handleMode}
            title={title}
            type={type}
          />
        )}
      </div>
    </>
  );
};
export default AlertRuleDataviewer;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const ContentTitle = styled.h4`
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0.08rem;

  @media ${({ theme }) => theme.media.mobile} {
    font-size: 18px;
    padding-right: 3px;
    padding-left: 10px;
    width: min-content;
    line-height: 1.2;
  }
  color: ${(props) => props.dark && "#f5f6f7"}; ;
`;

const Data = styled.pre`
  color: ${(props) => props.dark && "#f5f6f7"};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  line-height: 20px;
  padding-top: 30px;
  border-radius: 5px;
  h5 {
    font-size: 20px;
    margin-bottom: 20px;
    @media ${({ theme }) => theme.media.mobile} {
      font-size: 16px;
      padding-right: 3px;
      padding-left: 10px;
      width: min-content;
      line-height: 1.2;
    }
  }
  p {
    width: 800px;
    /* word-wrap: break-word; */
    white-space: normal;
    font-size: 16px;
    margin: 20px 0px;
    @media ${({ theme }) => theme.media.mobile} {
      font-size: 13px;
      padding-right: 3px;
      padding-left: 10px;
      width: 445px;
      line-height: 1.2;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 30px;
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
    padding: 0 2px;
  }
`;

const Content = styled.div`
  background-color: ${(props) => (props.dark ? "#242526" : "#f0f4f8")};
  color: ${(props) => props.dark && "#f5f6f7"};

  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
  .spinner {
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
