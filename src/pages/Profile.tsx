import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { LevelBadge } from '@/components/dashboard/LevelBadge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Target,
  Heart,
  BookOpen,
  Edit2,
  Award,
  Camera,
  User,
} from 'lucide-react';
import { ProfileEditWizard } from '@/components/profile/ProfileEditWizard';

const mockBadges = [
  { id: '1', name: 'Early Adopter', icon: '🌟', description: 'Joined NextStep AI' },
  { id: '2', name: 'First Steps', icon: '👣', description: 'Completed onboarding' },
  { id: '3', name: 'Skill Seeker', icon: '🎯', description: 'Completed 3 skills' },
];

export default function Profile() {
  const { profile, setProfile } = useUserStore();

  const [editOpen, setEditOpen] = useState(false);
  const [editStep, setEditStep] = useState<1 | 2 | 3 | 4>(1);
  const [usernameInput, setUsernameInput] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Initialize username and profile image from localStorage
  useEffect(() => {
    const stored =
      profile?.name ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('nextstep-username') || ''
        : '');
    setUsernameInput(stored || 'Student');
    
    const storedImage = typeof window !== 'undefined'
      ? localStorage.getItem('nextstep-profile-image')
      : null;
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [profile?.name]);

  const effectiveUsername = usernameInput || profile?.name || 'Student';

  const currentPlan = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('nextstep-subscription-plan');
    if (stored === 'Free' || stored === 'ProjectChart' || stored === 'MentorPlus') return stored;
    return null;
  }, []);

  const planLabel =
    currentPlan === 'MentorPlus'
      ? 'Mentor Plus'
      : currentPlan === 'ProjectChart'
      ? 'Project Chart'
      : 'Free';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      setProfileImage(imageDataUrl);
      localStorage.setItem('nextstep-profile-image', imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <Badge variant="secondary" className="h-7 px-3 text-xs">
              Plan: {planLabel}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your account and view your progress
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={effectiveUsername}
                    className="w-full h-full rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-full gradient-primary shadow-glow text-3xl border-2 border-border">
                    {effectiveUsername?.[0]?.toUpperCase() || <User className="h-10 w-10" />}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-foreground">
                  {effectiveUsername}
                </h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => {
                    const newName = prompt('Enter your username', effectiveUsername) || '';
                    const trimmed = newName.trim();
                    if (!trimmed) return;
                    if (profile) {
                      setProfile({ ...profile, name: trimmed });
                    }
                    localStorage.setItem('nextstep-username', trimmed);
                    setUsernameInput(trimmed);
                  }}
                  title="Edit username"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{profile?.branch || 'Computer Science'}</p>
            </div>

            <div className="mt-6">
              <LevelBadge level={profile?.level || 1} xp={profile?.xp || 150} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {profile?.completedSkills.length || 3}
                </p>
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">Certifications</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockBadges.length}
                </p>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <Award className="h-5 w-5 text-primary" />
              Badges Earned
            </h3>
            <div className="mt-4 space-y-3">
              {mockBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Education */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditStep(1);
                  setEditOpen(true);
                }}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-muted-foreground">Degree</Label>
                <p className="mt-1 font-medium text-foreground">
                  {profile?.degree || 'B.Tech / B.E.'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Branch</Label>
                <p className="mt-1 font-medium text-foreground">
                  {profile?.branch || 'Computer Science'}
                </p>
              </div>
            </div>
          </div>

          {/* Syllabus Topics */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                Syllabus Topics
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditStep(2);
                  setEditOpen(true);
                }}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(profile?.syllabusTopics || [
                'Data Structures',
                'Algorithms',
                'DBMS',
              ]).map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Heart className="h-5 w-5 text-primary" />
                Interests
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditStep(3);
                  setEditOpen(true);
                }}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(profile?.interests || ['technology', 'data']).map((interest) => (
                <Badge key={interest} variant="outline" className="capitalize">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Career Goal */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Target className="h-5 w-5 text-primary" />
                Career Goal
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditStep(4);
                  setEditOpen(true);
                }}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4">
              <div className="rounded-xl bg-gradient-hero p-4">
                <p className="text-lg font-semibold text-foreground">
                  {profile?.careerGoal || 'Software Engineer'}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You're on track! Keep learning to achieve your goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* Blur background when editing */}
{editOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
    onClick={() => setEditOpen(false)}
  />
)}

      {/* Full-screen wizard that reuses onboarding UI for editing */}
      <ProfileEditWizard
        open={editOpen}
        initialStep={editStep}
        onClose={() => setEditOpen(false)}
      />
    </div>
  );
}
