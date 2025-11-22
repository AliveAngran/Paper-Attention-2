import React from 'react';
import { Card } from '../ui/Card';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { x: 10, y: 80, z: 10, name: 'King (国王)', type: 'royalty' },
  { x: 12, y: 85, z: 10, name: 'Queen (女王)', type: 'royalty' },
  { x: 80, y: 20, z: 10, name: 'Man (男人)', type: 'gender' },
  { x: 82, y: 25, z: 10, name: 'Woman (女人)', type: 'gender' },
  { x: 45, y: 50, z: 10, name: 'Apple (苹果)', type: 'fruit' },
  { x: 48, y: 52, z: 10, name: 'Banana (香蕉)', type: 'fruit' },
];

const COLORS: Record<string, string> = {
  royalty: '#bd00ff',
  gender: '#00f0ff',
  fruit: '#22c55e'
};

export const Embeddings: React.FC = () => {
  return (
    <Card title="2. 词嵌入 (Embeddings)" subtitle="将词语转化为高维空间的向量">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" name="Dimension 1" hide />
              <YAxis type="number" dataKey="y" name="Dimension 2" hide />
              <ZAxis type="number" dataKey="z" range={[60, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
              <Scatter name="Words" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.type]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 flex flex-col justify-center space-y-4 text-sm">
          <p>
             机器不理解“国王”，但理解数字列表（向量）。在 Transformer 开始前，每个词都被转换为一个 512 维的向量（这里为了演示简化为 2 维）。
          </p>
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#bd00ff]"></span>
                <span>语义相近的词在空间中距离更近。</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00f0ff]"></span>
                <span>King - Man + Woman ≈ Queen 的数学关系得以保留。</span>
             </div>
          </div>
          <div className="p-2 bg-gray-900 border border-gray-800 rounded font-mono text-xs text-gray-400">
            Input: "King"<br/>
            Output: [0.12, -0.45, 0.88, ... 509 more]
          </div>
        </div>
      </div>
    </Card>
  );
};