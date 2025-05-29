import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const StripePayment = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [StripeElements, setStripeElements] = useState<any>(null);
  const [CardElement, setCardElement] = useState<any>(null);
  const [useStripe, setUseStripe] = useState<any>(null);
  const [useElements, setUseElements] = useState<any>(null);

  useEffect(() => {
    const loadStripe = async () => {
      const { loadStripe } = await import('@stripe/stripe-js');
      const { Elements, CardElement, useStripe, useElements } = await import('@stripe/react-stripe-js');
      setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY));
      setStripeElements(Elements);
      setCardElement(CardElement);
      setUseStripe(() => useStripe);
      setUseElements(() => useElements);
    };
    loadStripe();
  }, []);

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
          setError(null);
          setProcessing(false);
          alert('Payment successful!');
        }
      }
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        {CardElement && <CardElement className="border p-3 rounded mb-4" />}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button type="submit" disabled={!stripe || processing} className="w-full">
          {processing ? 'Processing...' : 'Pay'}
        </Button>
      </form>
    );
  };

  if (!stripePromise || !StripeElements) {
    return <div>Loading...</div>;
  }

  return (
    <StripeElements stripe={stripePromise}>
      <CheckoutForm />
    </StripeElements>
  );
};

export default StripePayment;