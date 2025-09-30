import Pricing from '@/components/Pricing';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();
  return <Pricing onGetStarted={() => navigate('/auth')} />;
};

export default PricingPage;