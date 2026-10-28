import { CourseLevel, Module, LevelQuiz, GlossaryTerm, Instructor, StudentReview, CourseProject, FacultyMember, StoreCourse } from '../types';

export const INSTRUCTOR_DATA: Instructor = {
  name: "Dr. Farhan Azim",
  title: "Penyelidik AI Kanan & Pengasas Bersama Makmal Kecerdasan Generatif",
  bio: "Mempunyai lebih 12 tahun pengalaman dalam bidang sains data dan kecerdasan buatan di Silicon Valley dan Malaysia. Bekas penyelidik jemputan di makmal AI antarabangsa dan penasihat transformasi digital. Telah melatih lebih 18,900 pelajar dan profesional di seluruh Asia Tenggara.",
  rating: 4.95,
  studentsCount: "18,940+",
  coursesCount: 3,
  avatar: "/src/assets/images/instructor_ai_expert_1792521714332.jpg"
};

export const COURSE_PROJECTS: Record<CourseLevel, CourseProject> = {
  level_1: {
    title: "Projek Akhir: Pelan Integrasi AI & Kit Prompt Asas Organisasi",
    description: "Sediakan cadangan pelaksanaan AI ke dalam aliran kerja harian anda, lengkap dengan 5 templat prompt formula CRTF untuk tugasan berulang dan pelan keselamatan data peribadi.",
    deliverables: [
      "Dokumen Pelan Integrasi AI (3-5 muka surat)",
      "Bank 5 Templat Prompt CRTF Berkesan Teruji",
      "Garis Panduan Keselamatan & Etika Data Syarikat"
    ],
    showcaseImage: "/src/assets/images/student_project_showcase_1792521713806.jpg",
    studentProjectsCount: 1420
  },
  level_2: {
    title: "Projek Akhir: Kit Identiti Jenama Generatif & Automasi Spreadsheet",
    description: "Hasilkan projek visual komersial penuh menggunakan Diffusion Models (moodboard, poster produk, aset sosial) beserta aliran kerja automasi spreadsheet berasaskan formula AI.",
    deliverables: [
      "Papan Inspirasi Visual Moodboard & 8 Imej Komersial Berkualiti Tinggi",
      "Fail Templat Analisis Sentimen & Klasifikasi Data Pelanggan",
      "Laporan ROI Produktiviti Masa Bekerja"
    ],
    showcaseImage: "/src/assets/images/student_project_showcase_1792521713806.jpg",
    studentProjectsCount: 980
  },
  level_3: {
    title: "Projek Akhir: Prototaip Saluran RAG Lengkap & Ejen Autonomi",
    description: "Bina seni bina Retrieval-Augmented Generation (RAG) menggunakan pangkalan data vektor untuk menyoal jawab dokumen polisi syarikat secara sahih serta skema JSON Function Calling untuk ejen autonomi.",
    deliverables: [
      "Skrip Saluran RAG (Chunking, Embedding, Cosine Search & Re-ranking)",
      "Skema Function Calling JSON untuk 3 Alat Luaran",
      "Laporan Penilaian Keselamatan & Pencegahan Prompt Injection"
    ],
    showcaseImage: "/src/assets/images/student_project_showcase_1792521713806.jpg",
    studentProjectsCount: 640
  }
};

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    author: 'Nadia Syafika',
    role: 'Pengarah Pemasaran Digital, Kuala Lumpur',
    rating: 5,
    date: '12 Oktober 2026',
    content: 'Kursus AI terbaik dalam Bahasa Melayu setakat ini! Susunan silibusnya sangat teratur seperti kursus premium antarabangsa di Domestika. Formula CRTF terus menjimatkan 10 jam seminggu masa kerja pasukan saya.'
  },
  {
    id: 'rev-2',
    author: 'Ir. Danial Hakimi',
    role: 'Jurutera Perisian Kanan, Cyberjaya',
    rating: 5,
    date: '8 Oktober 2026',
    content: 'Penerangan tentang mekanisme Self-Attention dan RAG dalam Tahap 3 sangat jelas dan mendalam. Tiada istilah mengelirukan—semuanya bersandarkan pemahaman matematik dan sains komputer sebenar.'
  },
  {
    id: 'rev-3',
    author: 'Siti Aminah Zulkifli',
    role: 'Pengasas Jenama E-Dagang, Pulau Pinang',
    rating: 5,
    date: '2 Oktober 2026',
    content: 'Sebagai usahawan bukan teknikal, saya sangat kagum bagaimana Dr. Farhan memecahkan konsep rumit menjadi analogi yang mudah difahami. Projek akhirnya membantu saya membina kit promosi produk sendiri!'
  }
];

export interface LevelInfo {
  id: CourseLevel;
  number: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  prerequisites: string;
  estimatedHours: string;
  totalModules: number;
  totalLessons: number;
  coverImage: string;
  learningOutcomes: string[];
}

export const LEVELS_CONFIG: Record<CourseLevel, LevelInfo> = {
  level_1: {
    id: 'level_1',
    number: 1,
    badge: 'Tahap 1: Pemula',
    title: 'Asas & Pengenalan Kecerdasan Buatan',
    subtitle: 'Kefahaman Konseptual, Cara AI Berfikir, & Asas Prompting',
    description: 'Bermula dari sifar. Fahami apa itu AI, perbezaan antara Machine Learning dan Deep Learning, etika AI serta asas membina prompt yang berkesan.',
    targetAudience: 'Pelajar, guru, profesional bukan teknikal, dan sesiapa yang baru ingin mengenali dunia AI.',
    prerequisites: 'Tiada latar belakang teknikal diperlukan. Hanya perlukan minat belajar.',
    estimatedHours: '3.5 Jam',
    totalModules: 3,
    totalLessons: 6,
    coverImage: '/src/assets/images/course_level_beginner_1792520563264.jpg',
    learningOutcomes: [
      'Memahami perbezaan Narrow AI, AGI dan Generative AI',
      'Mengenal pasti bagaimana model dilatih menggunakan dataset',
      'Menguasai formula asas Prompt Engineering (Formula C-R-T-F)',
      'Menilai isu etika, hak cipta dan keselamatan maklumat peribadi'
    ]
  },
  level_2: {
    id: 'level_2',
    number: 2,
    badge: 'Tahap 2: Pengamal',
    title: 'Aplikasi Praktikal & Alatan Generative AI',
    subtitle: 'Kuasai LLM, Penjanaan Imej, Media AI & Automasi Kerja',
    description: 'Tingkatkan produktiviti harian. Pelajari teknik lanjutan prompt, penggunaan Gemini/ChatGPT, penjanaan imej profesional, serta mengintegrasikan AI ke dalam tugasan harian.',
    targetAudience: 'Eksekutif, pencipta kandungan, pereka grafik, pengurus projek, dan usahawan.',
    prerequisites: 'Lulus Tahap 1 atau mempunyai kefahaman asas tentang alatan seperti ChatGPT/Gemini.',
    estimatedHours: '4.5 Jam',
    totalModules: 3,
    totalLessons: 6,
    coverImage: '/src/assets/images/course_level_intermediate_1792520565056.jpg',
    learningOutcomes: [
      'Mengaplikasikan teknik Few-Shot dan Chain-of-Thought Prompting',
      'Menghasilkan visual dan karya grafik menggunakan Diffusion Models',
      'Meringkaskan dan menganalisis fail PDF / data besar secara automatik',
      'Membina templat aliran kerja produktiviti berasaskan AI'
    ]
  },
  level_3: {
    id: 'level_3',
    number: 3,
    badge: 'Tahap 3: Mahir',
    title: 'Arkitektur Lanjutan, RAG & Ejen AI',
    subtitle: 'Transformer, Vektor Database, RAG, API & Ejen Autonomi',
    description: 'Menyelami aspek teknikal. Fahami seni bina Transformer, bagaimana embeddings dan pangkalan data vektor berfungsi, membina sistem RAG dan mereka bentuk Ejen AI.',
    targetAudience: 'Pembangun perisian, saintis data, pelajar sains komputer, dan arkitek teknologi.',
    prerequisites: 'Asas pengaturcaraan (seperti Python atau JavaScript) dan kefahaman asas tentang API.',
    estimatedHours: '6.0 Jam',
    totalModules: 3,
    totalLessons: 6,
    coverImage: '/src/assets/images/course_level_advanced_1792520565131.jpg',
    learningOutcomes: [
      'Menjelaskan fungsi mekanisme Self-Attention dalam seni bina Transformer',
      'Membina aliran Retrieval-Augmented Generation (RAG) dengan pangkalan data vektor',
      'Mengintegrasikan model LLM ke dalam aplikasi menggunakan Function Calling / Tools',
      'Memahami perbezaan antara Prompt Engineering, RAG dan Fine-Tuning (LoRA)'
    ]
  }
};

