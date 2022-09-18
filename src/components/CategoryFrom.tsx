import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { FileUpload } from "./FileUpload";
import { Category } from "../redux/types/category";
import { addCategory, updateCategory } from "../redux/reducers/categoryReducer";
/**
 * This is a Cate
 * @param props conatains single category for modification
 * @returns
 */
function CategoryForm(props: any) {
  const [categoryState, setCategoryState] = useState(false);
  const [categorId, setCategorId] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const categoryList = useSelector(
    (state: RootState) => state.categoryRedu.categoryList
  );
  const editCategory = {
    id: categorId,
    name: name,
    image: image,
  };
  const category = categoryList[props.categoryIndex];
  const onEditState = category && categorId != category.id;
  if (onEditState) {
    setCategorId(category.id);
    setName(category.name);
    setImage(category.image);
  }
  const dispatch = useAppDispatch();

  const categoryUpdateOrAdd = () => {
    const exist = categoryList[props.categoryIndex];
    if (exist) {
      dispatch(updateCategory(editCategory));
    }
    if (!exist) {
      editCategory.id = Object.keys(categoryList).length + 1;
      dispatch(addCategory(editCategory));
    }
  };

  return (
    <div className="from-container">
      <div className="product-container">
        <form className="productform">
          {category ? (
            <h2 className="name">Update Category</h2>
          ) : (
            <h2 className="name">Create Category</h2>
          )}
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label> Category Image</label>
            <FileUpload handleFile={setImage} />
          </div>
          <div>
            <input
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                categoryUpdateOrAdd();
                document.documentElement.style.setProperty(
                  "--dynamic-popup-category",
                  "none"
                );
                props.setCategoryId(0);
              }}
              value="Submit"
            />
            <input
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                document.documentElement.style.setProperty(
                  "--dynamic-popup-category",
                  "none"
                );
                props.setCategoryId(0);
              }}
              value="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
