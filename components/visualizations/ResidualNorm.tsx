import React from 'react';
import { Card } from '../ui/Card';
import { GitMerge, GitCommit } from 'lucide-react';

export const ResidualNorm: React.FC = () => {
    return (
        <Card title="9. 残差连接与归一化 (Add & Norm)" subtitle="让深层网络不“健忘”，且训练更稳定">
            <div className="flex flex-col items-center py-8 relative">
                
                {/* Diagram */}
                <div className="flex flex-col items-center w-full max-w-md relative">
                    
                    {/* Input x */}
                    <div className="w-24 h-10 bg-gray-800 rounded flex items-center justify-center border border-gray-600 mb-8 z-10 relative">
                        x
                        {/* Residual Path Line */}
                         <div className="absolute left-full top-1/2 w-8 h-[1px] bg-cyber-accent"></div>
                         <div className="absolute left-[calc(100%+32px)] top-1/2 w-[1px] h-[140px] bg-cyber-accent border-l border-dashed border-cyber-accent"></div>
                         <div className="absolute left-[calc(100%+32px)] bottom-[-100px] w-[-32px] h-[1px] bg-cyber-accent"></div>
                    </div>

                    {/* Sublayer */}
                    <div className="w-48 h-16 bg-cyber-purple/20 border border-cyber-purple rounded-lg flex items-center justify-center text-cyber-purple font-bold mb-8 z-10 shadow-[0_0_15px_rgba(189,0,255,0.2)]">
                        Sublayer(x)
                        <span className="text-xs font-normal ml-2 text-gray-400">(Attention / FFN)</span>
                    </div>

                    {/* Add & Norm */}
                    <div className="w-48 h-16 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-center justify-center text-yellow-500 font-bold z-10 relative">
                        <GitMerge className="mr-2 rotate-90" /> LayerNorm(x + Sublayer(x))
                        {/* Incoming residual arrow */}
                        <div className="absolute right-[-34px] top-1/2 w-8 h-[1px] bg-cyber-accent"></div>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
                    <div className="p-3 bg-gray-900 rounded text-sm">
                        <h5 className="text-cyber-accent font-bold mb-1 flex items-center gap-2"><GitMerge size={14}/> 残差连接 (Residual)</h5>
                        <p className="text-gray-400 text-xs">
                            <code>x + Sublayer(x)</code>。就像给信息开了一条“高速公路”，让梯度可以直接流向底层，解决了深层网络梯度消失的问题（ResNet 的核心思想）。
                        </p>
                    </div>
                    <div className="p-3 bg-gray-900 rounded text-sm">
                         <h5 className="text-yellow-500 font-bold mb-1 flex items-center gap-2"><GitCommit size={14}/> 层归一化 (Layer Norm)</h5>
                         <p className="text-gray-400 text-xs">
                            重新调整数据的分布（均值为0，方差为1），让每一层的输入都在一个稳定的范围内，极大地加速了训练收敛。
                         </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};