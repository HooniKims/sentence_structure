import React, { useState } from 'react';
import { AnalysisResult, ClauseType, SentenceType, ComplexType } from '../types';
import { CLAUSE_CLASSES, CLAUSE_LABELS } from '../constants';
import { Info } from 'lucide-react';

interface VisualizerProps {
  result: AnalysisResult | null;
}

const Visualizer: React.FC<VisualizerProps> = ({ result }) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  if (!result) return null;

  const isSimple = result.sentenceType === SentenceType.SIMPLE;

  return (
    <div className="visualizer-card">
      {/* Result Header */}
      <div className="result-header">
        {isSimple ? (
          <div className="result-badge badge-simple">
            🎉 홑문장
          </div>
        ) : (
          <div className="result-badge badge-complex">
            🧩 겹문장
          </div>
        )}
        
        {!isSimple && result.complexType !== ComplexType.NONE && (
          <div style={{ color: 'var(--text-sub)', fontSize: '1.1rem', marginBottom: '16px' }}>
             이 문장은 <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{result.complexType === ComplexType.EMBEDDED ? '안은문장' : '이어진문장'}</span>입니다!
          </div>
        )}
        
        <div className="explanation-box">
          <p>💡 {result.explanation}</p>
        </div>
      </div>

      {/* Visual Block Diagram */}
      <div className="structure-diagram">
        <span className="diagram-label">Structure Map</span>
        
        {result.segments.map((segment, idx) => {
          const isClause = segment.type !== ClauseType.MAIN && segment.type !== ClauseType.NONE;
          const segmentClass = CLAUSE_CLASSES[segment.type] || CLAUSE_CLASSES[ClauseType.NONE];
          const label = CLAUSE_LABELS[segment.type];

          return (
            <div 
              key={idx}
              className="segment-container"
              onClick={() => setActiveSegmentIndex(activeSegmentIndex === idx ? null : idx)}
            >
              {/* Connector visualization for nested clauses */}
              {isClause && (
                <>
                  <div className="clause-connector"></div>
                  <div className="clause-tag">{label}</div>
                </>
              )}

              <div className={`segment-block ${segmentClass}`}>
                {segment.text}
              </div>

              {/* Tooltip Description */}
              {activeSegmentIndex === idx && segment.description && (
                <div className="tooltip">
                  {segment.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-placeholder)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <Info size={16} />
        <span>블록을 클릭하면 자세한 설명을 볼 수 있어요!</span>
      </div>
    </div>
  );
};

export default Visualizer;