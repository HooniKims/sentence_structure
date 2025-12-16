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
    <div className="min-h-screen pb-20 bg-gradient-to-b from-blue-50 to-indigo-50 selection:bg-yellow-200 selection:text-yellow-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <Header />
        
        <InputArea 
          value={inputText}
          onChange={setInputText}
          onAnalyze={handleAnalyze} 
          isLoading={isLoading} 
        />

        {error && (
          <div className="max-w-3xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r shadow-md mb-8 animate-pop">
            <p className="font-bold">앗, 오류가 발생했어요!</p>
            <p>{error}</p>
          </div>
        )}

        <Visualizer result={result} />
        
        <GrammarGuide />
        
        <ExampleSelector onSelect={handleExampleSelect} />

        <footer className="text-center text-gray-400 text-sm py-8">
          <p>Powered by Google Gemini 2.5 Flash</p>
          <p>© 2025 Sentence Structure Playground. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;