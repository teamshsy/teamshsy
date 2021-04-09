import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'


const ProductScreen = ({ history, location, match }) => {

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  /*run a function when the homescreen loads with useEffect
    will use Axios to fetch the products*/
  useEffect(() => {
   
      dispatch(listProductDetails(match.params.id))

  }, [dispatch, match])

  

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    //go to cart page, we need id
    history.push(`/cart`)
  }

  return (
    <>
      <Link className='btn btn-light my- 3' to="/">
        Go Back
      </Link>

      {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (

        <Row>

          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>
                Price ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Add to Cart */}
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>QTY</Col>
                    <Col>
                      <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button className='btn-block' type='button' onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            
            </Card>
          </Col>

          </Row>

      )}
      
    </>
  )
}

export default ProductScreen
