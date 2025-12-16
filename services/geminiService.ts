import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, ClauseType, ComplexType, SentenceType } from "../types";

// Helper to get API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API Key not found in environment variables");
    return "";
  }
  return key;
};

// JSON Schema definition for Gemini Output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sentenceType: {
      type: Type.STRING,
      enum: [SentenceType.SIMPLE, SentenceType.COMPLEX, SentenceType.UNKNOWN],
      description: "문장이 홑문장(SIMPLE)인지 겹문장(COMPLEX)인지 판별"
    },
    complexType: {
      type: Type.STRING,
      enum: [ComplexType.EMBEDDED, ComplexType.LINKED, ComplexType.NONE],
      description: "겹문장일 경우 안은문장(EMBEDDED)인지 이어진문장(LINKED)인지 구분. 홑문장이면 NONE"
    },
    segments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "문장의 일부분 텍스트" },
          type: {
            type: Type.STRING,
            enum: [
              ClauseType.MAIN,
              ClauseType.NOUN,
              ClauseType.ADNOMINAL,
              ClauseType.ADVERBIAL,
              ClauseType.PREDICATE,
              ClauseType.QUOTATIVE,
              ClauseType.NONE
            ],
            description: "해당 텍스트 조각의 문법적 유형"
          },
          description: { type: Type.STRING, description: "해당 부분이 왜 그 유형인지 간단한 설명 (예: 명사형 어미 -기 결합)" }
        },
        required: ["text", "type"]
      },
      description: "문장을 의미 단위나 절 단위로 끊어서 배열로 반환. 안긴절은 별도의 세그먼트로 분리."
    },
    explanation: {
      type: Type.STRING,
      description: "전체적인 문장 구조 분석에 대한 친절한 설명 (학생 대상)"
    }
  },
  required: ["sentenceType", "complexType", "segments", "explanation"]
};

// Helper function to retry operations
async function retryOperation<T>(operation: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    // Retry on 503 (Service Unavailable) or 429 (Too Many Requests)
    if (retries > 0 && (error.code === 503 || error.status === 503 || error.status === 429 || error.message?.includes('overloaded'))) {
      console.warn(`Gemini API overloaded. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryOperation(operation, retries - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
}

export const analyzeSentence = async (sentence: string): Promise<AnalysisResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `
    당신은 친절하고 재미있는 한국어 문법 선생님입니다. 중고등학생을 대상으로 문장의 구조(홑문장/겹문장, 안은문장/이어진문장)를 분석해주는 역할을 합니다.
    
    규칙:
    1. 문장이 주어-서술어 관계가 한 번이면 'SIMPLE'(홑문장), 두 번 이상이면 'COMPLEX'(겹문장)입니다.
    2. 겹문장 중, 하나의 문장이 다른 문장의 성분이 되면 'EMBEDDED'(안은문장), 대등하거나 종속적으로 연결되면 'LINKED'(이어진문장)입니다.
    3. 안은문장의 경우 안긴절의 종류(명사절, 관형사절, 부사절, 서술절, 인용절)를 정확히 식별하세요.
       - 명사절: -(으)ㅁ, -기
       - 관형사절: -(으)ㄴ, -는, -(으)ㄹ, -던. (주의: 주어가 생략된 경우도 찾을 수 있어야 함)
       - 부사절: -게, -도록, -(으)시
       - 서술절: 주어 + [주어 + 서술어] 형태. 문법적 표지 없음.
       - 인용절: -고, -라고
    4. 'segments' 배열은 전체 문장을 끊어서 재구성하되, 순서를 유지해야 합니다. 안긴절 부분은 독립된 세그먼트로 type을 지정하고, 나머지 부분은 'MAIN'으로 지정하세요.
    5. 설명은 학생이 이해하기 쉽게 "아하!" 할 수 있는 말투로 작성해주세요.
  `;

  try {
    const response = await retryOperation(async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `다음 문장을 분석해줘: "${sentence}"` }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: analysisSchema
        }
      });
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    let userMessage = "문장을 분석하는 도중 선생님이 잠시 자리를 비웠어요! 다시 시도해주세요.";
    if (error.code === 503 || error.message?.includes('overloaded')) {
      userMessage = "사용자가 너무 많아 로봇 선생님이 바빠요. 3초 뒤에 다시 버튼을 눌러주세요! 😵‍💫";
    }
    
    throw new Error(userMessage);
  }
};