export const MODULES_DATA: Module[] = [
  // ================= TAHAP 1 =================
  {
    id: 'mod-1-1',
    level: 'level_1',
    title: 'Modul 1: Pengenalan kepada AI & Landskap Semasa',
    description: 'Terokai sejarah ringkas AI, bagaimana komputer memproses maklumat berbanding otak manusia, dan spektrum AI dari Narrow AI hingga AGI.',
    iconName: 'Sparkles',
    coverImage: '/src/assets/images/course_level_beginner_1792520563264.jpg',
    lessons: [
      {
        id: 'les-1-1',
        title: 'Pelajaran 1: Apa itu Kecerdasan Buatan (AI) Sebenarnya?',
        duration: '14 minit',
        durationMinutes: 14,
        videoUrl: 'https://www.youtube-nocookie.com/embed/2ePf9rue1Ao', // MIT/3Blue1Brown/crashcourse AI intro standard
        summary: 'Pelajaran ini menerangkan definisi tepat AI tanpa mitos sains fiksyen. Kita membezakan Narrow AI (AI yang wujud hari ini) dengan konsep General AI (AGI) serta bagaimana AI memproses corak kebarangkalian.',
        keyPoints: [
          'AI moden berasaskan pengenalan corak statistik (pattern recognition), bukan kesedaran kendiri.',
          'Narrow AI cemerlang dalam satu tugasan spesifik (contoh: terjemahan bahasa, catur, pengecaman muka).',
          'Artificial General Intelligence (AGI) masih merupakan bidang penyelidikan teori masa hadapan.',
          'Model bahasa besar (LLM) meramal token seterusnya (next-token prediction) berdasarkan konteks latihan.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Pengenalan & Mitos Biasa AI' },
          { time: '03:15', seconds: 195, title: 'Definisi Narrow AI vs AGI' },
          { time: '07:40', seconds: 460, title: 'Bagaimana AI Melihat Data' },
          { time: '11:20', seconds: 680, title: 'Ringkasan & Langkah Seterusnya' }
        ],
        transcriptSnippet: 'Selamat datang ke pelajaran pertama. Ramai orang menganggap AI seperti robot dalam filem Terminator. Namun realitinya, AI yang kita gunakan hari ini adalah algoritma statistik yang sangat berkuasa dalam mengesan corak dalam berbilion data teks atau visual.',
        practicePrompt: 'Bayangkan anda menerangkan kepada ibu bapa anda yang berumur 60 tahun: "Apakah itu AI dan bagaimana ia berbeza dengan program kalkulator biasa?" Tuliskan jawapan dalam 3 ayat mudah.',
        resources: [
          { title: 'Nota Panduan Asas AI (PDF)', url: '#' },
          { title: 'Glosari Istilah Pemula', url: '#glossary' }
        ]
      },
      {
        id: 'les-1-2',
        title: 'Pelajaran 2: Perbezaan AI, Machine Learning (ML) & Deep Learning',
        duration: '16 minit',
        durationMinutes: 16,
        videoUrl: 'https://www.youtube-nocookie.com/embed/ukzFI9rgwfU',
        summary: 'Ketahui hierarki konsep: AI adalah payung besar, Machine Learning adalah cabangnya, dan Deep Learning adalah enjin di sebalik ledakan AI masa kini menggunakan neural networks bertingkat.',
        keyPoints: [
          'AI: Payung luas merangkumi sebarang mesin yang meniru kebijaksanaan manusia.',
          'Machine Learning: Komputer belajar dari data tanpa diprogramkan secara spesifik setiap peraturan satu demi satu.',
          'Deep Learning: Menggunakan rangkaian saraf tiruan (Artificial Neural Networks) dengan banyak lapisan tersembunyi (hidden layers).',
          'Generative AI: Sebahagian daripada Deep Learning yang mampu mencipta kandungan baharu (teks, audio, gambar).'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Rajah Rajah Venn: AI, ML & DL' },
          { time: '04:10', seconds: 250, title: 'Pengaturcaraan Tradisional vs Machine Learning' },
          { time: '09:00', seconds: 540, title: 'Mengapa Deep Learning Meletup Sekarang?' },
          { time: '13:30', seconds: 810, title: 'Kesimpulan Konsep' }
        ],
        transcriptSnippet: 'Dalam pengaturcaraan tradisional, pengaturcara menulis kod "Jika X, maka lakukan Y". Dalam Machine Learning, kita berikan komputer ribuan contoh X dan Y, dan komputer sendiri yang mencari corak hubungan antara kedua-duanya.',
        practicePrompt: 'Berikan satu contoh harian aplikasi Machine Learning (contoh: penapis emel spam) dan huraikan bagaimana ia belajar dari input pengguna.',
        resources: [
          { title: 'Infografik Hubungan AI-ML-DL', url: '#' }
        ]
      }
    ]
  },
  {
    id: 'mod-1-2',
    level: 'level_1',
    title: 'Modul 2: Bagaimana Model AI Belajar & Dilatih',
    description: 'Fahami proses latihan model dari data mentah, parameter bobot (weights), hingga fasa fine-tuning dan RLHF.',
    iconName: 'Cpu',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    lessons: [
      {
        id: 'les-1-3',
        title: 'Pelajaran 3: Tiga Jenis Pembelajaran: Supervised, Unsupervised & RL',
        duration: '18 minit',
        durationMinutes: 18,
        videoUrl: 'https://www.youtube-nocookie.com/embed/qBigTkBLU6g',
        summary: 'Pendedahan kepada tiga tiang utama pembelajaran mesin: Supervised Learning (data berlabel), Unsupervised Learning (mencari corak tersembunyi), dan Reinforcement Learning (belajar melalui ganjaran & denda).',
        keyPoints: [
          'Supervised: Menggunakan input dan label jawapan (contoh: gambar kucing dilabel "Kucing").',
          'Unsupervised: Mengelompokkan data pelanggan tanpa label (clustering & anomaly detection).',
          'Reinforcement Learning: Ejen membuat tindakan dalam persekitaran untuk memaksimumkan ganjaran (contoh: AlphaGo, robot berjalan).',
          'RLHF (Reinforcement Learning from Human Feedback): Kunci menjadikan LLM bersopan santun dan berguna.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Pengenalan Tiga Paradigma' },
          { time: '04:30', seconds: 270, title: 'Supervised Learning & Klasifikasi' },
          { time: '09:15', seconds: 555, title: 'Unsupervised Learning & Kluster' },
          { time: '14:00', seconds: 840, title: 'Reinforcement Learning & RLHF' }
        ],
        transcriptSnippet: 'Cuba bayangkan melatih seekor anjing peliharaan. Bila ia duduk bila disuruh, kita berikan biskut. Ini analogi tepat untuk Reinforcement Learning yang kini digunakan untuk menyelaraskan model AI seperti Gemini.',
        practicePrompt: 'Jika anda ingin membina sistem cadangan filem untuk pengguna, paradigma pembelajaran manakah yang paling sesuai digunakan dan mengapa?',
        resources: [
          { title: 'Lembaran Perbandingan Paradigma ML', url: '#' }
        ]
      },
      {
        id: 'les-1-4',
        title: 'Pelajaran 4: Data Latihan, Parameter & Halusinasi AI',
        duration: '15 minit',
        durationMinutes: 15,
        videoUrl: 'https://www.youtube-nocookie.com/embed/aircAruvnKk',
        summary: 'Mengapa AI boleh mereka fakta palsu dengan penuh yakin? Pelajari punca halusinasi AI, had "cutoff date", dan strategi semakan fakta kritikal.',
        keyPoints: [
          'Model bahasa menghasilkan output berdasarkan kemungkinan perkataan tertinggi, bukan pangkalan data kebenaran mutlak.',
          'Halusinasi berlaku apabila model mengisi jurang maklumat dengan ayat yang bunyinya meyakinkan tetapi tidak benar.',
          'Teknik grounding dan semakan silang adalah wajib dalam kegunaan profesional.',
          'Pengetahuan model dihadkan oleh data potong (knowledge cutoff) melainkan digabungkan dengan carian web.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Fenomena Halusinasi AI' },
          { time: '03:45', seconds: 225, title: 'Mengapa AI mereka jawapan?' },
          { time: '08:20', seconds: 500, title: 'Strategi 3 Langkah Semakan Fakta' },
          { time: '12:10', seconds: 730, title: 'Alat Grounding & Web Search' }
        ],
        transcriptSnippet: 'AI tidak mempunyai niat untuk menipu. Ia cuma menyusun perkataan yang paling munasabah secara statistik. Jika maklumat tiada, ia akan tetap menyambung ayat kerana tugas utamanya adalah melengkapkan teks.',
        practicePrompt: 'Tulis prompt yang memaksa AI menjawab "Saya tidak pasti" sekiranya fakta yang diminta tiada dalam konteks rujukan yang disediakan.',
        resources: [
          { title: 'Senarai Semak Anti-Halusinasi AI', url: '#' }
        ]
      }
    ]
  },
  {
    id: 'mod-1-3',
    level: 'level_1',
    title: 'Modul 3: Asas Prompt Engineering & Formula C-R-T-F',
    description: 'Pelajari formula rahsia untuk berkomunikasi dengan model AI supaya menghasilkan output yang tepat, bernas dan boleh terus diguna pakai.',
    iconName: 'Terminal',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    lessons: [
      {
        id: 'les-1-5',
        title: 'Pelajaran 5: Formula Prompt C-R-T-F (Konteks, Peranan, Tugas, Format)',
        duration: '20 minit',
        durationMinutes: 20,
        videoUrl: 'https://www.youtube-nocookie.com/embed/jC4v5AS4RIM',
        summary: 'Tinggalkan prompt 1 ayat yang kabur. Pelajari formula CRTF: Context (Konteks), Role (Peranan), Task (Tugasan Spesifik), dan Format (Bentuk Output).',
        keyPoints: [
          'K (Konteks): Berikan latar belakang situasi, sasaran pembaca, dan matlamat projek.',
          'P (Peranan): Tetapkan persona AI (contoh: Juruaudit Kewangan Berpengalaman 10 tahun).',
          'T (Tugasan): Nyatakan kata kerja tindakan yang tepat beserta kekangan negatif (apa yang dilarang).',
          'F (Format): Minta jadual Markdown, senarai bernombor, JSON, atau perenggan ringkas.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Kelemahan Prompt Biasa vs Prompt Terstruktur' },
          { time: '04:10', seconds: 250, title: 'Pecahan 4 Elemen CRTF' },
          { time: '10:30', seconds: 630, title: 'Kajian Kes: Menulis Emel Rasmi Korporat' },
          { time: '16:00', seconds: 960, title: 'Evolusi Sebelum & Selepas' }
        ],
        transcriptSnippet: 'Perbezaan antara output biasa dan output cemerlang bukan terletak pada model AI, tetapi pada kejelasan arahan anda. Formula CRTF memastikan AI tidak perlu meneka apa yang anda inginkan.',
        practicePrompt: 'Gunakan Makmal Prompt kami untuk menukar prompt ringkas "Tolong buat pelan jualan" menjadi prompt lengkap berasaskan formula CRTF.',
        resources: [
          { title: 'Kad Poket Formula CRTF (Cetak)', url: '#' },
          { title: 'Cuba di Makmal Prompt', url: '#promptlab' }
        ]
      },
      {
        id: 'les-1-6',
        title: 'Pelajaran 6: Etika, Hak Cipta & Garis Panduan Keselamatan AI',
        duration: '15 minit',
        durationMinutes: 15,
        videoUrl: 'https://www.youtube-nocookie.com/embed/N4MkWvN-U_w',
        summary: 'Pendedahan mengenai undang-undang privasi data (PDPA), hak cipta kandungan janaan AI, bias dalam data latihan, dan prinsip penggunaan bertanggungjawab.',
        keyPoints: [
          'Jangan sesekali memasukkan data peribadi pelanggan (IC, kad kredit, rekod perubatan) ke dalam model awam tanpa perjanjian keselamatan.',
          'Status hak cipta karya janaan AI di Malaysia dan antarabangsa.',
          'Mengesan bias gender, budaya atau kaum yang mungkin terbit daripada data latihan lama.',
          'Prinsip "Human-in-the-loop": Manusia kekal bertanggungjawab ke atas keputusan akhir.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Isu Privasi & Kebocoran Maklumat Korporat' },
          { time: '04:20', seconds: 260, title: 'Status Hak Cipta Hasil Karya AI' },
          { time: '08:45', seconds: 525, title: 'Mengenal Pasti Algorithmic Bias' },
          { time: '12:00', seconds: 720, title: 'Etika Profesional Pengamal AI' }
        ],
        transcriptSnippet: 'Teknologi AI memberikan kuasa penciptaan yang luar biasa, namun ia hadir dengan tanggungjawab etika. Sebagai pengguna bijak, kita wajib memastikan keselamatan data syarikat dan menghormati hak intelek.',
        practicePrompt: 'Apakah 3 langkah keselamatan yang mesti diambil oleh sesebuah organisasi sebelum membenarkan kakitangannya menggunakan AI untuk memproses dokumen pelanggan?',
        resources: [
          { title: 'Garis Panduan Keselamatan Data AI', url: '#' }
        ]
      }
    ]
  },

  // ================= TAHAP 2 =================
  {
    id: 'mod-2-1',
    level: 'level_2',
    title: 'Modul 4: Penguasaan LLM untuk Produktiviti Kerja',
    description: 'Tingkatkan kecekapan kerja harian dengan teknik Few-shot, Chain-of-Thought, sintesis dokumen panjang, dan penulisan laporan analitikal.',
    iconName: 'BookOpen',
    coverImage: '/src/assets/images/course_level_intermediate_1792520565056.jpg',
    lessons: [
      {
        id: 'les-2-1',
        title: 'Pelajaran 7: Teknik Few-Shot & Chain-of-Thought (CoT) Prompting',
        duration: '22 minit',
        durationMinutes: 22,
        videoUrl: 'https://www.youtube-nocookie.com/embed/v2g_W257uT8',
        summary: 'Tingkatkan ketepatan logik model sehingga 85%. Berikan contoh teladan (Few-Shot) dan minta model berfikir langkah demi langkah (Chain-of-Thought).',
        keyPoints: [
          'Zero-Shot: Tiada contoh diberikan, model meramal secara terus.',
          'Few-Shot: Memberikan 2 hingga 3 contoh input-output yang konsisten sebelum tugasan sebenar.',
          'Chain-of-Thought: Memaksa model membina rantai penaakulan sebelum mengeluarkan kesimpulan akhir.',
          'Self-Consistency: Meminta model menjana pelbagai jalan penyelesaian dan memilih yang paling konsisten.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Mengapa Zero-Shot Kerap Gagal Pada Tugasan Rumit' },
          { time: '05:30', seconds: 330, title: 'Struktur Few-Shot Yang Betul' },
          { time: '11:15', seconds: 675, title: 'Kuasa "Mari kita fikir langkah demi langkah"' },
          { time: '17:00', seconds: 1020, title: 'Demonstrasi Live: Pengiraan & Analisis Logik' }
        ],
        transcriptSnippet: 'Apabila kita meminta manusia menyelesaikan masalah matematik kompleks, kita tidak minta jawapan serta merta; kita minta mereka tunjukkan jalan kerja. Perkara yang sama berlaku kepada LLM melalui Chain of Thought.',
        practicePrompt: 'Tulis satu prompt Few-Shot yang mengajar AI mengklasifikasikan aduan pelanggan kepada: [Teknikal, Bil, Penghantaran] beserta tahap kecemasan [Tinggi/Rendah].',
        resources: [
          { title: 'Bank Contoh Few-Shot Prompt', url: '#' }
        ]
      },
      {
        id: 'les-2-2',
        title: 'Pelajaran 8: Analisis Data, Sintesis PDF & Penyediaan Laporan Korporat',
        duration: '20 minit',
        durationMinutes: 20,
        videoUrl: 'https://www.youtube-nocookie.com/embed/5sLYAQS9sWQ',
        summary: 'Kuasai keupayaan memuat naik dokumen PDF 50 muka surat, mengekstrak metrik penting, mencari percanggahan, dan menghasilkan ringkasan eksekutif bernilai tinggi.',
        keyPoints: [
          'Memanfaatkan Context Window besar (1M+ token dalam Gemini) untuk analisis laporan tahunan.',
          'Prompt pengekstrakan berstruktur untuk data kewangan dan jadual.',
          'Meminta petikan rujukan langsung (citation) daripada teks asal.',
          'Format jadual perbandingan KPI antara suku tahun.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Strategi Memproses Dokumen Panjang' },
          { time: '06:00', seconds: 360, title: 'Prompting untuk Ringkasan Eksekutif' },
          { time: '12:30', seconds: 750, title: 'Mengekstrak Data ke CSV / Markdown Table' },
          { time: '17:40', seconds: 1060, title: 'Tips Menghindari Halusinasi Dokumen' }
        ],
        transcriptSnippet: 'Kelebihan utama model generasi baru adalah keupayaan membaca dokumen ratusan muka surat serentak. Namun tanpa arahan ekstraksi yang teliti, model cenderung hanya membaca bahagian awal dan akhir sahaja.',
        practicePrompt: 'Tulis prompt untuk mengekstrak 3 risiko perniagaan terbesar dan cadangan mitigasi daripada laporan tahunan syarikat.',
        resources: [
          { title: 'Templat Analisis PDF Profesional', url: '#' }
        ]
      }
    ]
  },
  {
    id: 'mod-2-2',
    level: 'level_2',
    title: 'Modul 5: Penjanaan Media Visual & Audio Berasaskan AI',
    description: 'Terokai seni bina Diffusion Models, penulisan prompt imej artistik & fotorealistik, serta alatan penjanaan suara dan video.',
    iconName: 'Image',
    coverImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=80',
    lessons: [
      {
        id: 'les-2-3',
        title: 'Pelajaran 9: Menguasai Penjanaan Imej (Diffusion Models & Prompts Visual)',
        duration: '25 minit',
        durationMinutes: 25,
        videoUrl: 'https://www.youtube-nocookie.com/embed/1CIpzeNxIhU',
        summary: 'Pelajari bagaimana model resapan (Diffusion Models) menukar hingar (noise) kepada karya seni. Struktur prompt visual: Subjek, Pencahayaan, Sudut Kamera, Palet Warna, dan Nisbah Aspek.',
        keyPoints: [
          'Konsep Latent Space dan proses Denoising dalam Diffusion Models.',
          'Anatomi prompt visual yang berkesan: komposisi, gaya, lensa kamera, suasana.',
          'Penggunaan Negative Prompt untuk membuang elemen yang tidak diingini.',
          'Pengekalan konsistensi watak (Character consistency) merentas siri gambar.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Bagaimana Diffusion Model Berfungsi' },
          { time: '05:40', seconds: 340, title: '5 Komponen Utama Prompt Imej Berkualiti Tinggi' },
          { time: '13:20', seconds: 800, title: 'Parameter Kamera: Focal Length, Pencahayaan & Render' },
          { time: '20:00', seconds: 1200, title: 'Latihan Praktikal Reka Bentuk Produk' }
        ],
        transcriptSnippet: 'Model imej tidak memahami tatabahasa seperti LLM. Ia bertindak balas kepada kata kunci visual, istilah fotografi, dan penerangan tekstur secara spesifik.',
        practicePrompt: 'Tulis prompt visual untuk fotografi produk minyak wangi mewah di atas batu marmar dengan pencahayaan waktu senja lembut.',
        resources: [
          { title: 'Buku Panduan Kata Kunci Fotografi AI', url: '#' }
        ]
      },
      {
        id: 'les-2-4',
        title: 'Pelajaran 10: AI untuk Audio, Suara Sintetik & Penjanaan Video',
        duration: '18 minit',
        durationMinutes: 18,
        videoUrl: 'https://www.youtube-nocookie.com/embed/ybbEIXXUtTU',
        summary: 'Pelajari teknologi Text-to-Speech moden, kloning suara bertanggungjawab, alatan avatar bercakap, dan video generatif berasaskan teks.',
        keyPoints: [
          'Teknologi Neural Vocoder dan model suara ekspresif.',
          'Penggunaan AI untuk alih suara (dubbing) automatik berbilang bahasa.',
          'Model Text-to-Video terkini dan cabaran temporal consistency.',
          'Langkah berjaga-jaga terhadap deepfake dan pengesahan ketulenan media.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Evolusi Text-to-Speech & Voice Cloning' },
          { time: '05:10', seconds: 310, title: 'Avatar Video & Pembuatan Modul Latihan Pantas' },
          { time: '10:45', seconds: 645, title: 'Model Penjanaan Video Masa Depan' },
          { time: '15:00', seconds: 900, title: 'Isu Deepfake & Etika Suara' }
        ],
        transcriptSnippet: 'Dalam masa kurang 3 tahun, teknologi suara telah beralih daripada bunyi robotik monyet kepada suara yang mempunyai intonasi nafas, gelak tawa, dan emosi yang sangat meyakinkan.',
        practicePrompt: 'Bagaimanakah syarikat boleh melindungi jenama mereka daripada ancaman penyalahgunaan deepfake suara CEO mereka?',
        resources: [
          { title: 'Senarai Semak Pengesahan Video AI', url: '#' }
        ]
      }
    ]
  },
  {
    id: 'mod-2-3',
    level: 'level_2',
    title: 'Modul 6: Automasi Aliran Kerja Berkuasa AI',
    description: 'Gabungkan alat AI dengan sistem automasi (seperti Make, Zapier, Google Sheets) untuk menghapuskan tugasan rutin yang berulang.',
    iconName: 'Workflow',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    lessons: [
      {
        id: 'les-2-5',
        title: 'Pelajaran 11: Mengautomasikan Spreadsheet & Analisis Sentimen',
        duration: '21 minit',
        durationMinutes: 21,
        videoUrl: 'https://www.youtube-nocookie.com/embed/bXv2l_bZc6Y',
        summary: 'Ketahui cara menghantar ratusan ulasan pelanggan ke model AI secara pukal untuk mengkategorikan sentimen, isu teras, dan menjana draf balasan emel peribadi secara automatik.',
        keyPoints: [
          'Menghubungkan formula AI ke dalam spreadsheet (Google Sheets / Excel).',
          'Analisis sentimen teks pelanggan: Positif, Neutral, Negatif berserta hujah.',
          'Mengelaskan pertanyaan pelanggan kepada kategori produk secara automatik.',
          'Menjana draf jawapan khidmat pelanggan yang diperibadikan.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Senario Masalah: 500 Maklum Balas Pelanggan Setiap Hari' },
          { time: '05:20', seconds: 320, title: 'Formula AI dalam Spreadsheet' },
          { time: '12:00', seconds: 720, title: 'Prompt Khusus untuk Output JSON/Jadual Bersih' },
          { time: '17:30', seconds: 1050, title: 'Ujian Pengesahan Ketepatan Output' }
        ],
        transcriptSnippet: 'Daripada membaca ulasan satu persatu selama berjam-jam, kita boleh memprogramkan model untuk mengimbas kesemua ulasan dalam beberapa saat dan menghasilkan carta rumusan segera.',
        practicePrompt: 'Reka bentuk satu aliran kerja untuk memproses aduan emel: dari pengekstrakan nombor rujukan, analisis tahap kecemasan, hingga ke draf balasan.',
        resources: [
          { title: 'Templat Sheet Analisis AI', url: '#' }
        ]
      },
      {
        id: 'les-2-6',
        title: 'Pelajaran 12: Pengurusan Pengetahuan Pasukan Menggunakan AI',
        duration: '16 minit',
        durationMinutes: 16,
        videoUrl: 'https://www.youtube-nocookie.com/embed/zckh39bHqXg',
        summary: 'Cara membina pangkalan pengetahuan dalaman (Internal Knowledge Base) syarikat dengan AI tanpa membocorkan rahsia perdagangan atau data sulit.',
        keyPoints: [
          'Perbezaan antara akaun pengguna biasa dan penyelesaian perusahaan berasaskan privasi.',
          'Menyediakan SOP digital yang boleh disoal jawab oleh staf baharu secara 24/7.',
          'Memastikan konsistensi pematuhan dasar korporat.',
          'Audit trail dan log penggunaan AI dalam organisasi.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Cabaran Maklumat Bertaburan dalam Organisasi' },
          { time: '04:30', seconds: 270, title: 'Membina SOP Pintar Berasaskan AI' },
          { time: '09:40', seconds: 580, title: 'Kawalan Akses & Perlindungan IP Syarikat' },
          { time: '13:15', seconds: 795, title: 'Pelan Pelaksanaan 30 Hari' }
        ],
        transcriptSnippet: 'Sebuah syarikat yang berjaya bukan sekadar melanggan alat AI, tetapi mempunyai strategi jelas bagaimana pengetahuan warga kerja dipelihara dan boleh diakses secara pintar.',
        practicePrompt: 'Apakah 3 kriteria utama yang perlu dinilai sebelum sesebuah syarikat memilih platform AI untuk pangkalan pengetahuan dalaman?',
        resources: [
          { title: 'Buku Putih: AI untuk Organisasi', url: '#' }
        ]
      }
    ]
  },

  // ================= TAHAP 3 =================
  {
    id: 'mod-3-1',
    level: 'level_3',
    title: 'Modul 7: Seni Bina Transformer & Vektor Dimensi',
    description: 'Membongkar matematik dan sains komputer di sebalik Transformer, mekanisma Self-Attention, proses tokenisasi dan ruang vektor embedding.',
    iconName: 'Network',
    coverImage: '/src/assets/images/course_level_advanced_1792520565131.jpg',
    lessons: [
      {
        id: 'les-3-1',
        title: 'Pelajaran 13: Mekanisme Self-Attention & Kertas Kerja "Attention Is All You Need"',
        duration: '28 minit',
        durationMinutes: 28,
        videoUrl: 'https://www.youtube-nocookie.com/embed/wjZofJX0v4U',
        summary: 'Penerangan visual mendalam mengenai kertas kerja legenda 2017. Bagaimana Query, Key, dan Value vectors membolehkan perkataan memahami konteks perkataan lain dalam sesebuah ayat secara serentak.',
        keyPoints: [
          'Kelemahan RNN dan LSTM dalam memproses jujukan teks panjang secara selari.',
          'Konsep Query (Q), Key (K), dan Value (V) dalam matriks perkalian.',
          'Formula Skala Titik Produk Perhatian: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V.',
          'Multi-Head Attention: Membolehkan model memfokuskan kepada pelbagai aspek tatabahasa serentak.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Mengapa RNN Digantikan oleh Transformer' },
          { time: '07:20', seconds: 440, title: 'Analogi Q, K, V Menggunakan Sistem Carian' },
          { time: '14:30', seconds: 870, title: 'Langkah Demi Langkah Pengiraan Matriks Attention' },
          { time: '22:15', seconds: 1335, title: 'Multi-Head Attention & Positional Encoding' }
        ],
        transcriptSnippet: 'Sebelum kemunculan Transformer, komputer membaca teks secara berurutan dari kiri ke kanan. Transformer merevolusikan segalanya dengan membaca seluruh ayat sekali gus sambil mengira sejauh mana setiap perkataan mempengaruhi perkataan lain.',
        practicePrompt: 'Jelaskan mengapa "Positional Encoding" amat diperlukan dalam seni bina Transformer memandangkan ia tidak membaca teks secara berurutan.',
        resources: [
          { title: 'Kertas Kerja Asal: Attention Is All You Need (PDF)', url: 'https://arxiv.org/abs/1706.03762' },
          { title: 'Simulasi Interaktif Transformer', url: '#visualizer' }
        ]
      },
      {
        id: 'les-3-2',
        title: 'Pelajaran 14: Tokenisasi, Vector Embeddings & Ruang Dimensi Latent',
        duration: '24 minit',
        durationMinutes: 24,
        videoUrl: 'https://www.youtube-nocookie.com/embed/bXv2l_bZc6Y',
        summary: 'Pelajari bagaimana teks ditukar kepada token angka, bagaimana Byte-Pair Encoding (BPE) berfungsi, dan bagaimana perkataan dipetakan ke dalam vektor berdimensi tinggi (contoh: 1536 dimensi).',
        keyPoints: [
          'Token bukanlah perkataan tunggal; 1 token secara purata bersamaan lebih kurang 0.75 perkataan Inggeris.',
          'Byte-Pair Encoding (BPE) membolehkan model menangani perkataan jarang atau bahasa campuran (seperti Melayu/Inggeris).',
          'Vector Embedding meletakkan konsep yang mempunyai makna serupa berdekatan antara satu sama lain dalam ruang geometri.',
          'Pengiraan Jarak Kosinus (Cosine Similarity) antara dua vektor.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Proses Tokenisasi & Pecahan Sub-perkataan' },
          { time: '06:10', seconds: 370, title: 'Apakah itu Vector Embedding?' },
          { time: '13:00', seconds: 780, title: 'Contoh Klasik: Raja - Lelaki + Wanita = Ratu' },
          { time: '19:20', seconds: 1160, title: 'Mengira Cosine Similarity dalam Kod' }
        ],
        transcriptSnippet: 'Komputer tidak faham maksud huruf "A", "P", "L", "E". Tetapi apabila kita menukar "Epal" kepada koordinat berangka dalam ruang 1536-dimensi, komputer boleh mengira jarak koordinatnya dengan perkataan "Buah" atau "Makanan".',
        practicePrompt: 'Apakah implikasi tokenisasi terhadap kos penggunaan API LLM sekiranya kita menggunakan bahasa bukan bahasa Inggeris yang memerlukan pecahan sub-token lebih banyak?',
        resources: [
          { title: 'Panduan Kod Python untuk Tokenisasi', url: '#' }
        ]
      }
    ]
  },
  {
    id: 'mod-3-2',
    level: 'level_3',
    title: 'Modul 8: Retrieval-Augmented Generation (RAG) & Pangkalan Data Vektor',
    description: 'Kuasai seni bina RAG untuk menyambungkan dokumen swasta syarikat kepada model bahasa besar secara tepat dan selamat.',
    iconName: 'Database',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    lessons: [
      {
        id: 'les-3-3',
        title: 'Pelajaran 15: Mengapa RAG? Seni Bina RAG Lengkap dari A ke Z',
        duration: '26 minit',
        durationMinutes: 26,
        videoUrl: 'https://www.youtube-nocookie.com/embed/T-D1OfcDW1M',
        summary: 'Fahami mengapa fine-tuning bukan jawapan untuk semua masalah. RAG menyelesaikan isu halusinasi dan pengetahuan lapuk dengan mengambil cebisan teks yang relevan dari dokumen sebelum menghantar arahan kepada LLM.',
        keyPoints: [
          'Masalah LLM terhad: Pengetahuan lapuk, tiada akses data dalaman, dan halusinasi fakta.',
          'Tiga fasa utama RAG: Ingestion (pemasukan data), Retrieval (pencarian vektor), dan Generation (penjanaan jawapan berasaskan rujukan).',
          'Strategi Chunking dokumen: Fixed-size, Semantic Chunking, dan Recursive Character Splitting.',
          'Pangkalan data vektor popular: ChromaDB, Pinecone, Qdrant, dan pgvector.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Kelemahan Model Asal & Pengenalan RAG' },
          { time: '06:30', seconds: 390, title: 'Aliran Data Lengkap Sistem RAG' },
          { time: '13:45', seconds: 825, title: 'Strategi Chunking & Pertindihan (Chunk Overlap)' },
          { time: '20:10', seconds: 1210, title: 'Memilih Pangkalan Data Vektor yang Tepat' }
        ],
        transcriptSnippet: 'Fikirkan RAG seperti ujian "Open Book". Kita tidak perlu memaksa pelajar menghafal setiap muka surat perpustakaan (Fine-Tuning); kita hanya perlu mengajar pelajar bagaimana membuka bab buku yang betul sebelum menjawab soalan.',
        practicePrompt: 'Jika anda membina RAG untuk buku panduan undang-undang perburuhan Malaysia, apakah saiz chunk dan strategi chunking yang paling berkesan?',
        resources: [
          { title: 'Gambarajah Seni Bina RAG Pengeluaran (PNG)', url: '#' },
          { title: 'Cuba Simulator RAG Interaktif', url: '#visualizer' }
        ]
      },
      {
        id: 'les-3-4',
        title: 'Pelajaran 16: Pengoptimuman RAG: Re-ranking, HyDE & Evaluasi Ketepatan',
        duration: '23 minit',
        durationMinutes: 23,
        videoUrl: 'https://www.youtube-nocookie.com/embed/TRjq7t2Ms5I',
        summary: 'Tingkatkan ketepatan sistem RAG dari peringkat prototaip amatur ke tahap pengeluaran gred perusahaan dengan teknik Advanced RAG.',
        keyPoints: [
          'Kelemahan Pencarian Vektor Mudah (Semantic drift & irrelevant top-k chunks).',
          'Teknik Re-ranking menggunakan Cross-Encoder (seperti Cohere Rerank) untuk menyusun semula dokumen paling relevan.',
          'Hypothetical Document Embeddings (HyDE): Menjana dokumen andaian dahulu sebelum carian dilakukan.',
          'RAG Triad Metrics: Context Relevance, Groundedness (Faithfulness), dan Answer Relevance.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Mengapa RAG Asas Kerap Gagal dalam Pengeluaran' },
          { time: '05:30', seconds: 330, title: 'Teknik Cross-Encoder Re-Ranking' },
          { time: '11:50', seconds: 710, title: 'Kaedah HyDE untuk Pertanyaan Pendek' },
          { time: '17:30', seconds: 1050, title: 'Metrik Penilaian: Faithfulness & Answer Relevance' }
        ],
        transcriptSnippet: 'Membina RAG mudah mengambil masa satu petang. Tetapi menjadikan RAG tepat 99% memerlukan pemahaman mendalam tentang Re-ranking dan pemantauan kualiti konteks.',
        practicePrompt: 'Terangkan perbezaan antara "Bi-Encoder" (digunakan untuk indexing pantas) dan "Cross-Encoder" (digunakan untuk re-ranking tepat).',
        resources: [
          { title: 'Kertas Penyelidikan HyDE & Penilaian RAG', url: '#' }
        ]
      }
    ]
  },
  {
    id: 'mod-3-3',
    level: 'level_3',
    title: 'Modul 9: Ejen AI (AI Agents), Function Calling & Fine-Tuning',
    description: 'Membina aplikasi AI autonomi yang boleh memanggil fungsi API luaran, membuat keputusan berperingkat, serta perbandingan bila perlu Fine-Tuning.',
    iconName: 'Bot',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    lessons: [
      {
        id: 'les-3-5',
        title: 'Pelajaran 17: Membina Ejen AI Autonomi dengan Function Calling & Tools',
        duration: '27 minit',
        durationMinutes: 27,
        videoUrl: 'https://www.youtube-nocookie.com/embed/b-QG64P2f1E',
        summary: 'Bagaimana model bahasa boleh mengambil tindakan sebenar dalam dunia digital? Pelajari schema Function Calling, kitaran ReAct (Reasoning + Acting), dan pengurusan memori ejen.',
        keyPoints: [
          'Function Calling: Model tidak menjalankan kod sendiri; ia menghasilkan JSON berstruktur dengan nama fungsi dan argumen yang sah.',
          'Kitaran ReAct: Thought -> Action -> Observation -> Final Answer.',
          'Menyambungkan model ke API luar seperti cuaca, pangkalan data SQL, atau kalendar Google.',
          'Kawalan keselamatan (Guardrails): Memastikan ejen tidak menjalankan arahan merbahaya (Human-in-the-loop validation).'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Evolusi: Dari Chatbot Pasif kepada Ejen Bertindak' },
          { time: '06:15', seconds: 375, title: 'Bagaimana Function Calling Berfungsi (JSON Schema)' },
          { time: '13:40', seconds: 820, title: 'Kerangka Kerja ReAct: Thought, Action, Observation' },
          { time: '21:00', seconds: 1260, title: 'Membina Ejen Pembantu Penjadualan Peribadi' }
        ],
        transcriptSnippet: 'Keajaiban sebenar bermula apabila LLM tidak lagi terperangkap dalam tetingkap sembang, sebaliknya diberikan tangan dan kaki untuk memanggil API luar dan menyelesaikan tugasan bagi pihak anda.',
        practicePrompt: 'Reka bentuk satu JSON schema fungsi untuk sebuah ejen yang boleh menempah tiket penerbangan (parameter: bandar asal, destinasi, tarikh, kelas penerbangan).',
        resources: [
          { title: 'Contoh Kod Ejen Python/TypeScript', url: '#' }
        ]
      },
      {
        id: 'les-3-6',
        title: 'Pelajaran 18: Fine-Tuning, LoRA & Penilaian Keselamatan Model (Red Teaming)',
        duration: '25 minit',
        durationMinutes: 25,
        videoUrl: 'https://www.youtube-nocookie.com/embed/t500cgssuDo',
        summary: 'Ketahui bila patut melatih semula model menggunakan teknik Parameter-Efficient Fine-Tuning (PEFT/LoRA), serta proses Red Teaming untuk menguji kelemahan keselamatan model.',
        keyPoints: [
          'Matriks Keputusan: Prompt Engineering vs RAG vs Fine-Tuning.',
          'LoRA (Low-Rank Adaptation): Menjimatkan 90% memori GPU dengan melatih matriks rank rendah sahaja.',
          'Menyediakan dataset latihan JSONL berkualiti tinggi.',
          'Red Teaming & Jailbreak Testing: Melindungi model daripada serangan Prompt Injection.'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Matriks: Bila Perlu Fine-Tuning?' },
          { time: '05:50', seconds: 350, title: 'Prinsip Matematik LoRA & QLoRA' },
          { time: '12:40', seconds: 760, title: 'Penyediaan Dataset Supervised Fine-Tuning' },
          { time: '19:15', seconds: 1155, title: 'Ujian Keselamatan Red Teaming & Prompt Injection' }
        ],
        transcriptSnippet: 'Ramai yang menyangka mereka perlukan fine-tuning, padahal 90% masalah perniagaan boleh diselesaikan dengan RAG dan prompt yang tersusun dengan baik. Fine-tuning paling sesuai untuk mengajar gaya, nada bahasa, atau format khusus.',
        practicePrompt: 'Bincangkan apakah risiko keselamatan yang boleh berlaku sekiranya input pengguna luar disalurkan secara langsung ke dalam prompt sistem tanpa penapisan sanitize.',
        resources: [
          { title: 'Matriks Pemilihan Teknologi AI', url: '#' },
          { title: 'Ambil Kuiz Pengiktirafan Tahap 3', url: '#quiz' }
        ]
      }
    ]
  }
];

