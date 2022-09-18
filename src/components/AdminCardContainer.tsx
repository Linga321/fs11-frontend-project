import React from 'react'

import { ProductCart } from '../redux/types/cart'
import { Product } from '../redux/types/product'
import { AdminCard } from './AdminCard'
/**
 * This is a Product card container that containes every single card
 * @param props.product cantains list of products information 
 * @returns AdminCardContainer
 */
export const AdminCardContainer = (props : any) => (
    <div className="cards-container">
      {
        props.cards && props.cards.map((card : Product) => (
          <AdminCard 
            key={card.id} 
            product={card}
            setId={props.setId}
          />
        ))
      }
    </div>
)
