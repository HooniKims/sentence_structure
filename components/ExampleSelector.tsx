import React from 'react';
import { EXAMPLE_SENTENCES } from '../constants';
import { BookOpen } from 'lucide-react';

interface ExampleSelectorProps {
  onSelect: (text: string) => void;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="examples-section">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <BookOpen size={20} color="var(--primary)" />
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>연습용 예문 골라보기</h3>
      </div>
      <div className="examples-grid">
        {EXAMPLE_SENTENCES.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(ex.text)}
            className="example-btn"
          >
            <div className="example-category">
              {ex.category}
            </div>
            <div className="example-text">
              {ex.text}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleSelector;