import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ms' | 'en';

export interface Translations {
  [key: string]: {
    ms: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand & Header
  'brand.name': {
    ms: 'AKADEMI AI',
    en: 'AI ACADEMY'
  },
  'brand.tagline': {
    ms: 'Latihan Profesional AI Dalam Talian',
    en: 'Online Professional AI Training'
  },
  'nav.portal': {
    ms: 'Portal Pelajar',
    en: 'Student Portal'
  },
  'nav.all_courses': {
    ms: 'Semua Course',
    en: 'All Courses'
  },
  'nav.all_courses_desc': {
    ms: 'Beli & Terokai Semua Modul',
    en: 'Explore & Enroll in All Modules'
  },
  'nav.my_courses': {
    ms: 'My Course',
    en: 'My Courses'
  },
  'nav.my_courses_desc': {
    ms: 'Kursus Berdaftar Dimiliki',
    en: 'Enrolled Owned Courses'
  },
  'nav.my_courses_vip_desc': {
    ms: 'Akses Penuh VIP Aktif',
    en: 'Active VIP All-Access'
  },
  'nav.learning_room': {
    ms: 'Ruang Pembelajaran',
    en: 'Learning Room'
  },
  'nav.learning_room_desc': {
    ms: 'Pemain Video & Nota Pelajaran',
    en: 'Video Player & Lesson Notes'
  },
  'nav.faculty': {
    ms: 'Tenaga Pengajar',
    en: 'Faculty & Instructors'
  },
  'nav.faculty_desc': {
    ms: 'Profil Pakar Industri AI',
    en: 'AI Industry Expert Profiles'
  },
  'nav.community': {
    ms: 'Komuniti ChatClub',
    en: 'ChatClub Community'
  },
  'nav.community_desc': {
    ms: 'Forum Interaksi Pelajar',
    en: 'Student Discussion Forum'
  },
  'nav.visualizer': {
    ms: 'Interactive Visualizer',
    en: 'Interactive Visualizer'
  },
  'nav.certificate': {
    ms: 'Pensijilan Rasmi',
    en: 'Official Certification'
  },
  'nav.certificate_desc': {
    ms: 'Semak Kelayakan & Sijil Digital',
    en: 'Verify Eligibility & Digital Certificate'
  },
  'nav.login': {
    ms: 'Log Masuk',
    en: 'Log In'
  },
  'nav.signup': {
    ms: 'Daftar',
    en: 'Sign Up'
  },
  'nav.logout': {
    ms: 'Log Keluar Dari Portal',
    en: 'Log Out From Portal'
  },
  'nav.admin': {
    ms: 'Admin',
    en: 'Admin'
  },
  'nav.admin_cms': {
    ms: 'Dashboard Admin',
    en: 'Admin Dashboard'
  },
  'nav.admin_login': {
    ms: 'Log Masuk Admin',
    en: 'Admin Login'
  },
  'nav.cart': {
    ms: 'Bakul Pembelian',
    en: 'Shopping Cart'
  },
  'nav.vip_badge': {
    ms: 'VIP RM98/BLN',
    en: 'VIP RM98/MO'
  },
  'nav.vip_active': {
    ms: 'VIP AKTIF',
    en: 'VIP ACTIVE'
  },
  'nav.coupon_btn': {
    ms: 'KUPON RM50',
    en: 'RM50 COUPON'
  },
  'nav.menu_title': {
    ms: 'Menu Utama',
    en: 'Main Menu'
  },
  'nav.learning_progress': {
    ms: 'Kemajuan Pembelajaran',
    en: 'Learning Progress'
  },
  'nav.active_student': {
    ms: 'Pelajar Aktif',
    en: 'Active Student'
  },
  'nav.vip_member': {
    ms: 'AHLI VIP',
    en: 'VIP MEMBER'
  },
  'nav.subscribe_vip': {
    ms: 'Langgan VIP RM98',
    en: 'Subscribe VIP RM98'
  },
  'nav.vip_active_title': {
    ms: 'Keahlian VIP Aktif',
    en: 'Active VIP Membership'
  },

  // Language Switcher
  'lang.switch': {
    ms: 'Tukar Bahasa',
    en: 'Switch Language'
  },
  'lang.ms': {
    ms: 'Bahasa Melayu',
    en: 'Malay'
  },
  'lang.en': {
    ms: 'English',
    en: 'English'
  },

  // Public Landing Hero
  'hero.badge': {
    ms: 'KURSUS AI INDUSTRI #1 DI MALAYSIA',
    en: "MALAYSIA'S #1 INDUSTRIAL AI COURSES"
  },
  'hero.title_pre': {
    ms: 'KUASAI REVOLUSI',
    en: 'MASTER THE REVOLUTION OF'
  },
  'hero.title_highlight': {
    ms: 'KECERDASAN BUATAN',
    en: 'ARTIFICIAL INTELLIGENCE'
  },
  'hero.subtitle': {
    ms: 'Latihan mendalam berteraskan industri dari asas Generative AI sehingga LLM Fine-Tuning & Model Kustom. Lengkap dengan latihan amali, makmal interaktif, bimbingan pakar dan pensijilan digital.',
    en: 'In-depth industry-driven training from Generative AI fundamentals to custom LLM fine-tuning. Includes hands-on projects, interactive labs, expert mentorship, and verified digital certification.'
  },
  'hero.cta_start': {
    ms: 'Mula Belajar Sekarang',
    en: 'Start Learning Now'
  },
  'hero.cta_explore': {
    ms: 'Terokai Kursus & Modul',
    en: 'Explore Courses & Modules'
  },
  'hero.stat_students': {
    ms: 'Pelajar Berdaftar',
    en: 'Enrolled Students'
  },
  'hero.stat_courses': {
    ms: 'Kursus & Modul AI',
    en: 'AI Courses & Modules'
  },
  'hero.stat_rating': {
    ms: 'Penilaian Positif',
    en: 'Positive Rating'
  },
  'hero.stat_completion': {
    ms: 'Kadar Kelulusan',
    en: 'Completion Rate'
  },
  'hero.perk_lifetime': {
    ms: 'Akses Seumur Hidup',
    en: 'Lifetime Access'
  },
  'hero.perk_certificate': {
    ms: 'Sijil Digital Diiktiraf',
    en: 'Accredited Digital Certificate'
  },
  'hero.perk_hands_on': {
    ms: 'Latihan Kod Amali Industri',
    en: 'Hands-on Code Practice'
  },
  'hero.perk_money_back': {
    ms: 'Jaminan Kepuasan 30 Hari',
    en: '30-Day Satisfaction Guarantee'
  },

  // Course Store
  'store.badge': {
    ms: 'Katalog Rasmi Kursus & Modul AI',
    en: 'Official AI Courses & Modules Catalog'
  },
  'store.title': {
    ms: 'SEMUA MODUL AKADEMI AI · PERCUMA & BERBAYAR',
    en: 'ALL AI ACADEMY MODULES · FREE & PAID'
  },
  'store.desc': {
    ms: 'Pilih modul yang bersesuaian dengan matlamat anda. Mulakan dengan Modul Asas Percuma atau langgan Pakej Masterclass Premium Berbayar lengkap dengan bimbingan projek industri dan sijil verifikasi rasmi.',
    en: 'Choose modules tailored to your goals. Begin with Free Starter Modules or enroll in Premium Masterclasses with industry project guidance and verified certificates.'
  },
  'store.filter_all': {
    ms: 'Semua Modul',
    en: 'All Modules'
  },
  'store.filter_free': {
    ms: 'Percuma Sahaja',
    en: 'Free Only'
  },
  'store.filter_paid': {
    ms: 'Premium Berbayar',
    en: 'Paid Premium'
  },
  'store.filter_beginner': {
    ms: 'Pemula',
    en: 'Beginner'
  },
  'store.filter_advanced': {
    ms: 'Lanjutan & Pakar',
    en: 'Advanced & Expert'
  },
  'store.search_placeholder': {
    ms: 'Cari kursus mengikut tajuk, topik, atau tenaga pengajar...',
    en: 'Search courses by title, topic, or instructor...'
  },
  'store.add_to_cart': {
    ms: 'Tambah ke Bakul',
    en: 'Add to Cart'
  },
  'store.buy_now': {
    ms: 'Daftar Sekarang',
    en: 'Enroll Now'
  },
  'store.in_cart': {
    ms: 'Dalam Bakul',
    en: 'In Cart'
  },
  'store.enrolled': {
    ms: 'Telah Dimiliki',
    en: 'Already Owned'
  },
  'store.start_learning': {
    ms: 'Mula Belajar',
    en: 'Start Learning'
  },
  'store.free_badge': {
    ms: 'PERCUMA',
    en: 'FREE'
  },
  'store.show_more': {
    ms: 'Lihat Lagi Kursus',
    en: 'View More Courses'
  },
  'store.show_less': {
    ms: 'Tunjukkan Sedikit',
    en: 'Show Less'
  },
  'store.all_shown': {
    ms: 'Semua kursus sedang dipaparkan.',
    en: 'All available courses are currently displayed.'
  },

  // My Courses Section
  'mycourses.title': {
    ms: 'KURSUS SAYA',
    en: 'MY COURSES'
  },
  'mycourses.welcome': {
    ms: 'My Course · Portal Pembelajaran Anda',
    en: 'My Courses · Your Learning Hub'
  },
  'mycourses.tab_all': {
    ms: 'Semua Kursus',
    en: 'All Courses'
  },
  'mycourses.tab_in_progress': {
    ms: 'Sedang Belajar',
    en: 'In Progress'
  },
  'mycourses.tab_completed': {
    ms: 'Selesai',
    en: 'Completed'
  },
  'mycourses.search': {
    ms: 'Cari kursus saya...',
    en: 'Search my courses...'
  },
  'mycourses.resume': {
    ms: 'Sambung Belajar',
    en: 'Resume Learning'
  },
  'mycourses.start': {
    ms: 'Mula Belajar',
    en: 'Start Learning'
  },
  'mycourses.overall_progress': {
    ms: 'Kemajuan Keseluruhan',
    en: 'Overall Progress'
  },
  'mycourses.lessons_completed': {
    ms: 'Pelajaran Tamat',
    en: 'Completed Lessons'
  },
  'mycourses.courses_accessed': {
    ms: 'Kursus Diakses',
    en: 'Accessed Courses'
  },

  // Video Learning Room
  'room.now_playing': {
    ms: 'Sedang Dimainkan',
    en: 'Now Playing'
  },
  'room.completed': {
    ms: 'Selesai',
    en: 'Completed'
  },
  'room.mark_completed': {
    ms: 'Tandakan Selesai',
    en: 'Mark Completed'
  },
  'room.download_notes': {
    ms: 'Muat Turun Nota',
    en: 'Download Notes'
  },
  'room.theater_mode': {
    ms: 'Mod Teater',
    en: 'Theater Mode'
  },
  'room.tab_summary': {
    ms: 'Ringkasan & Amali',
    en: 'Summary & Practice'
  },
  'room.tab_chapters': {
    ms: 'Bab Video',
    en: 'Video Chapters'
  },
  'room.tab_notes': {
    ms: 'Buku Nota',
    en: 'Notebook'
  },
  'room.tab_resources': {
    ms: 'Bahan Rujukan',
    en: 'References'
  },
  'room.level_quiz': {
    ms: 'Kuiz Tahap',
    en: 'Level Quiz'
  },
  'room.copy_note': {
    ms: 'Salin Nota',
    en: 'Copy Note'
  },
  'room.copied': {
    ms: 'Disalin!',
    en: 'Copied!'
  },
  'room.note_saved': {
    ms: 'Tersimpan!',
    en: 'Saved!'
  },
  'room.note_placeholder': {
    ms: 'Catatkan pemikiran anda, soalan untuk ChatClub, atau teks prompt penting yang dipelajari dalam video ini...',
    en: 'Jot down your notes, ChatClub questions, or key prompt techniques learned in this video...'
  },

  // Curriculum
  'curriculum.title': {
    ms: 'SILIBUS PEMBELAJARAN',
    en: 'COURSE CURRICULUM'
  },
  'curriculum.lessons': {
    ms: 'pelajaran',
    en: 'lessons'
  },
  'curriculum.edit_module': {
    ms: 'Edit Modul',
    en: 'Edit Module'
  },
  'curriculum.add_module': {
    ms: '+ Tambah Modul Baru',
    en: '+ Add New Module'
  },

  // Discount & Vouchers
  'voucher.badge': {
    ms: 'Pengumuman Diskaun Khas 2026',
    en: 'Special 2026 Discount Announcement'
  },
  'voucher.title': {
    ms: 'TAWARAN DISKAUN PENDAFTARAN AKADEMI AI MALAYSIA',
    en: 'AI ACADEMY ENROLLMENT DISCOUNT OFFER'
  },
  'voucher.subtitle': {
    ms: 'Tuntut kupon diskaun eksklusif anda di bawah untuk memulakan pengajian AI industri dengan penjimatan segera sehingga 50% / RM50 pada pesanan pertama.',
    en: 'Claim your exclusive discount coupon below to start your industrial AI studies with immediate savings of up to 50% / RM50 on your first order.'
  },
  'voucher.first_user_title': {
    ms: 'KAD DISKAUN PENGGUNA PERTAMA',
    en: 'FIRST-TIME USER DISCOUNT PASS'
  },
  'voucher.claim_now': {
    ms: 'TUNTUT DISKAUN SEKARANG',
    en: 'CLAIM DISCOUNT NOW'
  },
  'voucher.claimed': {
    ms: 'Sudah Dituntut',
    en: 'Claimed'
  },
  'voucher.use_in_cart': {
    ms: 'Gunakan Dalam Bakul →',
    en: 'Use in Cart →'
  },
  'voucher.copy_code': {
    ms: 'Salin Kod',
    en: 'Copy Code'
  },

  // Cart Drawer
  'cart.title': {
    ms: 'BAKUL PEMBELIAN',
    en: 'SHOPPING CART'
  },
  'cart.empty_title': {
    ms: 'Bakul Pembelian Anda Masih Kosong',
    en: 'Your Shopping Cart Is Empty'
  },
  'cart.empty_desc': {
    ms: 'Terokai katalog modul percuma dan kursus pakar kami untuk mula belajar.',
    en: 'Explore our catalog of free modules and expert masterclasses to get started.'
  },
  'cart.subtotal': {
    ms: 'Jumlah Pesanan',
    en: 'Subtotal'
  },
  'cart.discount': {
    ms: 'Potongan Diskaun',
    en: 'Discount Savings'
  },
  'cart.total': {
    ms: 'Jumlah Bayaran',
    en: 'Total Payable'
  },
  'cart.apply_code': {
    ms: 'Guna Kod',
    en: 'Apply'
  },
  'cart.promo_placeholder': {
    ms: 'Masukkan kod baucar...',
    en: 'Enter promo code...'
  },
  'cart.checkout_btn': {
    ms: 'Sahkan Pembayaran & Daftar',
    en: 'Confirm & Complete Enrollment'
  },
  'cart.secure_payment': {
    ms: 'Pembayaran FPX & Kad Kredit Selamat',
    en: 'Secure FPX & Credit Card Payment'
  },

  // VIP Membership Modal
  'vip.modal_title': {
    ms: 'LANGGANAN KEAHLIAN VIP ALL-ACCESS',
    en: 'ALL-ACCESS VIP MEMBERSHIP'
  },
  'vip.modal_price': {
    ms: 'RM98 / sebulan',
    en: 'RM98 / month'
  },
  'vip.subscribe_now': {
    ms: 'Langgan Sekarang (RM98/bulan)',
    en: 'Subscribe Now (RM98/month)'
  },
  'vip.cancel': {
    ms: 'Batal Langganan',
    en: 'Cancel Subscription'
  },

  // Footer
  'footer.copyright': {
    ms: 'Hak Cipta Terpelihara. Inisiatif Pendidikan AI Profesional Malaysia.',
    en: 'All Rights Reserved. Professional AI Education Initiative of Malaysia.'
  },
  'footer.about': {
    ms: 'Tentang Akademi AI',
    en: 'About AI Academy'
  },
  'footer.terms': {
    ms: 'Terma Perkhidmatan',
    en: 'Terms of Service'
  },
  'footer.privacy': {
    ms: 'Dasar Privasi',
    en: 'Privacy Policy'
  },
  'footer.contact': {
    ms: 'Hubungi Kami',
    en: 'Contact Us'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isMs: boolean;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'akademi_ai_language_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'ms' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.error('Error reading language from storage', e);
    }
    return 'ms'; // Default to Bahasa Melayu
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error('Error saving language', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ms' ? 'en' : 'ms');
  };

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    return fallback || (entry ? entry.ms : key);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isMs: language === 'ms',
        isEn: language === 'en'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
