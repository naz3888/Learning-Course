export type CourseLevel = 'level_1' | 'level_2' | 'level_3';

export interface LessonTimestamp {
  time: string;
  seconds: number;
  title: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  durationMinutes: number;
  videoUrl: string; // Embeddable video URL (e.g., curated YouTube / high quality tutorial)
  summary: string;
  keyPoints: string[];
  timestamps: LessonTimestamp[];
  transcriptSnippet: string;
  practicePrompt?: string;
  resources: { title: string; url: string }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  iconName: string;
  coverImage?: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LevelQuiz {
  level: CourseLevel;
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface GlossaryTerm {
  term: string;
  englishTerm: string;
  category: 'Asas' | 'Model & LLM' | 'Teknikal' | 'Etika';
  definition: string;
  example: string;
}

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  rating: number;
  studentsCount: string;
  coursesCount: number;
  avatar: string;
}

export interface StudentReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  content: string;
}

export interface CourseProject {
  title: string;
  description: string;
  deliverables: string[];
  showcaseImage: string;
  studentProjectsCount: number;
}

export interface ForumComment {
  id: string;
  lessonId?: string;
  author: string;
  role: 'Pelajar' | 'Tenaga Pengajar' | 'Moderator';
  avatar?: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  isPinned?: boolean;
  category: 'Soalan Pelajaran' | 'Kongsi Prompt' | 'Bincang Umum';
  replies?: {
    id: string;
    author: string;
    role: 'Pelajar' | 'Tenaga Pengajar' | 'Moderator';
    avatar?: string;
    timestamp: string;
    content: string;
    likes: number;
    isLiked?: boolean;
  }[];
}

export interface MembershipDetails {
  isActive: boolean;
  planName: string;
  monthlyPrice: number; // RM98
  startDate: string;
  nextBillingDate: string;
  autoRenew: boolean;
  status: 'active' | 'cancelled';
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids
  completedQuizzes: { [level in CourseLevel]?: number }; // score out of 100
  notes: { [lessonId: string]: string };
  userName: string;
  selectedLevel: CourseLevel;
  enrolledCourses?: string[]; // course IDs purchased or enrolled
  membership?: MembershipDetails;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  image: string;
  expertise: string[];
}

export interface CourseLessonItem {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary?: string;
}

export interface StoreCourse {
  id: string;
  level: CourseLevel;
  title: string;
  tagline: string;
  description: string;
  videoUrl?: string; // Pautan URL video pelajaran utama atau embed video
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  isFree: boolean;
  price: number; // in MYR, 0 if free
  originalPrice?: number;
  badge?: 'PERCUMA' | 'TERLARIS' | 'PREMIUM' | 'BAHARU' | 'PILIHAN UTAMA' | 'POPULAR';
  rating: number;
  reviewsCount: number;
  studentsCount: string;
  totalModules: number;
  totalLessons: number;
  totalHours: string;
  coverImage: string;
  skillsLearned: string[];
  includes: string[];
  levelCategory: 'Pemula' | 'Pertengahan' | 'Lanjutan' | 'Pakar';
  targetAudience: string;
  lessons?: CourseLessonItem[];
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  enrolledCourseIds: string[];
  completedLessonsCount: number;
  quizScores: { [level in CourseLevel]?: number };
  isVip: boolean;
  certificatesEarned: string[];
  lastActive: string;
  avatar?: string;
  notesCount: number;
}

export interface AdminTransaction {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitles: string[];
  amount: number;
  discountAmount: number;
  promoCodeUsed?: string;
  paymentMethod: 'fpx' | 'card' | 'tng';
  date: string;
  status: 'completed' | 'processing' | 'refunded';
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  type: 'course' | 'student' | 'finance' | 'system';
}

export interface VoucherStats {
  code: string;
  description: string;
  discountType: 'fixed' | 'percentage' | 'full';
  discountValue: number;
  usageCount: number;
  totalSavingsGiven: number;
  quota: number;
  isActive: boolean;
}

