import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { SkillTree } from '@/components/roadmap/SkillTree';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BookOpen, Clock, ExternalLink, Play, Check, Trophy } from 'lucide-react';
import type { Skill } from '@/types';

// Mock skill data
const mockSkills: Skill[] = [
  {
    id: 'html-css',
    name: 'HTML & CSS',
    description: 'Build the foundation of web pages with semantic HTML and modern CSS.',
    category: 'technical',
    difficulty: 'beginner',
    prerequisites: [],
    estimatedHours: 10,
    resources: [
      { id: '1', title: 'MDN Web Docs', type: 'article', url: '#', platform: 'MDN' },
    ],
    isCompleted: true,
    isUnlocked: true,
    position: { x: 200, y: 0 },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Master the language of the web and interactive programming.',
    category: 'technical',
    difficulty: 'beginner',
    prerequisites: ['html-css'],
    estimatedHours: 40,
    resources: [
      { id: '2', title: 'JavaScript.info', type: 'article', url: '#', platform: 'Web' },
    ],
    isCompleted: true,
    isUnlocked: true,
    position: { x: 200, y: 150 },
  },
  {
    id: 'react',
    name: 'React',
    description: 'Build modern user interfaces with component-based architecture.',
    category: 'technical',
    difficulty: 'intermediate',
    prerequisites: ['javascript'],
    estimatedHours: 30,
    resources: [
      { id: '3', title: 'React Docs', type: 'article', url: '#', platform: 'React' },
    ],
    isCompleted: false,
    isUnlocked: true,
    position: { x: 100, y: 300 },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Add type safety to your JavaScript applications.',
    category: 'technical',
    difficulty: 'intermediate',
    prerequisites: ['javascript'],
    estimatedHours: 20,
    resources: [
      { id: '4', title: 'TypeScript Handbook', type: 'article', url: '#', platform: 'TS' },
    ],
    isCompleted: false,
    isUnlocked: true,
    position: { x: 300, y: 300 },
  },
  {
    id: 'node',
    name: 'Node.js',
    description: 'Build server-side applications with JavaScript.',
    category: 'technical',
    difficulty: 'intermediate',
    prerequisites: ['javascript'],
    estimatedHours: 25,
    resources: [
      { id: '5', title: 'Node.js Docs', type: 'article', url: '#', platform: 'Node' },
    ],
    isCompleted: false,
    isUnlocked: true,
    position: { x: 500, y: 300 },
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Design scalable and reliable distributed systems.',
    category: 'technical',
    difficulty: 'advanced',
    prerequisites: ['react', 'node'],
    estimatedHours: 50,
    resources: [],
    isCompleted: false,
    isUnlocked: false,
    position: { x: 200, y: 450 },
  },
  {
    id: 'aws',
    name: 'AWS Certification',
    description: 'Get certified in Amazon Web Services cloud platform.',
    category: 'certification',
    difficulty: 'advanced',
    prerequisites: ['node', 'system-design'],
    estimatedHours: 60,
    resources: [],
    isCompleted: false,
    isUnlocked: false,
    position: { x: 400, y: 450 },
  },
];

export default function Roadmap() {
  const { profile, completeSkill, addXP } = useUserStore();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSkillComplete = (skill: Skill) => {
    completeSkill(skill.id);
    addXP(100);
    setSelectedSkill(null);
  };

  const completedCount = mockSkills.filter((s) => s.isCompleted).length;
  const progress = Math.round((completedCount / mockSkills.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Skill Roadmap</h1>
          <p className="mt-1 text-muted-foreground">
            {profile?.careerGoal
              ? `Path to becoming a ${profile.careerGoal}`
              : 'Your personalized learning journey'}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Overall Progress</p>
          <p className="text-2xl font-bold text-foreground">{progress}%</p>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {mockSkills.length} skills
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
          <span>Expert</span>
        </div>
      </div>

      {/* Skill Tree */}
      <SkillTree
        skills={mockSkills}
        onSkillClick={setSelectedSkill}
        className="min-h-[600px]"
      />

      {/* Skill Detail Modal */}
      <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
        {selectedSkill && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-glow">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-xl">{selectedSkill.name}</DialogTitle>
                  <DialogDescription className="capitalize">
                    {selectedSkill.category} • {selectedSkill.difficulty}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <p className="text-muted-foreground">{selectedSkill.description}</p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedSkill.estimatedHours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="text-accent">+100 XP</span>
                </div>
              </div>

              {selectedSkill.resources.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Resources</h4>
                  <div className="space-y-2">
                    {selectedSkill.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-all hover:border-primary/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-xs font-medium">
                            {resource.platform}
                          </div>
                          <span className="font-medium">{resource.title}</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedSkill(null)}
                >
                  Close
                </Button>
                {selectedSkill.isCompleted ? (
                  <Button disabled className="flex-1" variant="accent">
                    <Check className="mr-2 h-4 w-4" />
                    Completed
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    className="flex-1"
                    onClick={() => handleSkillComplete(selectedSkill)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
