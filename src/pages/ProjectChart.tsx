import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Lock, Sparkles, Upload, CheckCircle2, Circle, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/stores/userStore";

type PlanType = "Free" | "ProjectChart" | "MentorPlus";

type ProjectQuestion = {
  id: string;
  question: string;
  hint?: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  questions: ProjectQuestion[];
};

const projectsByCareer: Record<string, Project[]> = {
  "Software Engineer": [
    {
      id: "proj-1",
      title: "Build a Todo List Application",
      description: "Create a full-stack todo list app with CRUD operations",
      questions: [
        {
          id: "q1",
          question: "Design the database schema for storing todos. What fields would you include?",
          hint: "Consider fields like id, title, description, status, createdAt, updatedAt",
        },
        {
          id: "q2",
          question: "Implement the API endpoint for creating a new todo. What HTTP method and route would you use?",
          hint: "Use POST method for creating resources",
        },
        {
          id: "q3",
          question: "Create the frontend form component for adding todos. What validations would you add?",
          hint: "Validate for empty title, max length, and required fields",
        },
      ],
    },
    {
      id: "proj-2",
      title: "Build a REST API with Authentication",
      description: "Create a secure REST API with JWT authentication",
      questions: [
        {
          id: "q4",
          question: "Implement user registration endpoint. How would you hash passwords?",
          hint: "Use bcrypt or similar hashing library",
        },
        {
          id: "q5",
          question: "Create JWT token generation logic. What claims would you include?",
          hint: "Include userId, email, and expiration time",
        },
        {
          id: "q6",
          question: "Implement middleware for protecting routes. How would you verify tokens?",
          hint: "Extract token from Authorization header and verify signature",
        },
      ],
    },
    {
      id: "proj-3",
      title: "Build a Real-time Chat Application",
      description: "Create a chat app with WebSocket support",
      questions: [
        {
          id: "q7",
          question: "Set up WebSocket server. How would you handle multiple client connections?",
          hint: "Use Socket.IO or native WebSocket with connection pooling",
        },
        {
          id: "q8",
          question: "Implement message broadcasting. How would you ensure all users receive messages?",
          hint: "Emit events to all connected clients in a room",
        },
        {
          id: "q9",
          question: "Add typing indicators. How would you detect when a user is typing?",
          hint: "Emit typing events with debouncing",
        },
      ],
    },
  ],
  "Data Scientist": [
    {
      id: "proj-1",
      title: "Data Cleaning and Preprocessing",
      description: "Clean and preprocess a dataset for analysis",
      questions: [
        {
          id: "q1",
          question: "Identify and handle missing values in the dataset. What strategies would you use?",
          hint: "Consider mean/median imputation, forward fill, or dropping rows",
        },
        {
          id: "q2",
          question: "Detect and remove outliers. What statistical methods would you apply?",
          hint: "Use IQR method, Z-score, or isolation forest",
        },
        {
          id: "q3",
          question: "Normalize numerical features. When would you use standardization vs normalization?",
          hint: "Standardization for features with different scales, normalization for bounded ranges",
        },
      ],
    },
    {
      id: "proj-2",
      title: "Build a Machine Learning Model",
      description: "Train and evaluate a classification model",
      questions: [
        {
          id: "q4",
          question: "Split the dataset into train and test sets. What ratio would you use?",
          hint: "Common ratios are 80/20 or 70/30",
        },
        {
          id: "q5",
          question: "Select appropriate features. How would you handle feature selection?",
          hint: "Use correlation analysis, feature importance, or recursive feature elimination",
        },
        {
          id: "q6",
          question: "Evaluate model performance. What metrics would you use for classification?",
          hint: "Accuracy, precision, recall, F1-score, ROC-AUC",
        },
      ],
    },
  ],
  "Full Stack Developer": [
    {
      id: "proj-1",
      title: "E-commerce Product Catalog",
      description: "Build a product catalog with search and filters",
      questions: [
        {
          id: "q1",
          question: "Design the product data model. What attributes would you include?",
          hint: "Name, price, description, images, category, stock, ratings",
        },
        {
          id: "q2",
          question: "Implement search functionality. How would you make it efficient?",
          hint: "Use full-text search, indexing, or Elasticsearch",
        },
        {
          id: "q3",
          question: "Add filtering by category and price range. How would you structure the API?",
          hint: "Use query parameters for filters and pagination",
        },
      ],
    },
  ],
};

