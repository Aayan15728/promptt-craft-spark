import PromptGenerator from '@/components/PromptGenerator';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, dailyUsesLeft, setDailyUsesLeft } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // This should be handled by ProtectedRoute, but as a fallback
    return <div>Loading...</div>;
  }

  return (
    <PromptGenerator
      user={user}
      dailyUsesLeft={dailyUsesLeft}
      onUseDailyLimit={() => setDailyUsesLeft(prev => Math.max(0, prev - 1))}
      onUpgradeRequired={() => navigate('/pricing')}
    />
  );
};

export default Index;