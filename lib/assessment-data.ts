export interface Question {
  id: number;
  text: string;
  category: 'income' | 'debt' | 'planning' | 'emergency' | 'relationship';
}

export interface AnxietyProfile {
  type: string;
  name: string;
  description: string;
  recommendations: string[];
  radarLabel: string;
  color: string;
}

export interface AssessmentResult {
  scores: {
    income: number;
    debt: number;
    planning: number;
    emergency: number;
    relationship: number;
  };
  primaryType: string;
  allProfiles: {
    income: AnxietyProfile;
    debt: AnxietyProfile;
    planning: AnxietyProfile;
    emergency: AnxietyProfile;
    relationship: AnxietyProfile;
  };
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '我經常擔心收入是否足以支付日常開支',
    category: 'income',
  },
  {
    id: 2,
    text: '看到帳單或收據時，我會感到焦慮',
    category: 'income',
  },
  {
    id: 3,
    text: '我擔心失業或收入減少',
    category: 'income',
  },
  {
    id: 4,
    text: '薪水到手後，我感到如釋重負',
    category: 'income',
  },
  {
    id: 5,
    text: '我對自己的債務感到沮喪或羞愧',
    category: 'debt',
  },
  {
    id: 6,
    text: '我的信用卡債務讓我感到壓力',
    category: 'debt',
  },
  {
    id: 7,
    text: '我不確定何時能還清債務',
    category: 'debt',
  },
  {
    id: 8,
    text: '我試圖隱瞞我的財務狀況，即使是對親近的人',
    category: 'debt',
  },
  {
    id: 9,
    text: '我沒有明確的財務計劃或目標',
    category: 'planning',
  },
  {
    id: 10,
    text: '我對未來的財務狀況感到不確定',
    category: 'planning',
  },
  {
    id: 11,
    text: '我不知道如何開始儲蓄或投資',
    category: 'planning',
  },
  {
    id: 12,
    text: '我擔心退休儲蓄不足',
    category: 'planning',
  },
  {
    id: 13,
    text: '如果發生意外開支，我不知道如何應對',
    category: 'emergency',
  },
  {
    id: 14,
    text: '我沒有緊急儲備基金',
    category: 'emergency',
  },
  {
    id: 15,
    text: '一筆意外開支會讓我陷入困境',
    category: 'emergency',
  },
  {
    id: 16,
    text: '我為醫療或家庭緊急情況的財務負擔感到害怕',
    category: 'emergency',
  },
  {
    id: 17,
    text: '我與家人或伴侶因為金錢問題經常爭執',
    category: 'relationship',
  },
  {
    id: 18,
    text: '我對與家人討論財務感到不舒服',
    category: 'relationship',
  },
  {
    id: 19,
    text: '金錢問題影響了我與親人的關係',
    category: 'relationship',
  },
  {
    id: 20,
    text: '我覺得伴侶對金錢的態度與我不同，這讓我感到焦慮',
    category: 'relationship',
  },
];

