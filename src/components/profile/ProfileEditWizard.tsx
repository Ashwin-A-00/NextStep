import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { StepEducation } from "@/components/onboarding/StepEducation";
import { StepSyllabus } from "@/components/onboarding/StepSyllabus";
import { StepInterests } from "@/components/onboarding/StepInterests";
import { StepCareerGoal } from "@/components/onboarding/StepCareerGoal";

type StepIndex = 1 | 2 | 3 | 4;

interface ProfileEditWizardProps {
  open: boolean;
  initialStep: StepIndex;
  onClose: () => void;
}

export const ProfileEditWizard = ({ open, initialStep, onClose }: ProfileEditWizardProps) => {
  const { profile, onboarding, updateOnboarding, setProfile } = useUserStore();
  const step: StepIndex = initialStep;

  // When opening, seed onboarding data from current profile so UI is prefilled.
  useEffect(() => {
    if (!open) return;

    if (profile) {
      updateOnboarding({
        step: initialStep,
        degree: profile.degree,
        branch: profile.branch,
        syllabusTopics: profile.syllabusTopics,
        interests: profile.interests,
        careerGoal: profile.careerGoal || "",
      });
    } else {
      updateOnboarding({ step: initialStep });
    }

  }, [open, initialStep, profile, updateOnboarding]);

  if (!open) return null;

  const applyOnboardingToProfile = () => {
    const updated = {
      id: profile?.id ?? crypto.randomUUID(),
      name: profile?.name || "Student",
      degree: onboarding.degree,
      branch: onboarding.branch,
      syllabusTopics: onboarding.syllabusTopics,
      interests: onboarding.interests,
      careerGoal: onboarding.careerGoal,
      level: profile?.level ?? 1,
      xp: profile?.xp ?? 0,
      completedSkills: profile?.completedSkills ?? [],
      badges: profile?.badges ?? [],
    };

    setProfile(updated);
  };

  const handleComplete = () => {
    applyOnboardingToProfile();
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepEducation onNext={handleComplete} />;
      case 2:
        return <StepSyllabus onNext={handleComplete} onBack={onClose} />;
      case 3:
        return <StepInterests onNext={handleComplete} onBack={onClose} />;
      case 4:
        return <StepCareerGoal onComplete={handleComplete} onBack={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-border bg-background p-6 shadow-large">
        <div className="flex items-center justify-between pb-4">
          <p className="text-sm text-muted-foreground">
            {step === 1 && "Edit education"}
            {step === 2 && "Edit syllabus topics"}
            {step === 3 && "Edit interests"}
            {step === 4 && "Edit career goal"}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>
        <div className="mt-2">{renderStep()}</div>
      </div>
    </div>
  );
};

