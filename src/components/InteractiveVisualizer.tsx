import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Sliders, Info, Zap } from 'lucide-react';

export const InteractiveVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'transformer' | 'rag'>('transformer');

  // Transformer Simulation State
  const [sampleSentenceIndex, setSampleSentenceIndex] = useState<number>(0);
  const sampleSentences = [
    { text: "Model AI memproses data dengan pantas", tokens: ["Model", "AI", "memproses", "data", "dengan", "pantas"] },
    { text: "Pelajar belajar teknologi kecerdasan buatan", tokens: ["Pelajar", "belajar", "teknologi", "kecerdasan", "buatan"] },
    { text: "Kucing comel sedang tidur di atas sofa", tokens: ["Kucing", "comel", "sedang", "tidur", "di", "atas", "sofa"] }
  ];

  const currentSentence = sampleSentences[sampleSentenceIndex];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(2);
  const [temperature, setTemperature] = useState<number>(0.7);

  // RAG Simulation State
  const [ragQueryIndex, setRagQueryIndex] = useState<number>(0);
  const ragScenarios = [
    {
      query: "Berapakah jumlah hari cuti bersalin bagi pekerja wanita mengikut Akta Kerja?",
      documents: [
        {
          id: 'chunk-1',
          source: 'Buku Panduan Akta Kerja Pindaan 2022 (Muka Surat 14)',
          text: 'Seksyen 37: Tempoh kelayakan cuti bersalin berbayar bagi pekerja wanita telah ditingkatkan daripada 60 hari kepada 98 hari berterusan.',
          similarityScore: 0.94,
          isRelevant: true
        },
        {
          id: 'chunk-2',
          source: 'Polisi Cuti Am & Kelepasan Syarikat (Muka Surat 4)',
          text: 'Pekerja berhak mendapat 11 hari kelepasan am berbayar dalam satu tahun kalendar.',
          similarityScore: 0.42,
          isRelevant: false
        }
      ],
      systemPrompt: "Anda ialah Penasihat Sumber Manusia. Jawab soalan HANYA berdasarkan konteks yang dibekalkan.",
      groundedAnswer: "Berdasarkan Seksyen 37 Akta Kerja Pindaan 2022, tempoh cuti bersalin berbayar bagi pekerja wanita adalah 98 hari berterusan (ditingkatkan daripada 60 hari sebelumnya)."
    },
    {
      query: "Apakah syarat kelayakan memohon Geran AI bernilai RM50,000?",
      documents: [
        {
          id: 'chunk-1',
          source: 'Garis Panduan Geran Digital & AI Kebangsaan (Klausa 3)',
          text: 'Pemohon mestilah syarikat PKS berdaftar di Malaysia dengan sekurang-kurangnya 51% pegangan saham warganegara Malaysia dan beroperasi minimum 12 bulan.',
          similarityScore: 0.91,
          isRelevant: true
        }
      ],
      systemPrompt: "Jawab dengan ringkas berdasarkan garis panduan rasmi sahaja.",
      groundedAnswer: "Syarat utama: (1) Syarikat PKS berdaftar di Malaysia, (2) Minimum 51% pegangan saham warganegara Malaysia, dan (3) Telah beroperasi sekurang-kurangnya 12 bulan."
    }
  ];

  const currentRag = ragScenarios[ragQueryIndex];
  const [ragActiveStep, setRagActiveStep] = useState<number>(3);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => (prev >= 4 ? 1 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const getAttentionWeight = (targetIdx: number) => {
    const diff = Math.abs(selectedTokenIndex - targetIdx);
    if (diff === 0) return 0.88;
    if (diff === 1) return 0.65;
    if (diff === 2) return 0.35;
    return 0.15;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-6">
        <div>
          <div className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
            Simulator Konseptual AI
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
            Lihat Bagaimana Model Berfikir Secara Visual
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
            Seni bina Transformer dan saluran pemprosesan Retrieval-Augmented Generation (RAG).
          </p>
        </div>

        {/* Segmented Control */}
        <div className="p-1 rounded-full bg-[#e8e8ed] flex items-center text-xs font-medium">
          <button
            onClick={() => setActiveMode('transformer')}
            className={`py-1.5 px-4 rounded-full transition-all ${
              activeMode === 'transformer'
                ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            Seni Bina Transformer
          </button>
          <button
            onClick={() => setActiveMode('rag')}
            className={`py-1.5 px-4 rounded-full transition-all ${
              activeMode === 'rag'
                ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            Saluran RAG
          </button>
        </div>
      </div>

      {/* TRANSFORMER */}
      {activeMode === 'transformer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#1d1d1f] text-white rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-xs min-h-[480px]">
            {/* Stage Nav */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-4">
              <div className="text-xs font-mono text-[#86868b]">
                Peringkat 0{currentStep}/04: {currentStep === 1 && "Tokenisasi Ayat"}
                {currentStep === 2 && "Unjuran Vektor Q, K, V"}
                {currentStep === 3 && "Peta Haba Self-Attention"}
                {currentStep === 4 && "Ramalan Token Seterusnya"}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#0071e3] text-white hover:bg-[#0077ed]"
                >
                  {isPlaying ? 'Jeda' : 'Animasi'}
                </button>
                <button
                  onClick={() => setCurrentStep(prev => (prev >= 4 ? 1 : prev + 1))}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
                >
                  Langkah Seterusnya
                </button>
              </div>
            </div>

            {/* Stage Body */}
            <div className="py-8 my-auto space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="text-xs text-[#86868b]">Ayat input dipecahkan kepada token berangka:</div>
                  <div className="flex flex-wrap gap-2">
                    {currentSentence.tokens.map((tok, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-[#2c2c2e] text-center min-w-[75px]">
                        <div className="text-sm font-semibold">{tok}</div>
                        <div className="font-mono text-[10px] text-[#0071e3] mt-0.5">#{idx * 312 + 102}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Setiap token dihubungkan dengan <em>Positional Encoding</em> agar model peka terhadap susunan perkataan dalam ayat.
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-xs text-[#86868b]">Unjuran Tiga Vektor untuk Setiap Token:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-[#2c2c2e] space-y-1">
                      <div className="font-bold text-[#0071e3]">Query (Q)</div>
                      <div className="text-[11px] text-[#86868b]">"Apakah maklumat yang saya perlukan?"</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#2c2c2e] space-y-1">
                      <div className="font-bold text-[#34c759]">Key (K)</div>
                      <div className="text-[11px] text-[#86868b]">"Apakah maklumat yang saya miliki?"</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#2c2c2e] space-y-1">
                      <div className="font-bold text-[#ff9500]">Value (V)</div>
                      <div className="text-[11px] text-[#86868b]">"Kandungan semantik sebenar"</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-xs text-[#86868b]">
                    Pilih satu perkataan untuk melihat taburan perhatian Self-Attention:
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentSentence.tokens.map((tok, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTokenIndex(idx)}
                        className={`px-3 py-1 rounded-full text-xs transition-all ${
                          selectedTokenIndex === idx
                            ? 'bg-[#0071e3] text-white font-medium'
                            : 'bg-[#2c2c2e] text-[#86868b] hover:text-white'
                        }`}
                      >
                        {tok}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#000000] space-y-2.5">
                    {currentSentence.tokens.map((tok, idx) => {
                      const weight = getAttentionWeight(idx);
                      return (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <span className="w-20 truncate text-[#d2d2d7]">{tok}</span>
                          <div className="flex-1 bg-[#2c2c2e] rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-[#0071e3] transition-all duration-300"
                              style={{ width: `${Math.round(weight * 100)}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-[#86868b] w-12 text-right">
                            {(weight * 100).toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-3">
                  <div className="text-xs text-[#86868b]">Kebarangkalian Token Seterusnya:</div>
                  <div className="p-4 rounded-2xl bg-[#000000] space-y-2">
                    {[
                      { token: "dan", prob: 48.2 },
                      { token: "untuk", prob: 26.4 },
                      { token: "tanpa", prob: 12.1 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#2c2c2e] text-xs">
                        <span className="font-mono text-[#34c759]">"{item.token}"</span>
                        <span className="font-mono text-[#86868b]">{item.prob}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stage Dots */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between text-xs text-[#86868b]">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(s => (
                  <button
                    key={s}
                    onClick={() => setCurrentStep(s)}
                    className={`w-6 h-6 rounded-full text-xs font-mono transition-colors ${
                      currentStep === s ? 'bg-[#0071e3] text-white' : 'bg-[#2c2c2e] text-[#86868b]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span>Peringkat {currentStep}/4</span>
            </div>
          </div>

          {/* Right Parameters Deck */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 space-y-3 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                Contoh Ayat:
              </div>
              <div className="space-y-1.5">
                {sampleSentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSampleSentenceIndex(idx); setSelectedTokenIndex(0); }}
                    className={`w-full text-left p-3 rounded-2xl text-xs transition-colors ${
                      sampleSentenceIndex === idx
                        ? 'bg-[#f5f5f7] font-semibold text-[#1d1d1f]'
                        : 'text-[#6e6e73] hover:bg-[#fafafa]'
                    }`}
                  >
                    "{s.text}"
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1d1d1f]">
                <span>Parameter Suhu (Temperature)</span>
                <span className="font-mono text-[#0071e3]">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#0071e3]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b]">
                <span>0.1 (Tepat)</span>
                <span>1.5 (Kreatif)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RAG PIPELINE */}
      {activeMode === 'rag' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 sm:p-10 space-y-6 shadow-xs">
            <div>
              <div className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                Saluran RAG Berpandukan Dokumen
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mt-1">
                Pencarian Semantik & Sintesis Fakta Sahih
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] space-y-2">
              <div className="text-xs text-[#86868b] font-medium">Pertanyaan Pengguna:</div>
              <div className="text-sm font-semibold text-[#1d1d1f]">"{currentRag.query}"</div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                Padanan Vektor Dokumen:
              </div>
              {currentRag.documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-2xl transition-all ${
                    doc.isRelevant ? 'bg-[#e8f5e9] border border-[#c8e6c9]' : 'bg-[#f5f5f7] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-semibold text-[#1d1d1f]">{doc.source}</span>
                    <span className="font-mono font-medium">Skor: {(doc.similarityScore * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-xs text-[#515154] leading-relaxed">"{doc.text}"</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#f5f5f7] space-y-2">
              <div className="text-xs font-semibold text-[#2e7d32] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Jawapan Sahih AI (Bebas Halusinasi)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed">
                {currentRag.groundedAnswer}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 space-y-2.5 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                Pilih Skenario:
              </div>
              <div className="space-y-2">
                {ragScenarios.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setRagQueryIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl text-xs transition-colors ${
                      ragQueryIndex === idx
                        ? 'bg-[#f5f5f7] font-semibold text-[#1d1d1f]'
                        : 'text-[#6e6e73] hover:bg-[#fafafa]'
                    }`}
                  >
                    Kajian Kes 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
