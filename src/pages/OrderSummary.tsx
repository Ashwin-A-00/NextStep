import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Receipt, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlanType = "Free" | "ProjectChart" | "MentorPlus";
type BillingCycle = "Monthly" | "Annually";

function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as
    | { plan?: PlanType; billingCycle?: BillingCycle }
    | null;

  const plan: PlanType = state?.plan ?? "Free";
  const billingCycle: BillingCycle = state?.billingCycle ?? "Monthly";

  const pricing = useMemo(() => {
    const isAnnual = billingCycle === "Annually";

    if (plan === "Free") {
      return {
        label: "Free Explorer",
        subtotal: 0,
        discount: 0,
        total: 0,
        periodLabel: "Per month",
        note: "Start free and upgrade anytime.",
      };
    }

    if (plan === "ProjectChart") {
      const monthly = 149;
      const annual = 1499;
      const subtotal = isAnnual ? monthly * 12 : monthly;
      const total = isAnnual ? annual : monthly;
      return {
        label: "Project Chart Plan",
        subtotal,
        discount: Math.max(0, subtotal - total),
        total,
        periodLabel: isAnnual ? "Per year" : "Per month",
        note: isAnnual ? "Annual student discount applied." : "Monthly student pricing.",
      };
    }

    // MentorPlus
    {
      const monthly = 399;
      const annual = 3999;
      const subtotal = isAnnual ? monthly * 12 : monthly;
      const total = isAnnual ? annual : monthly;
      return {
        label: "Mentor Plus",
        subtotal,
        discount: Math.max(0, subtotal - total),
        total,
        periodLabel: isAnnual ? "Per year" : "Per month",
        note: isAnnual ? "Annual student discount applied." : "Monthly student pricing.",
      };
    }
  }, [plan, billingCycle]);

  const handleConfirm = () => {
    // Persist chosen billing cycle for later use (optional, but useful)
    localStorage.setItem("nextstep-billing-cycle", billingCycle);
    localStorage.setItem("nextstep-subscription-plan", plan);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Order details</h1>
          <p className="text-sm text-muted-foreground">
            Review your plan and confirm to continue.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order details */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Order details</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium text-foreground">{pricing.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Billing</span>
                <span className="font-medium text-foreground">{billingCycle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium text-foreground">
                  {formatINR(pricing.total)}{" "}
                  <span className="text-xs text-muted-foreground">
                    {pricing.periodLabel}
                  </span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground pt-2">{pricing.note}</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h2 className="text-base font-semibold text-foreground">Order summary</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatINR(pricing.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-foreground">- {formatINR(pricing.discount)}</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  {formatINR(pricing.total)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full rounded-full" onClick={handleConfirm}>
                Confirm &amp; Continue
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => navigate("/subscription")}
              >
                Back to plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