export const QUIZZES_DATA: Record<CourseLevel, LevelQuiz> = {
  level_1: {
    level: 'level_1',
    title: 'Ujian Kefahaman Tahap 1: Asas & Konsep AI',
    description: 'Uji pemahaman anda mengenai asas kecerdasan buatan, perbezaan model pembelajaran, dan formula prompt. Perlu skor 80% ke atas untuk membuka lencana pemula.',
    passingScore: 80,
    questions: [
      {
        id: 'q1-1',
        question: 'Apakah perbezaan utama antara "Narrow AI" dan "Artificial General Intelligence (AGI)"?',
        options: [
          'Narrow AI cemerlang dalam satu tugasan spesifik, manakala AGI merujuk kepada kecerdasan menyeluruh setaraf manusia.',
          'Narrow AI dicipta oleh syarikat kecil, manakala AGI dicipta oleh kerajaan.',
          'Narrow AI tidak memerlukan komputer, manakala AGI menggunakan komputer kuantum.',
          'Tiada perbezaan langsung; kedua-duanya istilah yang sama.'
        ],
        correctIndex: 0,
        explanation: 'Narrow AI (atau Weak AI) direka untuk menyelesaikan tugasan tertentu seperti pengecaman wajah atau terjemahan. AGI pula ialah AI hipotesis yang mempunyai keupayaan intelek menyeluruh menyerupai manusia.'
      },
      {
        id: 'q1-2',
        question: 'Apakah maksud fenomena "Halusinasi" dalam konteks Large Language Models (LLM)?',
        options: [
          'Komputer menjadi panas melampau akibat bebanan kerja berlebihan.',
          'Model AI menghasilkan maklumat yang kelihatan meyakinkan tetapi sebenarnya rekaan dan tidak benar secara fakta.',
          'Model AI mengalami serangan virus komputer.',
          'Pengguna berkhayal selepas terlalu lama menggunakan komputer.'
        ],
        correctIndex: 1,
        explanation: 'Halusinasi AI berlaku apabila model meramal perkataan seterusnya secara statistik tanpa sandaran fakta sebenar, menghasilkan ayat yang bunyinya sangat meyakinkan namun salah.'
      },
      {
        id: 'q1-3',
        question: 'Dalam formula Prompt CRTF, apakah yang diwakili oleh huruf "R"?',
        options: [
          'Restart (Mula semula sistem)',
          'Random (Hasilkan secara rawak)',
          'Role / Persona (Peranan atau kepakaran yang perlu dimainkan oleh model AI)',
          'Research (Mencari maklumat di Google)'
        ],
        correctIndex: 2,
        explanation: 'Huruf "R" mewakili Role (Peranan), iaitu menetapkan kepakaran spesifik model (contoh: "Bertindak sebagai Juruaudit Kewangan Bertauliah").'
      },
      {
        id: 'q1-4',
        question: 'Apakah kaedah pembelajaran mesin yang menggunakan ganjaran (rewards) dan denda (penalties) untuk mengajar ejen?',
        options: [
          'Supervised Learning',
          'Reinforcement Learning',
          'Unsupervised Learning',
          'Static Rule-based Learning'
        ],
        correctIndex: 1,
        explanation: 'Reinforcement Learning membolehkan ejen belajar melalui percubaan dan kesilapan (trial & error) dengan matlamat memaksimumkan ganjaran kumulatif.'
      },
      {
        id: 'q1-5',
        question: 'Mengapakah kita TIDAK patut memasukkan maklumat sulit syarikat atau kata laluan ke dalam alatan AI awam?',
        options: [
          'Kerana sistem AI akan rosak serta merta.',
          'Kerana data tersebut mungkin digunakan untuk melatih model semula dan boleh terdedah kepada pihak ketiga.',
          'Kerana AI tidak boleh membaca teks rahsia.',
          'Kerana internet akan menjadi perlahan.'
        ],
        correctIndex: 1,
        explanation: 'Model awam lazimnya menggunakan input pengguna untuk tujuan penambahbaikan dan latihan model, melainkan menggunakan versi enterprise yang mempunyai jaminan perlindungan data.'
      }
    ]
  },

  level_2: {
    level: 'level_2',
    title: 'Ujian Kefahaman Tahap 2: Aplikasi Praktikal & GenAI',
    description: 'Nilai keupayaan anda dalam teknik prompt lanjutan, sintesis maklumat korporat, dan penggunaan media generatif.',
    passingScore: 80,
    questions: [
      {
        id: 'q2-1',
        question: 'Apakah perbezaan utama antara Zero-Shot Prompting dan Few-Shot Prompting?',
        options: [
          'Zero-Shot tidak memerlukan sebarang internet, Few-Shot memerlukan wifi berkelajuan tinggi.',
          'Zero-Shot tidak memberikan sebarang contoh rujukan, manakala Few-Shot menyertakan beberapa contoh input-output yang diingini.',
          'Zero-Shot hanya untuk teks bahasa Inggeris, Few-Shot untuk semua bahasa.',
          'Zero-Shot dilakukan oleh pakar, manakala Few-Shot untuk kanak-kanak.'
        ],
        correctIndex: 1,
        explanation: 'Few-Shot prompting membimbing model dengan memberikan 1 hingga beberapa contoh pola output yang diingini sebelum meminta model menyelesaikan tugasan baharu.'
      },
      {
        id: 'q2-2',
        question: 'Apakah kesan menambah frasa "Mari kita fikirkan langkah demi langkah" (Chain-of-Thought) dalam prompt?',
        options: [
          'Ia mempercepatkan masa respons menjadi serta-merta.',
          'Ia memaksa model menunjukkan proses penaakulan berperingkat, sekaligus meningkatkan ketepatan masalah logik dan matematik.',
          'Ia akan memadamkan memori perbualan terdahulu.',
          'Ia menukar jawapan menjadi kod bahasa Python.'
        ],
        correctIndex: 1,
        explanation: 'Chain-of-Thought (CoT) membolehkan model membahagikan masalah rumit kepada langkah-langkah kecil sebelum membuat kesimpulan akhir.'
      },
      {
        id: 'q2-3',
        question: 'Dalam penjanaan imej menggunakan model resapan (Diffusion Models), apakah fungsi "Negative Prompt"?',
        options: [
          'Untuk menghasilkan imej yang bertema seram atau gelap.',
          'Menyatakan elemen, objek atau kualiti yang dilarang muncul dalam imej janaan.',
          'Mengurangkan penggunaan elektrik komputer.',
          'Menukar format gambar dari JPEG kepada PNG.'
        ],
        correctIndex: 1,
        explanation: 'Negative Prompt membimbing model untuk mengelak ciri-ciri tertentu (contoh: "blurry, extra fingers, watermark, low quality").'
      },
      {
        id: 'q2-4',
        question: 'Apakah kelebihan utama menggunakan model yang mempunyai "Context Window" yang sangat besar (seperti 1M+ token)?',
        options: [
          'Komputer boleh dimatikan semasa memproses dokumen.',
          'Model boleh membaca dan menganalisis keseluruhan buku atau fail PDF beratus muka surat serentak tanpa perlu dipotong-potong secara kasar.',
          'Skrin komputer akan menjadi lebih besar secara automatik.',
          'Semua jawapan dijamin 100% betul tanpa semakan manusia.'
        ],
        correctIndex: 1,
        explanation: 'Context window yang besar membolehkan memasukkan fail dokumen besar, transkrip rakaman panjang atau beribu baris kod dalam satu masa untuk dianalisis.'
      },
      {
        id: 'q2-5',
        question: 'Apakah prinsip "Human-in-the-Loop" dalam pelaksanaan automasi AI korporat?',
        options: [
          'Manusia mesti duduk di dalam bilik pelayan komputer sepanjang masa.',
          'Keputusan kritikal AI mesti disemak atau diluluskan oleh manusia sebelum tindakan rasmi diambil.',
          'Hanya manusia yang dibenarkan menaip arahan di papan kekunci.',
          'Pekerja mesti digantikan sepenuhnya oleh AI dalam tempoh 1 tahun.'
        ],
        correctIndex: 1,
        explanation: 'Human-in-the-loop memastikan manusia mengekalkan pengawasan (oversight) terhadap keputusan bernilai tinggi seperti kelulusan pinjaman, laporan kewangan, atau diagnos perubatan.'
      }
    ]
  },

  level_3: {
    level: 'level_3',
    title: 'Ujian Kefahaman Tahap 3: Arkitektur Lanjutan, RAG & Ejen AI',
    description: 'Ujian teknikal komprehensif menguji pengetahuan mendalam mengenai mekanisme Transformer, RAG, pangkalan data vektor dan seni bina Ejen AI.',
    passingScore: 80,
    questions: [
      {
        id: 'q3-1',
        question: 'Dalam mekanisme Self-Attention pada model Transformer, apakah formula bagi Scaled Dot-Product Attention?',
        options: [
          'Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V',
          'Attention(Q, K, V) = Q + K + V',
          'Attention(Q, K, V) = sigmoid( Q * V ) / K',
          'Attention(Q, K, V) = argmax( Q * K )'
        ],
        correctIndex: 0,
        explanation: 'Formula asas Self-Attention menggunakan hasil darab dot Query dan Key yang dinormalisasikan dengan punca kuasa dimensi kunci, kemudian diaplikasikan fungsi softmax dan didarabkan dengan Value.'
      },
      {
        id: 'q3-2',
        question: 'Mengapakah sistem Retrieval-Augmented Generation (RAG) lebih disukai berbanding Fine-Tuning untuk menjawab soalan berdasarkan polisi dalaman syarikat yang kerap berubah?',
        options: [
          'Kerana RAG boleh mengemas kini pengetahuannya serta-merta hanya dengan menambah/mengemas kini dokumen dalam pangkalan data vektor tanpa kos latihan model semula yang mahal.',
          'Kerana RAG tidak memerlukan sebarang komputer atau kod perisian.',
          'Kerana Fine-Tuning dilarang oleh undang-undang antarabangsa.',
          'Kerana RAG sentiasa menghasilkan saiz fail yang lebih kecil.'
        ],
        correctIndex: 0,
        explanation: 'RAG memisahkan simpanan pengetahuan (pangkalan data vektor) daripada penaakulan model bahasa. Sebarang perubahan dokumen boleh terus dicari tanpa perlu melatih semula bobot (weights) model.'
      },
      {
        id: 'q3-3',
        question: 'Apakah fungsi kaedah "Re-ranking" (contohnya menggunakan Cross-Encoder) dalam saluran (pipeline) Advanced RAG?',
        options: [
          'Mengubah format fail teks daripada PDF kepada fail Word.',
          'Menyusun semula dan menilai kembali kepingan teks (chunks) teratas dengan ketepatan semantik lebih tinggi berbanding carian vektor bi-encoder asal.',
          'Memadam dokumen yang berumur lebih daripada 1 tahun.',
          'Mengurangkan kelajuan carian agar tidak membebankan pelayan.'
        ],
        correctIndex: 1,
        explanation: 'Bi-encoder menghasilkan carian awal yang sangat laju tetapi kurang peka interaksi silang. Re-ranker (cross-encoder) menilai pasangan soalan-dokumen secara terperinci untuk memastikan cebisan paling tepat berada di kedudukan teratas.'
      },
      {
        id: 'q3-4',
        question: 'Bagaimanakah keupayaan "Function Calling" membolehkan sesebuah model LLM berinteraksi dengan dunia luaran?',
        options: [
          'Model LLM menghubungi pengguna melalui panggilan telefon suara fizikal secara automatik.',
          'Model memproses arahan pengguna dan menjana struktur data (contohnya JSON) yang mengandungi nama fungsi dan argumen yang sah untuk dilaksanakan oleh aplikasi.',
          'Model menggodam masuk ke pelayan pihak ketiga tanpa kebenaran.',
          'Model menulis semula kod sistem operasi komputer.'
        ],
        correctIndex: 1,
        explanation: 'Model bahasa tidak mengeksekusi kod sistem secara langsung; ia mentafsir kehendak pengguna dan mengeluarkan output JSON tersusun mengikut schema fungsi yang boleh dipanggil oleh perisian pembangun.'
      },
      {
        id: 'q3-5',
        question: 'Apakah kelebihan utama teknik penalaan halus LoRA (Low-Rank Adaptation) berbanding Full Fine-Tuning?',
        options: [
          'LoRA membekukan sebahagian besar bobot asal model dan hanya melatih sepasang matriks rank rendah (low-rank matrices), sekaligus menjimatkan memori GPU dan masa latihan secara drastik.',
          'LoRA membolehkan model berfungsi tanpa bekalan elektrik.',
          'LoRA hanya menyokong model bersaiz bawah 100 parameter.',
          'LoRA menukar semua model AI menjadi sumber terbuka secara automatik.'
        ],
        correctIndex: 0,
        explanation: 'LoRA membekukan bobot model pra-latih dan memasukkan matriks penguraian rank rendah yang boleh dilatih ke dalam setiap lapisan Transformer, mengurangkan parameter latihan sebanyak 90% hingga 99%.'
      }
    ]
  }
};

