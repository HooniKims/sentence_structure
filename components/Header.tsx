import React from 'react';
import { Puzzle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-icon">
        <Puzzle size={32} color="#F59E0B" strokeWidth={2.5} />
      </div>
      <h1 className="brand-title">
        문장 구조 <span className="brand-highlight">놀이터</span>
      </h1>
      <p className="header-desc">
        어려운 국어 문법, 이제 놀이처럼 배워봐요!<br/>
        문장을 입력하면 <strong>로봇 선생님</strong>이 구조를 분해해 드려요.
      </p>
    </header>
  );
};

export default Header;