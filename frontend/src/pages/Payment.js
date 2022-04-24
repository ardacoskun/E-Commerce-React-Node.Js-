import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = axios.post("http://localhost:5000/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });

        navigate("/");
      } catch (error) {}
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  return (
    <>
      {stripeToken ? (
        <span>Processing.Please wait...</span>
      ) : (
        <StripeCheckout
          name="OSF FINAL"
          image="https://osf.digital/library/media/osf/digital/modules/Social-Media-Images/COMPANY/Press-Releases/Newsroom-SM.png"
          shippingAddress
          billingAddress
          description="Your total is 20$"
          amount={2000}
          token={onToken}
          stripeKey={process.env.React_App_STRIPE_KEY}
        >
          <Button variant="danger">Pay Now</Button>
        </StripeCheckout>
      )}
    </>
  );
};

export default Payment;
