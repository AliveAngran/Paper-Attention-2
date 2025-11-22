import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Layers } from 'lucide-react';

const HEADS = [
    { id: 1, name: "Head 1: 语法依赖", color: "text-cyber-accent", desc: "关注主谓宾关系 (Syntax)" },
    { id: 2, name: "Head 2: 指代消解", color: "text-cyber-purple", desc: "关注代词与其指代对象 (Coreference)" },
    { id: 3, name: "Head 3: 上下文关联", color: "text-green-400", desc: "关注词义消歧 (Semantics)" },
    { id: 4, name: "Head 4: 位置关系", color: "text-yellow-400", desc: "关注相邻词 (Locality)" },
];

export const MultiHeadView: React.FC = () => {
    const [activeHead, setActiveHead] = useState(1);

    return (
        <Card title="7. 多头注意力 (Multi-Head Attention)" subtitle="为了看得更全面，我们需要多个“脑袋”">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 space-y-2">
                    {HEADS.map(head => (
                        <button
                            key={head.id}
                            onClick={() => setActiveHead(head.id)}
                            className={`w-full text-left p-3 rounded border transition-all flex items-center gap-3
                                ${activeHead === head.id ? 'bg-gray-800 border-gray-600' : 'bg-transparent border-transparent hover:bg-gray-900'}
                            `}
                        >
                            <Layers size={18} className={head.color} />
                            <div>
                                <div className={`font-bold text-sm ${head.color}`}>{head.name}</div>
                                <div className="text-xs text-gray-500">{head.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex-1 bg-black rounded border border-gray-800 p-6 relative overflow-hidden flex items-center justify-center min-h-[200px]">
                    <div className="absolute inset-0 opacity-20 grid grid-cols-6 gap-1">
                        {/* Background matrix effect */}
                        {Array.from({length: 36}).map((_, i) => <div key={i} className="bg-gray-800 rounded-full w-1 h-1 m-auto"></div>)}
                    </div>

                    <div className="relative z-10 text-center">
                         <div className="text-2xl font-mono mb-4">"The animal didn't cross it"</div>
                         
                         {activeHead === 1 && (
                            <div className="text-cyber-accent text-sm">
                                连线: <span className="font-bold">animal</span> ↔ <span className="font-bold">cross</span> (主语-谓语)
                            </div>
                         )}
                         {activeHead === 2 && (
                            <div className="text-cyber-purple text-sm">
                                连线: <span className="font-bold">it</span> ↔ <span className="font-bold">animal</span> (指代)
                            </div>
                         )}
                         {activeHead === 3 && (
                            <div className="text-green-400 text-sm">
                                连线: <span className="font-bold">cross</span> ↔ <span className="font-bold">street</span> (动宾语义)
                            </div>
                         )}
                         {activeHead === 4 && (
                            <div className="text-yellow-400 text-sm">
                                连线: <span className="font-bold">The</span> ↔ <span className="font-bold">animal</span> (修饰)
                            </div>
                         )}
                    </div>
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
                论文中使用 8 个 Head (h=8)。每个 Head 都有自己独立的权重矩阵 (Wq, Wk, Wv)，将输入投影到不同的子空间。最后将所有 Head 的结果拼接 (Concat) 并进行线性变换。
            </div>
        </Card>
    );
};