import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { RootState } from "../redux/store"
import { CardContainer } from "../components/CardContainer"

const Home = () => {
  const [count, setCount] = useState(0)
  const cartList = useSelector((state: RootState) => state.cartRedu.cartList)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(Object.keys(cartList).length==0){
      navigate('/products')
    }
  }, [Object.keys(cartList).length])
  
  return (
    <div className="App">
      <CardContainer carts={cartList} />
      <div className="page-number">
        <div>
        <button
          type="button"
          value="<"
          onClick={() => {
            count > 0 ? setCount(count - 1) : setCount(0)
          }}
        >Prev</button>
        </div>
        <div><h4>{count + 1}</h4></div>
        <div><button
          type="button"
          onClick={() => {
            count < 20 ? setCount(count + 1) : setCount(count)
          }}
          >Next</button>
        </div>
      </div>
    </div>
  )
}

export default Home
