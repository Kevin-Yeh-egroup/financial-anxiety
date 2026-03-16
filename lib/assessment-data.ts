export interface Question {
  id: number;
  text: string;
  category: 'survival' | 'anticipation' | 'helplessness' | 'avoidance' | 'hypervigilance';
}

export interface AnxietyProfile {
  type: string;
  name: string;
  subtitle: string;
  description: string;
  relatable: string;
  recommendations: string[];
  radarLabel: string;
  color: string;
  illustration: string;
}

export interface AssessmentResult {
  scores: {
    survival: number;
    anticipation: number;
    helplessness: number;
    avoidance: number;
    hypervigilance: number;
  };
  primaryType: string;
  allProfiles: {
    survival: AnxietyProfile;
    anticipation: AnxietyProfile;
    helplessness: AnxietyProfile;
    avoidance: AnxietyProfile;
    hypervigilance: AnxietyProfile;
  };
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '我經常擔心收入是否足以支付日常開支',
    category: 'survival',
  },
  {
    id: 2,
    text: '看到帳單或收據時，我會感到焦慮',
    category: 'survival',
  },
  {
    id: 3,
    text: '我擔心失業或收入減少',
    category: 'survival',
  },
  {
    id: 4,
    text: '薪水到手後，我感到如釋重負',
    category: 'survival',
  },
  {
    id: 5,
    text: '我對自己的債務感到沮喪或羞愧',
    category: 'avoidance',
  },
  {
    id: 6,
    text: '我的信用卡帳單讓我不敢打開查看',
    category: 'avoidance',
  },
  {
    id: 7,
    text: '遇到財務問題時，我傾向於拖延處理',
    category: 'avoidance',
  },
  {
    id: 8,
    text: '我試圖隱瞞我的財務狀況，即使是對親近的人',
    category: 'avoidance',
  },
  {
    id: 9,
    text: '我覺得自己無法掌控財務狀況，感到無力',
    category: 'helplessness',
  },
  {
    id: 10,
    text: '即使有收入，我仍覺得改變現狀很困難',
    category: 'helplessness',
  },
  {
    id: 11,
    text: '我不知道如何開始儲蓄或投資',
    category: 'helplessness',
  },
  {
    id: 12,
    text: '面對財務問題，我感到束手無策',
    category: 'helplessness',
  },
  {
    id: 13,
    text: '如果發生意外開支，我不知道如何應對',
    category: 'anticipation',
  },
  {
    id: 14,
    text: '我經常擔心未來會發生的財務危機',
    category: 'anticipation',
  },
  {
    id: 15,
    text: '一筆意外開支就可能讓我的生活崩潰',
    category: 'anticipation',
  },
  {
    id: 16,
    text: '我為尚未發生的財務災難感到恐慌',
    category: 'anticipation',
  },
  {
    id: 17,
    text: '我會反覆核對帳戶餘額或帳單，確認沒有出錯',
    category: 'hypervigilance',
  },
  {
    id: 18,
    text: '我對自己的消費行為有很高的標準，稍有偏差就很自責',
    category: 'hypervigilance',
  },
  {
    id: 19,
    text: '我難以享受花費，即使是在財務允許的情況下',
    category: 'hypervigilance',
  },
  {
    id: 20,
    text: '我對財務上的小錯誤過度在意，久久無法釋懷',
    category: 'hypervigilance',
  },
];

