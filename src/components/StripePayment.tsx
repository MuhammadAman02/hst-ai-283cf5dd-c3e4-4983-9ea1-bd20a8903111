import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || 'An error occurred');
        setProcessing(false);
      } else {
        console.log('PaymentMethod', paymentMethod);
        // Here you would typically send the paymentMethod.id to your server
        // to complete the payment. For this example, we'll just log it.
        setError(null);
        setProcessing(false);
        alert('Payment successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <CardElement className="border p-3 rounded mb-4" />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Button type="submit" disabled={!stripe || processing} className="w-full">
        {processing ? 'Processing...' : 'Pay'}
      </Button>
    </form>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;