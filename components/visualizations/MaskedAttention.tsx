import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { EyeOff, Eye } from 'lucide-react';

export const MaskedAttention: React.FC = () => {
    const [step, setStep] = useState(2); // Generating 3rd word
    const sentence = ["I", "am", "a", "robot"];

    return (
        <Card title="8. Masked Attention (掩码)" subtitle="Decoder 训练时不能偷看未来">
            <div className="space-y-6">
                <div className="flex justify-center space-x-4 mb-4">
                    {sentence.map((word, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setStep(idx)}
                            className={`px-3 py-1 rounded text-sm border ${step === idx ? 'bg-cyber-accent text-black border-cyber-accent' : 'bg-gray-800 border-gray-700'}`}
                        >
                            生成: "{word}"
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-1 max-w-[300px] mx-auto">
                    {/* Grid Visualization of Mask */}
                    {sentence.map((rowWord, rIdx) => (
                        sentence.map((colWord, cIdx) => {
                            // We are at row rIdx. Can we see column cIdx?
                            // In Masked Attention, we can only attend to positions <= current position
                            const isFuture = cIdx > rIdx;
                            const isCurrentStep = rIdx === step;
                            
                            let bgColor = 'bg-gray-800';
                            if (isFuture) bgColor = 'bg-red-900/30 diagonal-stripes'; // Blocked
                            else if (isCurrentStep) bgColor = 'bg-green-500/50'; // Visible context
                            else bgColor = 'bg-gray-700'; // Past context

                            return (
                                <div 
                                    key={`${rIdx}-${cIdx}`} 
                                    className={`aspect-square border border-gray-900 flex items-center justify-center text-[10px] relative ${bgColor}`}
                                    title={`Can word ${rIdx} attend to word ${cIdx}?`}
                                >
                                    {isFuture ? <EyeOff size={12} className="text-red-500 opacity-50"/> : null}
                                    {!isFuture && isCurrentStep && <Eye size={12} className="text-white"/>}
                                </div>
                            )
                        })
                    ))}
                </div>

                <div className="text-sm text-gray-300 bg-black/30 p-3 rounded border border-gray-800">
                    <p className="mb-2">
                        <strong>当前正在生成第 {step + 1} 个词: "{sentence[step]}"</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                        为了保持自回归属性（Autoregressive），模型在预测位置 {step} 时，只能看到位置 0 到 {step} 的信息。位置 {step + 1} 及以后的信息被 Mask（设为负无穷大，softmax 后为 0）屏蔽掉了。
                    </p>
                </div>
            </div>
        </Card>
    );
};