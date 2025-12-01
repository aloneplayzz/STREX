import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Zap } from "lucide-react";

const MOCK_CREDENTIALS = {
  email: "ruthvesh15@gmail.com",
  password: "ruthvesh@2009",
};

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
        // Call backend mock-login endpoint
        const response = await fetch("/api/auth/mock-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Mock user data for frontend
          const mockUser = {
            id: "mock-admin-user",
            email: MOCK_CREDENTIALS.email,
            firstName: "Ruthvesh",
            lastName: "Admin",
            isAdmin: true,
            profileImageUrl: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          localStorage.setItem("mockAuthUser", JSON.stringify(mockUser));
          toast({
            title: "Login successful!",
            description: "Welcome to the admin dashboard.",
          });
          
          setTimeout(() => {
            setLocation("/admin");
          }, 500);
        } else {
          toast({
            title: "Login failed",
            description: "An error occurred during login",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please use ruthvesh15@gmail.com and ruthvesh@2009",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoFill = () => {
    setEmail(MOCK_CREDENTIALS.email);
    setPassword(MOCK_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <Card className="glass-strong border-white/10 p-8 max-w-md w-full relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary via-purple to-cyan flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
        </div>

        <h1 className="font-display font-bold text-2xl text-center mb-2">Admin Login</h1>
        <p className="text-center text-muted-foreground text-sm mb-6">Mock authentication for development</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-white/10"
              data-testid="input-login-email"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-white/10"
              data-testid="input-login-password"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-purple"
            data-testid="button-login"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
