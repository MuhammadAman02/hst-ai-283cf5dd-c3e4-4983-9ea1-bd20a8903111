import StripePayment from '@/components/StripePayment';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to Your Stripe-Enabled App</h1>
        <p className="text-xl text-blue-700">Make a payment below!</p>
      </div>
      <StripePayment />
    </div>
  );
};

export default Index;