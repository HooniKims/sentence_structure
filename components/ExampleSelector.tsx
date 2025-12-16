import React from 'react';
import { EXAMPLE_SENTENCES } from '../constants';
import { BookOpen } from 'lucide-react';

interface ExampleSelectorProps {
  onSelect: (text: string) => void;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-12">
      <div className="flex items-center gap-2 mb-4 px-4">
        <BookOpen className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-bold text-gray-700 brand-font">연습용 예문 골라보기</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-2">
        {EXAMPLE_SENTENCES.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(ex.text)}
            className="text-left bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
          >
            <div className="text-xs font-bold text-blue-500 mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
              {ex.category}
            </div>
            <div className="text-gray-700 font-medium truncate group-hover:text-blue-700">
              {ex.text}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleSelector;