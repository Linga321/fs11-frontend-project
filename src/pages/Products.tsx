import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { RootState } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"
import { fetchProducts } from "../redux/reducers/productReducer"
import { CardContainer } from "../components/CardContainer"
import { Tags } from "../components/Tags"

const Products = () => {
  let { categoryId ,productName} = useParams()
  const [count, setCount] = useState(0)
  const dispatch = useAppDispatch()
  const productFilter = productName || Number(categoryId) >0
  const {productRedu:{productList}, categoryRedu : {categoryList}} = useSelector((state: RootState) => state)
  const capitalizeTheFirstLetterOfEachWord = (words: string) => {
    let separateWord = words.toLowerCase().split(" ")
    for (let i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1)
    }
    return separateWord.join(" ")
  }
  const filteredProductList = productFilter
    ? productName
      ? productList.filter((product) =>
          product.title.startsWith(
            capitalizeTheFirstLetterOfEachWord(String(productName))
          )
        )
      : productList.filter(
          (product) => product.category.id === Number(categoryId)
        )
    : productList;
  
  useEffect(() => {
    if (count != 0) {
      const limit = 10;
      const newOffset = count * limit;
      dispatch(
        fetchProducts(
          `offset=${count == 0 ? 0 : newOffset}&limit=${limit}`
        )
      );
    }
  }, [count,productName])
  return (
    <div className="App">
      <div className="categories-container">
        {categoryList &&
          categoryList.map((category) => (
            <Tags
              key={category.id}
              category={category}
            />
          ))}
      </div>
      <CardContainer products={filteredProductList} />
      <div className="page-number">
        <div>
          <button
            type="button"
            value="<"
            onClick={() => {
              count > 0 ? setCount(count - 1) : setCount(0)
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
              count < 20 ? setCount(count + 1) : setCount(count)
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products