export const ANXIETY_PROFILES: Record<string, AnxietyProfile> = {
  survival: {
    type: 'survival',
    name: '生存壓力型',
    subtitle: '現實壓力高',
    description:
      '您的焦慮主要來自當下真實的生活壓力——收入、帳單、日常開銷。這種焦慮有其現實基礎，但長期處於高壓狀態會讓您身心俱疲，影響判斷力與行動力。',
    relatable:
      '每個月領薪水的那天心情最好，但沒過幾天錢包又空了。看到超市收據、加油金額、水電帳單，心頭就會突然一緊。你不是不努力，只是總感覺錢永遠不夠用，生活的重量讓你喘不過氣。',
    recommendations: [
      '列出所有必要開支，清楚掌握每月資金缺口',
      '探索增加收入的機會，如兼職、接案或技能提升',
      '制定務實的月度預算，優先確保基本需求',
      '尋找可立即降低開支的小改變，累積信心',
      '建立哪怕很小的緊急備用金，讓自己多一份安全感',
    ],
    radarLabel: '生存壓力',
    color: '#D97706',
    illustration: '/%E7%94%9F%E6%B4%BB%E5%A3%93%E5%8A%9B%E5%9E%8B.png',
  },
  anticipation: {
    type: 'anticipation',
    name: '未雨綢繆型',
    subtitle: '不確定恐懼高',
    description:
      '您的焦慮主要來自對未來不確定性的高度恐懼。您傾向於預想最壞的情境，即使目前尚未發生，這種「萬一」思維會讓您持續處於緊繃狀態，難以享受當下的平靜。',
    relatable:
      '你最怕的不是現在，而是那個「萬一」。萬一突然生病、萬一車子壞了、萬一要換工作……一個尚未發生的場景就能讓你夜裡輾轉難眠。你不是杞人憂天，你只是太想保護自己不被突如其來的事情擊垮。',
    recommendations: [
      '練習「此刻現實核查」：區分真實威脅與想像的災難',
      '建立3-6個月的緊急備用金，讓「萬一」有所依靠',
      '學習基本的風險管理，如保險規劃，減少對未知的恐懼',
      '嘗試正念或呼吸練習，幫助身體從警戒狀態中放鬆',
      '與信任的人分享擔憂，避免在腦中不斷放大危機',
    ],
    radarLabel: '未雨綢繆',
    color: '#DC2626',
    illustration: '/%E6%9C%AA%E4%BE%86%E6%93%94%E5%BF%83%E5%9E%8B.png',
  },
  helplessness: {
    type: 'helplessness',
    name: '失控無力型',
    subtitle: '掌控感低',
    description:
      '您感到自己對財務狀況缺乏掌控力，即使知道問題所在，也不知從何改變起。這種無力感不是能力不足，而是長期挫折或資訊不足所累積的心理阻礙。',
    relatable:
      '聽說要「理財」，但連從哪裡開始都搞不清楚。存錢？買基金？買保險？每次下定決心，卻因為資訊太多、太複雜而不了了之。感覺別人都懂，只有自己還在原地踏步，越想越沮喪。',
    recommendations: [
      '從最小的一步開始：哪怕每月只存500元也算勝利',
      '學習一個基本財務概念就好，不必一次搞懂所有事',
      '設定一個可衡量的短期目標，用成功建立信心',
      '尋找財務入門資源（書籍、課程、社群），降低學習門檻',
      '找一位可以一起討論的人，打破孤立無援的感受',
    ],
    radarLabel: '失控無力',
    color: '#2563EB',
    illustration:
      '/%E4%B8%8D%E7%9F%A5%E9%81%93%E5%BE%9E%E5%93%AA%E9%96%8B%E5%A7%8B%E5%9E%8B.png',
  },
  avoidance: {
    type: 'avoidance',
    name: '逃避凍結型',
    subtitle: '行為退縮',
    description:
      '您面對財務問題時容易陷入迴避與拖延，帳單不打開、問題不面對，用「之後再說」保護自己免於當下的焦慮。但這種模式往往讓問題在暗處越滾越大。',
    relatable:
      '信用卡帳單還沒打開就先放到抽屜，貸款的事「之後再說」。明明知道問題就在那裡，卻總覺得不面對好像就不存在。你不是不負責任，你只是太害怕打開那扇門之後會看到什麼。',
    recommendations: [
      '每次只做一件小事：今天只打開一張帳單就好',
      '設定固定的「財務時間」，縮短迴避的空間',
      '告訴自己：面對真相的那一刻雖然難受，但之後會輕鬆',
      '尋找可以陪你一起面對的人，讓行動不再孤單',
      '若債務累積，盡早諮詢理財顧問或債務協談機構',
    ],
    radarLabel: '逃避凍結',
    color: '#7C3AED',
    illustration: '/%E5%85%88%E4%B8%8D%E8%A6%81%E6%83%B3%E5%9E%8B.png',
  },
  hypervigilance: {
    type: 'hypervigilance',
    name: '過度警戒型',
    subtitle: '完美主義傾向',
    description:
      '您對財務細節高度敏感，對自己的金錢管理有嚴格標準，稍有偏差就陷入自責。這種完美主義的背後是對失控的深層恐懼，反而讓您無法輕鬆地和金錢相處。',
    relatable:
      '你可能是朋友眼中的「理財達人」，但沒有人知道你每天花多少時間反覆核對帳戶。多花了一杯咖啡錢，就能讓你自責半天。你不是吝嗇，你只是太害怕一個小錯誤會讓一切崩塌。',
    recommendations: [
      '練習設定「允許誤差」：每月預留一點彈性消費空間',
      '挑戰完美主義思維：「夠好」有時比「完美」更健康',
      '記錄過度檢查行為的頻率，嘗試逐漸減少次數',
      '探索焦慮背後的核心恐懼，必要時尋求心理諮詢',
      '練習感謝當下已有的財務成就，而非只看缺失',
    ],
    radarLabel: '過度警戒',
    color: '#059669',
    illustration: '/%E9%81%8E%E5%BA%A6%E6%93%94%E5%BF%83%E5%9E%8B.png',
  },
};

