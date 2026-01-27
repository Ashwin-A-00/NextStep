import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mentor = {
  id: number;
  name: string;
  qualification: string;
  photoUrl: string;
  speciality: string;
};

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Ananya Sharma",
    qualification: "M.Tech, IIT Madras • 5+ yrs in Full‑Stack",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya",
    speciality: "Frontend, React, UI reviews",
  },
  {
    id: 2,
    name: "Rahul Verma",
    qualification: "SDE II, Product MNC • B.Tech CSE",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    speciality: "System design for beginners, backend",
  },
  {
    id: 3,
    name: "Sneha Kulkarni",
    qualification: "Data Scientist • MS in Data Science",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha",
    speciality: "Machine learning projects, Python",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    qualification: "Lead Engineer • 8+ yrs experience",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
    speciality: "Project planning, architecture",
  },
  {
    id: 5,
    name: "Priya Nair",
    qualification: "Career Coach • Ex‑FAANG",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    speciality: "Career guidance, interview prep",
  },
];

export default function MentorChat() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const mentor = useMemo(() => {
    const numericId = Number(id);
    return mentors.find((m) => m.id === numericId) ?? mentors[0];
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/80 px-8 py-6 shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="flex items-center gap-3">
            <img
              src={mentor.photoUrl}
              alt={mentor.name}
              className="h-10 w-10 rounded-full border border-border object-cover bg-muted"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Connecting you to {mentor.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Preparing a private room for your chat...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <UserRound className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Chatting with</p>
              <h1 className="text-sm font-semibold text-foreground flex items-center gap-2">
                {mentor.name}
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                  Online
                </span>
              </h1>
              <p className="text-[10px] text-muted-foreground">
                {mentor.qualification} • {mentor.speciality}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => navigate("/mentor-support")}
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to mentors
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-6 flex flex-col gap-4">
        <div className="flex-1 rounded-2xl border border-border bg-card p-4 flex flex-col gap-3 min-h-[320px]">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>
              This is a demo chat window for your project. You can design the actual
              realtime messaging later.
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-3 text-xs">
            <div className="self-start max-w-[80%] rounded-2xl bg-muted px-3 py-2">
              <p className="mb-0.5 font-semibold text-foreground">{mentor.name}</p>
              <p className="text-muted-foreground">
                Hey! Share your current project and the areas where you need help today.
              </p>
            </div>
            <div className="self-end max-w-[80%] rounded-2xl bg-primary px-3 py-2 text-primary-foreground">
              <p>
                This is a sample message from you. In a real app, your messages will
                appear here as you send them.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="h-10 flex-1 rounded-full border border-border bg-card px-3 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            placeholder={`Type your message to ${mentor.name}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            size="sm"
            className="rounded-full px-4 text-xs"
            onClick={() => setMessage("")}
          >
            Send
          </Button>
        </div>
      </main>
    </div>
  );
}

