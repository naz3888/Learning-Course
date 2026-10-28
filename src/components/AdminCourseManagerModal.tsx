import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Plus,
  Edit3,
  Trash2,
  Copy,
  CheckCircle2,
  X,
  Search,
  BookOpen,
  DollarSign,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  LogOut,
  AlertCircle,
  Eye,
  Sliders,
  Check,
  Star,
  Video,
  Play,
  Film,
  ExternalLink
} from 'lucide-react';
import { StoreCourse, CourseLevel, Module, CourseLessonItem } from '../types';

interface AdminCourseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: StoreCourse[];
  isAdminLoggedIn: boolean;
  onAdminLogin: (email: string, pass: string) => Promise<boolean>;
  onAdminLogout: () => void;
  onAddCourse: (newCourse: StoreCourse) => void;
  onUpdateCourse: (updatedCourse: StoreCourse) => void;
  onDeleteCourse: (courseId: string) => void;
  onResetCoursesToDefault: () => void;
  modules?: Module[];
  onOpenEditModuleModal?: (mod: Module, initialLessonIndex?: number) => void;
  onOpenAddModuleModal?: () => void;
  onDeleteModule?: (moduleId: string) => void;
  onResetModulesToDefault?: () => void;
}

// Preset cover images for quick selection when creating/editing
const PRESET_COVERS = [
  {
    name: 'Asas & Neural (Beginner)',
    url: '/src/assets/images/course_level_beginner_1792520563264.jpg'
  },
  {
    name: 'Praktikal & Alatan (Intermediate)',
    url: '/src/assets/images/course_level_intermediate_1792520565056.jpg'
  },
  {
    name: 'Senibina & RAG (Advanced)',
    url: '/src/assets/images/course_level_advanced_1792520565131.jpg'
  },
  {
    name: 'Makmal Kod & Data',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Robotik & Visi Komputer',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Studio Reka Bentuk Generatif',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80'
  }
];

// Preset video URLs for quick selection and testing
export const PRESET_VIDEOS = [
  {
    name: 'Asas & Pengenalan AI',
    desc: 'Pengenalan & Mitos Biasa AI',
    url: 'https://www.youtube-nocookie.com/embed/2ePf9rue1Ao'
  },
  {
    name: 'Transformer & Self-Attention',
    desc: 'Visualisasi Seni Bina Transformer',
    url: 'https://www.youtube-nocookie.com/embed/wjZofJX0v4U'
  },
  {
    name: 'RAG & Vector Database',
    desc: 'Saluran Retrieval-Augmented Gen',
    url: 'https://www.youtube-nocookie.com/embed/T-D1OfcDW1M'
  },
  {
    name: 'Autonomous AI Agents',
    desc: 'Ejen Autonomi & Function Calling',
    url: 'https://www.youtube-nocookie.com/embed/sal78ACtGTc'
  },
  {
    name: 'Deep Learning & Neural Networks',
    desc: 'Rangkaian Saraf Tiruan Bertingkat',
    url: 'https://www.youtube-nocookie.com/embed/ukzFI9rgwfU'
  },
  {
    name: 'Prompt Engineering Masterclass',
    desc: 'Teknik Prompting Lanjutan & CRTF',
    url: 'https://www.youtube-nocookie.com/embed/jC4v5AS4RIM'
  }
];

// Helper to convert standard YouTube/Vimeo links into clean embed format
export const formatEmbedVideoUrl = (rawUrl?: string): string => {
  if (!rawUrl || !rawUrl.trim()) return '';
  const trimmed = rawUrl.trim();

  // Already embed format
  if (trimmed.includes('youtube.com/embed/') || trimmed.includes('youtube-nocookie.com/embed/')) {
    return trimmed;
  }

  // YouTube watch / shorts / share URL
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return trimmed;
};

const PRESET_INSTRUCTORS = [
  {
    name: 'Dr. Farhan Azim',
    role: 'Penyelidik AI Kanan & Bekas Saintis Data Silicon Valley',
    avatar: '/src/assets/images/instructor_ai_expert_1792521714332.jpg'
  },
  {
    name: 'Aiman Zhafri',
    role: 'Pengarah Kreatif Visual AI & Pereka Sistem Generatif',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ir. Sofea Kamilia',
    role: 'Arkitek Kejuruteraan AI & Pakar LLM Fine-Tuning',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Hariz Iskandar',
    role: 'Ketua Jurutera AI & Penasihat Keselamatan Siber Kebangsaan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
  }
];

