import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { GrEdit, GrFormAdd } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DeleteModal from "../Modal/DeleteModal";
import { set } from "js-cookie";

const List = ({
  modify,
  alertRuleCsvInfo,
  setSelect,
  select,
  isEditMode,
  setModify,
  beforeEditting,
  handleMode,
}) => {
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const edittingAlert = useSelector((store) => store.alertRuleEdittingReducer);
  const beforeEditAlert = useSelector(
    (store) => store.alertRuleBeforeEditReducer
  );

  const [saveEdit, setSaveEdit] = useState(false);
  const [moveId, setMoveId] = useState(false);
  const [deleteAlertRule, setDeleteAlertRule] = useState(false);
  const dontSaved =
    modify && JSON.stringify(edittingAlert) !== JSON.stringify(beforeEditAlert);
  console.log(JSON.stringify(edittingAlert));
  console.log(JSON.stringify(beforeEditAlert));
  const handleAddAlertRule = () => {
    if (alertRuleCsvInfo.length !== 0) {
      if (select === "New") {
        setSelect(alertRuleCsvInfo[0].id);
        setModify(false);
      } else {
        setSelect("New");
        setModify(true);
      }
    } else {
      if (select === "New") {
        setSelect(0);
        setModify(false);
      } else {
        setSelect("New");
        setModify(true);
      }
    }
  };

  const handleSaveModal = () => {
    if (dontSaved) {
      setSaveEdit(true);
      setMoveId("New");
    } else {
      handleAddAlertRule();
    }
  };

  const handleSave = (answer) => {
    if (answer === "Yes") {
      if (moveId === "New") {
        handleAddAlertRule();
      } else {
        setSelect(moveId);
        setModify(false);
      }
    }

    setSaveEdit(false);
  };

  const handleDelete = (answer) => {
    if (answer === "Yes") {
      console.log(select, "을 삭제해");
      //response 오면 실행
      handleMode();
      alertRuleCsvInfo.length !== 0
        ? setSelect(alertRuleCsvInfo[0].id)
        : setSelect(0);
      setDeleteAlertRule(false);
    } else {
      setDeleteAlertRule(false);
    }
  };

  const handleChangeAlertRule = (alertRuleId) => {
    if (dontSaved) {
      setMoveId(alertRuleId);
      setSaveEdit(true);
    } else {
      setSelect(alertRuleId);
      setModify(false);
    }
  };

  return (
    <div>
      <AlertList dark={changeTheme}>
        <Title dark={changeTheme}>ALERTING RULE</Title>
        {alertRuleCsvInfo === "default" ? (
          <Loading>
            <AiOutlineLoading3Quarters className="spinner" />
          </Loading>
        ) : (
          <CategoryBox>
            <div>
              {alertRuleCsvInfo.length !== 0
                ? alertRuleCsvInfo.map((alert) => {
                    let github = alert.githubInfo.slice(
                      alert.githubInfo.lastIndexOf("/") + 1,
                      -5
                    );
                    return (
                      <Category
                        dark={changeTheme}
                        isEditMode={isEditMode}
                        key={alert.id}
                        active={alert.id === select}
                        title={alert.githubInfo.slice(
                          alert.githubInfo.lastIndexOf("/") + 1
                        )}
                      >
                        <Div
                          fileName={isEditMode && alert.id === select}
                          onClick={() => handleChangeAlertRule(alert.id)}
                        >
                          {github}
                        </Div>

                        {isEditMode && alert.id === select && (
                          <EditBox>
                            <GrEdit
                              className="edit"
                              onClick={() => setModify(true)}
                            />
                            <RiDeleteBin6Line
                              className="edit"
                              onClick={() => {
                                setDeleteAlertRule(true);
                              }}
                            />
                          </EditBox>
                        )}
                      </Category>
                    );
                  })
                : select !== "New" && (
                    <Category>
                      <Div> "준비중" </Div>
                    </Category>
                  )}

              {isEditMode && select === "New" && (
                <Category isEditMode={isEditMode} active={"New" === select}>
                  <Div> New !</Div>
                </Category>
              )}
            </div>
            {isEditMode && (
              <Category
                addIcon={true}
                isEditMode={isEditMode}
                onClick={handleSaveModal}
              >
                <GrFormAdd size="30px" />
              </Category>
            )}
          </CategoryBox>
        )}
        {saveEdit && (
          <DeleteModal
            handleDelete={handleSave}
            content="Don't you want to save the changes you made?"
          ></DeleteModal>
        )}
        {deleteAlertRule && (
          <DeleteModal
            handleDelete={handleDelete}
            content="삭제할거야 ?"
          ></DeleteModal>
        )}
      </AlertList>
    </div>
  );
};

const AlertList = styled.ul`
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

const Title = styled.li`
  padding: 10px;
  color: ${(props) => (props.dark ? "#f5f6f7" : "#999")};
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
`;

const Category = styled.li`
  display: ${({ isEditMode }) => isEditMode && "flex"};
  align-items: ${({ isEditMode }) => isEditMode && "center"};
  justify-content: ${({ isEditMode }) => isEditMode && "space-between"};
  display: flex;
  justify-content: ${(props) => (props.addIcon ? "center" : "space-between;")};
  position: relative;
  background: ${({ active }) => active && "#eee"};
  /* background: ${(props) => props.dark && "#303132"}; */
  cursor: pointer;
  color: ${(props) => (props.dark ? "#f5f6f7" : "black")};
  color: ${({ active }) => active && "black"};

  &:hover {
    background: #eee;
    color: black;
  }
  &:after {
    content: "";
    display: ${({ active }) => (active ? "block" : "none")};
    width: 13px;
    height: 10px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: ${({ active, isEditMode }) =>
      !isEditMode && active
        ? "url(/images/category_arrow.png) no-repeat center"
        : ""};
    background-size: 13px 10px;
  }
`;
const Div = styled.div`
  flex: 8;
  padding: ${(props) =>
    props.fileName ? "3px 5px 3px 10px" : "3px 30px 3px 10px"};
  text-overflow: ellipsis;
  overflow: hidden;
`;
const EditBox = styled.div`
  display: flex;
  flex: 2;
  .edit {
    margin-right: 5px;
    flex: 1;
  }
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
export default List;
