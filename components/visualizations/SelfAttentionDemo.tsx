import React, { useState } from 'react';
import { Card } from '../ui/Card';

const SENTENCE = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired"];

// Simplified attention matrix (mock data simulating coreference resolution)
// 'it' should strongly attend to 'animal'
const ATTENTION_SCORES: Record<number, Record<number, number>> = {
    7: { 1: 0.8, 5: 0.1, 7: 0.1 }, // 'it' attends to 'animal' (idx 1)
    10: { 7: 0.6, 1: 0.2 } // 'tired' attends to 'it' and 'animal'
};

export const SelfAttentionDemo: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getOpacity = (targetIdx: number) => {
    if (hoveredIndex === null) return 0.1;
    if (hoveredIndex === targetIdx) return 1;
    
    const scores = ATTENTION_SCORES[hoveredIndex];
    if (scores && scores[targetIdx]) {
        return scores[targetIdx];
    }
    // Default low attention
    return 0.05;
  };

  return (
    <Card title="6. 自注意力 (Self-Attention) 演示" subtitle="单词如何“看到”彼此">
      <div className="space-y-8">
        <p className="text-sm text-gray-400">
            悬停在单词上，观察它关注句子中的哪些其他部分。<br/>
            试着悬停在 <strong className="text-cyber-accent">"it" (它)</strong> 上，看看机器如何理解指代关系。
        </p>

        <div className="flex flex-wrap gap-3 justify-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
            {SENTENCE.map((word, idx) => {
                const opacity = hoveredIndex !== null ? getOpacity(idx) : 1;
                const isTarget = hoveredIndex !== null && ATTENTION_SCORES[hoveredIndex]?.[idx] > 0.3;
                
                return (
                    <span 
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`cursor-pointer px-3 py-1 rounded transition-all duration-300 text-lg
                            ${hoveredIndex === idx ? 'bg-cyber-accent text-black font-bold scale-110 shadow-lg' : ''}
                            ${isTarget ? 'bg-cyber-purple/40 text-white border border-cyber-purple' : ''}
                        `}
                        style={{ 
                            opacity: hoveredIndex !== null && hoveredIndex !== idx && !isTarget ? 0.2 : 1
                        }}
                    >
                        {word}
                        {isTarget && <div className="absolute -top-6 left-0 text-[10px] bg-cyber-purple text-white px-1 rounded">{Math.round(ATTENTION_SCORES[hoveredIndex][idx] * 100)}%</div>}
                    </span>
                )
            })}
        </div>

        <div className="text-xs text-gray-500 font-mono">
            {hoveredIndex === 7 ? 
                "解析: 当模型处理 'it' 时，Self-Attention 机制分配了最高权重给 'animal'。这意味着模型理解了 'it' 指的是 'animal'，而不是 'street'。" : 
                "Self-Attention 允许每个位置参考所有其他位置来更新自己的表示。"}
        </div>
      </div>
    </Card>
  );
};