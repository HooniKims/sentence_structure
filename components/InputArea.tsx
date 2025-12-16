import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputAreaProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  value: string;
  onChange: (val: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onAnalyze, isLoading, value, onChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAnalyze(value.trim());
    }
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit} className="input-wrapper">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="여기에 분석하고 싶은 문장을 입력해봐! (예: 나는 그가 오기를 기다린다.)"
          className="main-textarea"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="analyze-btn"
          title="문장 분석하기"
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <Sparkles size={24} strokeWidth={2} />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputArea;