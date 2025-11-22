import React from 'react';
import { Card } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'ByteNet', bleu: 23.75, cost: 100 },
  { name: 'Deep-Att', bleu: 24.6, cost: 110 },
  { name: 'GNMT+RL', bleu: 24.6, cost: 120 },
  { name: 'ConvS2S', bleu: 25.16, cost: 90 },
  { name: 'Transformer (Base)', bleu: 27.3, cost: 10 }, // Dramatic cost reduction
  { name: 'Transformer (Big)', bleu: 28.4, cost: 30 },
];

export const ResultsChart: React.FC = () => {
  return (
    <Card title="10. 结果对比 (Results)" subtitle="更高质量 (BLEU)，极低训练成本">
      <div className="flex flex-col md:flex-row h-[300px] gap-4">
        <div className="flex-1">
            <h4 className="text-center text-xs font-mono text-gray-400 mb-2">BLEU Score (EN-DE) - 越高越好</h4>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} layout="vertical" margin={{left: 40}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false}/>
                    <XAxis type="number" domain={[20, 30]} hide/>
                    <YAxis type="category" dataKey="name" width={100} tick={{fill: '#999', fontSize: 10}} interval={0}/>
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} cursor={{fill: '#ffffff11'}}/>
                    <Bar dataKey="bleu" barSize={20}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.name.includes('Transformer') ? '#00f0ff' : '#444'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
        
        <div className="w-px bg-gray-800 hidden md:block"></div>

        <div className="flex-1">
            <h4 className="text-center text-xs font-mono text-gray-400 mb-2">训练成本 (Training Cost / FLOPS) - 越低越好</h4>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} layout="vertical" margin={{left: 40}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false}/>
                    <XAxis type="number" hide/>
                    <YAxis type="category" dataKey="name" width={100} tick={{fill: '#999', fontSize: 10}} interval={0}/>
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} cursor={{fill: '#ffffff11'}}/>
                    <Bar dataKey="cost" barSize={20}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.name.includes('Transformer') ? '#bd00ff' : '#444'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-300">
        <span className="text-cyber-accent">Transformer (Big)</span> 达到了 <span className="text-white font-bold">28.4 BLEU</span>，且训练成本仅为之前最佳模型的一小部分（3.5 天 vs 几个月）。
      </div>
    </Card>
  );
};