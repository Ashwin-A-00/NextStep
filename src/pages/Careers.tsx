import { useState } from 'react';
import { CareerCard } from '@/components/dashboard/CareerCard';
import { useUserStore } from '@/stores/userStore';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CareerPath } from '@/types';

const allCareers: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Build scalable applications and solve complex problems with code. Work on frontend, backend, or full-stack development.',
    matchPercentage: 92,
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'System Design', 'DSA'],
    averageSalary: '$120k',
    growthRate: '+22%',
    icon: '💻',
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Extract insights from data, build ML models, and drive data-driven decisions across organizations.',
    matchPercentage: 78,
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow'],
    averageSalary: '$130k',
    growthRate: '+36%',
    icon: '📊',
  },
  {
    id: '3',
    title: 'Product Manager',
    description: 'Lead product strategy, prioritize features, and bridge business needs with technology solutions.',
    matchPercentage: 65,
    requiredSkills: ['Strategy', 'Analytics', 'Communication', 'Agile', 'User Research'],
    averageSalary: '$140k',
    growthRate: '+18%',
    icon: '🚀',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    description: 'Automate infrastructure, manage CI/CD pipelines, and ensure system reliability at scale.',
    matchPercentage: 70,
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Terraform'],
    averageSalary: '$125k',
    growthRate: '+28%',
    icon: '⚙️',
  },
  {
    id: '5',
    title: 'UX Designer',
    description: 'Create intuitive user experiences through research, prototyping, and visual design.',
    matchPercentage: 55,
    requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Visual Design', 'Usability Testing'],
    averageSalary: '$105k',
    growthRate: '+15%',
    icon: '🎨',
  },
  {
    id: '6',
    title: 'Machine Learning Engineer',
    description: 'Design and deploy ML systems at scale, bridging research and production.',
    matchPercentage: 72,
    requiredSkills: ['Python', 'PyTorch', 'MLOps', 'Deep Learning', 'Cloud Platforms'],
    averageSalary: '$145k',
    growthRate: '+42%',
    icon: '🤖',
  },
  {
    id: '7',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats through monitoring, analysis, and incident response.',
    matchPercentage: 60,
    requiredSkills: ['Network Security', 'SIEM', 'Penetration Testing', 'Risk Assessment', 'Compliance'],
    averageSalary: '$110k',
    growthRate: '+33%',
    icon: '🔒',
  },
  {
    id: '8',
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure solutions for enterprise applications.',
    matchPercentage: 68,
    requiredSkills: ['AWS', 'Azure', 'Architecture', 'Networking', 'Security'],
    averageSalary: '$155k',
    growthRate: '+25%',
    icon: '☁️',
  },
];

const categories = ['All', 'Engineering', 'Data', 'Design', 'Management', 'Security'];

export default function Careers() {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCareers = allCareers
    .filter((career) => {
      const matchesSearch =
        career.title.toLowerCase().includes(search.toLowerCase()) ||
        career.description.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Explore Careers</h1>
        <p className="mt-1 text-muted-foreground">
          Discover career paths that match your skills and interests
        </p>
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-border bg-gradient-hero p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Career Insights</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on your {profile?.interests.length || 3} interests and{' '}
              {profile?.syllabusTopics.length || 5} syllabus topics, we've found{' '}
              <span className="font-medium text-accent">{filteredCareers.length} matching careers</span>{' '}
              for you. Software Engineer has the highest match at 92%!
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Career Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCareers.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            onSelect={() => navigate('/roadmap')}
          />
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No careers found matching your search.</p>
        </div>
      )}
    </div>
  );
}