export const AdminCourseManagerModal: React.FC<AdminCourseManagerModalProps> = ({
  isOpen,
  onClose,
  courses,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onResetCoursesToDefault,
  modules = [],
  onOpenEditModuleModal,
  onOpenAddModuleModal,
  onDeleteModule,
  onResetModulesToDefault
}) => {
  // Navigation tabs between Catalog Courses and Syllabus Modules
  const [adminActiveTab, setAdminActiveTab] = useState<'courses' | 'modules'>('courses');

  // Syllabus module filters
  const [moduleLevelFilter, setModuleLevelFilter] = useState<'all' | CourseLevel>('all');
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [deleteModuleConfirmId, setDeleteModuleConfirmId] = useState<string | null>(null);

  // Login form state
  const [adminEmail, setAdminEmail] = useState('admin@akademiai.my');
  const [adminPassword, setAdminPassword] = useState('AkademiAI2026!Admin');
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Course list management state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'all' | CourseLevel>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Edit / Create Form Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  // Form Fields State
  const [activeCourseLessonIndex, setActiveCourseLessonIndex] = useState<number>(0);
  const [formData, setFormData] = useState<{
    id: string;
    level: CourseLevel;
    title: string;
    tagline: string;
    description: string;
    videoUrl: string;
    instructorName: string;
    instructorRole: string;
    instructorAvatar: string;
    isFree: boolean;
    price: number;
    originalPrice: number;
    badge: 'PERCUMA' | 'TERLARIS' | 'PREMIUM' | 'BAHARU' | 'PILIHAN UTAMA' | 'POPULAR';
    levelCategory: 'Pemula' | 'Pertengahan' | 'Lanjutan' | 'Pakar';
    duration: string;
    totalModules: number;
    totalLessons: number;
    coverImage: string;
    targetAudience: string;
    skillsLearnedText: string;
    includesText: string;
    lessons: CourseLessonItem[];
  }>({
    id: '',
    level: 'level_1',
    title: '',
    tagline: '',
    description: '',
    videoUrl: PRESET_VIDEOS[0].url,
    instructorName: 'Dr. Farhan Azim',
    instructorRole: 'Penyelidik AI Kanan & Bekas Saintis Data Silicon Valley',
    instructorAvatar: '/src/assets/images/instructor_ai_expert_1792521714332.jpg',
    isFree: false,
    price: 99,
    originalPrice: 199,
    badge: 'BAHARU',
    levelCategory: 'Pemula',
    duration: '4 Jam 30 Minit',
    totalModules: 3,
    totalLessons: 2,
    coverImage: PRESET_COVERS[0].url,
    targetAudience: 'Profesional, usahawan, dan peminat teknologi yang ingin menguasai AI.',
    skillsLearnedText: 'Memahami Konsep Asas AI\nTeknik Prompt Berimpak Tinggi\nIntegrasi Aliran Kerja Harian\nEtika & Keselamatan Data',
    includesText: '6 Video Pelajaran HD Bahasa Melayu\nAkses Makmal Prompt Interaktif\nSijil Digital Pengiktirafan Tamat\nAkses Bahan Pembelajaran Sepanjang Hayat',
    lessons: [
      {
        id: 'les-demo-1',
        title: 'Pelajaran 1: Pengenalan & Landskap Semasa AI',
        duration: '14 minit',
        videoUrl: PRESET_VIDEOS[0].url
      },
      {
        id: 'les-demo-2',
        title: 'Pelajaran 2: Perbezaan AI, Machine Learning & Deep Learning',
        duration: '16 minit',
        videoUrl: PRESET_VIDEOS[1].url
      }
    ]
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoginLoading(true);
    try {
      const success = await onAdminLogin(adminEmail.trim(), adminPassword.trim());
      if (!success) {
        setLoginError('Kredensial tidak sah! Sila semak emel dan kata laluan pentadbir.');
      }
    } catch {
      setLoginError('Ralat rangkaian. Sila cuba lagi.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleOpenCreateForm = () => {
    const newId = `course-custom-${Date.now()}`;
    setEditingCourseId(null);
    const initialLessons: CourseLessonItem[] = [
      {
        id: `les-course-${Date.now()}-1`,
        title: 'Pelajaran 1: Pengenalan & Asas Kursus',
        duration: '14 minit',
        videoUrl: PRESET_VIDEOS[0].url
      },
      {
        id: `les-course-${Date.now()}-2`,
        title: 'Pelajaran 2: Aplikasi Praktikal & Contoh Nyata',
        duration: '16 minit',
        videoUrl: PRESET_VIDEOS[1].url
      }
    ];

    setFormData({
      id: newId,
      level: 'level_1',
      title: '',
      tagline: '',
      description: '',
      videoUrl: initialLessons[0].videoUrl,
      instructorName: 'Dr. Farhan Azim',
      instructorRole: 'Penyelidik AI Kanan & Bekas Saintis Data Silicon Valley',
      instructorAvatar: '/src/assets/images/instructor_ai_expert_1792521714332.jpg',
      isFree: false,
      price: 89,
      originalPrice: 179,
      badge: 'BAHARU',
      levelCategory: 'Pemula',
      duration: '4 Jam',
      totalModules: 3,
      totalLessons: initialLessons.length,
      coverImage: PRESET_COVERS[0].url,
      targetAudience: 'Sesiapa sahaja yang ingin meluaskan kemahiran penggunaan kecerdasan buatan.',
      skillsLearnedText: 'Pengenalan Terperinci AI\nLatihan Amali Praktikal\nAutomasi Tugas Rutin\nAmalan Terbaik Industri',
      includesText: 'Video Kuliah Bahasa Melayu Berkualiti Tinggi\nBahan Latihan & Fail Contoh\nSijil Digital Akademi AI\nAkses Komuniti ChatClub',
      lessons: initialLessons
    });
    setActiveCourseLessonIndex(0);
    setIsEditing(true);
  };

  const handleOpenEditForm = (course: StoreCourse) => {
    setEditingCourseId(course.id);

    // Initialize lessons from course.lessons or fallback to syllabus module lessons or default lessons
    let loadedLessons: CourseLessonItem[] = [];
    if (course.lessons && course.lessons.length > 0) {
      loadedLessons = course.lessons;
    } else {
      const matchingModuleLessons = modules
        .filter(m => m.level === course.level)
        .flatMap(m => m.lessons);

      if (matchingModuleLessons.length > 0) {
        loadedLessons = matchingModuleLessons.map((l, idx) => ({
          id: l.id || `les-${course.id}-${idx + 1}`,
          title: l.title || `Pelajaran ${idx + 1}`,
          duration: l.duration || '15 minit',
          videoUrl: l.videoUrl || (idx === 0 ? course.videoUrl || PRESET_VIDEOS[0].url : PRESET_VIDEOS[idx % PRESET_VIDEOS.length].url),
          summary: l.summary
        }));
      } else {
        loadedLessons = [
          {
            id: `les-${course.id}-1`,
            title: 'Pelajaran 1: Pengenalan & Asas Kursus',
            duration: '14 minit',
            videoUrl: course.videoUrl || PRESET_VIDEOS[0].url
          },
          {
            id: `les-${course.id}-2`,
            title: 'Pelajaran 2: Aplikasi Praktikal & Contoh Nyata',
            duration: '16 minit',
            videoUrl: PRESET_VIDEOS[1].url
          }
        ];
      }
    }

    setFormData({
      id: course.id,
      level: course.level,
      title: course.title,
      tagline: course.tagline,
      description: course.description,
      videoUrl: loadedLessons[0]?.videoUrl || course.videoUrl || PRESET_VIDEOS[0].url,
      instructorName: course.instructor.name,
      instructorRole: course.instructor.role,
      instructorAvatar: course.instructor.avatar,
      isFree: course.isFree,
      price: course.price,
      originalPrice: course.originalPrice || course.price * 2,
      badge: (course.badge as any) || 'BAHARU',
      levelCategory: course.levelCategory,
      duration: course.totalHours,
      totalModules: course.totalModules,
      totalLessons: loadedLessons.length,
      coverImage: course.coverImage,
      targetAudience: course.targetAudience,
      skillsLearnedText: course.skillsLearned.join('\n'),
      includesText: course.includes.join('\n'),
      lessons: loadedLessons
    });
    setActiveCourseLessonIndex(0);
    setIsEditing(true);
  };

  const handleAddCourseLesson = () => {
    const nextNum = formData.lessons.length + 1;
    const newLesson: CourseLessonItem = {
      id: `les-course-${Date.now()}-${nextNum}`,
      title: `Pelajaran ${nextNum}: Topik Pelajaran Baharu`,
      duration: '15 minit',
      videoUrl: PRESET_VIDEOS[(nextNum - 1) % PRESET_VIDEOS.length].url
    };
    const updated = [...formData.lessons, newLesson];
    setFormData(prev => ({
      ...prev,
      lessons: updated,
      totalLessons: updated.length
    }));
    setActiveCourseLessonIndex(updated.length - 1);
    setToastMessage(`Pelajaran ${nextNum} berjaya ditambah!`);
  };

  const handleRemoveCourseLesson = (idx: number) => {
    if (formData.lessons.length <= 1) {
      setToastMessage('Kursus mesti mempunyai sekurang-kurangnya satu pelajaran video.');
      return;
    }
    const updated = formData.lessons.filter((_, i) => i !== idx);
    setFormData(prev => ({
      ...prev,
      lessons: updated,
      totalLessons: updated.length,
      videoUrl: updated[0]?.videoUrl || prev.videoUrl
    }));
    if (activeCourseLessonIndex >= idx && activeCourseLessonIndex > 0) {
      setActiveCourseLessonIndex(activeCourseLessonIndex - 1);
    }
    setToastMessage('Pelajaran dipadam daripada kursus.');
  };

  const handleUpdateCourseLesson = (idx: number, field: keyof CourseLessonItem, val: string) => {
    setFormData(prev => {
      const updatedLessons = [...prev.lessons];
      if (updatedLessons[idx]) {
        updatedLessons[idx] = {
          ...updatedLessons[idx],
          [field]: val
        };
      }
      return {
        ...prev,
        lessons: updatedLessons,
        videoUrl: idx === 0 && field === 'videoUrl' ? val : prev.videoUrl
      };
    });
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Sila masukkan tajuk kursus.');
      return;
    }

    const skills = formData.skillsLearnedText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const includesList = formData.includesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const cleanedLessons = formData.lessons.map(l => ({
      ...l,
      videoUrl: formatEmbedVideoUrl(l.videoUrl) || PRESET_VIDEOS[0].url
    }));

    const coursePayload: StoreCourse = {
      id: formData.id || `course-${Date.now()}`,
      level: formData.level,
      title: formData.title.trim(),
      tagline: formData.tagline.trim() || formData.title.trim(),
      description: formData.description.trim() || 'Modul latihan kecerdasan buatan komprehensif oleh Akademi AI.',
      videoUrl: cleanedLessons[0]?.videoUrl || formatEmbedVideoUrl(formData.videoUrl) || PRESET_VIDEOS[0].url,
      instructor: {
        name: formData.instructorName.trim(),
        role: formData.instructorRole.trim(),
        avatar: formData.instructorAvatar.trim()
      },
      isFree: formData.isFree,
      price: formData.isFree ? 0 : Number(formData.price),
      originalPrice: formData.isFree ? 0 : Number(formData.originalPrice),
      badge: formData.badge,
      rating: 4.95,
      reviewsCount: 140,
      studentsCount: '1,200+',
      totalModules: Number(formData.totalModules) || 3,
      totalLessons: cleanedLessons.length,
      totalHours: formData.duration.trim() || '4 Jam',
      coverImage: formData.coverImage.trim() || PRESET_COVERS[0].url,
      skillsLearned: skills.length > 0 ? skills : ['Kemahiran Asas AI', 'Aplikasi Amali Berkesan'],
      includes: includesList.length > 0 ? includesList : ['Akses Penuh Video', 'Sijil Pengiktirafan'],
      levelCategory: formData.levelCategory,
      targetAudience: formData.targetAudience.trim() || 'Pelajar & profesional teknologi.',
      lessons: cleanedLessons
    };

    if (editingCourseId) {
      onUpdateCourse(coursePayload);
      setToastMessage(`Kursus "${coursePayload.title}" berjaya dikemaskini dengan ${cleanedLessons.length} pelajaran video!`);
    } else {
      onAddCourse(coursePayload);
      setToastMessage(`Kursus baharu "${coursePayload.title}" berjaya ditambah dengan ${cleanedLessons.length} pelajaran video!`);
    }

    setIsEditing(false);
  };

  const handleDuplicateCourse = (course: StoreCourse) => {
    const duplicated: StoreCourse = {
      ...course,
      id: `course-${Date.now()}`,
      title: `${course.title} (Salinan)`,
      badge: 'BAHARU'
    };
    onAddCourse(duplicated);
    setToastMessage(`Salinan kursus dibuat: "${duplicated.title}"`);
  };

  const handleQuickToggleFree = (course: StoreCourse) => {
    const updated: StoreCourse = {
      ...course,
      isFree: !course.isFree,
      price: !course.isFree ? 0 : (course.originalPrice || 99),
      badge: !course.isFree ? 'PERCUMA' : 'PREMIUM'
    };
    onUpdateCourse(updated);
    setToastMessage(`Status "${course.title}" ditukar kepada ${updated.isFree ? 'PERCUMA' : 'BERBAYAR'}`);
  };

  // Filter courses for admin table
  const filteredCourses = courses.filter(c => {
    if (selectedLevelFilter !== 'all' && c.level !== selectedLevelFilter) return false;
    if (statusFilter === 'free' && !c.isFree) return false;
    if (statusFilter === 'paid' && c.isFree) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q) ||
        c.levelCategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCourses = courses.length;
  const freeCourses = courses.filter(c => c.isFree).length;
  const paidCourses = courses.filter(c => !c.isFree).length;

  // Modules data processing
  const totalModulesCount = modules.length;
  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const tahap1ModulesCount = modules.filter(m => m.level === 'level_1').length;
  const tahap2ModulesCount = modules.filter(m => m.level === 'level_2').length;
  const tahap3ModulesCount = modules.filter(m => m.level === 'level_3').length;

  const filteredModules = modules.filter(mod => {
    if (moduleLevelFilter !== 'all' && mod.level !== moduleLevelFilter) return false;
    if (moduleSearchQuery.trim()) {
      const q = moduleSearchQuery.toLowerCase();
      const titleMatch = mod.title.toLowerCase().includes(q);
      const descMatch = mod.description.toLowerCase().includes(q);
      const lessonMatch = mod.lessons.some(l => l.title.toLowerCase().includes(q));
      return titleMatch || descMatch || lessonMatch;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#0c0c0c] border border-white/15 shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 right-4 z-50 bg-emerald-500 text-black px-4 py-2.5 rounded font-mono text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-950 via-[#141414] to-neutral-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-400 text-black flex items-center justify-center font-black text-sm shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Oswald'] font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
                  SISTEM PENTADBIR KURSUS
                </span>
                {isAdminLoggedIn && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/40">
                    AKTIF
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                {isAdminLoggedIn
                  ? 'Urus silibus modul video, pautan video pelajaran, tambah kursus baharu dan harga.'
                  : 'Sahkan identiti pentadbir untuk mengurus katalog kursus Akademi AI.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={onAdminLogout}
                className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-red-400 border border-white/10 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Log keluar daripada sesi pentadbir"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Keluar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup Panel Pentadbir"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs between Store Courses & Syllabus Modules */}
        {isAdminLoggedIn && !isEditing && (
          <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 bg-[#111111] border-b border-white/10 overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => setAdminActiveTab('courses')}
              className={`px-4 py-2 font-['Oswald'] text-xs sm:text-sm uppercase tracking-wider font-bold rounded-t flex items-center gap-2 border-t border-l border-r transition-all cursor-pointer shrink-0 ${
                adminActiveTab === 'courses'
                  ? 'bg-[#0c0c0c] text-amber-400 border-white/20 border-b-2 border-b-transparent shadow'
                  : 'bg-transparent text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Katalog Kursus Store ({courses.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setAdminActiveTab('modules')}
              className={`px-4 py-2 font-['Oswald'] text-xs sm:text-sm uppercase tracking-wider font-bold rounded-t flex items-center gap-2 border-t border-l border-r transition-all cursor-pointer shrink-0 ${
                adminActiveTab === 'modules'
                  ? 'bg-[#0c0c0c] text-amber-400 border-white/20 border-b-2 border-b-transparent shadow'
                  : 'bg-transparent text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Modul Silibus &amp; Video Pelajaran (Modul 01, 02...) ({modules.length})</span>
            </button>
          </div>
        )}

        {/* Content Body: LOGIN SCREEN vs ADMIN DASHBOARD */}
        {!isAdminLoggedIn ? (
          // ================= ADMIN LOGIN VIEW =================
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center min-h-[420px] max-w-md mx-auto w-full space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lock className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white tracking-wide">
                Log Masuk Pentadbir
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Akses khusus pengurusan kursus &amp; kemaskini katalog Akademi AI
              </p>
            </div>

            {loginError && (
              <div className="w-full p-3 bg-red-950/60 border border-red-500/40 rounded text-red-200 text-xs flex items-center gap-2 font-sans">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-neutral-400 block font-bold">
                  Emel Pentadbir
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/15 text-white rounded text-sm focus:outline-none focus:border-amber-400"
                  placeholder="admin@akademiai.my"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-neutral-400 block font-bold">
                  Kata Laluan Pentadbir
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/15 text-white rounded text-sm focus:outline-none focus:border-amber-400"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all rounded shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoginLoading ? 'Sedang Log Masuk...' : 'Log Masuk Pentadbir'}</span>
              </button>
            </form>

            {/* Quick Admin Login Helper */}
            <div className="w-full p-3.5 bg-neutral-900/80 border border-white/10 rounded space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Emel Pentadbir:</span>
                <span className="text-amber-400 font-bold">admin@akademiai.my</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Kata Laluan:</span>
                <span className="text-amber-400 font-bold">AkademiAI2026!Admin</span>
              </div>
              <button
                type="button"
                disabled={isLoginLoading}
                onClick={async () => {
                  setAdminEmail('admin@akademiai.my');
                  setAdminPassword('AkademiAI2026!Admin');
                  setIsLoginLoading(true);
                  try {
                    await onAdminLogin('admin@akademiai.my', 'AkademiAI2026!Admin');
                  } finally {
                    setIsLoginLoading(false);
                  }
                }}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoginLoading ? 'Sedang Log Masuk...' : '⚡ Isi & Log Masuk Segera (1-Klik)'}
              </button>
            </div>
          </div>
        ) : isEditing ? (
          // ================= CREATE / EDIT COURSE FORM =================
          <form onSubmit={handleSaveCourse} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-['Oswald'] text-xl font-bold uppercase text-white tracking-wide flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-400" />
                  <span>{editingCourseId ? 'Kemaskini Kursus' : 'Tambah Kursus Baharu'}</span>
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Isikan butiran kursus di bawah. Kursus akan segera dipaparkan dalam katalog Semua Course dan My Course.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded text-xs font-mono transition-colors"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Left Column: Inputs (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* 1. Tajuk Kursus & Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Tajuk Kursus <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="cth: Penguasaan Autonomous AI Agents & MCP"
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/15 text-white rounded text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Tagline / Ringkasan Pukau
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="cth: Bina Ejen Berautonomi Penuh Menggunakan LLM & Function Calling"
                      className="w-full px-3.5 py-2 bg-neutral-900 border border-white/15 text-white rounded text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* 2. Tahap & Lencana */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Tahap Silibus
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as CourseLevel })}
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      <option value="level_1">Tahap 1: Asas &amp; Pengenalan</option>
                      <option value="level_2">Tahap 2: Aplikasi Praktikal</option>
                      <option value="level_3">Tahap 3: Lanjutan &amp; Senibina</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Kategori Aras
                    </label>
                    <select
                      value={formData.levelCategory}
                      onChange={(e) => setFormData({ ...formData, levelCategory: e.target.value as any })}
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      <option value="Pemula">Pemula (Beginner)</option>
                      <option value="Pertengahan">Pertengahan (Intermediate)</option>
                      <option value="Lanjutan">Lanjutan (Advanced)</option>
                      <option value="Pakar">Pakar (Expert)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Lencana (Badge)
                    </label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      <option value="BAHARU">BAHARU</option>
                      <option value="TERLARIS">TERLARIS</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="PERCUMA">PERCUMA</option>
                      <option value="PILIHAN UTAMA">PILIHAN UTAMA</option>
                      <option value="POPULAR">POPULAR</option>
                    </select>
                  </div>
                </div>

                {/* 3. Harga & Kursus Percuma Toggle */}
                <div className="p-4 bg-neutral-900/60 border border-white/10 rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-neutral-200 font-bold flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFree}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData({
                            ...formData,
                            isFree: checked,
                            price: checked ? 0 : 89,
                            badge: checked ? 'PERCUMA' : formData.badge === 'PERCUMA' ? 'BAHARU' : formData.badge
                          });
                        }}
                        className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 cursor-pointer"
                      />
                      <span>Tandakan Sebagai Kursus PERCUMA (RM0)</span>
                    </label>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {formData.isFree ? 'Semua pelajar boleh sertai percuma' : 'Memerlukan pembelian atau Keahlian VIP'}
                    </span>
                  </div>

                  {!formData.isFree && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-neutral-400 block">
                          Harga Jualan (RM)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-mono text-neutral-400">RM</span>
                          <input
                            type="number"
                            min="1"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-sm font-mono focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase text-neutral-400 block">
                          Harga Asal / Coret (RM)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-mono text-neutral-400">RM</span>
                          <input
                            type="number"
                            min="1"
                            value={formData.originalPrice}
                            onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                            className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-sm font-mono focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Pengajar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold">
                      Tenaga Pengajar
                    </label>
                    <span className="text-[11px] font-mono text-neutral-400">Pilih preset atau masukkan nama</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_INSTRUCTORS.map((ins, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            instructorName: ins.name,
                            instructorRole: ins.role,
                            instructorAvatar: ins.avatar
                          });
                        }}
                        className={`p-2 rounded text-left border transition-all text-xs cursor-pointer ${
                          formData.instructorName === ins.name
                            ? 'bg-amber-400/20 border-amber-400 text-white'
                            : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold truncate">{ins.name}</div>
                        <div className="text-[10px] text-neutral-500 truncate">{ins.role}</div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <input
                      type="text"
                      placeholder="Nama Pengajar"
                      value={formData.instructorName}
                      onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                      className="px-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      placeholder="Peranan Pengajar"
                      value={formData.instructorRole}
                      onChange={(e) => setFormData({ ...formData, instructorRole: e.target.value })}
                      className="px-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* 5. Durasi, Modul & Pelajaran */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block">Durasi (Jam)</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="cth: 5.5 Jam"
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block">Jumlah Modul</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.totalModules}
                      onChange={(e) => setFormData({ ...formData, totalModules: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block">Bil. Pelajaran</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.totalLessons}
                      onChange={(e) => setFormData({ ...formData, totalLessons: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono"
                    />
                  </div>
                </div>

                {/* 6. Kulit Kursus (Cover Image) */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                    Pilihan Kulit Kursus (Cover Image)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_COVERS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                        className={`relative rounded overflow-hidden border-2 aspect-video group cursor-pointer ${
                          formData.coverImage === preset.url ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        {formData.coverImage === preset.url && (
                          <div className="absolute inset-0 bg-amber-400/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-black bg-amber-400 rounded-full p-0.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="Atau masukkan URL imej tersuai (https://...)"
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono"
                  />
                </div>

                {/* 7. Pautan Video Pelajaran / Treler Kursus (Video Link & Player) */}
                <div className="p-4 bg-neutral-900/80 border border-amber-400/30 rounded-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-amber-400 text-black flex items-center justify-center font-bold">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-white font-bold block">
                          Pautan Video Kursus (YouTube / Vimeo / MP4) <span className="text-amber-400">*</span>
                        </label>
                        <span className="text-[11px] text-neutral-400 font-sans">
                          Pautan video rasmi yang akan dimainkan untuk pelajar dalam Ruang Pembelajaran.
                        </span>
                      </div>
                    </div>
                    {formData.videoUrl && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30 self-start sm:self-auto font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Pautan Aktif
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="cth: https://www.youtube.com/watch?v=2ePf9rue1Ao atau https://youtu.be/..."
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-white/20 text-white font-mono rounded text-xs focus:outline-none focus:border-amber-400 placeholder-neutral-600"
                    />
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-sans gap-1">
                      <span>💡 Menyokong pautan penuh YouTube, pautan kongsi youtu.be, Vimeo, atau embed URL.</span>
                      <span className="font-mono text-amber-400/80 text-[10px]">Autokonversi ke Teater Embed</span>
                    </div>
                  </div>

                  {/* 1-Click Preset AI Video Links */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase text-neutral-300 font-bold block">
                      ⚡ Pilihan Pantas Video Contoh AI (Klik untuk isi terus):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PRESET_VIDEOS.map((vid, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, videoUrl: vid.url })}
                          className={`p-2 rounded text-left border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                            formData.videoUrl === vid.url
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                              : 'bg-neutral-950 border-white/10 text-neutral-300 hover:text-white hover:border-white/25'
                          }`}
                        >
                          <div className="font-bold truncate flex items-center gap-1.5">
                            <Play className={`w-3 h-3 ${formData.videoUrl === vid.url ? 'text-amber-400 fill-amber-400' : 'text-neutral-400'}`} />
                            <span className="truncate">{vid.name}</span>
                          </div>
                          <div className="text-[10px] text-neutral-500 truncate mt-0.5">{vid.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Embedded Player Inside Form */}
                  {formData.videoUrl ? (
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Pratonton Pemain Video Langsung:
                        </span>
                        <span className="text-[10px] text-neutral-400 truncate max-w-xs font-mono">
                          {formatEmbedVideoUrl(formData.videoUrl)}
                        </span>
                      </div>
                      <div className="relative aspect-video w-full rounded overflow-hidden bg-black border border-white/20 shadow-xl">
                        <iframe
                          src={formatEmbedVideoUrl(formData.videoUrl)}
                          title="Pratonton Video Kursus"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-neutral-950 border border-dashed border-white/15 rounded text-center text-xs text-neutral-500 font-sans flex items-center justify-center gap-2">
                      <Video className="w-4 h-4 text-neutral-600" />
                      <span>Masukkan pautan video di atas untuk melihat pemain video interaktif di sini.</span>
                    </div>
                  )}
                </div>

                {/* 8. Penerangan & Sasaran */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                    Penerangan Kursus
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Penerangan ringkas mengenai silibus dan manfaat kursus..."
                    className="w-full px-3.5 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-sans focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* 9. Kemahiran & Kandungan Termasuk */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block">
                      Kemahiran Dipelajari (1 Baris = 1 Kemahiran)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.skillsLearnedText}
                      onChange={(e) => setFormData({ ...formData, skillsLearnedText: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block">
                      Kandungan Pakej Termasuk (1 Baris = 1 Item)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.includesText}
                      onChange={(e) => setFormData({ ...formData, includesText: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Form Right Column: Live Card Preview & Video Preview (4 Cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pratonton Kad Katalog</span>
                </div>

                <div className="border border-white/15 bg-neutral-950 rounded-lg overflow-hidden shadow-xl sticky top-4 space-y-4 p-0">
                  <div className="relative aspect-video bg-neutral-900">
                    <img
                      src={formData.coverImage || PRESET_COVERS[0].url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold text-amber-400 uppercase">
                        {formData.badge}
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono text-neutral-300">
                        {formData.levelCategory}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-[10px] font-mono text-neutral-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{formData.duration}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 pt-0">
                    <h4 className="font-['Oswald'] font-bold text-base uppercase text-white line-clamp-2">
                      {formData.title || 'Tajuk Kursus Anda'}
                    </h4>

                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {formData.tagline || 'Tagline atau ringkasan kursus akan dipaparkan di sini.'}
                    </p>

                    <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-xs">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 overflow-hidden shrink-0 border border-white/15">
                        <img
                          src={formData.instructorAvatar}
                          alt={formData.instructorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 truncate text-neutral-300 font-sans">
                        {formData.instructorName}
                      </div>
                      <div className="text-right">
                        {formData.isFree ? (
                          <span className="text-emerald-400 font-mono font-black text-xs">PERCUMA</span>
                        ) : (
                          <div className="flex items-center gap-1.5 font-mono">
                            <span className="text-neutral-500 line-through text-[10px]">
                              RM{formData.originalPrice}
                            </span>
                            <span className="text-amber-400 font-bold text-xs">
                              RM{formData.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Miniature video badge indicator in card */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-amber-400" />
                        <span>Pemain Video:</span>
                      </span>
                      <span className="text-amber-400 truncate max-w-[130px]">
                        {formData.videoUrl ? 'Pautan Ditetapkan' : 'Belum Diletakkan'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions for Form */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{editingCourseId ? 'Simpan Kemaskini Kursus' : 'Terbitkan Kursus Baharu'}</span>
              </button>
            </div>
          </form>
        ) : (
          // ================= ADMIN MANAGEMENT DASHBOARD =================
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {adminActiveTab === 'courses' ? (
              <>
            {/* Quick Stats Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Jumlah Kursus</span>
                <span className="font-['Oswald'] text-2xl font-bold text-white">{totalCourses} Kursus</span>
              </div>
              <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Kursus Percuma</span>
                <span className="font-['Oswald'] text-2xl font-bold text-emerald-400">{freeCourses} Modul</span>
              </div>
              <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Kursus Berbayar</span>
                <span className="font-['Oswald'] text-2xl font-bold text-amber-400">{paidCourses} Modul</span>
              </div>
              <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Akses VIP All-Access</span>
                <span className="text-xs font-mono font-bold text-amber-300">Semua {totalCourses} Kursus</span>
              </div>
            </div>

            {/* Actions & Filters Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* Add New Course Button */}
                <button
                  onClick={handleOpenCreateForm}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all rounded shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Kursus Baharu</span>
                </button>

                {/* Reset to Default Catalog */}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-colors rounded flex items-center gap-1.5 cursor-pointer"
                  title="Pulihkan katalog asal Akademi AI"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="hidden sm:inline">Pulihkan Default</span>
                </button>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari tajuk / pengajar..."
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <select
                  value={selectedLevelFilter}
                  onChange={(e) => setSelectedLevelFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-neutral-900 border border-white/15 text-neutral-300 rounded text-xs font-mono focus:outline-none"
                >
                  <option value="all">Semua Tahap</option>
                  <option value="level_1">Tahap 1</option>
                  <option value="level_2">Tahap 2</option>
                  <option value="level_3">Tahap 3</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-neutral-900 border border-white/15 text-neutral-300 rounded text-xs font-mono focus:outline-none"
                >
                  <option value="all">Semua Harga</option>
                  <option value="free">Percuma</option>
                  <option value="paid">Berbayar</option>
                </select>
              </div>
            </div>

            {/* Courses Management Table / Card List */}
            <div className="border border-white/10 rounded-lg overflow-hidden bg-neutral-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121212] border-b border-white/10 text-neutral-400 font-mono uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Kursus &amp; Pengajar</th>
                      <th className="py-3 px-3">Tahap / Aras</th>
                      <th className="py-3 px-3">Lencana</th>
                      <th className="py-3 px-3">Harga</th>
                      <th className="py-3 px-3">Pelajaran</th>
                      <th className="py-3 px-4 text-right">Tindakan Pengurusan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* Course Title & Instructor */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={course.coverImage}
                              alt={course.title}
                              className="w-12 h-8 rounded object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-white truncate max-w-xs sm:max-w-md font-sans">
                                {course.title}
                              </div>
                              <div className="text-[11px] text-neutral-400 truncate">
                                {course.instructor.name} · {course.totalHours}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Level */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300">
                            {course.level === 'level_1' && 'Tahap 1'}
                            {course.level === 'level_2' && 'Tahap 2'}
                            {course.level === 'level_3' && 'Tahap 3'}
                          </span>
                          <span className="block text-[10px] text-neutral-500 font-sans mt-0.5">
                            {course.levelCategory}
                          </span>
                        </td>

                        {/* Badge */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            course.badge === 'PERCUMA'
                              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                              : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          }`}>
                            {course.badge || (course.isFree ? 'PERCUMA' : 'PREMIUM')}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-3 whitespace-nowrap font-mono">
                          {course.isFree ? (
                            <span className="text-emerald-400 font-bold">PERCUMA</span>
                          ) : (
                            <div>
                              <span className="text-white font-bold">RM{course.price}</span>
                              {course.originalPrice && course.originalPrice > course.price && (
                                <span className="text-neutral-500 line-through text-[10px] ml-1.5">
                                  RM{course.originalPrice}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Lessons & Modules */}
                        <td className="py-3 px-3 whitespace-nowrap text-neutral-400 font-mono text-[11px]">
                          {course.totalLessons} Pelajaran ({course.totalModules} Modul)
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Preview Video Player Modal */}
                            <button
                              type="button"
                              onClick={() => setPreviewVideoModalUrl({
                                url: formatEmbedVideoUrl(course.videoUrl || PRESET_VIDEOS[0].url),
                                title: course.title
                              })}
                              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
                              title="Tonton & Uji Video Kursus Ini"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                            </button>

                            {/* Toggle Free/Paid quick button */}
                            <button
                              type="button"
                              onClick={() => handleQuickToggleFree(course)}
                              className={`p-1.5 rounded border text-[10px] font-mono transition-colors cursor-pointer ${
                                course.isFree
                                  ? 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                                  : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50'
                              }`}
                              title={course.isFree ? 'Tukar kepada Berbayar' : 'Tukar kepada Percuma'}
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                            </button>

                            {/* Duplicate */}
                            <button
                              type="button"
                              onClick={() => handleDuplicateCourse(course)}
                              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                              title="Salin / Duplikasi Kursus Ini"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditForm(course)}
                              className="px-2.5 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase transition-all flex items-center gap-1 cursor-pointer"
                              title="Kemaskini Butiran Kursus & Pautan Video"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(course.id)}
                              className="p-1.5 rounded bg-neutral-900 hover:bg-red-950/50 text-neutral-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                              title="Padam Kursus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredCourses.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-neutral-500 font-mono text-xs">
                          Tiada kursus dijumpai sepadan dengan carian / tapisan anda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
              </>
            ) : (
              // ================= MODULES & SYLLABUS MANAGEMENT VIEW =================
              <div className="space-y-6">
                {/* Quick Stats Metrics for Modules */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Jumlah Modul Silibus</span>
                    <span className="font-['Oswald'] text-2xl font-bold text-white">{totalModulesCount} Modul</span>
                  </div>
                  <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Jumlah Pelajaran Video</span>
                    <span className="font-['Oswald'] text-2xl font-bold text-amber-400">{totalLessonsCount} Pelajaran</span>
                  </div>
                  <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Pecahan Mengikut Tahap</span>
                    <div className="text-xs font-mono text-neutral-300 flex items-center gap-1.5 mt-1 font-bold">
                      <span className="text-emerald-400">T1: {tahap1ModulesCount}</span>
                      <span>·</span>
                      <span className="text-blue-400">T2: {tahap2ModulesCount}</span>
                      <span>·</span>
                      <span className="text-purple-400">T3: {tahap3ModulesCount}</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-neutral-900/70 border border-white/10 rounded flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Status Silibus</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">Interaktif &amp; Boleh Disunting</span>
                  </div>
                </div>

                {/* Actions & Filters Toolbar for Modules */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Add New Module Button */}
                    <button
                      type="button"
                      onClick={() => onOpenAddModuleModal?.()}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all rounded shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Tambah Modul Baharu</span>
                    </button>

                    {onResetModulesToDefault && (
                      <button
                        type="button"
                        onClick={() => {
                          onResetModulesToDefault();
                          setToastMessage('Silibus modul dipulihkan kepada tetapan asal.');
                        }}
                        className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-colors rounded flex items-center gap-1.5 cursor-pointer"
                        title="Pulihkan silibus asal Akademi AI"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="hidden sm:inline">Pulihkan Silibus Asal</span>
                      </button>
                    )}
                  </div>

                  {/* Search & Level Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                      <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={moduleSearchQuery}
                        onChange={(e) => setModuleSearchQuery(e.target.value)}
                        placeholder="Cari modul / tajuk pelajaran..."
                        className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-white/15 text-white rounded text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1 bg-black p-0.5 border border-white/15 rounded text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setModuleLevelFilter('all')}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${moduleLevelFilter === 'all' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Semua
                      </button>
                      <button
                        type="button"
                        onClick={() => setModuleLevelFilter('level_1')}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${moduleLevelFilter === 'level_1' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Tahap 1
                      </button>
                      <button
                        type="button"
                        onClick={() => setModuleLevelFilter('level_2')}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${moduleLevelFilter === 'level_2' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Tahap 2
                      </button>
                      <button
                        type="button"
                        onClick={() => setModuleLevelFilter('level_3')}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${moduleLevelFilter === 'level_3' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Tahap 3
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modules Grid / Cards */}
                <div className="space-y-4">
                  {filteredModules.map((mod, modIdx) => (
                    <div
                      key={mod.id}
                      className="bg-[#121212] border border-white/15 rounded-lg overflow-hidden shadow-lg transition-all hover:border-amber-400/40"
                    >
                      {/* Module Card Header */}
                      <div className="p-4 bg-gradient-to-r from-neutral-900 to-[#181818] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-black uppercase">
                              MODUL 0{modIdx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white uppercase border border-white/20">
                              {mod.level === 'level_1' && 'Tahap 1 (Pemula)'}
                              {mod.level === 'level_2' && 'Tahap 2 (Pengamal)'}
                              {mod.level === 'level_3' && 'Tahap 3 (Mahir)'}
                            </span>
                            <span className="text-xs text-neutral-400 font-mono">
                              {mod.lessons.length} Pelajaran Video
                            </span>
                          </div>
                          <h4 className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase text-white tracking-wide truncate">
                            {mod.title}
                          </h4>
                          {mod.description && (
                            <p className="text-xs text-neutral-400 line-clamp-2 font-sans max-w-3xl">
                              {mod.description}
                            </p>
                          )}
                        </div>

                        {/* Top Module Actions: Edit & Delete */}
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <button
                            type="button"
                            onClick={() => onOpenEditModuleModal?.(mod)}
                            className="px-3 py-1.5 bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black border border-amber-400/40 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow"
                            title={`Edit ${mod.title} dan pautan videonya`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Modul &amp; Video</span>
                          </button>

                          {onDeleteModule && (
                            <button
                              type="button"
                              onClick={() => setDeleteModuleConfirmId(mod.id)}
                              className="p-1.5 bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 border border-white/10 rounded transition-colors cursor-pointer"
                              title="Padam modul ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Module Lessons List */}
                      <div className="p-4 space-y-2.5 bg-black/40">
                        <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block">
                          Senarai Pelajaran &amp; Pautan Video:
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div
                              key={lesson.id}
                              className="p-3 bg-neutral-900/90 border border-white/10 rounded flex flex-col justify-between gap-2 hover:border-white/20 transition-all"
                            >
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                                  <span className="text-amber-400 font-bold">Pelajaran {lIdx + 1}</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-neutral-500" />
                                    <span>{lesson.duration}</span>
                                  </span>
                                </div>
                                <div className="text-xs font-bold text-white truncate font-sans">
                                  {lesson.title}
                                </div>
                                {lesson.summary && (
                                  <div className="text-[11px] text-neutral-400 line-clamp-1 font-sans">
                                    {lesson.summary}
                                  </div>
                                )}
                              </div>

                              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 truncate max-w-[170px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                                  <span className="truncate">{lesson.videoUrl || 'Pautan Video'}</span>
                                </div>

                                {lesson.videoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewVideoModalUrl({
                                      url: formatEmbedVideoUrl(lesson.videoUrl),
                                      title: `${mod.title} - ${lesson.title}`
                                    })}
                                    className="px-2 py-1 bg-white/10 hover:bg-amber-400 hover:text-black text-neutral-300 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                                  >
                                    <Play className="w-2.5 h-2.5 fill-current" />
                                    <span>Pratonton</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => onOpenEditModuleModal?.(mod)}
                            className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>+ Tambah / Susun Pelajaran Dalam Modul Ini</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredModules.length === 0 && (
                    <div className="py-12 text-center space-y-3 bg-neutral-900/40 border border-white/10 rounded-lg">
                      <Layers className="w-8 h-8 text-neutral-500 mx-auto" />
                      <div className="text-sm font-bold text-neutral-300">Tiada modul dijumpai</div>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto font-sans">
                        Tiada silibus yang sepadan dengan tapisan tahap atau kata carian anda.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Video Preview Modal Overlay for Admin */}
        {previewVideoModalUrl && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="max-w-3xl w-full bg-[#111111] border border-amber-400/40 p-5 rounded-lg space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-amber-400 text-black flex items-center justify-center font-bold">
                    <Play className="w-4 h-4 fill-black" />
                  </div>
                  <div>
                    <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white tracking-wide truncate max-w-md sm:max-w-xl">
                      {previewVideoModalUrl.title}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Ujian Pemain Video Pembelajaran
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewVideoModalUrl(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded overflow-hidden bg-black border border-white/20 shadow-xl">
                <iframe
                  src={previewVideoModalUrl.url}
                  title={previewVideoModalUrl.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1">
                <span className="truncate max-w-sm sm:max-w-lg">{previewVideoModalUrl.url}</span>
                <button
                  onClick={() => setPreviewVideoModalUrl(null)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase rounded transition-colors cursor-pointer"
                >
                  Tutup Video
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal Overlay */}
        {deleteConfirmId && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="max-w-sm w-full bg-[#121212] border border-red-500/30 p-5 rounded space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-red-400 font-['Oswald'] font-bold text-lg uppercase">
                <AlertCircle className="w-5 h-5" />
                <span>Sahkan Padam Kursus</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans">
                Adakah anda pasti ingin memadam kursus ini daripada katalog Akademi AI? Tindakan ini tidak boleh diundur.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-mono rounded"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    onDeleteCourse(deleteConfirmId);
                    setDeleteConfirmId(null);
                    setToastMessage('Kursus berjaya dipadam daripada katalog.');
                  }}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-sans font-bold uppercase rounded"
                >
                  Padam Kursus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Module Confirmation Modal Overlay */}
        {deleteModuleConfirmId && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="max-w-sm w-full bg-[#121212] border border-red-500/30 p-5 rounded space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-red-400 font-['Oswald'] font-bold text-lg uppercase">
                <AlertCircle className="w-5 h-5" />
                <span>Sahkan Padam Modul Silibus</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans">
                Adakah anda pasti ingin memadam modul ini berserta semua pelajaran videonya? Tindakan ini tidak boleh diundur.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setDeleteModuleConfirmId(null)}
                  className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-mono rounded cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (onDeleteModule) {
                      onDeleteModule(deleteModuleConfirmId);
                    }
                    setDeleteModuleConfirmId(null);
                    setToastMessage('Modul silibus berjaya dipadam.');
                  }}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-sans font-bold uppercase rounded cursor-pointer"
                >
                  Padam Modul
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal Overlay */}
        {showResetConfirm && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="max-w-sm w-full bg-[#121212] border border-amber-500/30 p-5 rounded space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-amber-400 font-['Oswald'] font-bold text-lg uppercase">
                <RefreshCw className="w-5 h-5" />
                <span>Pulihkan Katalog Lalai</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans">
                Tindakan ini akan mengembalikan senarai asal kursus rasmi Akademi AI dan memadam sebarang kursus ujian tersuai.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-mono rounded"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    onResetCoursesToDefault();
                    setShowResetConfirm(false);
                    setToastMessage('Katalog berjaya dipulihkan kepada tetapan asal.');
                  }}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-sans font-bold uppercase rounded"
                >
                  Pulihkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
