import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Search, Key, Database, ArrowRight } from 'lucide-react';

const LIBRARY_DATA = [
  { id: 1, key: "Action (动作)", value: "Running (跑)", content: "High energy movement" },
  { id: 2, key: "Person (人)", value: "Athlete (运动员)", content: "Someone who plays sports" },
  { id: 3, key: "Object (物体)", value: "Ball (球)", content: "Spherical object used in games" },
];

export const QKVAnalogy: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);

  return (
    <Card title="4. Q, K, V 是什么？" subtitle="Attention 的核心：查询、键、值">
      <div className="space-y-6">
        <div className="p-4 bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg mb-6">
            <p className="text-sm text-gray-300">
                想象你在图书馆（或数据库）：
                <br/>
                1. <strong className="text-cyber-accent">Query (Q)</strong>: 你手里拿的借书条（你想找什么）。<br/>
                2. <strong className="text-cyber-purple">Key (K)</strong>: 书脊上的标签（用来匹配你的借书条）。<br/>
                3. <strong className="text-green-400">Value (V)</strong>: 书里的内容（你最终想要的信息）。<br/>
                Attention 就是计算 Q 和 K 有多匹配，然后根据匹配度提取 V。
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Query Section */}
            <div className="flex flex-col gap-2">
                <h4 className="text-center font-mono text-cyber-accent flex justify-center items-center gap-2"><Search size={16}/> Query (查询)</h4>
                <div className="flex flex-col gap-2">
                    {['Action', 'Person', 'Object'].map((q) => (
                        <button 
                            key={q}
                            onClick={() => setQuery(q)}
                            className={`p-2 rounded border text-sm transition-all ${query === q ? 'bg-cyber-accent text-black border-cyber-accent font-bold' : 'bg-gray-900 border-gray-700 hover:border-gray-500'}`}
                        >
                            查询: {q}
                        </button>
                    ))}
                </div>
            </div>

            {/* Attention Calculation (Implicit) */}
            <div className="flex flex-col items-center justify-center text-gray-500">
                 <div className={`transition-all duration-500 ${query ? 'text-white scale-110' : 'opacity-30'}`}>
                    <ArrowRight size={24} />
                    <span className="text-xs block mt-1">Dot Product</span>
                    <span className="text-xs block">(匹配计算)</span>
                 </div>
            </div>

            {/* Key/Value Store */}
            <div className="flex flex-col gap-2">
                <h4 className="text-center font-mono text-cyber-purple flex justify-center items-center gap-2"><Database size={16}/> Key-Value Memory</h4>
                <div className="space-y-2">
                    {LIBRARY_DATA.map((item) => {
                        const isMatch = query && item.key.includes(query);
                        return (
                            <div 
                                key={item.id}
                                className={`p-2 rounded border text-sm transition-all duration-300 flex justify-between items-center
                                    ${isMatch ? 'bg-cyber-purple/20 border-cyber-purple shadow-[0_0_10px_#bd00ff44]' : 'bg-gray-900/50 border-gray-800 opacity-50'}
                                `}
                            >
                                <div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1"><Key size={10}/> {item.key}</div>
                                    <div className={`font-bold ${isMatch ? 'text-white' : 'text-gray-500'}`}>{item.value}</div>
                                </div>
                                {isMatch && <div className="text-xs text-green-400 font-mono">100% Match</div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
};