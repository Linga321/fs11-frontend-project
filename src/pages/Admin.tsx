import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/reducers/productReducer";
import { AdminCardContainer } from "../components/AdminCardContainer";
import { AdminTags } from "../components/AdminTags";
import ProductForm from "../components/ProductFrom";
import CategoryForm from "../components/CategoryFrom";

const Admin = () => {
  const [count, setCount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [catetId, setCategoryId] = useState(0);
  const dispatch = useAppDispatch();
  const {
    productRedu: { productList },
    categoryRedu: { categoryList },
  } = useSelector((state: RootState) => state);

  const indexProduct = productList.findIndex(
    (product) => product.id === Number(productId)
  );

  const indexCategory = categoryList.findIndex(
    (category) => category.id === Number(catetId)
  );

  useEffect(() => {
    if (count != 0) {
      const limit = 10;
      const newOffset = count * limit;
      dispatch(
        fetchProducts(`offset=${count == 0 ? 0 : newOffset}&limit=${limit}`)
      );
    }
  }, [count]);
  return (
    <div className="App">
      <div className="categories-container">
        {categoryList &&
          categoryList.map((card) => (
            <AdminTags
              key={card.id}
              category={card}
              setCategoryId={setCategoryId}
            />
          ))}
      </div>
      <AdminCardContainer cards={productList} setId={setProductId} />
      <div className="page-number">
        <div>
          <button
            type="button"
            value="<"
            onClick={() => {
              count > 0 ? setCount(count - 1) : setCount(0);
            }}
          >
            Prev
          </button>
        </div>
        <div>
          <h4>{count + 1}</h4>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              count < 20 ? setCount(count + 1) : setCount(count);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <div className="form-popup">
        <div
          onClick={() => {
            document.documentElement.style.setProperty(
              "--dynamic-popup-category",
              "block"
            );
            document.documentElement.style.setProperty(
              "--dynamic-popup-product",
              "block"
            );
          }}
        >
          Forms
        </div>
        <div className="form-popup-product" id="myForm">
          <ProductForm
            productIndex={indexProduct}
            setProductId={setProductId}
          />
        </div>
        <div className="form-popup-category" id="myForm">
          <CategoryForm
            categoryIndex={indexCategory}
            setCategoryId={setCategoryId}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
