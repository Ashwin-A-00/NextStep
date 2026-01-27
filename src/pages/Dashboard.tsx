import { useUserStore } from '@/stores/userStore';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { StatCard } from '@/components/dashboard/StatCard';
import { LevelBadge } from '@/components/dashboard/LevelBadge';
import { CareerCard } from '@/components/dashboard/CareerCard';
import { Button } from '@/components/ui/button';
import {
  Target,
  BookOpen,
  Trophy,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Award,
  Rocket,
  Code2,
  BarChart3,
  Briefcase,
  Hand,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CareerPath } from '@/types';

// Mock data for demonstration
const mockCareerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Build scalable applications and solve complex problems with code.',
    matchPercentage: 92,
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'System Design', 'DSA'],
    averageSalary: '$120k',
    growthRate: '+22%',
    icon: Code2,
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Extract insights from data and build predictive models.',
    matchPercentage: 78,
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    averageSalary: '$130k',
    growthRate: '+36%',
    icon: BarChart3,
  },
  {
    id: '3',
    title: 'Product Manager',
    description: 'Lead product strategy and bridge business with technology.',
    matchPercentage: 65,
    requiredSkills: ['Strategy', 'Analytics', 'Communication', 'Agile'],
    averageSalary: '$140k',
    growthRate: '+18%',
    icon: Briefcase,
  },
];

export default function Dashboard() {
  const { profile } = useUserStore();
  const navigate = useNavigate();

  const careerReadiness = 45;
  const skillsCompleted = profile?.completedSkills.length || 3;
  const totalSkills = 15;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back{profile?.name ? `, ${profile.name}` : ''}!
            </h1>
            {/*<Hand className="h-8 w-8 text-yellow-500" />*/}
          </div>
          <p className="mt-1 text-text-muted">
            {profile?.careerGoal
              ? `Your journey to becoming a ${profile.careerGoal} continues`
              : 'Discover your perfect career path'}
          </p>
        </div>
        <LevelBadge level={profile?.level || 1} xp={profile?.xp || 150} />
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Career Readiness"
          value={`${careerReadiness}%`}
          subtitle="Keep going!"
          icon={Target}
          trend="up"
          trendValue="+5% this week"
          variant="primary"
        />
        <StatCard
          title="Skills Completed"
          value={`${skillsCompleted}/${totalSkills}`}
          subtitle={`${totalSkills - skillsCompleted} remaining`}
          icon={BookOpen}
          trend="up"
          trendValue="+2 this month"
        />
        <StatCard
          title="Certifications"
          value="1"
          subtitle="AWS Cloud Practitioner"
          icon={Award}
        />
        <StatCard
          title="Current Streak"
          value="7 days"
          subtitle="Personal best: 14 days"
          icon={TrendingUp}
          trend="up"
          trendValue="🔥"
          variant="accent"
        />
      </div>

      {/* Progress Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Career Progress */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Career Progress</h3>
          <p className="text-sm text-muted-foreground">
            {profile?.careerGoal || 'Software Engineer'}
          </p>

          <div className="mt-6 flex justify-center">
            <ProgressRing progress={careerReadiness} size={160} strokeWidth={12}>
              <div className="text-center">
                <span className="text-3xl font-bold text-foreground">{careerReadiness}%</span>
                <p className="text-xs text-muted-foreground">Ready</p>
              </div>
            </ProgressRing>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Technical Skills</span>
              <span className="font-medium text-foreground">60%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[60%] rounded-full bg-white" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Soft Skills</span>
              <span className="font-medium text-foreground">40%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[40%] rounded-full gradient-accent" />
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Next Step</h3>
              <p className="text-sm text-muted-foreground">
                Recommended action to level up
              </p>
            </div>
            <Button variant="ghost" onClick={() => navigate('/roadmap')}>
              View Roadmap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 rounded-xl bg-gradient-hero p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-signature-gold shadow-accent-glow">
                <Rocket className="h-7 w-7 text-card" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">
                  Learn React Fundamentals
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Master component-based architecture and modern React patterns
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    8 hours
                  </span>
                  <span className="flex items-center gap-1 text-sm text-accent">
                    <Trophy className="h-4 w-4" />
                    +100 XP
                  </span>
                </div>
              </div>
              <Button
                variant="hero"
                className="shrink-0"
                onClick={() => navigate('/roadmap')}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start Now
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:border-primary/30 hover:shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Continue Learning</p>
                <p className="text-xs text-muted-foreground">Data Structures</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:border-accent/30 hover:shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Get Certified</p>
                <p className="text-xs text-muted-foreground">AWS Solutions Architect</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Career Suggestions */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Recommended Careers
            </h3>
            <p className="text-sm text-muted-foreground">
              Based on your skills and interests
            </p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/careers')}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCareerPaths.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onSelect={() => navigate('/roadmap')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
