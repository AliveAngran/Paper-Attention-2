import React, { useState } from 'react';
import { AUTHORS, SectionId } from './types';
import { Card } from './components/ui/Card';
import { RNNvsTransformer } from './components/visualizations/RNNvsTransformer';
import { Embeddings } from './components/visualizations/Embeddings';
import { PositionalEncoding } from './components/visualizations/PositionalEncoding';
import { QKVAnalogy } from './components/visualizations/QKVAnalogy';
import { ScaledDotProduct } from './components/visualizations/ScaledDotProduct';
import { SelfAttentionDemo } from './components/visualizations/SelfAttentionDemo';
import { MultiHeadView } from './components/visualizations/MultiHeadView';
import { MaskedAttention } from './components/visualizations/MaskedAttention';
import { ResidualNorm } from './components/visualizations/ResidualNorm';
import { ResultsChart } from './components/visualizations/ResultsChart';
import { Cpu, Sparkles, BookOpen, Github } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRO);

  const scrollTo = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text font-sans selection:bg-cyber-purple selection:text-white pb-20">
      
      {/* Background Ambient Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-purple/5 blur-[150px] rounded-full animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-accent/5 blur-[150px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header / Hero */}
      <header className="relative z-10 pt-20 pb-12 px-6 text-center border-b border-gray-900 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-dark border border-cyber-accent/30 text-cyber-accent text-xs font-mono mb-6 animate-glow">
            <Cpu size={14} />
            <span>NEURAL INFORMATION PROCESSING SYSTEMS 2017</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 tracking-tight">
            Attention Is All You Need
          </h1>
          <p className="text-xl text-gray-400 font-light mb-8 max-w-2xl mx-auto">
            Transformer 架构互动解析指南 <br/>
            <span className="text-sm text-gray-500 mt-2 block">为每一位探索 AI 灵魂的学子设计</span>
          </p>
          
          {/* Authors Grid */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 max-w-3xl mx-auto mb-8">
            {AUTHORS.map((author, idx) => (
              <span key={idx} className="hover:text-cyber-accent transition-colors cursor-default" title={author.affiliation}>
                {author.name}{idx === 0 || idx === 1 ? '*' : ''}
              </span>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={() => scrollTo(SectionId.RNN_VS_TRANSFORMER)} className="px-6 py-3 bg-cyber-accent text-black font-bold rounded hover:bg-cyan-300 transition-colors flex items-center gap-2">
              <Sparkles size={18} /> 开始探索
            </button>
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer" className="px-6 py-3 border border-gray-700 rounded text-gray-300 hover:border-white transition-colors flex items-center gap-2">
              <BookOpen size={18} /> 阅读原文
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-24">
        
        {/* Abstract */}
        <section id={SectionId.INTRO} className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-white border-l-4 border-cyber-purple pl-4">摘要 (Abstract)</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              主流的序列转换模型通常基于复杂的循环神经网络 (RNN) 或卷积神经网络 (CNN)。
              我们提出了一种新的简单网络架构——<strong className="text-cyber-accent">Transformer</strong>，它完全基于注意力机制，彻底摒弃了循环和卷积。
              实验表明，该模型在并行化能力和训练速度上具有显著优势，同时在翻译质量上达到了新的 SOTA。
            </p>
          </div>
        </section>

        {/* 1. RNN vs Transformer */}
        <section id={SectionId.RNN_VS_TRANSFORMER}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">01</span> / 背景与动机
           </div>
           <RNNvsTransformer />
           <p className="mt-4 text-gray-400 text-sm leading-relaxed pl-4 border-l border-gray-800">
             <span className="text-cyber-purple font-bold">硕士生笔记：</span> 为什么还要发明 Transformer？因为 RNN (LSTM) 无法并行。句子越长，RNN 跑得越慢，而且很难记住很久以前的信息（长距离依赖）。Transformer 就像把整个句子拍成一张照片，一次性处理所有细节。
           </p>
        </section>

        {/* 2. Embeddings */}
        <section id={SectionId.EMBEDDINGS}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">02</span> / 输入层
           </div>
           <Embeddings />
        </section>

        {/* 3. Positional Encoding */}
        <section id={SectionId.POSITIONAL}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">03</span> / 顺序注入
           </div>
           <PositionalEncoding />
        </section>

        {/* 4. Architecture High Level / Encoder */}
        <section className="grid gap-8">
            <div className="text-center py-10">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-accent">Encoder: 理解与提取</h2>
                <p className="text-gray-400 mt-2">Transformer 的前半部分，负责“读懂”输入句子。</p>
            </div>
        </section>

        {/* 4. QKV */}
        <section id={SectionId.QKV}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">04</span> / 注意力核心概念
           </div>
           <QKVAnalogy />
        </section>

        {/* 5. Scaled Dot Product */}
        <section id={SectionId.SCALED_DOT}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">05</span> / 数学原理
           </div>
           <ScaledDotProduct />
        </section>

         {/* 6. Self Attention Matrix */}
        <section id={SectionId.SELF_ATTENTION}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">06</span> / 自注意力机制
           </div>
           <SelfAttentionDemo />
        </section>

        {/* 7. Multi-Head */}
        <section id={SectionId.MULTI_HEAD}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">07</span> / 多头注意力
           </div>
           <MultiHeadView />
        </section>

        {/* 8. Residual & Norm */}
        <section id={SectionId.RESIDUAL}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">08</span> / 网络构建块
           </div>
           <ResidualNorm />
        </section>

        <section className="grid gap-8">
            <div className="text-center py-10">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyber-accent">Decoder: 生成与预测</h2>
                <p className="text-gray-400 mt-2">Transformer 的后半部分，负责根据 Encoder 的理解生成目标语言。</p>
            </div>
        </section>

        {/* 9. Masked Attention */}
        <section id={SectionId.MASKED}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">09</span> / 掩码机制
           </div>
           <MaskedAttention />
        </section>

        {/* 10. Results */}
        <section id={SectionId.RESULTS}>
           <div className="mb-4 flex items-center gap-2 text-cyber-dim font-mono text-sm">
             <span className="text-cyber-accent">10</span> / 实验结果
           </div>
           <ResultsChart />
        </section>

        <section className="border-t border-gray-800 pt-12 mt-12 text-center text-gray-500 text-sm">
            <p className="mb-4">"Attention Is All You Need" - NeurIPS 2017</p>
            <p className="max-w-2xl mx-auto">
                本文内容由 Ashish Vaswani 等人原作启发，旨在通过交互式可视化辅助理解。
                Figures and tables reproduced/adapted with permission for scholarly works.
            </p>
            <div className="mt-8 flex justify-center items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <Github size={16}/> <span>Compatible with React 18+ / Tailwind CSS</span>
            </div>
        </section>

      </main>
      
      {/* Quick Nav (Sticky Bottom) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-cyber-dark/80 backdrop-blur-md border border-gray-700 rounded-full px-4 py-2 flex gap-4 shadow-2xl overflow-x-auto max-w-[90vw]">
         <button onClick={() => scrollTo(SectionId.RNN_VS_TRANSFORMER)} className="text-xs text-gray-300 hover:text-white whitespace-nowrap">RNN vs Trans</button>
         <div className="w-px bg-gray-700 h-4 self-center"></div>
         <button onClick={() => scrollTo(SectionId.QKV)} className="text-xs text-gray-300 hover:text-white whitespace-nowrap">QKV</button>
         <div className="w-px bg-gray-700 h-4 self-center"></div>
         <button onClick={() => scrollTo(SectionId.SELF_ATTENTION)} className="text-xs text-gray-300 hover:text-white whitespace-nowrap">Self-Attn</button>
         <div className="w-px bg-gray-700 h-4 self-center"></div>
         <button onClick={() => scrollTo(SectionId.MULTI_HEAD)} className="text-xs text-gray-300 hover:text-white whitespace-nowrap">Multi-Head</button>
         <div className="w-px bg-gray-700 h-4 self-center"></div>
         <button onClick={() => scrollTo(SectionId.MASKED)} className="text-xs text-gray-300 hover:text-white whitespace-nowrap">Masked</button>
      </div>
    </div>
  );
};

export default App;