export interface GuidanceAction {
  label: string;
  description: string;
  url: string;
  icon: string;
  isPrimary: boolean;
}

export interface GuidanceConfig {
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  actions: GuidanceAction[];
}

export const GUIDANCE_CONFIG: Record<string, GuidanceConfig> = {
  survival: {
    intro: '你現在的焦慮，比較像是生活真的有壓力。',
    primaryCta: '很多人會先看看家庭的財務韌性狀況，了解目前的經濟結構。',
    secondaryCta: '如果需要，也可以找顧問一起整理方向。',
    actions: [
      {
        label: '財務韌性檢視',
        description: '也許可以先看看家庭的經濟結構狀況',
        url: 'https://www.familyfinhealth.com/financial-resilience',
        icon: '🛡️',
        isPrimary: true,
      },
      {
        label: '免費財務諮詢',
        description: '找顧問一起整理方向、連結資源',
        url: 'https://www.familyfinhealth.com/online-consultation',
        icon: '🤝',
        isPrimary: false,
      },
    ],
  },
  anticipation: {
    intro: '你比較容易想到未來可能發生的事情。',
    primaryCta: '有些問題其實只要先問問看，就會比較安心。很多人會從簡單問幾個問題開始。',
    secondaryCta: '也可以看看財務韌性，了解安全程度來降低焦慮。',
    actions: [
      {
        label: '問問AI',
        description: '也許先問問看，就會比較安心了',
        url: 'https://www.familyfinhealth.com/ask-ivy',
        icon: '💬',
        isPrimary: true,
      },
      {
        label: '財務韌性檢視',
        description: '了解自己的安全程度，也許能讓擔心少一點',
        url: 'https://www.familyfinhealth.com/financial-resilience',
        icon: '🛡️',
        isPrimary: false,
      },
    ],
  },
  helplessness: {
    intro: '你可能不是不想整理財務，而是事情太多，不知道先從哪裡開始。',
    primaryCta: '很多人會先找人一起整理方向。',
    secondaryCta: '也可以先問問AI，看看有哪些方法。',
    actions: [
      {
        label: '免費財務諮詢',
        description: '有人陪著走，一起把現況整理清楚',
        url: 'https://www.familyfinhealth.com/online-consultation',
        icon: '🤝',
        isPrimary: true,
      },
      {
        label: '問問AI',
        description: '先釐清問題，也許就知道從哪裡開始了',
        url: 'https://www.familyfinhealth.com/ask-ivy',
        icon: '💬',
        isPrimary: false,
      },
    ],
  },
  avoidance: {
    intro: '有時候，當金錢壓力太大時，人會先把事情放一放。這其實很常見。',
    primaryCta: '如果想慢慢開始，可以先從壓力最小的方式試試看。',
    secondaryCta: '或者先看看詐騙防禦，了解一些基本保護。',
    actions: [
      {
        label: '問問AI',
        description: '輕鬆聊聊也可以，慢慢來也沒關係',
        url: 'https://www.familyfinhealth.com/ask-ivy',
        icon: '💬',
        isPrimary: true,
      },
      {
        label: '詐騙防禦',
        description: '也許可以先了解一些基本的自我保護',
        url: 'https://www.familyfinhealth.com/fraud-defense',
        icon: '🔍',
        isPrimary: false,
      },
    ],
  },
  hypervigilance: {
    intro: '你對財務安全其實非常敏感，有時候可能比實際狀況更擔心。',
    primaryCta: '很多人會先看看家庭財務韌性，了解自己真實的安全程度。',
    secondaryCta: '也可以問問AI，幫助建立合理的預期。',
    actions: [
      {
        label: '財務韌性檢視',
        description: '也許看到真實數字，會發現自己比想像中穩定',
        url: 'https://www.familyfinhealth.com/financial-resilience',
        icon: '🛡️',
        isPrimary: true,
      },
      {
        label: '問問AI',
        description: '聊聊看，幫助建立合理的預期與節奏',
        url: 'https://www.familyfinhealth.com/ask-ivy',
        icon: '💬',
        isPrimary: false,
      },
    ],
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
      '如果您的焦慮程度非常高，請尋求專業幫助。您可以聯繫心理健康專業人士、財務顧問或您當地的心理健康熱線。此外，您也可以使用「好理家在」提供的免費線上財務諮詢服務，讓專業顧問陪您一起面對財務困境。',
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
