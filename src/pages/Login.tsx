import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PlanType = "Free" | "ProjectChart" | "MentorPlus";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Frontend-only: store login info; plan is chosen on subscription page
    localStorage.setItem("nextstep-username", username);
    localStorage.setItem("nextstep-login-email", email);

    // After login, go to separate subscription page
    navigate("/subscription");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-8 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="NextStep AI" className="h-32 w-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-1 text-center">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Log in to continue your guided project journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Continue
          </Button>

          <button
            type="button"
            className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
        </form>
      </div>
    </div>
  );
}

