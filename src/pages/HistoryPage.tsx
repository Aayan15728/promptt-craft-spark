import PromptHistory from '@/components/PromptHistory';
import { useAuth } from '@/hooks/useAuth';

const HistoryPage = () => {
  const { user } = useAuth();

  if (!user) {
    // This should be handled by protected routes, but as a fallback:
    return <div>Please log in to view your history.</div>;
  }

  return <PromptHistory user={user} />;
};

export default HistoryPage;