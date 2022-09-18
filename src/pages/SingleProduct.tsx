import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { RootState } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"

const SingleProduct = () => {
  let { id } = useParams()
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const productList = useSelector(
    (state: RootState) => state.productRedu.productList
  )
  const product = productList.filter((item) => {
    return item.id === Number(id)
  })

  useEffect(() => {
  }, [count])
  return (
    <div aria-describedby="contact page">
      <div
        className="single-product"
        onClick={(e) => {
          navigate(`/SingleProduct/${product[0].id}`)
        }}
      >
        <div className="slideshow-container">
            {product[0].images &&
              product[0].images.map((currElement, index) => {
                return (
                  <div
                    key={index}
                    className={count == index ? "active" : "mySlides fade"}
                  >
                    <div className="numbertext">{index + 1} / 3</div>
                    <img
                      src={currElement}
                      alt={`Image ${index}`}
                      className="d-block w-60"
                    />
                  </div>
                )
              })}
            <div className="dot-contaner">
              {product[0].images &&
                product[0].images.map((currElement, index) => {
                  return (
                    <span
                      key={index}
                      className="dot"
                      onClick={(e) => {
                        setCount(index)
                      }}
                    ></span>
                  )
                })}
            </div>
            <a
              className="prev"
              onClick={(e) => {
                e.preventDefault()
                if (count > 0) {
                  setCount(Number(count) - 1)
                }
              }}
            >
              ❮
            </a>
            <a
              className="next"
              onClick={(e) => {
                e.preventDefault()
                if (count < 2) {
                  setCount(Number(count) + 1)
                }
              }}
            >
              ❯
            </a>
        </div>
        <div className="card-content">
          <article>
            <h2>{product[0].title}</h2>
            <h3>${product[0].price}</h3>
            <p>{product[0].description}</p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
