import React, { useState } from 'react';
import { GRAMMAR_GUIDE } from '../constants';
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const GrammarGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="guide-wrapper">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="guide-toggle"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="guide-icon-box">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '4px' }}>문법 족보 열어보기</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>헷갈리는 문법 개념을 확인해보세요!</p>
          </div>
        </div>
        {isOpen ? <ChevronUp color="var(--text-placeholder)" /> : <ChevronDown color="var(--text-placeholder)" />}
      </button>

      {isOpen && (
        <div className="guide-content">
          {GRAMMAR_GUIDE.map((section, idx) => (
            <div key={idx} className="guide-card">
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '12px' }}>{section.title}</h4>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>{section.content}</p>
              
              {section.subItems && (
                <div className="sub-item-grid">
                  {section.subItems.map((item, subIdx) => (
                    <div key={subIdx} className="sub-item">
                      <div style={{ fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)' }}></span>
                        {item.label}
                      </div>
                      <div style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarGuide;