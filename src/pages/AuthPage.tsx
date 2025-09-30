import AuthForm from '@/components/AuthForm';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to Home
        </Link>
      </div>
      <AuthForm onBack={() => {}} />
    </div>
  );
};

export default AuthPage;