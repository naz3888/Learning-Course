import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, Pin, Send, Sparkles, Filter, CheckCircle2, User } from 'lucide-react';
import { ForumComment } from '../types';
import { INSTRUCTOR_DATA } from '../data/coursesData';

interface ChatClubForumProps {
  currentLessonId: string;
  currentLessonTitle: string;
  userName: string;
}

const STORAGE_FORUM_KEY = 'akademi_ai_chatclub_comments_v2';

const INITIAL_COMMENTS: ForumComment[] = [
  {
    id: 'c-pin',
    lessonId: 'all',
    author: INSTRUCTOR_DATA.name,
    role: 'Tenaga Pengajar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    timestamp: 'Dipin oleh Guru',
    content: 'Selamat datang ke ChatClub Akademi AI! Ruang komuniti ini dibina khas untuk anda bertanya soalan tentang sesi pembelajaran video, berkongsi hasil amali prompt, dan bertukar idea bersama rakan pelajar. Saya bersama barisan fakulti akan menyemak soalan di sini secara berkala.',
    likes: 54,
    isLiked: false,
    isPinned: true,
    category: 'Bincang Umum',
    replies: [
      {
        id: 'r-1',
        author: 'Faizal Rahim',
        role: 'Pelajar',
        timestamp: '3 jam lepas',
        content: 'Terima kasih Dr. Farhan! Sangat membantu untuk ada forum perbincangan terus di bawah video pembelajaran.',
        likes: 14,
        isLiked: false
      }
    ]
  },
  {
    id: 'c-1',
    lessonId: 'les-1-5',
    author: 'Aiman Hakim',
    role: 'Pelajar',
    timestamp: '2 jam lepas',
    content: 'Untuk Formula CRTF, adakah wajib sertakan semua 4 elemen [C, R, T, F] dalam setiap prompt kecil, atau hanya untuk tugasan analisis yang kompleks?',
    likes: 21,
    isLiked: false,
    category: 'Soalan Pelajaran',
    replies: [
      {
        id: 'r-2',
        author: INSTRUCTOR_DATA.name,
        role: 'Tenaga Pengajar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
        timestamp: '1 jam lepas',
        content: 'Soalan yang sangat bagus, Aiman! Untuk soalan pantas harian, cukup sekadar Tugasan. Namun untuk urusan profesional seperti kertas cadangan, analisis data, atau dokumen korporat, formula penuh CRTF menjamin kualiti output 10x ganda lebih tepat dan sifar halusinasi.',
        likes: 28,
        isLiked: false
      }
    ]
  },
  {
    id: 'c-2',
    lessonId: 'les-1-4',
    author: 'Siti Nurhaliza M.',
    role: 'Pelajar',
    timestamp: '5 jam lepas',
    content: 'Saya cuba teknik semakan silang (grounding) yang diajar dalam Pelajaran 4 untuk dokumen HR syarikat. Halusinasi AI memang terus hilang bila kita paksa model guna ayat rujukan! Mantap.',
    likes: 18,
    isLiked: false,
    category: 'Kongsi Prompt'
  },
  {
    id: 'c-3',
    lessonId: 'les-3-3',
    author: 'Zulhelmi Data Dev',
    role: 'Pelajar',
    timestamp: '1 hari lepas',
    content: 'Ada sesiapa yang guna ChromaDB vs pgvector untuk projek RAG? Mana yang lebih jimat memori untuk fail PDF sekitar 500 muka surat?',
    likes: 11,
    isLiked: false,
    category: 'Soalan Pelajaran',
    replies: [
      {
        id: 'r-3',
        author: 'Khairul Anwar',
        role: 'Pelajar',
        timestamp: '18 jam lepas',
        content: 'Untuk 500 muka surat, ChromaDB atau Qdrant dalam persekitaran tempatan (local mode) sudah sangat memadai dan pantas.',
        likes: 6,
        isLiked: false
      }
    ]
  }
];