// Default projects if career not found
const defaultProjects: Project[] = [
  {
    id: "proj-1",
    title: "Your First Project",
    description: "Complete this project to get started",
    questions: [
      {
        id: "q1",
        question: "What is the main goal of your project?",
        hint: "Think about what problem you're solving",
      },
      {
        id: "q2",
        question: "What technologies will you use?",
        hint: "List programming languages, frameworks, and tools",
      },
    ],
  },
];

export default function ProjectChart() {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<Record<string, "pending" | "verified" | "failed">>({});

  const selectedPlan = useMemo<PlanType | null>(() => {
    const stored = localStorage.getItem("nextstep-subscription-plan");
    if (stored === "Free" || stored === "ProjectChart" || stored === "MentorPlus") {
      return stored;
    }
    return null;
  }, []);

  const completedProjects = useMemo(() => {
    const stored = localStorage.getItem("nextstep-completed-projects");
    return stored ? JSON.parse(stored) : [];
  }, []);

  const hasAccess = selectedPlan === "ProjectChart" || selectedPlan === "MentorPlus";
  const isMentorPlus = selectedPlan === "MentorPlus";

  const careerGoal = profile?.careerGoal || "Software Engineer";
  const projects = projectsByCareer[careerGoal] || defaultProjects;
  const currentProject = projects[currentProjectIndex];

  // Add extra questions for MentorPlus users
  const projectQuestions = useMemo(() => {
    const baseQuestions = currentProject.questions;
    if (isMentorPlus && baseQuestions.length < 5) {
      const extraQuestions: ProjectQuestion[] = [
        {
          id: `q-extra-1`,
          question: "What edge cases should you consider for this feature?",
          hint: "Think about null values, empty inputs, and boundary conditions",
        },
        {
          id: `q-extra-2`,
          question: "How would you optimize this solution for better performance?",
          hint: "Consider time complexity, space complexity, and caching strategies",
        },
      ];
      return [...baseQuestions, ...extraQuestions];
    }
    return baseQuestions;
  }, [currentProject, isMentorPlus]);

  const handleGoToSubscription = () => {
    navigate("/subscription", { state: { highlightPlan: "ProjectChart" as PlanType } });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleFileUpload = (questionId: string, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setUploadedFiles((prev) => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), ...fileArray],
    }));
  };

  const handleRemoveFile = (questionId: string, index: number) => {
    setUploadedFiles((prev) => {
      const files = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: files.filter((_, i) => i !== index),
      };
    });
  };

  const handleVerify = async (questionId: string) => {
    setIsVerifying(true);
    setVerificationStatus((prev) => ({ ...prev, [questionId]: "pending" }));

    // Simulate AI verification (in real app, this would call an API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const answer = answers[questionId];
    const files = uploadedFiles[questionId] || [];
    const hasAnswer = answer && answer.trim().length > 50;
    const hasFiles = files.length > 0;

    if (hasAnswer || hasFiles) {
      setVerificationStatus((prev) => ({ ...prev, [questionId]: "verified" }));
    } else {
      setVerificationStatus((prev) => ({ ...prev, [questionId]: "failed" }));
    }

    setIsVerifying(false);
  };

  const handleCompleteProject = () => {
    const allQuestionsAnswered = projectQuestions.every(
      (q) => verificationStatus[q.id] === "verified"
    );

    if (!allQuestionsAnswered) {
      alert("Please verify all questions before completing the project");
      return;
    }

    const updatedCompleted = [...completedProjects, currentProject.id];
    localStorage.setItem("nextstep-completed-projects", JSON.stringify(updatedCompleted));

    if (currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
      setAnswers({});
      setUploadedFiles({});
      setVerificationStatus({});
    } else {
      alert("Congratulations! You've completed all projects!");
    }
  };

  const canAccessProject = (index: number) => {
    if (index === 0) return true;
    const previousProject = projects[index - 1];
    return completedProjects.includes(previousProject.id);
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
              Project Charts are locked
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              Unlock detailed project charts, timelines, and milestones by upgrading to the{" "}
              <span className="font-semibold text-emerald-500">Project Chart Plan</span> or{" "}
              <span className="font-semibold text-pink-500">Mentor Plus</span>.
            </p>
            <Button
              className="rounded-full px-6"
              onClick={handleGoToSubscription}
            >
              View plans to unlock Project Charts
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!canAccessProject(currentProjectIndex)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-dashed border-border bg-card/70 p-8 text-center">
            <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Complete Previous Project
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Please complete Project {currentProjectIndex} before accessing this project.
            </p>
            <Button
              className="rounded-full px-6"
              onClick={() => setCurrentProjectIndex(currentProjectIndex - 1)}
            >
              Go to Previous Project
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Project Charts</h1>
              <p className="text-xs text-muted-foreground">
                {careerGoal} • Project {currentProjectIndex + 1} of {projects.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-8 space-y-6">
        {/* Project Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {projects.map((project, index) => {
            const isCompleted = completedProjects.includes(project.id);
            const isCurrent = index === currentProjectIndex;
            const canAccess = canAccessProject(index);

            return (
              <button
                key={project.id}
                onClick={() => canAccess && setCurrentProjectIndex(index)}
                disabled={!canAccess}
                className={`
                  flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium whitespace-nowrap
                  ${isCurrent ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : ""}
                  ${!isCurrent && canAccess ? "border-border hover:border-emerald-400 text-foreground" : ""}
                  ${!canAccess ? "border-border opacity-50 cursor-not-allowed text-muted-foreground" : ""}
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
                Project {index + 1}
                {!canAccess && <Lock className="h-3 w-3 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Current Project */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {currentProject.title}
            </h2>
            <p className="text-sm text-muted-foreground">{currentProject.description}</p>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {projectQuestions.map((question, qIndex) => {
              const answer = answers[question.id] || "";
              const files = uploadedFiles[question.id] || [];
              const status = verificationStatus[question.id];

              return (
                <div
                  key={question.id}
                  className="rounded-xl border border-border bg-background/40 p-5 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-emerald-500">
                          Question {qIndex + 1}
                        </span>
                        {status === "verified" && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                        {status === "failed" && (
                          <Circle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {question.question}
                      </p>
                      {question.hint && (
                        <p className="text-xs text-muted-foreground italic">
                          💡 Hint: {question.hint}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Workspace */}
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-foreground">
                      Your Solution:
                    </label>
                    <Textarea
                      value={answer}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Write your solution here..."
                      className="min-h-[120px] text-sm"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground">
                      Attach Your Work:
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs cursor-pointer hover:bg-secondary transition-colors">
                        <Upload className="h-4 w-4" />
                        Upload Files
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileUpload(question.id, e.target.files)}
                        />
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {files.map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1 text-xs"
                          >
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{file.name}</span>
                            <button
                              onClick={() => handleRemoveFile(question.id, fileIndex)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Verify Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {status === "verified"
                        ? "✓ Verified by AI"
                        : status === "failed"
                        ? "✗ Verification failed. Please add more details."
                        : "Pending verification"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerify(question.id)}
                      disabled={isVerifying || (!answer.trim() && files.length === 0)}
                      className="text-xs"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify with AI"
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complete Project Button */}
          <div className="pt-4 border-t border-border">
            <Button
              onClick={handleCompleteProject}
              disabled={
                !projectQuestions.every((q) => verificationStatus[q.id] === "verified")
              }
              className="w-full rounded-full"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete Project {currentProjectIndex + 1}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
