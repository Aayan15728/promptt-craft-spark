import { Link } from 'react-router-dom';

const PublicHeader = () => {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <span className="text-white font-bold">P</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">promptt</h1>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/auth" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg">Get Started</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;