export const GLOSSARY_DATA: GlossaryTerm[] = [
  {
    term: 'Artificial Intelligence (AI)',
    englishTerm: 'Kecerdasan Buatan',
    category: 'Asas',
    definition: 'Sistem komputer atau perisian yang mampu menjalankan tugasan yang lazimnya memerlukan kebijaksanaan manusia, seperti penaakulan, pemahaman bahasa, dan pengecaman visual.',
    example: 'Sistem navigasi Waze yang meramalkan kesesakan jalan raya menggunakan corak trafik terdahulu.'
  },
  {
    term: 'Machine Learning (ML)',
    englishTerm: 'Pembelajaran Mesin',
    category: 'Asas',
    definition: 'Cabang AI yang memberi komputer keupayaan untuk belajar dan menambah baik prestasinya daripada data tanpa perlu diprogramkan peraturan demi peraturan secara manual.',
    example: 'Penapis spam emel yang belajar mengenal pasti e-mel promosi berdasarkan kata kunci dan tindakan pengguna.'
  },
  {
    term: 'Deep Learning (DL)',
    englishTerm: 'Pembelajaran Mendalam',
    category: 'Teknikal',
    definition: 'Sub-bidang ML berasaskan Rangkaian Saraf Tiruan (Neural Networks) dengan pelbagai lapisan tersembunyi yang mampu mengekstrak ciri-ciri kompleks secara automatik.',
    example: 'Model pengecaman wajah yang mengesan bentuk tepi, kontur hidung, dan jarak mata merentas pelbagai lapisan saraf.'
  },
  {
    term: 'Large Language Model (LLM)',
    englishTerm: 'Model Bahasa Besar',
    category: 'Model & LLM',
    definition: 'Model Deep Learning berparameter berbilion yang dilatih menggunakan korpus teks gergasi untuk memahami dan menjana bahasa semula jadi manusia.',
    example: 'Google Gemini, ChatGPT (OpenAI), Claude (Anthropic).'
  },
  {
    term: 'Generative AI (GenAI)',
    englishTerm: 'AI Generatif',
    category: 'Model & LLM',
    definition: 'Kategori model AI yang berkebolehan mencipta output baharu yang belum pernah wujud sebelumnya—termasuk teks karangan, kod pengaturcaraan, gambar lukisan, mahupun muzik.',
    example: 'Meminta AI melukis poster promosi kopi tempatan dalam gaya cat air.'
  },
  {
    term: 'Prompt Engineering',
    englishTerm: 'Kejuruteraan Prompt',
    category: 'Asas',
    definition: 'Seni dan teknik mereka bentuk arahan teks yang tepat, berstruktur, dan optimum bagi mendapatkan hasil terbaik dan paling relevan daripada model AI.',
    example: 'Menggunakan formula CRTF (Konteks, Peranan, Tugasan, Format) berbanding soalan sepintas lalu.'
  },
  {
    term: 'Hallucination',
    englishTerm: 'Halusinasi AI',
    category: 'Model & LLM',
    definition: 'Keadaan di mana model AI menghasilkan fakta atau maklumat palsu dengan gaya bahasa yang penuh yakin kerana model hanya meneka kemungkinan kebarangkalian perkataan.',
    example: 'Model AI memberikan tarikh peristiwa bersejarah yang tidak pernah wujud.'
  },
  {
    term: 'Token',
    englishTerm: 'Token (Unit Teks)',
    category: 'Teknikal',
    definition: 'Unit asas teks yang diproses oleh LLM. Token boleh merupakan perkataan penuh, sebahagian perkataan (sub-word), atau satu aksara tanda baca.',
    example: 'Perkataan "Membaca" mungkin dipecahkan menjadi 2 token: "Mem" dan "baca".'
  },
  {
    term: 'Context Window',
    englishTerm: 'Tetingkap Konteks',
    category: 'Teknikal',
    definition: 'Jumlah maksimum token (input teks dan output jawapan) yang boleh diingati atau diproses oleh model dalam satu sesi interaksi serentak.',
    example: 'Model Gemini 1.5 Pro mempunyai tetingkap konteks sehingga 1 juta hingga 2 juta token.'
  },
  {
    term: 'Vector Embedding',
    englishTerm: 'Vektor Terbenam',
    category: 'Teknikal',
    definition: 'Perwakilan berangka (vektor koordinat nombor) bagi perkataan, ayat, atau dokumen yang meletakkan konsep bermakna serupa berdekatan antara satu sama lain dalam ruang matematik.',
    example: 'Vektor perkataan "Doktor" terletak sangat hampir dengan vektor perkataan "Hospital" dan "Pembedahan".'
  },
  {
    term: 'Retrieval-Augmented Generation (RAG)',
    englishTerm: 'RAG (Penjanaan Berpandukan Carian)',
    category: 'Teknikal',
    definition: 'Seni bina yang mencari maklumat terkini daripada dokumen atau pangkalan data luaran terlebih dahulu, kemudian membekalkannya sebagai konteks kepada LLM untuk menghasilkan jawapan berasaskan fakta sebenar.',
    example: 'Chatbot syarikat perbankan yang merujuk terus kepada fail PDF terma pinjaman perumahan sebelum menjawab pelanggan.'
  },
  {
    term: 'Self-Attention',
    englishTerm: 'Perhatian Kendiri (Mekanisme)',
    category: 'Teknikal',
    definition: 'Komponen utama seni bina Transformer yang membolehkan model mengira pengaruh dan kaitan antara setiap perkataan dalam satu ayat secara serentak.',
    example: 'Dalam ayat "Bank ini terletak di tebing sungai", model tahu perkataan "tebing" memberi maksud "tepi air", bukan institusi kewangan.'
  },
  {
    term: 'AI Agent (Ejen AI)',
    englishTerm: 'Ejen Autonomi AI',
    category: 'Model & LLM',
    definition: 'Sistem berautonomi yang menggunakan LLM sebagai otak untuk membuat perancangan langkah demi langkah, menggunakan alat (tools/APIs), dan menyelesaikan tugasan berperingkat secara berdikari.',
    example: 'Ejen percutian yang boleh menyemak tiket kapal terbang, menempah hotel, dan menghantar kalendar penginapan ke emel anda.'
  },
  {
    term: 'Fine-Tuning',
    englishTerm: 'Penalaan Halus Model',
    category: 'Teknikal',
    definition: 'Proses melatih semula model pra-latih menggunakan dataset khusus yang lebih kecil untuk menyesuaikan nada bahasa, gaya penulisan, atau domain teknikal tertentu.',
    example: 'Melatih model asas perubatan dengan ribuan rekod diagnosis untuk menguasai istilah biologi klinikal.'
  },
  {
    term: 'LoRA (Low-Rank Adaptation)',
    englishTerm: 'Adaptasi Pangkat Rendah',
    category: 'Teknikal',
    definition: 'Kaedah fine-tuning yang cekap sumber (PEFT) dengan hanya melatih pasangan matriks kecil tanpa mengubah keseluruhan berbilion parameter asal model.',
    example: 'Menala halus model 7B parameter pada komputer riba berkuasa sederhana dalam masa beberapa jam sahaja.'
  },
  {
    term: 'Algorithmic Bias',
    englishTerm: 'Bias Algoritma',
    category: 'Etika',
    definition: 'Kecenderungan sistem AI menghasilkan keputusan yang tidak adil atau berat sebelah akibat data latihan sejarah yang mengandungi prasangka manusia atau jurang statistik.',
    example: 'Sistem tapisan permohonan kerja yang mendiskriminasi calon berdasarkan jantina kerana data sejarah terdahulu didominasi satu golongan.'
  },
  {
    term: 'Reinforcement Learning from Human Feedback (RLHF)',
    englishTerm: 'RLHF (Maklum Balas Manusia)',
    category: 'Model & LLM',
    definition: 'Kaedah penyelarasan (alignment) model di mana penilai manusia menilai kualiti jawapan AI agar model belajar menjadi lebih membantu, tepat, dan selamat daripada kandungan berbahaya.',
    example: 'Menjadikan model enggan memberikan arahan membina bahan letupan atau bahan beracun.'
  },
  {
    term: 'Zero-Shot vs Few-Shot',
    englishTerm: 'Zero-Shot Lawan Few-Shot',
    category: 'Asas',
    definition: 'Zero-shot ialah meminta model melakukan tugasan tanpa sebarang contoh; Few-shot menyertakan beberapa contoh input dan output untuk membimbing model.',
    example: 'Memberikan contoh format 2 ulasan pelanggan sebelum meminta AI menganalisis ulasan ketiga.'
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'f-1',
    name: 'Dr. Farhan Azim',
    role: 'Penyelidik AI Kanan & Pengasas',
    affiliation: 'Makmal Kecerdasan Generatif',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    expertise: ['Large Language Models', 'Seni Bina Transformer', 'AI Alignment']
  },
  {
    id: 'f-2',
    name: 'Sarah Liyana',
    role: 'Ketua Kejuruteraan Prompt',
    affiliation: 'Nexus Generative Studio',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    expertise: ['Prompting CRTF', 'Few-Shot Learning', 'Penilaian Model']
  },
  {
    id: 'f-3',
    name: 'Amirul Hakim',
    role: 'Arkitek Machine Learning',
    affiliation: 'DataForge Technologies',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    expertise: ['Pipeline RAG', 'Pangkalan Data Vektor', 'Embeddings']
  },
  {
    id: 'f-4',
    name: 'Dr. Nadia Mansor',
    role: 'Saintis Data Kanan & NLP',
    affiliation: 'Pusat Analisis AI Kebangsaan',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    expertise: ['Pemprosesan Bahasa Alami', 'Fine-Tuning LoRA', 'Etika Data']
  },
  {
    id: 'f-5',
    name: 'Kenneth Tan',
    role: 'Jurutera Sistem AI Autonomi',
    affiliation: 'Cognitive Matrix Lab',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    expertise: ['Autonomous Agents', 'Function Calling JSON', 'ReAct Pattern']
  },
  {
    id: 'f-6',
    name: 'Aiman Zhafri',
    role: 'Pengarah Kreatif Visual AI',
    affiliation: 'Synapse Media Lab',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80',
    expertise: ['Difusi Model', 'ControlNet', 'Penjanaan Visual Komersial']
  },
  {
    id: 'f-7',
    name: 'Yasmin Razali',
    role: 'Penyelidik Keselamatan & Halusinasi AI',
    affiliation: 'CyberGov & AI Trust Alliance',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80',
    expertise: ['Pencegahan Injection', 'Grounding Data', 'Audit Ketepatan']
  },
  {
    id: 'f-8',
    name: 'Lee Min-Soo',
    role: 'Jurutera Infrastruktur MLOps',
    affiliation: 'TensorScale Cloud',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    expertise: ['Pengedaran Model GPU', 'Inference Optimization', 'vLLM']
  },
  {
    id: 'f-9',
    name: 'Irfan Dani',
    role: 'Pakar Automasi Aliran Kerja Korporat',
    affiliation: 'AutomateIQ Solutions',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    expertise: ['Integrasi Zapier & Make', 'AI Spreadsheet Formula', 'ROI Korporat']
  },
  {
    id: 'f-10',
    name: 'Elena Rostova',
    role: 'Penyelidik Multimodal Vision & Audio',
    affiliation: 'Global Intelligence Research',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    expertise: ['Whisper Audio Transcription', 'Vision Transformers', 'Multi-Modal Reasoning']
  }
];

