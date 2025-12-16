export enum SentenceType {
  SIMPLE = 'SIMPLE', // 홑문장
  COMPLEX = 'COMPLEX', // 겹문장
  UNKNOWN = 'UNKNOWN'
}

export enum ComplexType {
  EMBEDDED = 'EMBEDDED', // 안은문장
  LINKED = 'LINKED', // 이어진문장
  NONE = 'NONE'
}

export enum ClauseType {
  NONE = 'NONE',
  NOUN = 'NOUN', // 명사절
  PREDICATE = 'PREDICATE', // 서술절
  ADNOMINAL = 'ADNOMINAL', // 관형사절
  ADVERBIAL = 'ADVERBIAL', // 부사절
  QUOTATIVE = 'QUOTATIVE', // 인용절
  MAIN = 'MAIN' // 주절/일반 문장 성분
}

export interface AnalysisSegment {
  text: string;
  type: ClauseType;
  description?: string; // Short tip like "명사형 어미 -(으)ㅁ 결합"
}

export interface AnalysisResult {
  sentenceType: SentenceType;
  complexType: ComplexType;
  segments: AnalysisSegment[];
  explanation: string; // Overall explanation
}

export interface ExampleSentence {
  text: string;
  category: string;
}