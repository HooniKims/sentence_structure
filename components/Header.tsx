import React from 'react';
import { Puzzle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10 px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-yellow-300 p-3 rounded-2xl shadow-lg transform -rotate-6">
          <Puzzle className="w-8 h-8 text-yellow-800" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight brand-font text-shadow-sm">
          문장 구조 <span className="text-blue-500">놀이터</span>
        </h1>
      </div>
      <p className="text-gray-600 max-w-lg mx-auto text-lg">
        어려운 국어 문법, 이제 놀이처럼 배워봐요!<br/>
        문장을 입력하면 <span className="font-bold text-indigo-500">로봇 선생님</span>이 구조를 분해해 드려요. 🤖
      </p>
    </header>
  );
};

export default Header;