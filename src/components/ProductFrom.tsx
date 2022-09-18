import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { FileUpload } from "./FileUpload";
import { Category } from "../redux/types/category";
import { fetchCategory } from "../redux/reducers/categoryReducer";
import { addProduct, updateProduct } from "../redux/reducers/productReducer";

function ProductForm(props: any) {
  const {
    authRedu: { userToken: auth },
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);
  const [productState, setProductSate] = useState(false);
  const [productId, setProductId] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const indexCategory = categoryList.findIndex(
    (category) => category.id == categoryId
  );
  const product = productList[props.productIndex];
  const singleCategory = categoryList[indexCategory];
  const editedProduct = {
    id: productId,
    title: title,
    price: price,
    description: description,
    category: singleCategory,
    images: images,
  };
  const onEditState = product && editedProduct.id != product.id;
  if (onEditState) {
    setProductId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setCategoryId(product.category.id);
    product.images.map((image) => setImages((prevImg) => [...prevImg, image]));
  }
  const dispatch = useAppDispatch();
  const productUpdateOrAdd = () => {
    const exist = categoryList[props.productIndex];
    if (exist) {
      dispatch(updateProduct(editedProduct));
      setImages([]);
    }
    if (!exist) {
      editedProduct.id = Object.keys(productList).length + 1;
      dispatch(addProduct(editedProduct));
      setImages([]);
    }
  };

  return (
    <div className="from-container">
      <div className="product-container">
        <form className="productform">
          {product ? (
            <h2 className="title">Update Product</h2>
          ) : (
            <h2 className="title">Create Product</h2>
          )}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              id="name"
              name="name"
              value={title}
              placeholder="Product name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>price</label>
            <input
              type="number"
              max={3000}
              min={0}
              value={price}
              placeholder="100"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              name="selectCategory"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categoryList &&
                categoryList.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label> Description</label>
            <textarea
              rows={4}
              cols={31}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label> Product Image</label>
            <FileUpload handleFile={setImages} />
          </div>
          <div>
            <input
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                productUpdateOrAdd();
                document.documentElement.style.setProperty(
                  "--dynamic-popup-product",
                  "none"
                );
                props.setProductId(0);
              }}
              value="Submit"
            />
            <input
              type="button"
              onClick={(e) => {
                e.preventDefault();
                document.documentElement.style.setProperty(
                  "--dynamic-popup-product",
                  "none"
                );
                props.setProductId(0);
              }}
              value="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
