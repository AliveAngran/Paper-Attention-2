import React, { useState } from 'react';
import { Card } from '../ui/Card';

export const PositionalEncoding: React.FC = () => {
  const [position, setPosition] = useState(5);
  
  // Simulate PE formula: PE(pos, 2i) = sin(pos/10000^(2i/d_model))
  const dimensions = Array.from({ length: 20 }, (_, i) => i);
  
  const getIntensity = (pos: number, i: number) => {
    const angle = pos / Math.pow(10000, (2 * i) / 512); // Simplified logic for viz
    // Map sin -1..1 to 0..1 for opacity
    return (Math.sin(angle) + 1) / 2;
  };

  return (
    <Card title="3. 位置编码 (Positional Encoding)" subtitle="在不使用 RNN 的情况下注入顺序信息">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-mono text-cyber-accent">Position (t): {position}</label>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={position} 
            onChange={(e) => setPosition(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber-accent"
          />
        </div>

        <div className="relative h-24 bg-gray-900 rounded border border-gray-800 overflow-hidden flex items-end">
           {/* Visualization of the vector adding to embedding */}
           {dimensions.map((i) => {
             const opacity = getIntensity(position, i);
             return (
               <div 
                key={i}
                className="flex-1 mx-[1px] bg-cyber-accent transition-all duration-100"
                style={{ 
                  height: `${opacity * 100}%`,
                  opacity: 0.3 + (opacity * 0.7) 
                }}
               />
             )
           })}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
                <h5 className="text-white font-bold mb-1">问题</h5>
                <p>Transformer 并行处理所有词，所以它本来不知道 "A hit B" 和 "B hit A" 的区别。</p>
            </div>
            <div>
                <h5 className="text-white font-bold mb-1">解决方案</h5>
                <p>给每个位置加一个独特的“波纹”信号（正弦/余弦波）。如上图，不同位置产生的波纹高度不同，不仅独一无二，还保持了相对距离关系。</p>
            </div>
        </div>
        
        <div className="font-mono text-xs text-gray-500 bg-black/30 p-2 rounded">
            PE(pos, 2i) = sin(pos / 10000^(2i/dmodel))<br/>
            Embedding_Final = Embedding + PE
        </div>
      </div>
    </Card>
  );
};