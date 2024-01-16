import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({booking}) => {
        const [ cardError,setCardError]=useState(' ');
        const [clientSecret, setClientSecret] = useState("");
        const stripe = useStripe();
        const [transactionId ,seTreansactionId]= useState('')
        const elements = useElements();
        const [success, setSuccess] = useState('');
        const {price,email , patient}=booking;
//class 77-7   add a payment setawry  in  strip docs 


useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);



        const handleSubmit = async (event) => {
                event.prevenDefault();
                if(!stripe || !elements){
                        return 
                }
                const card = elements.getElement(CardElement);
if(card === null){
        return;
}
const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if(error){
        console.log(error);
        setCardError(error.message);
      }
else{
        setCardError(' ');
}


// class 77-7 add payment= strip confirm card payment
setSuccess('');
const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: patient,
              email: email,
            },
          },
        },
      );
      if(confirmError){
        setCardError(confirmError.message)
        return;
      
      }
if(paymentIntent.status= 'succeeded'){
        setSuccess ('congras ! your payment comlented')
        seTreansactionId(paymentIntent.id)
}    
        }

        return (

              <>
              
              <form onSubmit={handleSubmit}>
                        <CardElement
                                options={{
                                        style: {
                                                base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                                color: '#aab7c4',
                                                        },
                                                },
                                                invalid: {
                                                        color: '#9e2146',
                                                },
                                        },
                                }}
                        />
                        <button 
                        className='btn btn-sm btn-primary mt-4'
                         type="submit" disabled={!stripe || !clientSecret}>
                                Pay
                        </button>


                </form>
                <p className='text-red-700'>{cardError}</p>
                {
                        success && <div>
                                <p className='text-green-500'>{success}</p>
                       <p>your btr  {transactionId}</p>
                        </div>
                }
              </>


        );
}

export default CheckoutForm;


import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log('dddd REACT_APP_STRIPE_PK',stripePromise)

const Payment = () => {
  const booking=useLoaderData()
  const {treatment,price,appointmentDate,slot}=booking

  console.log(booking)
  return (
    <div>
      <h1 className='text-3xl'>payment for {treatment}</h1>
      <p className='text-xl'
      >pleasse pay ${price} for your appointment on{appointmentDate} at {slot}</p>

<div className='w-96 my-12'>
<Elements stripe={stripePromise}>
  <CheckoutForm booking={booking}></CheckoutForm>
  
    </Elements>


</div>
    </div>
  )
}

export default Payment






