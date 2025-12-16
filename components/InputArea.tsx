import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

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
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="여기에 분석하고 싶은 문장을 입력해봐! (예: 나는 그가 오기를 기다린다.)"
          className="w-full p-6 pr-16 text-lg rounded-3xl border-4 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none shadow-xl resize-none transition-all duration-300 min-h-[120px] bg-white text-gray-700 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center
            ${isLoading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 hover:scale-110 active:scale-95 text-white'
            }`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputArea;