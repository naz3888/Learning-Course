import React, { useState } from 'react';
import { X, Search, Copy, Check, BookOpen } from 'lucide-react';
import { GLOSSARY_DATA } from '../data/coursesData';
import { GlossaryTerm } from '../types';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = ['Semua', 'Asas', 'Model & LLM', 'Teknikal', 'Etika'];

  const filteredTerms = GLOSSARY_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.englishTerm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (term: GlossaryTerm) => {
    const text = `${term.term} (${term.englishTerm}):\n${term.definition}\nContoh: ${term.example}`;
    navigator.clipboard.writeText(text);
    setCopiedTerm(term.term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/15 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161616]">
          <div>
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400">
              Kamus & Rujukan
            </div>
            <h3 className="font-['Oswald'] text-2xl font-bold tracking-wide text-white uppercase mt-0.5">
              GLOSARI ISTILAH KECERDASAN BUATAN
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-[#111111] space-y-3 font-sans">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah AI (cth: Transformer, RAG, Halusinasi, LoRA)..."
              className="w-full pl-10 pr-4 py-2.5 bg-black border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold uppercase tracking-wider">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term Cards */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-xs">
              Tiada istilah dijumpai untuk carian "{searchQuery}".
            </div>
          ) : (
            filteredTerms.map((term, idx) => (
              <div
                key={idx}
                className="p-4 bg-black border border-white/10 space-y-2 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {term.term}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      ({term.englishTerm})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-neutral-900 px-2 py-0.5 border border-white/10">
                      {term.category}
                    </span>
                    <button
                      onClick={() => handleCopy(term)}
                      className="p-1 text-neutral-400 hover:text-white"
                      title="Salin definisi"
                    >
                      {copiedTerm === term.term ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {term.definition}
                </p>

                <div className="p-2.5 bg-neutral-900/80 border-l-2 border-amber-400 text-[11px] text-neutral-400 font-mono">
                  <span className="text-white font-bold">Contoh:</span> {term.example}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
