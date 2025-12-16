import React, { useState } from 'react';
import { GRAMMAR_GUIDE } from '../constants';
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const GrammarGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white/50 rounded-3xl p-6 backdrop-blur-sm border border-white/60">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 brand-font">문법 족보 열어보기</h3>
            <p className="text-sm text-gray-500">헷갈리는 문법 개념을 확인해보세요!</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>

      {isOpen && (
        <div className="mt-6 space-y-6 animate-pop">
          {GRAMMAR_GUIDE.map((section, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-indigo-600 mb-2 brand-font">{section.title}</h4>
              <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
              
              {section.subItems && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.subItems.map((item, subIdx) => (
                    <div key={subIdx} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600 leading-snug">{item.desc}</div>
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