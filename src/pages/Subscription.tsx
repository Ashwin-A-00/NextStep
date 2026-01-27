import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type PlanType = "Free" | "ProjectChart" | "MentorPlus";
type BillingCycle = "Monthly" | "Annually";

export default function Subscription() {
  const navigate = useNavigate();
  const location = useLocation();
  const [plan, setPlan] = useState<PlanType>("Free");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("Monthly");

  useEffect(() => {
    const state = location.state as { highlightPlan?: PlanType } | null;
    if (state?.highlightPlan) {
      setPlan(state.highlightPlan);
    }
  }, [location.state]);

  const handleSelectPlan = (selectedPlan: PlanType) => {
    setPlan(selectedPlan);
    localStorage.setItem("nextstep-subscription-plan", selectedPlan);
    navigate("/order-summary", { state: { plan: selectedPlan, billingCycle } });
  };

  const isAnnual = billingCycle === "Annually";

  const projectChartPrice = isAnnual ? "₹1,499" : "₹149";
  const projectChartLabel = isAnnual ? "Per year (student discount)" : "Per month";

  const mentorPlusPrice = isAnnual ? "₹3,999" : "₹399";
  const mentorPlusLabel = isAnnual ? "Per year (student discount)" : "Per month";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pricing Plans For Everyone
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Start with a free plan or unlock guided project charts and 1‑on‑1 mentor
            support with our paid plans.
          </p>

          {/* Billing toggle */}
          <div className="mt-4 inline-flex items-center rounded-full bg-card border border-border p-1 text-xs font-medium">
            <button
              type="button"
              className={`rounded-full px-4 py-1 ${
                billingCycle === "Monthly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("Monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-1 ${
                billingCycle === "Annually"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("Annually")}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Free plan */}
          <button
            type="button"
            onClick={() => setPlan("Free")}
            className={`group flex flex-col justify-between rounded-2xl border bg-card px-6 py-8 text-left transition-all ${
              plan === "Free"
                ? "border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                : "border-border hover:border-blue-500/70 hover:shadow-[0_0_18px_rgba(59,130,246,0.3)]"
            }`}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                Free
              </p>
              <h2 className="text-lg font-semibold text-foreground">Free Explorer</h2>
              <p className="text-3xl font-bold text-foreground">₹0</p>
              <p className="text-xs text-muted-foreground">Per month</p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li>Access to basic learning materials.</li>
                <li>Simple project ideas to get started.</li>
                <li>Community Q&amp;A support.</li>
              </ul>
            </div>
            <Button
              type="button"
              className="mt-6 w-full rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold"
              onClick={() => handleSelectPlan("Free")}
            >
              Get Started Free
            </Button>
          </button>

          {/* Project Chart plan (Recommended) */}
          <button
            type="button"
            onClick={() => setPlan("ProjectChart")}
            className={`group flex flex-col justify-between rounded-2xl border bg-card px-6 py-8 text-left transition-all relative ${
              plan === "ProjectChart"
                ? "border-emerald-500 shadow-[0_0_28px_rgba(16,185,129,0.5)]"
                : "border-border hover:border-emerald-500/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-950">
              Recommended
            </div>
            <div className="space-y-3 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                Project charts
              </p>
              <h2 className="text-lg font-semibold text-foreground">Project Chart Plan</h2>
              <p className="text-3xl font-bold text-foreground">{projectChartPrice}</p>
              <p className="text-xs text-muted-foreground">{projectChartLabel}</p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li>Detailed project charts for your projects.</li>
                <li>Step‑by‑step milestones and checklists.</li>
                <li>Guidance to help you build complete projects.</li>
                <li>Access to premium examples and templates.</li>
              </ul>
            </div>
            <Button
              type="button"
              className="mt-6 w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
              onClick={() => handleSelectPlan("ProjectChart")}
            >
              Get Started Now
            </Button>
          </button>

          {/* Mentor Plus plan */}
          <button
            type="button"
            onClick={() => setPlan("MentorPlus")}
            className={`group flex flex-col justify-between rounded-2xl border bg-card px-6 py-8 text-left transition-all ${
              plan === "MentorPlus"
                ? "border-pink-500 shadow-[0_0_28px_rgba(236,72,153,0.5)]"
                : "border-border hover:border-pink-500/70 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            }`}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">
                Mentor support
              </p>
              <h2 className="text-lg font-semibold text-foreground">Mentor Plus</h2>
              <p className="text-3xl font-bold text-foreground">{mentorPlusPrice}</p>
              <p className="text-xs text-muted-foreground">{mentorPlusLabel}</p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li>Everything in Project Chart Plan.</li>
                <li>Personal mentor for each user.</li>
                <li>1‑on‑1 sessions to clear your doubts.</li>
                <li>Hands‑on assistance while you work on projects.</li>
              </ul>
            </div>
            <Button
              type="button"
              className="mt-6 w-full rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold"
              onClick={() => handleSelectPlan("MentorPlus")}
            >
              Get Started Now
            </Button>
          </button>
        </div>

      </div>
    </div>
  );
}

