import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions' 


const HomeScreen = () => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  /*run a function when the homescreen loads with useEffect
    will use Axios to fetch the products*/
  useEffect(() => {
    dispatch(listProducts())
    
  }, [dispatch])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (<Loader>Loading...</Loader>) : error ?  (<Message variant='danger'>{error}</Message>) : (
      
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
            <Product product={product} />
          </Col>
          ))}
      </Row>
      
      )}

    </div>
  )
}

export default HomeScreen
