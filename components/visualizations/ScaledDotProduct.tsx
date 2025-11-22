import React from 'react';
import { Card } from '../ui/Card';

export const ScaledDotProduct: React.FC = () => {
  return (
    <Card title="5. 缩放点积注意力 (Scaled Dot-Product)" subtitle="Attention 公式的数学可视化">
      <div className="flex flex-col items-center space-y-8 py-4">
        
        {/* The Formula */}
        <div className="text-xl md:text-3xl font-serif italic text-center bg-gray-900/80 p-6 rounded-xl border border-gray-700 shadow-inner">
          Attention(Q, K, V) = softmax
          <span className="inline-block mx-2 bg-gray-800 px-2 rounded border border-gray-600">
            <div className="flex flex-col items-center">
               <span>QK<sup>T</sup></span>
               <span className="w-full h-[1px] bg-gray-400 my-1"></span>
               <span className="text-lg">√d<sub>k</sub></span>
            </div>
          </span>
          V
        </div>

        {/* Step by Step Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {[
                { step: "1. MatMul", desc: "Q 乘以 K 的转置。计算每个 Query 和每个 Key 的相似度（点积）。", color: "border-cyber-accent text-cyber-accent" },
                { step: "2. Scale", desc: "除以 √dk (例如 √64=8)。防止点积结果过大导致梯度消失。", color: "border-yellow-500 text-yellow-500" },
                { step: "3. Softmax", desc: "将分数归一化为概率（加起来等于 1）。突显重要的，忽略不相关的。", color: "border-cyber-purple text-cyber-purple" },
                { step: "4. MatMul V", desc: "将概率作为权重，对 Value 进行加权求和。得到最终的注意力输出。", color: "border-green-500 text-green-500" }
            ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded border ${item.color} bg-black/40 flex flex-col h-full`}>
                    <strong className="block mb-2 font-mono text-lg">{item.step}</strong>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
            ))}
        </div>

        <div className="w-full bg-cyber-dim/10 p-4 rounded border-l-4 border-cyber-accent text-sm text-gray-300">
            <strong className="text-cyber-accent">为什么要除以 √dk?</strong><br/>
            如果不缩放，当维度 dk 很大时，点积结果会非常大。Softmax 函数在输入很大时，梯度会变得极小（接近 0），导致训练停滞。Scaling 是 Transformer 能深层训练的关键技巧。
        </div>
      </div>
    </Card>
  );
};