import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

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
      <div className="w-full max-w-4xl grid gap-8 rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-8 shadow-lg md:grid-cols-[1.1fr,1.4fr]">
        {/* Left: Login form */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              NextStep AI
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Log in and pick your subscription plan to start your guided project journey.
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

        {/* Right: Info about plans, now just explanatory */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            What you get
          </p>
          <p className="text-sm text-muted-foreground">
            After logging in, you can choose from 1 free and 2 paid plans. Paid plans unlock
            project charts and personal mentor support with one‑on‑one sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

