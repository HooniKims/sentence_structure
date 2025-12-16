import React, { useState } from 'react';
import { AnalysisResult, ClauseType, SentenceType, ComplexType } from '../types';
import { CLAUSE_COLORS, CLAUSE_LABELS } from '../constants';
import { Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface VisualizerProps {
  result: AnalysisResult | null;
}

const Visualizer: React.FC<VisualizerProps> = ({ result }) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  if (!result) return null;

  const isSimple = result.sentenceType === SentenceType.SIMPLE;

  return (
    <div className="w-full max-w-3xl mx-auto animate-pop">
      {/* Result Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-indigo-50 mb-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {isSimple ? (
            <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold text-xl brand-font">
              🎉 홑문장
            </div>
          ) : (
            <div className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-bold text-xl brand-font">
              🧩 겹문장
            </div>
          )}
        </div>
        
        {!isSimple && result.complexType !== ComplexType.NONE && (
          <div className="text-gray-500 font-medium text-lg">
            이 문장은 <span className="text-indigo-600 font-bold">{result.complexType === ComplexType.EMBEDDED ? '안은문장' : '이어진문장'}</span>입니다!
          </div>
        )}
        
        <p className="mt-4 text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
          💡 {result.explanation}
        </p>
      </div>

      {/* Visual Block Diagram */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-indigo-50 min-h-[200px] flex flex-col justify-center items-center">
        <h3 className="text-lg font-bold text-gray-400 mb-6 uppercase tracking-wider text-center">문장 구조 분해도</h3>
        
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {result.segments.map((segment, idx) => {
            const isClause = segment.type !== ClauseType.MAIN && segment.type !== ClauseType.NONE;
            const colorClass = CLAUSE_COLORS[segment.type] || CLAUSE_COLORS[ClauseType.NONE];
            const label = CLAUSE_LABELS[segment.type];

            return (
              <div 
                key={idx}
                className="relative group"
                onClick={() => setActiveSegmentIndex(activeSegmentIndex === idx ? null : idx)}
              >
                {/* Connection Line visual for Embedded clauses (Desktop only) */}
                {isClause && (
                  <div className="hidden md:block absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400 bg-white px-1 z-10">
                    {label}
                  </div>
                )}
                {isClause && (
                  <div className="hidden md:block absolute -top-4 left-0 w-full h-4 border-t-2 border-l-2 border-r-2 border-gray-200 rounded-t-lg pointer-events-none"></div>
                )}

                <div 
                  className={`
                    relative px-4 py-3 rounded-xl border-b-4 font-medium text-lg cursor-pointer transition-all duration-200 select-none
                    ${colorClass}
                    ${activeSegmentIndex === idx ? 'scale-105 shadow-md z-20' : 'hover:scale-105 hover:shadow-sm'}
                  `}
                >
                  {segment.text}
                  
                  {/* Badge for mobile */}
                  {isClause && (
                    <span className="md:hidden absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                      {label}
                    </span>
                  )}
                </div>

                {/* Popover / Tooltip Description */}
                {activeSegmentIndex === idx && segment.description && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-gray-800 text-white text-sm rounded-xl p-3 shadow-2xl z-50 animate-pop text-center">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
                    {segment.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-sm text-gray-400 flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>각 블록을 클릭하면 자세한 설명을 볼 수 있어!</span>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;