export const ChatClubForum: React.FC<ChatClubForumProps> = ({
  currentLessonId,
  currentLessonTitle,
  userName
}) => {
  const [comments, setComments] = useState<ForumComment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FORUM_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COMMENTS;
  });

  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Soalan Pelajaran' | 'Kongsi Prompt' | 'Bincang Umum'>('Soalan Pelajaran');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  const saveComments = (updated: ForumComment[]) => {
    setComments(updated);
    try {
      localStorage.setItem(STORAGE_FORUM_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      lessonId: currentLessonId,
      author: userName || 'Pelajar Akademi AI',
      role: 'Pelajar',
      timestamp: 'Baru sebentar tadi',
      content: newCommentText.trim(),
      likes: 1,
      isLiked: true,
      category: newCategory,
      replies: []
    };

    saveComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleToggleLike = (commentId: string) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1,
          isLiked: !c.isLiked
        };
      }
      return c;
    });
    saveComments(updated);
  };

  const handlePostReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const updated = comments.map(c => {
      if (c.id === commentId) {
        const newReply = {
          id: `r-${Date.now()}`,
          author: userName || 'Pelajar Akademi AI',
          role: 'Pelajar' as const,
          timestamp: 'Baru tadi',
          content: replyText.trim(),
          likes: 1,
          isLiked: true
        };
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    });

    saveComments(updated);
    setReplyingToId(null);
    setReplyText('');
  };

  const filteredComments = comments.filter(c => {
    if (filterCategory === 'Semua') return true;
    if (filterCategory === 'Pelajaran Ini') return c.lessonId === currentLessonId || c.isPinned;
    return c.category === filterCategory;
  });

  return (
    <div className="bg-[#0e0e0e] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Forum Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-amber-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ChatClub & Forum Perbincangan Pelajar</span>
          </div>
          <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase mt-1">
            RUANG KOMUNITI & SOAL JAWAB KURSUS
          </h3>
          <p className="font-sans text-xs text-neutral-400 mt-0.5">
            Bincangkan video <span className="font-bold text-white">"{currentLessonTitle}"</span>, kemukakan soalan kepada Dr. Farhan Azim & fakulti, atau kongsi formula prompt anda.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-black border border-white/10 self-start sm:self-auto overflow-x-auto text-xs font-sans uppercase tracking-wider">
          {['Semua', 'Pelajaran Ini', 'Soalan Pelajaran', 'Kongsi Prompt', 'Bincang Umum'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 font-bold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* New Post Form */}
      <form onSubmit={handlePostComment} className="p-5 sm:p-6 bg-[#141414] border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold text-xs">
              {userName.charAt(0) || 'P'}
            </div>
            <span className="font-bold text-white">{userName || 'Pelajar'}</span>
            <span className="text-neutral-400">menulis di ChatClub:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[11px]">Kategori:</span>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="px-3 py-1 bg-black border border-white/20 text-xs text-white focus:outline-none"
            >
              <option value="Soalan Pelajaran">Soalan Pelajaran</option>
              <option value="Kongsi Prompt">Kongsi Prompt</option>
              <option value="Bincang Umum">Bincang Umum</option>
            </select>
          </div>
        </div>

        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Kemukakan soalan tentang video ini, minta pandangan rakan sekelas, atau kongsikan formula prompt anda di sini..."
          rows={3}
          className="w-full text-xs sm:text-sm p-4 bg-black border border-white/15 focus:outline-none focus:border-white text-white resize-y font-sans"
          required
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-neutral-400">
            💡 Tip: Sertakan contoh teks prompt untuk mendapatkan maklum balas yang lebih tepat.
          </span>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-neutral-200 text-black font-sans font-bold uppercase tracking-wider text-xs transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hantar ke ChatClub</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className={`p-5 sm:p-6 border transition-all ${
              comment.isPinned
                ? 'bg-[#161a22] border-blue-500/40'
                : 'bg-[#121212] border-white/10 hover:border-white/25'
            } space-y-4`}
          >
            {/* Comment Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {comment.avatar ? (
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-9 h-9 object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-9 h-9 bg-neutral-800 text-white flex items-center justify-center font-bold text-xs border border-white/10">
                    {comment.author.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {comment.author}
                    </span>
                    {comment.role === 'Tenaga Pengajar' ? (
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest bg-amber-400 text-black px-2 py-0.5">
                        Tenaga Pengajar
                      </span>
                    ) : (
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-neutral-400 bg-neutral-900 px-2 py-0.5 border border-white/10">
                        Pelajar
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5 font-mono">
                    <span>{comment.timestamp}</span>
                    <span>·</span>
                    <span className="text-amber-400">{comment.category}</span>
                  </div>
                </div>
              </div>

              {comment.isPinned && (
                <div className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-2.5 py-1 border border-blue-500/30">
                  <Pin className="w-3 h-3" />
                  <span>Dipin</span>
                </div>
              )}
            </div>

            {/* Comment Body */}
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap pl-0 sm:pl-12 font-sans">
              {comment.content}
            </p>

            {/* Actions Bar */}
            <div className="flex items-center gap-4 text-xs text-neutral-400 pl-0 sm:pl-12 pt-2 border-t border-white/5 font-sans">
              <button
                onClick={() => handleToggleLike(comment.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  comment.isLiked ? 'text-amber-400 font-bold' : 'hover:text-white'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{comment.likes} Suka</span>
              </button>

              <button
                onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Balas ({comment.replies?.length || 0})</span>
              </button>
            </div>

            {/* Reply Input Box */}
            {replyingToId === comment.id && (
              <div className="pl-0 sm:pl-12 pt-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tulis balasan kepada komen ini..."
                    className="flex-1 text-xs px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-white font-sans"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePostReply(comment.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handlePostReply(comment.id)}
                    className="px-4 py-2 bg-white text-black text-xs font-bold font-sans uppercase hover:bg-neutral-200 transition-colors"
                  >
                    Hantar
                  </button>
                </div>
              </div>
            )}

            {/* Replies Thread */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-0 sm:pl-12 pt-2 space-y-3">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-3.5 bg-black border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{reply.author}</span>
                        {reply.role === 'Tenaga Pengajar' ? (
                          <span className="text-[8px] font-sans font-bold uppercase tracking-widest bg-amber-400 text-black px-1.5 py-0.5">
                            Tenaga Pengajar
                          </span>
                        ) : (
                          <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-neutral-400 bg-neutral-900 px-1.5 py-0.5 border border-white/10">
                            Pelajar
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