export const ANXIETY_PROFILES: Record<string, AnxietyProfile> = {
  income: {
    type: 'income',
    name: '收入焦慮型',
    description:
      '您主要擔心收入不足以應付生活開支。這種焦慮通常源於對經濟安全的擔憂和對未來的不確定感。',
    recommendations: [
      '列出所有必要開支，了解您的確切需求',
      '探索增加收入的機會，如兼職或技能提升',
      '創建一份現實的預算，確保基本需求得到滿足',
      '考慮尋求職業發展或薪資談判的建議',
      '建立一個小的應急基金來緩解焦慮感',
    ],
    radarLabel: '收入',
    color: '#D97706',
  },
  debt: {
    type: 'debt',
    name: '債務焦慮型',
    description:
      '您感到債務壓力，可能伴隨著內疚感或羞愧感。這會影響您的心理健康和人際關係。',
    recommendations: [
      '列出所有債務並制定還款優先順序',
      '考慮尋求債務諮詢或財務顧問的幫助',
      '探索債務整合或再融資選項',
      '停止新的債務積累，建立一個還款計劃',
      '尋求家人或朋友的情感支持，不要獨自承擔',
    ],
    radarLabel: '債務',
    color: '#DC2626',
  },
  planning: {
    type: 'planning',
    name: '規劃焦慮型',
    description:
      '您對未來的財務狀況感到迷茫和不確定。缺乏明確的計劃讓您感到無力控制自己的財務未來。',
    recommendations: [
      '從小目標開始，如每月儲蓄100元',
      '學習基本的財務規劃知識',
      '制定5年和10年的財務目標',
      '考慮參加財務教育課程或工作坊',
      '定期審視和調整您的財務計劃',
    ],
    radarLabel: '規劃',
    color: '#2563EB',
  },
  emergency: {
    type: 'emergency',
    name: '應急焦慮型',
    description:
      '您害怕意外開支會讓您陷入困境。缺乏應急基金使您感到容易受傷和不安全。',
    recommendations: [
      '開始建立應急基金，即使金額很小',
      '目標是儲備3-6個月的生活開支',
      '自動轉賬一部分工資到儲蓄帳戶',
      '列出可能的緊急情況並做好準備',
      '保持保險以保護您免受大型開支的影響',
    ],
    radarLabel: '應急',
    color: '#7C3AED',
  },
  relationship: {
    type: 'relationship',
    name: '關係焦慮型',
    description:
      '金錢問題正在影響您與親人的關係。溝通困難或價值觀差異加劇了財務焦慮。',
    recommendations: [
      '與伴侶或家人進行坦誠的財務對話',
      '制定一份共同的財務計劃和目標',
      '考慮參加財務夫妻諮詢或家庭財務工作坊',
      '建立關於金錢的溝通規則和習慣',
      '尋求專業協助來解決潛在的人際衝突',
    ],
    radarLabel: '關係',
    color: '#06B6D4',
  },
};

export const FEATURES = [
  {
    title: '了解您的焦慮類型',
    description: '通過科學問卷準確識別您的財務焦慮根源',
    icon: '📊',
  },
  {
    title: '個性化建議',
    description: '根據您的情況獲得量身定制的改進建議',
    icon: '💡',
  },
  {
    title: '視覺化分析',
    description: '通過雷達圖清晰查看您的財務焦慮五個維度',
    icon: '📈',
  },
  {
    title: '行動計劃',
    description: '獲得實踐的步驟指南，幫助您降低焦慮',
    icon: '🎯',
  },
  {
    title: '免費使用',
    description: '完全免費，無需註冊或信用卡',
    icon: '🆓',
  },
];

export const FAQ = [
  {
    question: '這項評估有多準確？',
    answer:
      '這項評估基於廣泛的財務心理學研究。然而，它是一個自我篩查工具，不能替代專業心理健康或財務建議。如果您感到嚴重困擾，請尋求專業幫助。',
  },
  {
    question: '我的結果會被保存嗎？',
    answer:
      '不會。我們不收集、保存或共享您的任何數據。所有評估都是完全匿名和私密的。',
  },
  {
    question: '我可以重複進行評估嗎？',
    answer:
      '當然可以！您可以隨時重複進行評估。多次進行評估可以幫助您追踪進度和觀察變化。',
  },
  {
    question: '如果我的焦慮非常高怎麼辦？',
    answer:
      '如果您的焦慮程度非常高，請尋求專業幫助。您可以聯繫心理健康專業人士、財務顧問或您當地的心理健康熱線。',
  },
  {
    question: '這項評估需要多長時間？',
    answer: '完成20個問題的評估通常需要5-10分鐘。',
  },
  {
    question: '評估問卷包括哪些內容？',
    answer:
      '評估涵蓋五個關鍵領域：收入、債務、財務規劃、應急準備和人際關係中的金錢問題。',
  },
];
