import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByCate } from "../../store/actions/exporterActions";
import styled from "styled-components";
import { AiFillSetting } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CATEGORIES_API } from "../../config";
import axios from "axios";
import ListDeleteModal from "../Modal/ListDeleteModal";
import { Fragment } from "react";

const Sider = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categoryReducer);
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const isAdmin = useSelector((store) => store.adminReducer);
  const [edit, setEdit] = useState(false);
  const [addCategoryName, setAddCategoryName] = useState("");
  const [deletecategory, setDeletecategory] = useState(false);
  const [categoryAct, setcategoryAct] = useState(0);
  const [alert, setAlert] = useState(false);

  const handleClickCategoryAct = (id) => {
    setcategoryAct(id);
  };

  const addCategory = (editType) => {
    if (editType === "add" && !addCategoryName) {
      setAlert(true);
    } else if (editType === "add" && addCategoryName) {
      axios({
        method: "post",
        url: `${CATEGORIES_API}`,
        data: {
          category: addCategoryName,
        },
        headers: {
          Authorization: sessionStorage.getItem("access_token"),
        },
      })
        .then(() => {
          window.location.reload();
          setEdit(false);
          setAddCategoryName("");
        })
        .catch((error) => {});
    } else if (typeof editType === "object") {
      setDeletecategory(editType);
    }
  };

  const callDispatch = (e) => {
    if (e.target.innerText === "All") {
      const payload = "";
      dispatch(filterByCate(payload));
    } else {
      const payload = e.target.innerText;
      dispatch(filterByCate(payload));
    }
  };

  return (
    <div>
      <CategoryList dark={changeTheme}>
        <Title dark={changeTheme}>
          CATEGORIES
          {isAdmin && (
            <AiFillSetting
              className="edit"
              onClick={() => {
                setEdit((prev) => !prev);
                setAlert(false);
              }}
            />
          )}
        </Title>

        {edit && (
          <Fragment>
            <Title>
              <Category
                as="input"
                onChange={({ target }) => {
                  setAddCategoryName(target.value);
                  setAlert(false);
                }}
              ></Category>
              <FiPlus className="edit" onClick={() => addCategory("add")} />
            </Title>
            {alert && (
              <Title alert="alert">Please enter the category name</Title>
            )}
          </Fragment>
        )}
        {deletecategory && (
          <ListDeleteModal
            categoriesList={categories}
            deletecategoryId={deletecategory.category_id}
            deletecategoryName={deletecategory.category_name}
            setDeletecategory={setDeletecategory}
          />
        )}

        <Category
          default="All"
          dark={changeTheme}
          edit={edit}
          active={0 === categoryAct}
          onClick={(e) => {
            handleClickCategoryAct(0);
            callDispatch(e);
          }}
        >
          All
        </Category>
        {categories &&
          categories.map((category) => (
            <Category
              edit={edit}
              dark={changeTheme}
              active={category.category_id === categoryAct}
            >
              <Div
                title={category.category_name}
                onClick={(e) => {
                  handleClickCategoryAct(category.category_id);
                  callDispatch(e);
                }}
              >
                {category.category_name}
              </Div>
              {edit && (
                <DeleteButton onClick={() => addCategory(category)}>
                  <FiMinus />
                </DeleteButton>
              )}
            </Category>
          ))}
      </CategoryList>
    </div>
  );
};

const CategoryList = styled.ul`
  width: 200px;
  min-height: 450px;
  padding: 10px 0px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => (props.alert ? "15px" : "large")};
  padding: 5px 5px 5px 10px;
  color: ${(props) => (props.alert ? "red" : props.dark ? "#f5f6f7" : "#999")};
  .edit {
    cursor: pointer;
  }
`;

const Div = styled.div`
  padding-left: 10px;
  padding-right: 20px;
  width: 100%;
  flex: 8;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DeleteButton = styled.div`
  padding: 0px 10px;
  flex: 2;
`;

const Category = styled.li`
  display: ${({ edit }) => edit && "flex"};
  align-items: ${({ edit }) => edit && "center"};
  justify-content: ${({ edit }) => edit && "space-between"};
  position: relative;
  padding: ${(props) => (props.default === "All" ? "3px 10px" : "3px")};
  background: ${({ active }) => active && "#eee"};
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
    background: ${({ active, edit }) =>
      !edit && active
        ? "url(/images/category_arrow.png) no-repeat center;"
        : ""};
    background-size: 13px 10px;
  }
`;
export default Sider;
