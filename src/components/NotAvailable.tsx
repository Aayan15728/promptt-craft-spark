import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotAvailable = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10">
            <AlertCircle className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl gradient-text">Not Available Currently</CardTitle>
          <CardDescription className="text-lg">
            This feature is not available for sale currently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We're working hard to bring you the best experience. This feature will be available soon!
          </p>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAvailable;