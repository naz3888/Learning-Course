import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Award,
  Crown,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Tag,
  Download,
  RefreshCw,
  LogOut,
  Eye,
  Check,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Layers,
  Calendar,
  CreditCard,
  UserCheck,
  UserPlus,
  Play,
  RotateCcw,
  Sliders,
  FileSpreadsheet
} from 'lucide-react';
import { StoreCourse, CourseLevel, Module, StudentRecord, AdminTransaction, VoucherStats, AdminAuditLog } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AdminDashboardSectionProps {
  courses: StoreCourse[];
  modules: Module[];
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
  onAddCourse: (newCourse: StoreCourse) => void;
  onUpdateCourse: (updatedCourse: StoreCourse) => void;
  onDeleteCourse: (courseId: string) => void;
  onResetCoursesToDefault: () => void;
  onOpenEditModuleModal: (mod: Module) => void;
  onOpenAddModuleModal: () => void;
  onDeleteModule: (moduleId: string) => void;
  onResetModulesToDefault: () => void;
  onSwitchToStudentView: () => void;
  currentStudentProgress?: {
    userName: string;
    completedLessons: string[];
    enrolledCourses?: string[];
    isVip?: boolean;
    quizScores?: { [level in CourseLevel]?: number };
  };
  onOpenCourseEditor?: (course?: StoreCourse) => void;
}

// Initial Mock Students Dataset combined with live student
const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-001',
    name: 'Ahmad Faiz bin Zulkifli',
    email: 'ahmad.faiz@gmail.com',
    joinDate: '15 Okt 2026',
    enrolledCourseIds: ['course-tahap-1', 'course-prompt-crtf', 'course-lora-finetuning'],
    completedLessonsCount: 8,
    quizScores: { level_1: 92, level_2: 85 },
    isVip: true,
    certificatesEarned: ['level_1'],
    lastActive: '5 minit lepas',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    notesCount: 14
  },
  {
    id: 'std-002',
    name: 'Nurul Hidayah binti Razak',
    email: 'hidayah.razak@petronas.com.my',
    joinDate: '18 Okt 2026',
    enrolledCourseIds: ['course-tahap-1', 'course-rag-agentic'],
    completedLessonsCount: 12,
    quizScores: { level_1: 96 },
    isVip: true,
    certificatesEarned: ['level_1'],
    lastActive: '23 minit lepas',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    notesCount: 21
  },
  {
    id: 'std-003',
    name: 'Mohd Danial bin Khairul',
    email: 'danial.k@techinnovate.my',
    joinDate: '20 Okt 2026',
    enrolledCourseIds: ['course-lora-finetuning', 'course-multimodal-gemini'],
    completedLessonsCount: 6,
    quizScores: { level_2: 78 },
    isVip: false,
    certificatesEarned: [],
    lastActive: '2 jam lepas',
    notesCount: 5
  },
  {
    id: 'std-004',
    name: 'Siti Sarah binti Mansor',
    email: 'siti.sarah@mimos.gov.my',
    joinDate: '22 Okt 2026',
    enrolledCourseIds: ['course-tahap-1', 'course-prompt-crtf', 'course-rag-agentic', 'course-lora-finetuning'],
    completedLessonsCount: 15,
    quizScores: { level_1: 100, level_2: 90, level_3: 88 },
    isVip: true,
    certificatesEarned: ['level_1', 'level_2'],
    lastActive: '1 hari lepas',
    notesCount: 32
  },
  {
    id: 'std-005',
    name: 'Tan Wei Loon',
    email: 'weiloon.tan@fintechcorp.asia',
    joinDate: '24 Okt 2026',
    enrolledCourseIds: ['course-tahap-1'],
    completedLessonsCount: 3,
    quizScores: {},
    isVip: false,
    certificatesEarned: [],
    lastActive: '4 jam lepas',
    notesCount: 2
  },
  {
    id: 'std-006',
    name: 'Pravin a/l Chandran',
    email: 'pravin.chandran@ai-startup.io',
    joinDate: '25 Okt 2026',
    enrolledCourseIds: ['course-tahap-1', 'course-lora-finetuning'],
    completedLessonsCount: 9,
    quizScores: { level_1: 88 },
    isVip: false,
    certificatesEarned: ['level_1'],
    lastActive: 'Semalam',
    notesCount: 8
  }
];

// Initial Transactions Dataset
const INITIAL_TRANSACTIONS: AdminTransaction[] = [
  {
    id: 'TXN-9021',
    studentName: 'Ahmad Faiz bin Zulkifli',
    studentEmail: 'ahmad.faiz@gmail.com',
    courseTitles: ['Langganan Bulanan VIP All-Access'],
    amount: 48,
    discountAmount: 50,
    promoCodeUsed: 'FIRSTUSER50',
    paymentMethod: 'fpx',
    date: '27 Okt 2026, 08:30 PM',
    status: 'completed'
  },
  {
    id: 'TXN-9020',
    studentName: 'Nurul Hidayah binti Razak',
    studentEmail: 'hidayah.razak@petronas.com.my',
    courseTitles: ['Mastering LoRA Fine-Tuning LLM & SLM'],
    amount: 149,
    discountAmount: 50,
    promoCodeUsed: 'FIRSTUSER50',
    paymentMethod: 'card',
    date: '27 Okt 2026, 05:14 PM',
    status: 'completed'
  },
  {
    id: 'TXN-9019',
    studentName: 'Mohd Danial bin Khairul',
    studentEmail: 'danial.k@techinnovate.my',
    courseTitles: ['RAG Lanjutan & Agentic Workflow'],
    amount: 149,
    discountAmount: 0,
    paymentMethod: 'tng',
    date: '27 Okt 2026, 02:40 PM',
    status: 'completed'
  },
  {
    id: 'TXN-9018',
    studentName: 'Siti Sarah binti Mansor',
    studentEmail: 'siti.sarah@mimos.gov.my',
    courseTitles: ['Pakej Kombo Semua Tahap (1 + 2 + 3)'],
    amount: 278,
    discountAmount: 120,
    promoCodeUsed: 'KOMBO120',
    paymentMethod: 'fpx',
    date: '26 Okt 2026, 11:20 AM',
    status: 'completed'
  },
  {
    id: 'TXN-9017',
    studentName: 'Muhammad Harith',
    studentEmail: 'harith.student@uitm.edu.my',
    courseTitles: ['Tahap 1: Asas Kecerdasan Buatan'],
    amount: 0,
    discountAmount: 99,
    promoCodeUsed: 'PERCUMA100',
    paymentMethod: 'fpx',
    date: '26 Okt 2026, 09:10 AM',
    status: 'completed'
  },
  {
    id: 'TXN-9016',
    studentName: 'Tan Wei Loon',
    studentEmail: 'weiloon.tan@fintechcorp.asia',
    courseTitles: ['Langganan Bulanan VIP All-Access'],
    amount: 98,
    discountAmount: 0,
    paymentMethod: 'card',
    date: '25 Okt 2026, 04:55 PM',
    status: 'completed'
  }
];

// Initial Vouchers Dataset
const INITIAL_VOUCHERS: VoucherStats[] = [
  {
    code: 'FIRSTUSER50',
    description: 'Baucar RM50 Pengguna Pertama Kali',
    discountType: 'fixed',
    discountValue: 50,
    usageCount: 84,
    totalSavingsGiven: 4200,
    quota: 100,
    isActive: true
  },
  {
    code: 'KOMBO120',
    description: 'Potongan RM120 Pakej Kombo Semua Tahap',
    discountType: 'fixed',
    discountValue: 120,
    usageCount: 32,
    totalSavingsGiven: 3840,
    quota: 50,
    isActive: true
  },
  {
    code: 'PERCUMA100',
    description: 'Tajaan Penuh 100% CSR Pelajar IPT / Asnaf',
    discountType: 'full',
    discountValue: 100,
    usageCount: 24,
    totalSavingsGiven: 2376,
    quota: 30,
    isActive: true
  },
  {
    code: 'VIP98',
    description: 'Rebat Promosi Ahli VIP Bulanan',
    discountType: 'fixed',
    discountValue: 20,
    usageCount: 45,
    totalSavingsGiven: 900,
    quota: 150,
    isActive: true
  }
];

// Initial Audit Logs Dataset
const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '27 Okt 2026, 08:30 PM',
    action: 'Pendaftaran VIP Selesai',
    actor: 'Ahmad Faiz (Pelajar)',
    details: 'Melanggan Pelan VIP All-Access RM98 dengan baucar FIRSTUSER50.',
    type: 'finance'
  },
  {
    id: 'LOG-002',
    timestamp: '27 Okt 2026, 07:15 PM',
    action: 'Kuiz Tahap Diselesaikan',
    actor: 'Siti Sarah (Pelajar)',
    details: 'Menamatkan Kuiz Tahap 2: Pengamal dengan markah 90%. Sijil dijana.',
    type: 'student'
  },
  {
    id: 'LOG-003',
    timestamp: '27 Okt 2026, 04:45 PM',
    action: 'Kemas Kini Kursus Disimpan',
    actor: 'admin@akademiai.my',
    details: 'Mengemaskini pautan video dan silibus "Mastering LoRA Fine-Tuning".',
    type: 'course'
  },
  {
    id: 'LOG-004',
    timestamp: '27 Okt 2026, 01:20 PM',
    action: 'Tuntutan Baucar Baru',
    actor: 'Nurul Hidayah (Pelajar)',
    details: 'Menebus baucar FIRSTUSER50 untuk checkout pembelian kursus.',
    type: 'finance'
  },
  {
    id: 'LOG-005',
    timestamp: '26 Okt 2026, 10:00 AM',
    action: 'Modul Silibus Diterbitkan',
    actor: 'admin@akademiai.my',
    details: 'Menerbitkan Modul 03: Ejen AI & RAG untuk Tahap Lanjutan.',
    type: 'course'
  }
];

