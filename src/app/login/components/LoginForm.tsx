"use client";

import { signIn } from "next-auth/react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const LoginForm = () => {
  const handleGithubSignup = () => {
    // Handle GitHub signup logic here
    console.log("GitHub signup clicked");
  };

  const handleGoogleSignup = () => signIn("google");

  return (
    <main className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col">
          {/* TODO: implement github signin */}
          {/*<Button onClick={handleGithubSignup} variant="outline" className="w-full">*/}
          {/*  <Github className="mr-2 h-4 w-4" />*/}
          {/*  Sign up with GitHub*/}
          {/*</Button>*/}
          <Button
            onClick={handleGoogleSignup}
            variant="outline"
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
