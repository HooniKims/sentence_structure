import React, { useState } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import Visualizer from './components/Visualizer';
import GrammarGuide from './components/GrammarGuide';
import ExampleSelector from './components/ExampleSelector';
import { analyzeSentence } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null); // Clear previous result while loading
    
    try {
      const data = await analyzeSentence(text);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "분석 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleSelect = (text: string) => {
    setInputText(text);
    handleAnalyze(text);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Header />
      
      <InputArea 
        value={inputText}
        onChange={setInputText}
        onAnalyze={handleAnalyze} 
        isLoading={isLoading} 
      />

      {error && (
        <div style={{ 
          background: '#FEF2F2', 
          borderLeft: '4px solid #EF4444', 
          color: '#991B1B', 
          padding: '16px', 
          borderRadius: '0 8px 8px 0',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <p style={{ fontWeight: 'bold' }}>앗, 오류가 발생했어요!</p>
          <p>{error}</p>
        </div>
      )}

      <Visualizer result={result} />
      
      <GrammarGuide />
      
      <ExampleSelector onSelect={handleExampleSelect} />

      <footer className="footer">
        <p>Powered by Google Gemini 2.5 Flash</p>
        <p>© 2025 Sentence Structure Playground. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;