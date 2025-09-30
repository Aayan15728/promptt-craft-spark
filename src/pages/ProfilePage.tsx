import Profile from '@/components/Profile';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // This should be handled by protected routes
    return <div>Loading profile...</div>;
  }

  return <Profile user={user} setCurrentView={() => navigate('/')} />;
};

export default ProfilePage;