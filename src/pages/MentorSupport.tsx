import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, Info, Lock, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PlanType = "Free" | "ProjectChart" | "MentorPlus";

type Mentor = {
  id: number;
  name: string;
  qualification: string;
  photoUrl: string;
  nextSessionTime: string;
  speciality: string;
};

const mentors: Mentor[] = [
    {
      id: 1,
      name: "Ananya Sharma",
      qualification: "M.Tech, IIT Madras • 5+ yrs in Full‑Stack",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya",
      nextSessionTime: "Today • 7:30 PM – 8:00 PM",
      speciality: "Frontend, React, UI reviews",
    },
    {
      id: 2,
      name: "Rahul Verma",
      qualification: "SDE II, Product MNC • B.Tech CSE",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      nextSessionTime: "Tomorrow • 6:00 PM – 6:45 PM",
      speciality: "System design for beginners, backend",
    },
    {
      id: 3,
      name: "Sneha Kulkarni",
      qualification: "Data Scientist • MS in Data Science",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha",
      nextSessionTime: "Sat • 11:00 AM – 11:45 AM",
      speciality: "Machine learning projects, Python",
    },
    {
      id: 4,
      name: "Arjun Mehta",
      qualification: "Lead Engineer • 8+ yrs experience",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
      nextSessionTime: "Sun • 5:00 PM – 5:45 PM",
      speciality: "Project planning, architecture",
    },
    {
      id: 5,
      name: "Priya Nair",
      qualification: "Career Coach • Ex‑FAANG",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      nextSessionTime: "Mon • 8:00 PM – 8:30 PM",
      speciality: "Career guidance, interview prep",
    },
  ];

export default function MentorSupport() {
  const navigate = useNavigate();

  const selectedPlan = useMemo<PlanType | null>(() => {
    const stored = localStorage.getItem("nextstep-subscription-plan");
    if (stored === "Free" || stored === "ProjectChart" || stored === "MentorPlus") {
      return stored;
    }
    return null;
  }, []);

  const hasAccess = selectedPlan === "MentorPlus";

  const handleGoToSubscription = () => {
    navigate("/subscription", { state: { highlightPlan: "MentorPlus" as PlanType } });
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-dashed border-border bg-card/70 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Mentor support is locked
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              Get personalised 1‑on‑1 mentor guidance, doubt clearing, and project reviews by
              upgrading to the{" "}
              <span className="font-semibold text-pink-500">Mentor Plus</span> plan.
            </p>
            <Button
              className="rounded-full px-6"
              onClick={handleGoToSubscription}
            >
              View plans to unlock Mentor Plus
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-3 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <UserRound className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">Mentor Support</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    title="About mentor support"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>What you get with Mentor Support</DialogTitle>
                    <DialogDescription>
                      Mentor Plus helps you move faster with personalised guidance.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
                      <span>Clarify concepts that block your project progress.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
                      <span>Get feedback on your code, UI, and project structure.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
                      <span>Plan your next 1–2 weeks of focused learning.</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-xs text-muted-foreground">
              Book sessions, track feedback, and stay accountable with your mentor.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-8 space-y-8">
        {/* Mentor list */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Available mentors for your course
              </h2>
              <p className="text-xs text-muted-foreground">
                Choose a mentor who matches your learning style and schedule.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <button
                key={mentor.id}
                type="button"
                onClick={() => navigate(`/mentor-chat/${mentor.id}`)}
                className={`flex flex-col items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  "border-border hover:border-pink-400/80 hover:bg-background/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.photoUrl}
                    alt={mentor.name}
                    className="h-10 w-10 rounded-full border border-border object-cover bg-muted"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {mentor.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {mentor.qualification}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <CalendarClock className="h-3 w-3 text-primary" />
                  <span>{mentor.nextSessionTime}</span>
                </div>
                <p className="text-[11px] text-foreground/80">
                  Speciality: <span className="font-medium">{mentor.speciality}</span>
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* (Removed: How mentors help section; moved into info dialog) */}
      </main>
    </div>
  );
}

