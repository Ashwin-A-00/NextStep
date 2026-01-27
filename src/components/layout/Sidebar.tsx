import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Map,
  Briefcase,
  User,
  Sparkles,
  BarChart3,
  UserRound,
  Lock,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/userStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Map, label: 'Roadmap', path: '/roadmap' },
  { icon: Briefcase, label: 'Careers', path: '/careers' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: BarChart3, label: 'Project Chart', path: '/project-chart' },
  { icon: UserRound, label: 'Mentor Support', path: '/mentor-support' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, resetOnboarding } = useUserStore();
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const updateFromStorage = () => {
      const storedPlan = localStorage.getItem('nextstep-subscription-plan');
      const storedUsername = localStorage.getItem('nextstep-username') || '';
      setSubscriptionPlan(storedPlan);
      setUsername(storedUsername);
    };

    // Initial load
    updateFromStorage();

    // Listen for storage changes (when plan is updated in other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nextstep-subscription-plan' || e.key === 'nextstep-username') {
        updateFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for same-tab updates
    const interval = setInterval(updateFromStorage, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const effectiveName = profile?.name || username || 'Student';

  const handleLogout = () => {
    resetOnboarding();
    navigate('/');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signature-gold shadow-accent-glow">
            <Sparkles className="h-5 w-5 text-card" />
          </div>
          <span className="text-lg font-semibold text-foreground">NextStep</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isLockedProjectChart =
            item.path === '/project-chart' &&
            (subscriptionPlan === 'Free' || !subscriptionPlan);
          const isLockedMentorSupport =
            item.path === '/mentor-support' &&
            (subscriptionPlan === 'Free' || subscriptionPlan === 'ProjectChart' || !subscriptionPlan);
          const isLockedFeature = isLockedProjectChart || isLockedMentorSupport;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary shadow-soft'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                isLockedFeature && !isActive && 'opacity-60'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 shrink-0',
                  isActive && 'text-primary',
                  isLockedFeature && !isActive && 'text-muted-foreground'
                )}
              />
              <span className="flex items-center gap-1">
                {item.label}
                {isLockedFeature && (
                  <Lock className="h-3 w-3 text-muted-foreground" />
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="space-y-3">
          <div className="rounded-lg bg-gradient-hero p-4">
            <p className="text-xs font-medium text-foreground">Pro Tip</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Complete your daily tasks to earn XP and level up faster!
            </p>
          </div>

          {/* Logout only */}
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={handleLogout}
            title="Log out"
          >
            Log out
          </Button>
        </div>
      </div>
    </aside>
  );
}
