import React from 'react'
import {products} from '../data/products'
import Item from '../components/Item'
function Home() {
  return (
    <div className='products'>
    {products.map(prod => <Item key={prod.id} product={prod} />)}
  </div>
  )
}

export default Home