export const STORE_COURSES: StoreCourse[] = [
  {
    id: 'course-tahap-1',
    level: 'level_1',
    title: 'Tahap 1: Asas & Pengenalan Kecerdasan Buatan',
    tagline: 'Kefahaman Konseptual, Cara AI Berfikir, & Asas Prompting',
    description: 'Bermula dari sifar tanpa latar belakang teknikal. Fahami bagaimana AI berfikir, perbezaan Machine Learning dan Deep Learning, etika AI serta menguasai formula prompt asas.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/2ePf9rue1Ao',
    instructor: {
      name: 'Dr. Farhan Azim',
      role: 'Penyelidik AI Kanan & Bekas Saintis Data Silicon Valley',
      avatar: '/src/assets/images/instructor_ai_expert_1792521714332.jpg'
    },
    isFree: true,
    price: 0,
    originalPrice: 99,
    badge: 'PERCUMA',
    rating: 4.95,
    reviewsCount: 1840,
    studentsCount: '18,900+',
    totalModules: 3,
    totalLessons: 6,
    totalHours: '3.5 Jam',
    coverImage: '/src/assets/images/course_level_beginner_1792520563264.jpg',
    levelCategory: 'Pemula',
    targetAudience: 'Pelajar, pendidik, eksekutif, dan sesiapa sahaja yang mahu celik AI dari asas.',
    skillsLearned: [
      'Memahami Narrow AI, AGI dan Model Asas',
      'Formula Prompt Engineering CRTF Asas',
      'Memahami Latihan Dataset & Had AI',
      'Etika, Hak Cipta & Privasi Data'
    ],
    includes: [
      '6 Pelajaran Video HD Bahasa Melayu',
      'Akses Makmal Prompt Interaktif',
      'Ujian Penilaian & Sijil Kelayakan Percuma',
      'Akses Sepanjang Hayat'
    ]
  },
  {
    id: 'course-tahap-2',
    level: 'level_2',
    title: 'Tahap 2: Aplikasi Praktikal & Alatan Generative AI',
    tagline: 'Kuasai LLM Lanjutan, Penjanaan Imej, Media AI & Automasi Kerja',
    description: 'Lonjakkan produktiviti kerja 10x ganda. Pelajari teknik prompting lanjutan, kejuruteraan difusi model imej, analisis PDF dokumen tebal secara automatik dan automasi spreadsheet.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/ukzFI9rgwfU',
    instructor: {
      name: 'Aiman Zhafri',
      role: 'Pengarah Kreatif Visual AI & Pereka Sistem Generatif',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80'
    },
    isFree: false,
    price: 99,
    originalPrice: 199,
    badge: 'TERLARIS',
    rating: 4.92,
    reviewsCount: 980,
    studentsCount: '8,420+',
    totalModules: 3,
    totalLessons: 6,
    totalHours: '4.5 Jam',
    coverImage: '/src/assets/images/course_level_intermediate_1792520565056.jpg',
    levelCategory: 'Pertengahan',
    targetAudience: 'Pencipta kandungan, eksekutif perniagaan, pereka grafik, marketer & pengurus projek.',
    skillsLearned: [
      'Few-Shot & Chain-of-Thought Prompting',
      'Penjanaan Visual Fotorealistik Komersial',
      'Sintesis Dokumen Panjang & Data Tabular',
      'Aliran Kerja Automasi Produktiviti Berterusan'
    ],
    includes: [
      '6 Video Pembelajaran Amali Langkah demi Langkah',
      'Templat Prompt Komersial Siap Guna',
      'Kit Fail Latihan & Lembaran Kerja',
      'Sijil Pengamal AI Profesional',
      'Projek Portfolio Disahkan Fakulti'
    ]
  },
  {
    id: 'course-tahap-3',
    level: 'level_3',
    title: 'Tahap 3: Arkitektur Lanjutan, RAG & Ejen AI',
    tagline: 'Transformer, Vektor Database, RAG, API & Ejen Autonomi',
    description: 'Menyelami ke dalam kod dan arkitektur enjin AI sebenar. Kuasai mekanisme Self-Attention Transformer, pembinaan saluran Retrieval-Augmented Generation (RAG) dan mereka bentuk Ejen AI.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/wjZofJX0v4U',
    instructor: {
      name: 'Dr. Farhan Azim & Amirul Hakim',
      role: 'Arkitek Kejuruteraan AI & Sistem Pangkalan Data Vektor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
    },
    isFree: false,
    price: 179,
    originalPrice: 350,
    badge: 'PREMIUM',
    rating: 4.98,
    reviewsCount: 640,
    studentsCount: '4,150+',
    totalModules: 3,
    totalLessons: 6,
    totalHours: '6.0 Jam',
    coverImage: '/src/assets/images/course_level_advanced_1792520565131.jpg',
    levelCategory: 'Lanjutan',
    targetAudience: 'Jurutera perisian, saintis data, pelajar sains komputer & arkitek sistem tech.',
    skillsLearned: [
      'Mekanisme Self-Attention Transformer',
      'Vector Embeddings & Cosine Similarity',
      'Membina Saluran Paip RAG Siap Pengeluaran',
      'Function Calling & Ejen AI Berautonomi Penuh'
    ],
    includes: [
      '6 Modul Kod Mendalam (Python & TS)',
      'Akses Simulator Visual Transformer & RAG',
      'Repositori Skrip Prototaip Ejen AI',
      'Sijil Jurutera AI Beriktiraf Kanan',
      'Akses Sesi Soal Jawab Khas bersama Pensyarah'
    ]
  },
  {
    id: 'course-prompt-crtf',
    level: 'level_1',
    title: 'Bengkel Mini: Formula Prompt CRTF untuk Eksekutif',
    tagline: 'Kuasai Formula C-R-T-F untuk Emel, Laporan & Strategi Korporat',
    description: 'Bengkel intensif pantas untuk membuang tekaan dalam prompting harian. Formula 4-langkah terbukti meningkatkan ketepatan jawapan model AI sebanyak 300%.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/jC4v5AS4RIM',
    instructor: {
      name: 'Sarah Liyana',
      role: 'Pakar Komunikasi AI & Strategi Kandungan Korporat',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80'
    },
    isFree: true,
    price: 0,
    originalPrice: 79,
    badge: 'PERCUMA',
    rating: 4.89,
    reviewsCount: 750,
    studentsCount: '12,300+',
    totalModules: 1,
    totalLessons: 3,
    totalHours: '1.5 Jam',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    levelCategory: 'Pemula',
    targetAudience: 'Eksekutif pejabat, pengurus pentadbiran, pelajar dan usahawan.',
    skillsLearned: [
      'Anatomi Formula CRTF (Context, Role, Task, Format)',
      'Pencegahan Halusinasi Jawapan Model',
      'Menjana Laporan & Minit Mesyuarat Pantas'
    ],
    includes: [
      '3 Video Pembelajaran Amali Terfokus',
      'Bank 20 Templat Prompt CRTF Pelbagai Industri',
      'Sijil Penyertaan Bengkel Digital'
    ]
  },
  {
    id: 'course-ai-business',
    level: 'level_2',
    title: 'Automasi AI & Integrasi Workflow Operasi Perniagaan',
    tagline: 'Bina Ejen Pintar untuk Spreadsheet, Khidmat Pelanggan & Analisis',
    description: 'Sambungkan kuasa AI ke dalam sistem syarikat anda. Cara mengautomasikan pengisihan tiket pelanggan, menganalisis invois PDF, dan menjana ramalan jualan.',
    instructor: {
      name: 'Kenneth Tan',
      role: 'Penasihat Transformasi Digital & Automasi ERP',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
    },
    isFree: false,
    price: 129,
    originalPrice: 249,
    badge: 'BAHARU',
    rating: 4.91,
    reviewsCount: 310,
    studentsCount: '2,800+',
    totalModules: 2,
    totalLessons: 5,
    totalHours: '5.0 Jam',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    levelCategory: 'Pertengahan',
    targetAudience: 'Pemilik perniagaan, pengurus operasi, akauntan & penganalisis data.',
    skillsLearned: [
      'Integrasi AI dengan Google Sheets / Excel',
      'Ekstraksi Data Invois & Resit Automatik',
      'Membina Chatbot Khidmat Pelanggan Tersuai'
    ],
    includes: [
      '5 Video Tutorial Amali Langkah demi Langkah',
      'Fail Templat Spreadsheet Pintar Berasaskan AI',
      'Sijil Pengkhususan Automasi Perniagaan'
    ]
  },
  {
    id: 'course-all-access-bundle',
    level: 'level_3',
    title: 'Pakej Lengkap: Akademi AI Master Bundle (Tahap 1, 2 & 3)',
    tagline: 'Akses Semua Kursus, Makmal Kod, Templat Prompt & 3 Sijil Rasmi',
    description: 'Laluan lengkap dari sifar sehingga membina ejen AI autonomi bertaraf industri. Pelaburan paling berbaloi yang menjimatkan 55% daripada pembelian berasingan.',
    instructor: {
      name: 'Fakulti Lengkap Akademi AI',
      role: '10 Penyelidik & Jurutera AI Industri',
      avatar: '/src/assets/images/instructor_ai_expert_1792521714332.jpg'
    },
    isFree: false,
    price: 269,
    originalPrice: 599,
    badge: 'PILIHAN UTAMA',
    rating: 4.99,
    reviewsCount: 2100,
    studentsCount: '9,600+',
    totalModules: 9,
    totalLessons: 18,
    totalHours: '14+ Jam',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    levelCategory: 'Pakar',
    targetAudience: 'Individu yang mahu penguasaan menyeluruh AI untuk kerjaya masa hadapan.',
    skillsLearned: [
      'Semua Kemahiran Asas, Pengamal dan Lanjutan',
      'Penyediaan Portfolio Lengkap Industri',
      'Sijil Rasmi 3 Tahap Pengiktirafan Penuh'
    ],
    includes: [
      'Akses Penuh Semua 18 Pelajaran Video',
      'Semua Fail Projek, Templat & Makmal Kod',
      '3 Sijil Tamat Berasingan (Tahap 1, 2 & 3)',
      'Kemas Kini Percuma Seumur Hidup untuk Kandungan Baharu',
      'Akses Keutamaan Komuniti Eksklusif VIP'
    ]
  },
  {
    id: 'course-visual-diffusion',
    level: 'level_2',
    title: 'Penjanaan Imej Fotorealistik & Seni Rekaan Midjourney/Flux',
    tagline: 'Kuasai Kamera Maya, Pencahayaan Sinematik & Prompt Seni Visual',
    description: 'Panduan mendalam menghasilkan karya seni komersial, poster pengiklanan dan konsep produk berkualiti studio menggunakan model difusi terkini.',
    instructor: {
      name: 'Aiman Zhafri',
      role: 'Pengarah Kreatif Visual AI',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80'
    },
    isFree: false,
    price: 79,
    originalPrice: 159,
    badge: 'BAHARU',
    rating: 4.93,
    reviewsCount: 420,
    studentsCount: '3,100+',
    totalModules: 2,
    totalLessons: 4,
    totalHours: '3.0 Jam',
    coverImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=80',
    levelCategory: 'Pertengahan',
    targetAudience: 'Pereka grafik, jurugambar, pencipta kandungan & pengarah seni.',
    skillsLearned: [
      'Kawalan Pencahayaan & Sudut Lensa Kamera dalam Prompt',
      'Pengekalan Konsistensi Karakter & Wajah',
      'Eksport Resolusi Tinggi & Pasca-Pemprosesan'
    ],
    includes: [
      '4 Video Panduan Praktikal Visual',
      'Bank 50 Kod Prompt Gaya Sinematik',
      'Sijil Digital Kreatif Visual AI'
    ]
  },
  {
    id: 'course-data-python-ai',
    level: 'level_2',
    title: 'Analisis Data Pintar dengan Python & Pembantu AI',
    tagline: 'Gunakan AI untuk Menulis Skrip, Membersihkan Data & Bina Carta',
    description: 'Tidak perlu hafal sintaks kod. Pelajari cara mengarahkan AI untuk menganalisis data jualan, visualisasi graf interaktif, dan mencari anomali.',
    instructor: {
      name: 'Ir. Danial Hakimi',
      role: 'Ketua Arkitek AI & Penganalisis Data Kanan',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80'
    },
    isFree: false,
    price: 89,
    originalPrice: 179,
    badge: 'POPULAR',
    rating: 4.88,
    reviewsCount: 510,
    studentsCount: '4,200+',
    totalModules: 2,
    totalLessons: 4,
    totalHours: '3.5 Jam',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    levelCategory: 'Pertengahan',
    targetAudience: 'Penganalisis perniagaan, akauntan, penyelidik & pelajar sains data.',
    skillsLearned: [
      'Prompting Penjanaan Kod Python Pandas & Matplotlib',
      'Pembersihan Data Tidak Teratur Secara Automatik',
      'Menjana Laporan Statistik Serta-merta'
    ],
    includes: [
      '4 Modul Tutorial Kod Interaktif',
      'Contoh Dataset Sebenar & Fail Jupyter Notebook',
      'Sijil Penganalisis Data AI'
    ]
  },
  {
    id: 'course-lora-finetuning',
    level: 'level_3',
    title: 'Fine-Tuning Model Bahasa Tempatan & Teknik LoRA',
    tagline: 'Latih Model Bahasa Anda Sendiri dengan Kos Efisien',
    description: 'Pelajari cara melaraskan LLM sumber terbuka (Llama, Mistral, Gemma) menggunakan Low-Rank Adaptation (LoRA) dan kuantisasi 4-bit pada GPU mampu milik.',
    instructor: {
      name: 'Dr. Farhan Azim',
      role: 'Penyelidik AI Kanan',
      avatar: '/src/assets/images/instructor_ai_expert_1792521714332.jpg'
    },
    isFree: false,
    price: 149,
    originalPrice: 299,
    badge: 'PREMIUM',
    rating: 4.97,
    reviewsCount: 380,
    studentsCount: '2,400+',
    totalModules: 3,
    totalLessons: 5,
    totalHours: '5.5 Jam',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    levelCategory: 'Lanjutan',
    targetAudience: 'Jurutera ML, penyelidik data & pembangun backend.',
    skillsLearned: [
      'Penyediaan Format Dataset Instruction-Tuning',
      'Konfigurasi LoRA Hyperparameters & Rank',
      'Penilaian Metrik Perplexity & Token Throughput'
    ],
    includes: [
      '5 Sesi Mendalam Pengoptimuman GPU',
      'Skrip Latihan Python & Google Colab Pro Ready',
      'Sijil Jurutera Fine-Tuning LLM'
    ]
  }
];

