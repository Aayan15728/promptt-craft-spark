import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-red-500/10 to-orange-600/10">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl gradient-text">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            The page you're looking for doesn't exist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
