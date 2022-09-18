import React from 'react'
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from '../redux/hooks'

export const Tags = (props :any) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    return (
    <div className="categories-card"  onClick={(e)=>{  navigate(`/products/${props.category.id}`)}}>
      <div className='categories-card-hid'>
        <img src={ props.category.image } 
        alt={'Image' } />
      </div>
      <div className="categories-content">
        <article>
         
          <h2 className='hide'>{ props.category.name }</h2> 
          <h4 >{ props.category.name }</h4>
        </article>
      </div>
    </div>)
}