export const AdminDashboardSection: React.FC<AdminDashboardSectionProps> = ({
  courses,
  modules,
  isAdminLoggedIn,
  onAdminLogout,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onResetCoursesToDefault,
  onOpenEditModuleModal,
  onOpenAddModuleModal,
  onDeleteModule,
  onResetModulesToDefault,
  onSwitchToStudentView,
  currentStudentProgress,
  onOpenCourseEditor
}) => {
  const { t, isEn } = useLanguage();

  // Internal Navigation Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses' | 'orders' | 'vouchers' | 'audit'>('overview');

  // State for students management
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('akademi_ai_admin_students_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_STUDENTS;
  });

  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'vip' | 'certified' | 'in_progress'>('all');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRecord | null>(null);

  // State for transactions
  const [transactions, setTransactions] = useState<AdminTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('akademi_ai_admin_transactions_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TRANSACTIONS;
  });
  const [transactionSearch, setTransactionSearch] = useState('');

  // State for vouchers
  const [vouchers, setVouchers] = useState<VoucherStats[]>(() => {
    try {
      const saved = localStorage.getItem('akademi_ai_admin_vouchers_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_VOUCHERS;
  });

  // State for audit logs
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('akademi_ai_admin_logs_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_AUDIT_LOGS;
  });

  // Course manager sub-filters
  const [courseSearch, setCourseSearch] = useState('');
  const [courseLevelFilter, setCourseLevelFilter] = useState<'all' | CourseLevel>('all');
  const [coursePricingFilter, setCoursePricingFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Sync live student progress into students list if exists
  useEffect(() => {
    if (currentStudentProgress && currentStudentProgress.userName) {
      setStudents(prev => {
        const index = prev.findIndex(s => s.name.toLowerCase() === currentStudentProgress.userName.toLowerCase());
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            completedLessonsCount: currentStudentProgress.completedLessons.length,
            enrolledCourseIds: currentStudentProgress.enrolledCourses || updated[index].enrolledCourseIds,
            isVip: currentStudentProgress.isVip ?? updated[index].isVip,
            quizScores: currentStudentProgress.quizScores || updated[index].quizScores,
            lastActive: 'Sekarang (Aktif)'
          };
          return updated;
        }
        return prev;
      });
    }
  }, [currentStudentProgress]);

  // Save student updates to localStorage
  const saveStudents = (updated: StudentRecord[]) => {
    setStudents(updated);
    try {
      localStorage.setItem('akademi_ai_admin_students_v1', JSON.stringify(updated));
    } catch (e) {}
  };

  // Add audit log helper
  const addAuditLog = (action: string, actor: string, details: string, type: 'course' | 'student' | 'finance' | 'system') => {
    const newLog: AdminAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action,
      actor,
      details,
      type
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    try {
      localStorage.setItem('akademi_ai_admin_logs_v1', JSON.stringify(updated));
    } catch (e) {}
  };

  // Student Actions
  const handleToggleStudentVip = (studentId: string) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        const nextVip = !s.isVip;
        addAuditLog(
          nextVip ? 'Pemberian Status VIP' : 'Pembatalan VIP',
          'admin@akademiai.my',
          `${nextVip ? 'Memberikan' : 'Membatalkan'} status Keahlian VIP All-Access untuk ${s.name}.`,
          'student'
        );
        return { ...s, isVip: nextVip };
      }
      return s;
    });
    saveStudents(updated);
    if (selectedStudentForModal && selectedStudentForModal.id === studentId) {
      setSelectedStudentForModal(prev => prev ? { ...prev, isVip: !prev.isVip } : null);
    }
  };

  const handleResetStudentProgress = (studentId: string) => {
    if (!window.confirm(isEn ? 'Are you sure you want to reset this student\'s progress?' : 'Adakah anda pasti ingin mengeset semula kemajuan pembelajaran pelajar ini?')) {
      return;
    }
    const updated = students.map(s => {
      if (s.id === studentId) {
        addAuditLog(
          'Kemajuan Pelajar Direset',
          'admin@akademiai.my',
          `Mengeset semula kemajuan pembelajaran bagi pelajar ${s.name}.`,
          'student'
        );
        return { ...s, completedLessonsCount: 0, quizScores: {}, certificatesEarned: [] };
      }
      return s;
    });
    saveStudents(updated);
  };

  const handleGrantCertificate = (studentId: string, level: CourseLevel) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        const existing = s.certificatesEarned || [];
        if (!existing.includes(level)) {
          addAuditLog(
            'Pengeluaran Sijil Rasmi',
            'admin@akademiai.my',
            `Mengeluarkan Sijil Pengesahan Tahap (${level}) untuk pelajar ${s.name}.`,
            'student'
          );
          return { ...s, certificatesEarned: [...existing, level] };
        }
      }
      return s;
    });
    saveStudents(updated);
  };

  // Toggle Voucher status
  const handleToggleVoucher = (code: string) => {
    const updated = vouchers.map(v => {
      if (v.code === code) {
        const nextState = !v.isActive;
        addAuditLog(
          nextState ? 'Baucar Diaktifkan' : 'Baucar Dinyahaktifkan',
          'admin@akademiai.my',
          `Status baucar ${v.code} ditukar kepada ${nextState ? 'Aktif' : 'Nyahaktif'}.`,
          'finance'
        );
        return { ...v, isActive: nextState };
      }
      return v;
    });
    setVouchers(updated);
    try {
      localStorage.setItem('akademi_ai_admin_vouchers_v1', JSON.stringify(updated));
    } catch (e) {}
  };

  // Export CSV Report
  const handleExportTransactionsCSV = () => {
    const headers = ['ID Pesanan', 'Nama Pelajar', 'Emel', 'Kursus / Pakej', 'Kaedah Bayaran', 'Kod Promo', 'Diskaun (RM)', 'Jumlah Bayar (RM)', 'Tarikh', 'Status'];
    const rows = transactions.map(t => [
      t.id,
      `"${t.studentName}"`,
      t.studentEmail,
      `"${t.courseTitles.join(' + ')}"`,
      t.paymentMethod.toUpperCase(),
      t.promoCodeUsed || 'TIADA',
      t.discountAmount.toFixed(2),
      t.amount.toFixed(2),
      `"${t.date}"`,
      t.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `laporan_transaksi_akademi_ai_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.email.toLowerCase().includes(studentSearch.toLowerCase());
      if (!matchSearch) return false;

      if (studentFilter === 'vip') return s.isVip;
      if (studentFilter === 'certified') return s.certificatesEarned && s.certificatesEarned.length > 0;
      if (studentFilter === 'in_progress') return s.completedLessonsCount > 0;
      return true;
    });
  }, [students, studentSearch, studentFilter]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
                          c.instructor.name.toLowerCase().includes(courseSearch.toLowerCase());
      if (!matchSearch) return false;
      if (courseLevelFilter !== 'all' && c.level !== courseLevelFilter) return false;
      if (coursePricingFilter === 'free' && !c.isFree) return false;
      if (coursePricingFilter === 'paid' && c.isFree) return false;
      return true;
    });
  }, [courses, courseSearch, courseLevelFilter, coursePricingFilter]);

  // Metrics Calculations
  const totalRevenue = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0) + 38200; // Base historical + recent
  }, [transactions]);

  const totalEnrollments = useMemo(() => {
    return students.reduce((sum, s) => sum + s.enrolledCourseIds.length, 0) + 1850;
  }, [students]);

  const vipCount = useMemo(() => {
    return students.filter(s => s.isVip).length + 188;
  }, [students]);

  const totalCompletedLessons = useMemo(() => {
    return students.reduce((sum, s) => sum + s.completedLessonsCount, 0);
  }, [students]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* =========================================================================
          TOP ADMIN BANNER & CONTROLS
      ========================================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#141208] via-[#1a1708] to-[#0e0d05] border border-amber-400/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-black font-mono text-xs font-black uppercase tracking-wider shadow">
                <ShieldCheck className="w-4 h-4 fill-black text-black" />
                <span>{isEn ? 'ADMIN CMS & MONITORING ACTIVE' : 'PUSAT KAWALAN PENTADBIR AKTIF'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-white/15 text-neutral-300 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>admin@akademiai.my</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 text-neutral-300 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Masa Nyata 2026</span>
              </span>
            </div>

            <h1 className="font-['Oswald'] text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-tight">
              {isEn ? 'CENTRAL ADMIN MONITORING & MANAGEMENT HUB' : 'PUSAT KAWALAN & PEMANTAUAN PENTADBIR'}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {isEn
                ? 'Comprehensive monitoring console to supervise student progression, track financial transactions, manage courses & curriculum syllabi, audit system events, and configure voucher campaigns.'
                : 'Papan pemuka pengurusan komprehensif untuk memantau kemajuan pelajar, memeriksa aliran hasil & transaksi, mengurus kandungan modul & silibus, serta mengaudit aktiviti sistem secara masa nyata.'}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onSwitchToStudentView}
              className="px-4 py-2.5 bg-white text-black font-bold uppercase text-xs font-mono tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow cursor-pointer"
              title={isEn ? 'View Portal as Student' : 'Buka Paparan Portal Pelajar'}
            >
              <Eye className="w-4 h-4" />
              <span>{isEn ? 'Student Portal View' : 'Paparan Pelajar'}</span>
            </button>

            {onOpenCourseEditor && (
              <button
                onClick={() => onOpenCourseEditor()}
                className="px-4 py-2.5 bg-amber-400 text-black font-black uppercase text-xs font-mono tracking-wider hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                title={isEn ? 'Create New Course' : 'Cipta Kursus Baru'}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{isEn ? '+ New Course' : '+ Tambah Kursus'}</span>
              </button>
            )}

            <button
              onClick={onAdminLogout}
              className="px-3.5 py-2.5 bg-neutral-900 border border-white/20 text-neutral-300 hover:text-red-400 hover:border-red-500/50 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isEn ? 'Log Out From Admin' : 'Log Keluar Dari Mod Admin'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isEn ? 'Exit Admin' : 'Keluar'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Ticker Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs font-mono">
          <div className="bg-black/50 border border-white/10 p-3 rounded-none">
            <span className="text-neutral-400 text-[10px] uppercase block">{isEn ? 'Estimated Revenue' : 'Anggaran Jumlah Hasil'}</span>
            <div className="text-xl font-bold font-['Oswald'] text-amber-400 mt-0.5">
              RM {totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400">↑ +18.4% bulan ini</span>
          </div>

          <div className="bg-black/50 border border-white/10 p-3 rounded-none">
            <span className="text-neutral-400 text-[10px] uppercase block">{isEn ? 'Active Students' : 'Pelajar Berdaftar'}</span>
            <div className="text-xl font-bold font-['Oswald'] text-white mt-0.5">
              1,428 <span className="text-xs text-neutral-400 font-sans">pelajar</span>
            </div>
            <span className="text-[10px] text-emerald-400">● 218 aktif hari ini</span>
          </div>

          <div className="bg-black/50 border border-white/10 p-3 rounded-none">
            <span className="text-neutral-400 text-[10px] uppercase block">{isEn ? 'Total Enrollments' : 'Pendaftaran Kursus'}</span>
            <div className="text-xl font-bold font-['Oswald'] text-white mt-0.5">
              {totalEnrollments.toLocaleString()} <span className="text-xs text-neutral-400 font-sans">modul</span>
            </div>
            <span className="text-[10px] text-blue-400">{courses.length} kursus aktif</span>
          </div>

          <div className="bg-black/50 border border-white/10 p-3 rounded-none">
            <span className="text-neutral-400 text-[10px] uppercase block">{isEn ? 'VIP All-Access MRR' : 'Langganan VIP MRR'}</span>
            <div className="text-xl font-bold font-['Oswald'] text-emerald-400 mt-0.5">
              RM {(vipCount * 98).toLocaleString()}
            </div>
            <span className="text-[10px] text-amber-400 font-bold">{vipCount} ahli VIP aktif</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN ADMIN NAVIGATION TABS
      ========================================================================== */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/15 text-xs font-mono uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'overview'
              ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
              : 'bg-[#111] text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isEn ? '1. Overview & KPIs' : '1. Ringkasan & Metrik'}</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'students'
              ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
              : 'bg-[#111] text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{isEn ? `2. Students (${students.length})` : `2. Pantau Pelajar (${students.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'courses'
              ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
              : 'bg-[#111] text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isEn ? `3. Courses CMS (${courses.length})` : `3. Urus Kursus & Silibus (${courses.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'orders'
              ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
              : 'bg-[#111] text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{isEn ? `4. Orders (${transactions.length})` : `4. Transaksi & Pesanan (${transactions.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('vouchers')}
          className={`px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'vouchers'
              ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
              : 'bg-[#111] text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>{isEn ? `5. Vouchers (${vouchers.length})` : `5. Baucar & Promosi (${vouchers.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'audit'
              ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
              : 'bg-[#111] text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{isEn ? `6. Audit Trail (${auditLogs.length})` : `6. Log Aktiviti (${auditLogs.length})`}</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: OVERVIEW & ANALYTICS
      ========================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Revenue Breakdown & Enrollment Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Monthly Revenue Chart Simulator (8 cols) */}
            <div className="lg:col-span-8 bg-[#0e0e0e] border border-white/10 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Prestasi Aliran Tunai 2026</span>
                  <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
                    {isEn ? 'Monthly Revenue Analytics (RM)' : 'Aliran Pendapatan Bulanan (RM)'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="w-3 h-3 bg-amber-400 inline-block" />
                  <span>Jualan Kursus</span>
                  <span className="w-3 h-3 bg-emerald-400 inline-block ml-2" />
                  <span>VIP Subscriptions</span>
                </div>
              </div>

              {/* Visual Tailwind Bar Graph */}
              <div className="pt-4 space-y-4">
                {[
                  { month: 'Jan', courseSales: 22000, vipSales: 6800, total: 28800 },
                  { month: 'Feb', courseSales: 24500, vipSales: 9400, total: 33900 },
                  { month: 'Mac', courseSales: 26000, vipSales: 11200, total: 37200 },
                  { month: 'Apr', courseSales: 25200, vipSales: 12500, total: 37700 },
                  { month: 'Mei', courseSales: 28900, vipSales: 14100, total: 43000 },
                  { month: 'Jun', courseSales: 31000, vipSales: 15400, total: 46400 },
                  { month: 'Jul', courseSales: 33200, vipSales: 16800, total: 50000 },
                  { month: 'Ogo', courseSales: 35100, vipSales: 17500, total: 52600 },
                  { month: 'Sep', courseSales: 36800, vipSales: 18200, total: 55000 },
                  { month: 'Okt (Semasa)', courseSales: 38400, vipSales: 19000, total: 57400, isCurrent: true }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={item.isCurrent ? 'text-amber-400 font-bold' : 'text-neutral-300'}>{item.month}</span>
                      <span className="text-white font-bold">RM {item.total.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-900 overflow-hidden flex rounded-none">
                      <div
                        className="h-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${(item.courseSales / 60000) * 100}%` }}
                        title={`Kursus: RM ${item.courseSales.toLocaleString()}`}
                      />
                      <div
                        className="h-full bg-emerald-400 transition-all duration-500"
                        style={{ width: `${(item.vipSales / 60000) * 100}%` }}
                        title={`VIP: RM ${item.vipSales.toLocaleString()}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Distribution & Popularity (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Level breakdown */}
              <div className="bg-[#0e0e0e] border border-white/10 p-6 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Pecahan Pelajar</span>
                <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white">
                  {isEn ? 'Students by Level' : 'Pecahan Mengikut Tahap'}
                </h4>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-white">Tahap 1: Pemula</span>
                      <span className="text-amber-400 font-bold">48% (685 pelajar)</span>
                    </div>
                    <div className="h-2 bg-neutral-900">
                      <div className="h-full bg-amber-400 w-[48%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-white">Tahap 2: Pengamal</span>
                      <span className="text-emerald-400 font-bold">34% (485 pelajar)</span>
                    </div>
                    <div className="h-2 bg-neutral-900">
                      <div className="h-full bg-emerald-400 w-[34%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-white">Tahap 3: Mahir</span>
                      <span className="text-purple-400 font-bold">18% (258 pelajar)</span>
                    </div>
                    <div className="h-2 bg-neutral-900">
                      <div className="h-full bg-purple-400 w-[18%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-neutral-400 font-sans leading-relaxed">
                  Purata kadar kelulusan kuiz ialah <strong className="text-white">84.6%</strong> dan seramai <strong className="text-emerald-400">318 sijil pengiktirafan rasmi</strong> telah dikeluarkan secara digital.
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-gradient-to-br from-[#121008] to-[#0a0a0a] border border-amber-400/30 p-6 space-y-3">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider block">Aksi Pentadbir Cepat</span>
                <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white">
                  Pengurusan Segera
                </h4>
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => setActiveTab('students')}
                    className="w-full p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-mono text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Semak Pelajar Aktif Terkini</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-mono text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Lihat Transaksi Jualan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('vouchers')}
                    className="w-full p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-mono text-left flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Status & Had Kupon Diskaun</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Most Popular Courses List */}
          <div className="bg-[#0e0e0e] border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Katalog Paling Diminati</span>
                <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
                  {isEn ? 'Top Performing Courses' : 'Kedudukan Kursus Terlaris & Paling Popular'}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-mono text-neutral-300 hover:text-white underline cursor-pointer"
              >
                Urus Semua ({courses.length}) &rarr;
              </button>
            </div>

            <div className="divide-y divide-white/10">
              {courses.slice(0, 5).map((course, idx) => (
                <div key={course.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-lg font-black text-amber-400 w-6 text-center">
                      0{idx + 1}
                    </span>
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-14 h-9 object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-sans font-bold text-sm text-white truncate">{course.title}</h4>
                      <p className="text-xs text-neutral-400 truncate">{course.instructor.name} · {course.totalLessons} Pelajaran · {course.totalHours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <div className="text-right">
                      <span className="text-amber-400 font-bold block">{course.studentsCount} Pelajar</span>
                      <span className="text-neutral-400">{course.isFree ? 'PERCUMA' : `RM ${course.price}.00`}</span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('courses');
                        setCourseSearch(course.title);
                      }}
                      className="px-3 py-1.5 bg-neutral-900 border border-white/15 text-neutral-200 hover:text-white hover:border-white text-xs cursor-pointer"
                    >
                      Urus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: STUDENT MONITORING HUB
      ========================================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/10 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder={isEn ? 'Search student by name or email...' : 'Cari pelajar mengikut nama atau emel...'}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#141414] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-1 text-xs font-mono">
                <button
                  onClick={() => setStudentFilter('all')}
                  className={`px-3 py-1.5 border cursor-pointer ${
                    studentFilter === 'all' ? 'bg-white text-black border-white font-bold' : 'bg-neutral-900 text-neutral-400 border-white/10'
                  }`}
                >
                  Semua ({students.length})
                </button>
                <button
                  onClick={() => setStudentFilter('vip')}
                  className={`px-3 py-1.5 border cursor-pointer ${
                    studentFilter === 'vip' ? 'bg-amber-400 text-black border-amber-400 font-bold' : 'bg-neutral-900 text-neutral-400 border-white/10'
                  }`}
                >
                  VIP Sahaja
                </button>
                <button
                  onClick={() => setStudentFilter('certified')}
                  className={`px-3 py-1.5 border cursor-pointer ${
                    studentFilter === 'certified' ? 'bg-emerald-400 text-black border-emerald-400 font-bold' : 'bg-neutral-900 text-neutral-400 border-white/10'
                  }`}
                >
                  Bersijil
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              Memaparkan <strong className="text-white">{filteredStudents.length}</strong> daripada {students.length} pelajar
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-[#0e0e0e] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#141414] border-b border-white/10 text-neutral-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Pelajar</th>
                  <th className="p-3.5">Status Keahlian</th>
                  <th className="p-3.5">Kursus Berdaftar</th>
                  <th className="p-3.5">Kemajuan Pelajaran</th>
                  <th className="p-3.5">Skor Kuiz</th>
                  <th className="p-3.5">Sijil</th>
                  <th className="p-3.5">Aktif Terakhir</th>
                  <th className="p-3.5 text-right">Tindakan Pantas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Student Info */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-bold flex items-center justify-center shrink-0">
                          {std.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{std.name}</div>
                          <div className="text-neutral-400 text-[11px] font-mono">{std.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* VIP Status */}
                    <td className="p-3.5">
                      {std.isVip ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold">
                          <Crown className="w-3 h-3 fill-amber-400" />
                          VIP ALL-ACCESS
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 border border-white/10">
                          Pelajar Biasa
                        </span>
                      )}
                    </td>

                    {/* Enrolled Courses */}
                    <td className="p-3.5">
                      <div className="font-mono text-xs font-bold text-white">
                        {std.enrolledCourseIds.length} Modul
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate max-w-[140px]">
                        {std.enrolledCourseIds.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? course.title.slice(0, 15) + '...' : id;
                        }).join(', ')}
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="p-3.5 min-w-[130px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-neutral-300">{std.completedLessonsCount} selesai</span>
                          <span className="text-amber-400 font-bold">
                            {Math.min(100, Math.round((std.completedLessonsCount / 18) * 100))}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-300"
                            style={{ width: `${Math.min(100, Math.max(5, (std.completedLessonsCount / 18) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Quiz Scores */}
                    <td className="p-3.5 font-mono text-xs">
                      {Object.keys(std.quizScores).length > 0 ? (
                        <div className="flex items-center gap-1.5">
                          {std.quizScores.level_1 && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                              T1: {std.quizScores.level_1}%
                            </span>
                          )}
                          {std.quizScores.level_2 && (
                            <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                              T2: {std.quizScores.level_2}%
                            </span>
                          )}
                          {std.quizScores.level_3 && (
                            <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] font-bold">
                              T3: {std.quizScores.level_3}%
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-neutral-500 text-[11px]">Belum Ambil</span>
                      )}
                    </td>

                    {/* Certificates */}
                    <td className="p-3.5 font-mono text-xs">
                      {std.certificatesEarned && std.certificatesEarned.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>{std.certificatesEarned.length} Sijil</span>
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-[11px]">-</span>
                      )}
                    </td>

                    {/* Last active */}
                    <td className="p-3.5 text-neutral-400 font-mono text-[11px]">
                      {std.lastActive}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleToggleStudentVip(std.id)}
                        className={`px-2 py-1 text-[11px] font-mono uppercase font-bold border transition-colors cursor-pointer ${
                          std.isVip
                            ? 'bg-neutral-900 text-neutral-300 border-white/10 hover:text-red-400'
                            : 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400 hover:text-black'
                        }`}
                        title={std.isVip ? "Batalkan VIP" : "Berikan Akses VIP"}
                      >
                        {std.isVip ? 'Nyah-VIP' : '+ Beri VIP'}
                      </button>

                      <button
                        onClick={() => handleResetStudentProgress(std.id)}
                        className="p-1 text-neutral-400 hover:text-amber-400 bg-neutral-900 border border-white/10 transition-colors cursor-pointer"
                        title="Set Semula Kemajuan Pelajar"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: COURSES & SYLLABUS CMS
      ========================================================================== */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/10 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  placeholder="Cari mengikut tajuk / pengajar..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#141414] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>

              {/* Level Filter */}
              <select
                value={courseLevelFilter}
                onChange={(e) => setCourseLevelFilter(e.target.value as any)}
                className="bg-[#141414] border border-white/15 text-xs text-neutral-200 px-3 py-1.5 focus:outline-none focus:border-amber-400 font-mono"
              >
                <option value="all">Semua Tahap</option>
                <option value="level_1">Tahap 1: Pemula</option>
                <option value="level_2">Tahap 2: Pengamal</option>
                <option value="level_3">Tahap 3: Mahir</option>
              </select>

              {/* Pricing Filter */}
              <select
                value={coursePricingFilter}
                onChange={(e) => setCoursePricingFilter(e.target.value as any)}
                className="bg-[#141414] border border-white/15 text-xs text-neutral-200 px-3 py-1.5 focus:outline-none focus:border-amber-400 font-mono"
              >
                <option value="all">Semua Harga</option>
                <option value="free">Percuma Sahaja</option>
                <option value="paid">Berbayar / Premium</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddModuleModal}
                className="px-3.5 py-2 bg-neutral-900 border border-white/20 text-neutral-200 hover:text-white hover:border-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                title="Bina Modul Silibus Baru"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>+ Modul Silibus</span>
              </button>

              {onOpenCourseEditor && (
                <button
                  onClick={() => onOpenCourseEditor()}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Tambah Kursus</span>
                </button>
              )}
            </div>
          </div>

          {/* Courses List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-[#0e0e0e] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between overflow-hidden shadow-lg group"
              >
                <div>
                  <div className="relative aspect-video bg-black/80 overflow-hidden">
                    <img
                      src={c.coverImage}
                      alt={c.title}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black/80 text-white font-mono text-[10px] font-bold uppercase border border-white/20">
                        {c.levelCategory}
                      </span>
                      {c.isFree ? (
                        <span className="px-2 py-0.5 bg-emerald-500 text-black font-mono text-[10px] font-black uppercase">
                          PERCUMA
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-400 text-black font-mono text-[10px] font-black uppercase">
                          RM {c.price}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 bg-black/80 text-neutral-300 border border-white/10">
                      {c.totalLessons} Pelajaran · {c.totalHours}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 font-sans">
                      {c.tagline || c.description}
                    </p>
                    <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between border-t border-white/10">
                      <span>{c.instructor.name}</span>
                      <span className="text-amber-400 font-mono font-bold">{c.studentsCount} Pelajar</span>
                    </div>
                  </div>
                </div>

                {/* Course Card Action Bar */}
                <div className="p-3 bg-[#121212] border-t border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    {onOpenCourseEditor && (
                      <button
                        onClick={() => onOpenCourseEditor(c)}
                        className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/15 flex items-center gap-1 transition-colors cursor-pointer"
                        title="Edit Kandungan & Video Kursus"
                      >
                        <Edit3 className="w-3 h-3 text-amber-400" />
                        <span>Edit</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        const newPriceStr = prompt(`Masukkan harga baru (RM) untuk "${c.title}":`, c.price.toString());
                        if (newPriceStr !== null) {
                          const newPrice = parseFloat(newPriceStr);
                          if (!isNaN(newPrice)) {
                            onUpdateCourse({ ...c, price: newPrice, isFree: newPrice <= 0 });
                            addAuditLog('Harga Kursus Dikemaskini', 'admin@akademiai.my', `Menukar harga "${c.title}" kepada RM ${newPrice}.`, 'course');
                          }
                        }
                      }}
                      className="px-2 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/15 text-[11px] cursor-pointer"
                      title="Tukar Harga Pantas"
                    >
                      RM
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`Adakah anda pasti ingin memadam kursus "${c.title}"?`)) {
                        onDeleteCourse(c.id);
                        addAuditLog('Kursus Dipadam', 'admin@akademiai.my', `Memadam kursus "${c.title}" dari katalog.`, 'course');
                      }
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Padam Kursus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: ORDERS & TRANSACTIONS
      ========================================================================== */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/10 p-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Audit Aliran Transaksi</span>
              <h3 className="font-['Oswald'] text-xl font-bold uppercase text-white">
                {isEn ? 'Recent Transactions & Orders' : 'Rekod Pesanan & Transaksi Pelajar'}
              </h3>
            </div>

            <button
              onClick={handleExportTransactionsCSV}
              className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer self-start sm:self-auto"
              title="Muat Turun Ringkasan CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Eksport Laporan CSV</span>
            </button>
          </div>

          {/* Transactions Table */}
          <div className="bg-[#0e0e0e] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#141414] border-b border-white/10 text-neutral-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">ID Pesanan</th>
                  <th className="p-3.5">Pelajar</th>
                  <th className="p-3.5">Item Kursus</th>
                  <th className="p-3.5">Kaedah Bayaran</th>
                  <th className="p-3.5">Baucar Diguna</th>
                  <th className="p-3.5">Diskaun</th>
                  <th className="p-3.5">Jumlah Bayar</th>
                  <th className="p-3.5">Tarikh</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-mono">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-amber-400">{tx.id}</td>
                    <td className="p-3.5 font-sans">
                      <div className="font-bold text-white text-xs">{tx.studentName}</div>
                      <div className="text-neutral-400 text-[10px] font-mono">{tx.studentEmail}</div>
                    </td>
                    <td className="p-3.5 font-sans text-xs text-neutral-200 max-w-[200px] truncate">
                      {tx.courseTitles.join(' + ')}
                    </td>
                    <td className="p-3.5 uppercase text-neutral-300">
                      <span className="px-2 py-0.5 bg-neutral-900 border border-white/10">
                        {tx.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {tx.promoCodeUsed ? (
                        <span className="text-amber-400 font-bold">{tx.promoCodeUsed}</span>
                      ) : (
                        <span className="text-neutral-500">-</span>
                      )}
                    </td>
                    <td className="p-3.5 text-emerald-400">
                      {tx.discountAmount > 0 ? `-RM ${tx.discountAmount}.00` : '-'}
                    </td>
                    <td className="p-3.5 font-bold text-white text-sm">
                      RM {tx.amount}.00
                    </td>
                    <td className="p-3.5 text-neutral-400 text-[11px]">{tx.date}</td>
                    <td className="p-3.5 text-right">
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase">
                        Selesai
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 5: VOUCHERS & PROMOTIONS
      ========================================================================== */}
      {activeTab === 'vouchers' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0e0e0e] border border-white/10 p-6 space-y-2">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Pemasaran & Kempen Diskaun</span>
            <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
              {isEn ? 'Voucher Campaigns & Quota Management' : 'Pengurusan Baucar & Kuota Promosi'}
            </h3>
            <p className="text-xs text-neutral-400 max-w-2xl font-sans">
              Kawal dan pantau kod promosi yang aktif di seluruh portal termasuk kupon pengguna pertama, potongan pakej kombo, dan tajaan pendidikan CSR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vouchers.map((v) => (
              <div
                key={v.code}
                className={`p-6 border transition-all ${
                  v.isActive
                    ? 'bg-[#0e0e0e] border-amber-400/40 shadow-lg'
                    : 'bg-[#0a0a0a] border-white/10 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xl font-black text-amber-400">
                        {v.code}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                        v.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}>
                        {v.isActive ? 'Aktif' : 'Nyahaktif'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-sans mt-1">{v.description}</p>
                  </div>

                  <button
                    onClick={() => handleToggleVoucher(v.code)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border cursor-pointer transition-colors ${
                      v.isActive
                        ? 'bg-neutral-900 hover:bg-red-500/10 text-neutral-300 hover:text-red-400 border-white/15'
                        : 'bg-emerald-400 hover:bg-emerald-300 text-black border-emerald-400 font-bold'
                    }`}
                  >
                    {v.isActive ? 'Nyahaktifkan' : 'Aktifkan'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Jumlah Tebusan</span>
                    <span className="font-bold text-white text-sm">{v.usageCount} kali</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Penjimatan Diberi</span>
                    <span className="font-bold text-amber-400 text-sm">RM {v.totalSavingsGiven.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Baki Kuota</span>
                    <span className="font-bold text-emerald-400 text-sm">{v.quota - v.usageCount} kupon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: AUDIT TRAIL LOG
      ========================================================================== */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between bg-[#0e0e0e] border border-white/10 p-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Jejak Audit Sistem</span>
              <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
                {isEn ? 'System Activity Log & Audit Trail' : 'Log Kronologi Aktiviti & Pentadbiran'}
              </h3>
            </div>
            <button
              onClick={() => {
                const newLog: AdminAuditLog = {
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                  action: 'Pemeriksaan Integriti Sistem',
                  actor: 'admin@akademiai.my',
                  details: 'Menjalankan diagnostik status pangkalan data dan pendaftaran.',
                  type: 'system'
                };
                setAuditLogs(prev => [newLog, ...prev]);
              }}
              className="px-3.5 py-1.5 bg-neutral-900 border border-white/15 text-neutral-300 hover:text-white text-xs font-mono uppercase cursor-pointer"
            >
              + Catat Pemeriksaan
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-white/10 divide-y divide-white/10 font-mono text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">{log.action}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-white text-[11px]">{log.actor}</span>
                    <span className="px-1.5 py-0.2 bg-white/10 text-neutral-400 text-[10px] uppercase">
                      {log.type}
                    </span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">{log.details}</p>
                </div>

                <div className="text-neutral-400 text-[11px] shrink-0">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
