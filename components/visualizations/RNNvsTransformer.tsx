import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Play, RotateCcw } from 'lucide-react';

const SENTENCE = ["Attention", "Is", "All", "You", "Need"];

export const RNNvsTransformer: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'rnn' | 'transformer'>('rnn');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= SENTENCE.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, mode === 'rnn' ? 800 : 800); // Same delay for visual clarity, but different behavior
    }
    return () => clearInterval(interval);
  }, [isPlaying, mode]);

  const handleStart = (selectedMode: 'rnn' | 'transformer') => {
    setMode(selectedMode);
    setStep(0);
    setIsPlaying(true);
  };

  return (
    <Card title="1. 序列 vs 并行 (Recurrence vs Attention)" subtitle="为何 Transformer 训练速度如此之快？">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* RNN View */}
        <div className={`p-4 border rounded-lg ${mode === 'rnn' ? 'border-cyber-purple' : 'border-gray-800'} bg-black/40 transition-colors`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-cyber-purple font-mono font-bold">RNN (LSTM/GRU)</h4>
            <button 
              onClick={() => handleStart('rnn')}
              disabled={isPlaying}
              className="text-xs bg-cyber-purple/20 hover:bg-cyber-purple/40 px-2 py-1 rounded text-cyber-purple border border-cyber-purple/50 transition-all disabled:opacity-50"
            >
              {isPlaying && mode === 'rnn' ? 'Processing...' : <div className="flex items-center gap-1"><Play size={12}/> 模拟串行</div>}
            </button>
          </div>
          
          <div className="flex gap-2 justify-center min-h-[60px] items-center">
            {SENTENCE.map((word, index) => (
              <div 
                key={index}
                className={`w-16 h-16 flex items-center justify-center text-xs border rounded transition-all duration-300
                  ${step > index && mode === 'rnn' ? 'bg-cyber-purple text-white border-cyber-purple scale-100' : 
                    step === index && mode === 'rnn' ? 'bg-cyber-purple/50 border-cyber-purple animate-pulse scale-110' : 
                    'bg-gray-900 text-gray-600 border-gray-800 scale-90'}
                `}
              >
                {word}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400 h-10">
            {mode === 'rnn' && step > 0 && step <= SENTENCE.length 
              ? `时间步 t=${step}: 必须等待 "${SENTENCE[step-1]}" 处理完毕才能处理下一个词。无法并行。`
              : "等待启动..."}
          </p>
        </div>

        {/* Transformer View */}
        <div className={`p-4 border rounded-lg ${mode === 'transformer' ? 'border-cyber-accent' : 'border-gray-800'} bg-black/40 transition-colors`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-cyber-accent font-mono font-bold">Transformer</h4>
            <button 
              onClick={() => handleStart('transformer')}
              disabled={isPlaying}
              className="text-xs bg-cyber-accent/20 hover:bg-cyber-accent/40 px-2 py-1 rounded text-cyber-accent border border-cyber-accent/50 transition-all disabled:opacity-50"
            >
              {isPlaying && mode === 'transformer' ? 'Processing...' : <div className="flex items-center gap-1"><Play size={12}/> 模拟并行</div>}
            </button>
          </div>

          <div className="flex gap-2 justify-center min-h-[60px] items-center">
            {SENTENCE.map((word, index) => (
              <div 
                key={index}
                className={`w-16 h-16 flex items-center justify-center text-xs border rounded transition-all duration-500
                  ${step >= 1 && mode === 'transformer' ? 'bg-cyber-accent text-black border-cyber-accent shadow-[0_0_15px_#00f0ff]' : 
                    'bg-gray-900 text-gray-600 border-gray-800'}
                `}
              >
                {word}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400 h-10">
             {mode === 'transformer' && step >= 1
              ? `时间步 t=1: 所有词同时输入，矩阵运算一次性处理整个序列。O(1) 序列操作。`
              : "等待启动..."}
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-cyber-dark/50 border-l-2 border-yellow-500 text-sm text-gray-300">
        <strong className="text-yellow-500 block mb-1">💡 核心洞察</strong>
        RNN 像是接力赛跑，必须一棒接一棒；Transformer 像是合唱团，所有人同时开口（通过位置编码区分顺序）。这使得 Transformer 可以在 GPU 上极高效地并行训练。
      </div>
    </Card>
  );
};