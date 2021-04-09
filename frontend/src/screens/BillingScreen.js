import React, { useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveBillingAddress } from '../actions/cartActions'

const BillingScreen = ({ history }) => {

  const cart = useSelector(state => state.cart)
  const { billingAddress } = cart
  
  const [address, setAddress] = useState(billingAddress.address)
  const [city, setCity] = useState(billingAddress.city)
  const [postalCode, setPostalCode] = useState(billingAddress.postalCode)
  const [country, setCountry] = useState(billingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveBillingAddress({ address, city, postalCode, country}))
    history.push('/payment')
  }
  
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Billing</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type='text' placeholder='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder='country' value={country} onChange={(e)=> setCountry(e.target.value)} required></Form.Control>
        </Form.Group>
        
        <Button type='submit' varient='primary'>Continue</Button>
      
      </Form>


    </FormContainer>
  )
}

export default BillingScreen
