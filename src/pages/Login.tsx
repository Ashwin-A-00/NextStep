import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // hardcoded fallback user
    const hardcodedUser = {
      email: "test@nextstep.ai",
      password: "123456",
      username: "Test User",
    };

    if (mode === "signup") {
      // hardcoded signup → store in localStorage
      localStorage.setItem("nextstep-user", JSON.stringify({
        username,
        email,
        password,
      }));

      localStorage.setItem("nextstep-username", username);
      localStorage.setItem("nextstep-login-email", email);

      navigate("/subscription");
      return;
    }

    // LOGIN
    const stored = localStorage.getItem("nextstep-user");
    const storedUser = stored ? JSON.parse(stored) : null;

    const isValid =
      (storedUser &&
        storedUser.email === email &&
        storedUser.password === password) ||
      (email === hardcodedUser.email &&
        password === hardcodedUser.password);

    if (!isValid) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "nextstep-username",
      storedUser?.username || hardcodedUser.username
    );
    localStorage.setItem("nextstep-login-email", email);

    navigate("/subscription");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-8 shadow-lg">
        <div className="flex flex-col items-center mb-3">
          <img src="/logo.png" alt="NextStep AI" className="h-32 w-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-1 text-center">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>

        <p className="text-sm text-muted-foreground mb-6 text-center">
          {mode === "login"
            ? "Log in to continue your guided project journey."
            : "Sign up to start your guided project journey."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
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
          )}

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

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full">
            {mode === "login" ? "Login" : "Sign up"}
          </Button>

          <button
            type="button"
            className="w-full text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login"
              ? "New user? Sign up"
              : "Already have an account? Log in"}
          </button>

          <button
            type="button"
            className="w-full text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
        </form>
      </div>
    </div>
  );
}
