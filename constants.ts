import { ExampleSentence, ClauseType } from './types';

export const GRAMMAR_GUIDE = [
  {
    title: "홑문장 vs 겹문장",
    content: "주어와 서술어 관계가 한 번만 나타나면 '홑문장', 두 번 이상 나타나면 '겹문장'입니다. 겹문장은 다시 '안은문장'과 '이어진문장'으로 나뉩니다."
  },
  {
    title: "안은문장의 종류",
    content: "안은문장은 다른 문장을 자신의 성분으로 가지고 있는 문장입니다.",
    subItems: [
      { type: ClauseType.NOUN, label: "명사절", desc: "명사형 어미 '-(으)ㅁ', '-기'가 붙어 주어, 목적어 등의 역할을 합니다." },
      { type: ClauseType.ADNOMINAL, label: "관형사절", desc: "관형사형 어미 '-(으)ㄴ', '-는', '-(으)ㄹ', '-던'이 붙어 체언을 꾸며줍니다." },
      { type: ClauseType.ADVERBIAL, label: "부사절", desc: "부사형 어미 '-게', '-도록' 등이 붙어 서술어를 꾸며줍니다." },
      { type: ClauseType.PREDICATE, label: "서술절", desc: "주어 + (주어 + 서술어) 구조로, 절 전체가 서술어 기능을 합니다. (예: 토끼는 앞발이 짧다)" },
      { type: ClauseType.QUOTATIVE, label: "인용절", desc: "인용 조사 '고', '라고'가 붙어 남의 말이나 생각을 인용합니다." },
    ]
  }
];

export const EXAMPLE_SENTENCES: ExampleSentence[] = [
  { text: "철수가 학교에 갔다.", category: "홑문장" },
  { text: "나는 그가 오기를 기다린다.", category: "명사절을 안은문장" },
  { text: "이곳은 우리가 놀던 곳이다.", category: "관형사절을 안은문장" },
  { text: "비가 소리도 없이 내린다.", category: "부사절을 안은문장" },
  { text: "토끼는 앞발이 짧다.", category: "서술절을 안은문장" },
  { text: "그는 나에게 밥을 먹자고 말했다.", category: "인용절을 안은문장" },
  { text: "비가 오고 바람이 분다.", category: "이어진문장 (대등)" },
];

export const CLAUSE_COLORS = {
  [ClauseType.NONE]: "bg-gray-100 border-gray-300 text-gray-700",
  [ClauseType.MAIN]: "bg-white border-gray-200 text-gray-800",
  [ClauseType.NOUN]: "bg-blue-100 border-blue-400 text-blue-800",
  [ClauseType.ADNOMINAL]: "bg-green-100 border-green-400 text-green-800",
  [ClauseType.ADVERBIAL]: "bg-yellow-100 border-yellow-400 text-yellow-800",
  [ClauseType.PREDICATE]: "bg-purple-100 border-purple-400 text-purple-800",
  [ClauseType.QUOTATIVE]: "bg-orange-100 border-orange-400 text-orange-800",
};

export const CLAUSE_LABELS = {
  [ClauseType.NONE]: "",
  [ClauseType.MAIN]: "문장 성분",
  [ClauseType.NOUN]: "명사절",
  [ClauseType.ADNOMINAL]: "관형사절",
  [ClauseType.ADVERBIAL]: "부사절",
  [ClauseType.PREDICATE]: "서술절",
  [ClauseType.QUOTATIVE]: "인용절",
};