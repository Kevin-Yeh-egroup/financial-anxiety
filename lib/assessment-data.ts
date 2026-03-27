export interface Question {
  id: number;
  text: string;
  category: 'survival' | 'anticipation' | 'helplessness' | 'avoidance' | 'hypervigilance';
}

export type AnxietyTypeKey =
  | 'survival'
  | 'anticipation'
  | 'helplessness'
  | 'avoidance'
  | 'hypervigilance';

/**
 * 可參考資源按鈕的類型鍵（與 GUIDANCE_CONFIG 連動）。
 * 知識庫網址可於 .env 設定 NEXT_PUBLIC_KNOWLEDGE_BASE_URL 覆寫；預設為好理家在知識庫頁。
 */
export const KNOWLEDGE_BASE_URL =
  process.env.NEXT_PUBLIC_KNOWLEDGE_BASE_URL ??
  'https://www.familyfinhealth.com/knowledge-base';

export type ResourceActionKey =
  | 'financial-resilience'
  | 'online-consultation'
  | 'ask-ivy'
  | 'fraud-defense'
  | 'knowledge-base';

export const RESOURCE_ACTION_DEFS: Record<
  ResourceActionKey,
  { label: string; description: string; url: string; icon: string }
> = {
  'financial-resilience': {
    label: '財務韌性檢視',
    description: '也許可以先看看家庭的經濟結構狀況',
    url: 'https://www.familyfinhealth.com/financial-resilience',
    icon: '🛡️',
  },
  'online-consultation': {
    label: '免費財務諮詢',
    description: '找顧問一起整理方向、連結資源',
    url: 'https://www.familyfinhealth.com/online-consultation',
    icon: '🤝',
  },
  'ask-ivy': {
    label: '問問AI',
    description: '像和朋友聊天一樣，先問問看',
    url: 'https://www.familyfinhealth.com/ask-ivy',
    icon: '💬',
  },
  'fraud-defense': {
    label: '詐騙防禦',
    description: '也許可以先了解一些基本的自我保護',
    url: 'https://www.familyfinhealth.com/fraud-defense',
    icon: '🔍',
  },
  'knowledge-base': {
    label: '知識庫',
    description: '好讀的理財與家庭主題，用你舒服的節奏慢慢探索',
    url: KNOWLEDGE_BASE_URL,
    icon: '📚',
  },
};

export interface RecommendationItem {
  text: string;
  /** 可選：對應 RESOURCE_ACTION_DEFS 的資源鍵（資料保留，供日後擴充） */
  resourceAction?: ResourceActionKey;
}

/** 結果頁主視覺（最高分區塊）：依該維度實際分數區間顯示情境敘述 */
export interface HeroRelatableByLevel {
  low: string;
  moderateLow: string;
  moderate: string;
  high: string;
}

export interface AnxietyProfile {
  type: AnxietyTypeKey;
  name: string;
  subtitle: string;
  description: string;
  relatable: string;
  /** 主視覺徽章與「低焦慮／輕微焦慮…」等並列之主題，不含固定強度字 */
  heroTraitLabel: string;
  heroRelatableByLevel: HeroRelatableByLevel;
  recommendations: RecommendationItem[];
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
  /** 五維度中的最高分（0–100） */
  primaryScore: number;
  /** 與 primaryScore 同分的所有維度（依代碼字母排序，僅為穩定顯示，不代表優先順序）；長度 > 1 代表並列最高 */
  tiedPrimaryTypes: string[];
  /** 最高分仍偏低時，避免把「主類型」敘述得太絕對 */
  isLowOverall: boolean;
  /** 僅在「單一維度最高分」時有值；並列同分時為 null，不指定任一類型為主 */
  primaryType: string | null;
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
    text: '我的信用卡帳單讓我不敢打開查看',
    category: 'avoidance',
  },
  {
    id: 5,
    text: '遇到財務問題時，我傾向於拖延處理',
    category: 'avoidance',
  },
  {
    id: 6,
    text: '我試圖隱瞞我的財務狀況，即使是對親近的人',
    category: 'avoidance',
  },
  {
    id: 7,
    text: '我覺得自己無法掌控財務狀況，感到無力',
    category: 'helplessness',
  },
  {
    id: 8,
    text: '我不知道如何開始儲蓄或投資',
    category: 'helplessness',
  },
  {
    id: 9,
    text: '我常因為怕做錯財務決定，而遲遲不敢採取行動',
    category: 'helplessness',
  },
  {
    id: 10,
    text: '如果發生意外開支，我不知道如何應對',
    category: 'anticipation',
  },
  {
    id: 11,
    text: '我經常擔心未來會發生的財務危機',
    category: 'anticipation',
  },
  {
    id: 12,
    text: '只要想到未來可能的突發支出，我就會影響睡眠或專注',
    category: 'anticipation',
  },
  {
    id: 13,
    text: '我會反覆核對帳戶餘額或帳單，確認沒有出錯',
    category: 'hypervigilance',
  },
  {
    id: 14,
    text: '我對自己的消費行為有很高的標準，稍有偏差就很自責',
    category: 'hypervigilance',
  },
  {
    id: 15,
    text: '我難以享受花費，即使是在財務允許的情況下',
    category: 'hypervigilance',
  },
];

/** 各類型 × 強度區間的說明（與分數區間對應，避免五種類型共用同一句話） */
export const LEVEL_DESCRIPTIONS_BY_TYPE: Record<
  AnxietyTypeKey,
  { low: string; moderateLow: string; moderate: string; high: string }
> = {
  survival: {
    low:
      '在「收入與日常開銷」上，您目前負擔感可能較輕，較少被帳單或生活費牽動情緒。',
    moderateLow:
      '偶爾會想到錢夠不夠用，但多數時候仍能維持日常節奏。',
    moderate:
      '較常擔心收支、帳單或基本開銷，這份壓力可能影響心情或專注。',
    high:
      '當下生計與開銷的負擔感可能很明顯，甚至常感到喘不過氣或難以放鬆。',
  },
  anticipation: {
    low:
      '對未來突發支出或財務變動，您目前較少反覆擔憂或預演最壞情境。',
    moderateLow:
      '偶爾會想到「萬一」，但大多能拉回當下、不至於長時間掛心。',
    moderate:
      '較常往未來想最壞情境，不確定感可能讓人較難安心休息。',
    high:
      '「未來會不會出事」的焦慮可能很強，甚至影響睡眠、專注或日常節奏。',
  },
  helplessness: {
    low:
      '在理財或財務決策上，您目前較少感到不知從何下手或完全失控。',
    moderateLow:
      '偶爾覺得資訊多、有點亂，但還能慢慢整理或找人問。',
    moderate:
      '較常感到無從著手或掌控感不足，容易拖延、卡住或不敢行動。',
    high:
      '無力感可能很明顯，即使知道該面對，也難踏出第一步或維持動力。',
  },
  avoidance: {
    low:
      '您較少用拖延、迴避或「先不要想」來面對帳單與財務議題。',
    moderateLow:
      '偶爾會想晚一點再處理，但多半仍能面對或與人談。',
    moderate:
      '較常拖延帳單或迴避問題，短期能心安，長期可能讓壓力在暗處累積。',
    high:
      '迴避或凍結反應可能很明顯，甚至不敢打開帳單、談錢或面對數字。',
  },
  hypervigilance: {
    low:
      '您較少反覆核對帳務，或對小額花費、細節過度自責。',
    moderateLow:
      '偶爾會多檢查一次或對自己要求較嚴，但仍在可調整的範圍內。',
    moderate:
      '較常反覆確認、對自己要求高，花費時可能難以放鬆或享受當下。',
    high:
      '過度警戒或自責可能很明顯，影響休息、人際或與金錢相處的輕鬆感。',
  },
};

export const ANXIETY_PROFILES: Record<string, AnxietyProfile> = {
  survival: {
    type: 'survival',
    name: '生存壓力型',
    subtitle: '現實壓力高',
    description:
      '當財務壓力來臨時，您可能較容易陷入與「當下生計」有關的焦慮——擔心收入、帳單與日常開銷是否撐得住。\n\n這種反應有其現實基礎，但若長期處於高壓，仍會讓身心俱疲，影響判斷與行動。',
    relatable:
      '每個月領薪水的那天心情最好，但沒過幾天錢包又空了。\n\n看到超市收據、加油金額、水電帳單，心頭就會突然一緊。\n\n你也許已經很努力，卻總感覺錢永遠不夠用，生活的重量讓你喘不過氣。',
    heroTraitLabel: '現實壓力',
    heroRelatableByLevel: {
      low:
        '收入與日常開銷大致在可掌握的範圍內，較少被帳單或生活費牽動情緒。\n\n偶爾注意到花費時，多半還能維持平常心。',
      moderateLow:
        '有時會算算這個月還剩多少，但多半不會一直掛在心上。\n\n看到帳單或收據時，偶爾會皺一下眉頭，日子仍照著過。',
      moderate:
        '較常想到收支是否平衡、錢夠不夠用，心頭偶爾會一緊。\n\n開銷與帳單可能成為心情的來源之一，需要多一點力氣安排生活節奏。',
      high:
        '每個月領薪水的那天心情最好，但沒過幾天錢包又空了。\n\n看到超市收據、加油金額、水電帳單，心頭就會突然一緊。\n\n你也許已經很努力，卻總感覺錢永遠不夠用，生活的重量讓你喘不過氣。',
    },
    recommendations: [
      {
        text: '列出所有必要開支，清楚掌握每月資金缺口',
        resourceAction: 'financial-resilience',
      },
      {
        text: '探索增加收入的機會，如兼職、接案或技能提升',
        resourceAction: 'online-consultation',
      },
      {
        text: '制定務實的月度預算，優先確保基本需求',
        resourceAction: 'knowledge-base',
      },
      {
        text: '尋找可立即降低開支的小改變，累積信心',
        resourceAction: 'knowledge-base',
      },
      {
        text: '建立哪怕很小的緊急備用金，讓自己多一份安全感',
        resourceAction: 'financial-resilience',
      },
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
      '當財務壓力來臨時，您可能較容易陷入對「未來不確定」的焦慮——即使事情尚未發生，也可能反覆想到最壞情境。\n\n這種「萬一」思維可能讓人較難放鬆下來，享受當下的平靜。',
    relatable:
      '比起當下，你可能更常掛心那個「萬一」。\n\n萬一突然生病、萬一車子壞了、萬一要換工作……一個尚未發生的場景就能讓你夜裡輾轉難眠。\n\n有時你或許特別想保護自己不被突如其來的事情擊垮。',
    heroTraitLabel: '不確定恐懼',
    heroRelatableByLevel: {
      low:
        '對尚未發生的事情，你較少反覆預演或徹夜掛心。\n\n即使偶爾想到未來，多半仍能拉回當下、維持日常節奏。',
      moderateLow:
        '偶爾會想到「萬一」，但多半不會讓它佔滿一整天。\n\n心裡有底時，仍能在工作與休息之間切換。',
      moderate:
        '較常往未來想：突發開支、工作變動、家人狀況……有時會影響放鬆與睡眠。\n\n你或許想多準備一點，讓自己安心。',
      high:
        '比起當下，你可能更常掛心那個「萬一」。\n\n萬一突然生病、萬一車子壞了、萬一要換工作……一個尚未發生的場景就能讓你夜裡輾轉難眠。\n\n有時你或許特別想保護自己不被突如其來的事情擊垮。',
    },
    recommendations: [
      {
        text: '練習「此刻現實核查」：區分真實威脅與想像的災難',
        resourceAction: 'ask-ivy',
      },
      {
        text: '建立3-6個月的緊急備用金，讓「萬一」有所依靠',
        resourceAction: 'financial-resilience',
      },
      {
        text: '學習基本的風險管理，如保險規劃，減少對未知的恐懼',
        resourceAction: 'knowledge-base',
      },
      {
        text: '嘗試正念或呼吸練習，幫助身體從警戒狀態中放鬆',
      },
      {
        text: '與信任的人分享擔憂，避免在腦中不斷放大危機',
        resourceAction: 'online-consultation',
      },
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
      '當財務壓力來臨時，您可能較容易陷入「失控、不知從何下手」的無力感——即使知道該面對，也難以踏出第一步。\n\n有時源於資訊過多或長期挫折所累積的心理負擔，未必與能力不足有關。',
    relatable:
      '聽說要「理財」，但連從哪裡開始都搞不清楚。\n\n存錢？買基金？買保險？每次下定決心，卻因為資訊太多、太複雜而不了了之。\n\n感覺別人都懂，只有自己還在原地踏步，越想越沮喪。',
    heroTraitLabel: '掌控感',
    heroRelatableByLevel: {
      low:
        '面對理財或帳務時，多半能慢慢整理、發問或尋找資源。\n\n較少覺得「完全不知道從哪裡開始」而整個卡住。',
      moderateLow:
        '偶爾覺得選項多、資訊有點亂，但還能挑一件小事先試試。\n\n卡住的時候，多半能找人問或上網查。',
      moderate:
        '較常覺得不知從何下手，或一開始就面對太多選擇而卻步。\n\n明明知道該面對，卻容易停在原地，心裡有點著急。',
      high:
        '聽說要「理財」，但連從哪裡開始都搞不清楚。\n\n存錢？買基金？買保險？每次下定決心，卻因為資訊太多、太複雜而不了了之。\n\n感覺別人都懂，只有自己還在原地踏步，越想越沮喪。',
    },
    recommendations: [
      {
        text: '從最小的一步開始：哪怕每月只存500元也算勝利',
        resourceAction: 'financial-resilience',
      },
      {
        text: '學習一個基本財務概念就好，不必一次搞懂所有事',
        resourceAction: 'knowledge-base',
      },
      {
        text: '設定一個可衡量的短期目標，用成功建立信心',
        resourceAction: 'knowledge-base',
      },
      {
        text: '尋找財務入門資源（書籍、課程、社群），降低學習門檻',
        resourceAction: 'knowledge-base',
      },
      {
        text: '找一位可以一起討論的人，打破孤立無援的感受',
        resourceAction: 'online-consultation',
      },
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
      '當財務壓力來臨時，您可能較容易以迴避、拖延來因應——帳單先不開、問題先不想，用「之後再說」換取當下的心安。\n\n短期能減輕不適，卻可能讓問題在暗處越滾越大。',
    relatable:
      '信用卡帳單還沒打開就先放到抽屜，貸款的事「之後再說」。\n\n明明知道問題就在那裡，卻總覺得不面對好像就不存在。\n\n有時可能是因為太害怕打開那扇門之後會看到什麼。',
    heroTraitLabel: '面對財務的節奏',
    heroRelatableByLevel: {
      low:
        '帳單與財務議題多半能照自己的節奏處理，較少靠拖延換取暫時心安。\n\n需要面對時，大致能開口或採取行動。',
      moderateLow:
        '偶爾會想把事情放一陣子，但多半仍會在期限內處理完。\n\n「晚一點」有時是休息，不會一直無限期延後。',
      moderate:
        '較常拖延帳單、迴避數字，或先放到「之後再說」。\n\n短期能減輕不適，心裡卻可能知道問題仍在。',
      high:
        '信用卡帳單還沒打開就先放到抽屜，貸款的事「之後再說」。\n\n明明知道問題就在那裡，卻總覺得不面對好像就不存在。\n\n有時可能是因為太害怕打開那扇門之後會看到什麼。',
    },
    recommendations: [
      {
        text: '每次只做一件小事：今天只打開一張帳單就好',
        resourceAction: 'ask-ivy',
      },
      {
        text: '設定固定的「財務時間」，縮短迴避的空間',
        resourceAction: 'knowledge-base',
      },
      {
        text: '告訴自己：面對真相的那一刻雖然難受，但之後會輕鬆',
      },
      {
        text: '尋找可以陪你一起面對的人，讓行動不再孤單',
        resourceAction: 'online-consultation',
      },
      {
        text: '若債務累積，盡早諮詢理財顧問或債務協談機構',
        resourceAction: 'online-consultation',
      },
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
      '當財務壓力來臨時，您可能較容易陷入過度檢查、過度自責——對細節極度敏感，對自己要求很嚴。\n\n背後有時可能是對失控的深層恐懼，反而讓人難以輕鬆地和金錢相處。',
    relatable:
      '你可能是朋友眼中的「理財達人」，但沒有人知道你每天花多少時間反覆核對帳戶。\n\n多花了一杯咖啡錢，就能讓你自責半天。\n\n有時你或許特別害怕一個小錯誤會讓一切崩塌。',
    heroTraitLabel: '自我要求與警戒',
    heroRelatableByLevel: {
      low:
        '對帳務與花費多半維持在合理範圍內的留意，較少反覆核對或過度自責。\n\n花錢時大致能安心享受當下。',
      moderateLow:
        '偶爾會多檢查一次帳戶，或對小額花費多想一想，但仍在可調整的範圍內。\n\n多半能說服自己「這樣可以」。',
      moderate:
        '較常反覆確認、對自己要求高，花費時可能難以完全放鬆。\n\n心裡可能擔心一個小疏失會帶來後悔。',
      high:
        '你可能是朋友眼中的「理財達人」，但沒有人知道你每天花多少時間反覆核對帳戶。\n\n多花了一杯咖啡錢，就能讓你自責半天。\n\n有時你或許特別害怕一個小錯誤會讓一切崩塌。',
    },
    recommendations: [
      {
        text: '練習設定「允許誤差」：每月預留一點彈性消費空間',
        resourceAction: 'knowledge-base',
      },
      {
        text: '挑戰完美主義思維：「夠好」有時比「完美」更健康',
        resourceAction: 'ask-ivy',
      },
      {
        text: '記錄過度檢查行為的頻率，嘗試逐漸減少次數',
      },
      {
        text: '探索焦慮背後的核心恐懼，必要時尋求心理諮詢',
        resourceAction: 'online-consultation',
      },
      {
        text: '練習感謝當下已有的財務成就，並看見自己已經累積的努力',
        resourceAction: 'knowledge-base',
      },
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
  /** 資源類型鍵（列表 key、與 RESOURCE_ACTION_DEFS 對應） */
  resourceKey?: ResourceActionKey;
}

export interface GuidanceConfig {
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  actions: GuidanceAction[];
}

export function resourceAction(
  key: ResourceActionKey,
  options?: {
    isPrimary?: boolean;
    description?: string;
    label?: string;
  }
): GuidanceAction {
  const def = RESOURCE_ACTION_DEFS[key];
  return {
    label: options?.label ?? def.label,
    description: options?.description ?? def.description,
    url: def.url,
    icon: def.icon,
    isPrimary: options?.isPrimary ?? false,
    resourceKey: key,
  };
}

export const GUIDANCE_CONFIG: Record<AnxietyTypeKey, GuidanceConfig> = {
  survival: {
    intro: '壓力一來的時候，你可能較容易被「生活開銷與收入」牽動情緒。',
    primaryCta: '很多人會先看看家庭的財務韌性狀況，了解目前的經濟結構。',
    secondaryCta: '如果需要，也可以找顧問一起整理方向；想多認識預算與開銷，知識庫裡也有不少實用好讀的內容。',
    actions: [
      resourceAction('financial-resilience', {
        isPrimary: true,
        description: '也許可以先看看家庭的經濟結構狀況',
      }),
      resourceAction('online-consultation', {
        description: '找顧問一起整理方向、連結資源',
      }),
      resourceAction('knowledge-base', {
        description: '預算、開銷與生活理財，挑有興趣的主題慢慢充實',
      }),
    ],
  },
  anticipation: {
    intro: '壓力一來的時候，你可能較常往「未來會不會出狀況」去想。',
    primaryCta: '有些問題其實只要先問問看，就會比較安心。很多人會從簡單問幾個問題開始。',
    secondaryCta: '也可以看看財務韌性；知識庫裡有風險、保險等主題，陪你更有把握地為未來做準備。',
    actions: [
      resourceAction('ask-ivy', {
        isPrimary: true,
        description: '也許先問問看，就會比較安心了',
      }),
      resourceAction('financial-resilience', {
        description: '了解自己的安全程度，也許能讓擔心少一點',
      }),
      resourceAction('knowledge-base', {
        description: '風險與保險等觀念，用輕鬆閱讀為自己多存一點安心感',
      }),
      resourceAction('online-consultation', {
        description: '想找人聊聊未來規劃或情緒負擔時可試試',
      }),
    ],
  },
  helplessness: {
    intro: '壓力一來的時候，你可能較容易覺得事情太多、不知道先從哪裡下手。',
    primaryCta: '很多人會先找人一起整理方向。',
    secondaryCta: '也可以先問問AI；知識庫裡短文很多，挑一篇有興趣的，就是很好的起點。',
    actions: [
      resourceAction('online-consultation', {
        isPrimary: true,
        description: '有人陪著走，一起把現況整理清楚',
      }),
      resourceAction('ask-ivy', {
        description: '先釐清問題，也許就知道從哪裡開始了',
      }),
      resourceAction('knowledge-base', {
        description: '入門觀念與故事，每一則都是為自己加分的小收穫',
      }),
    ],
  },
  avoidance: {
    intro: '壓力一來的時候，你可能較容易先把事情放著、晚一點再面對——這其實很常見。',
    primaryCta: '如果想慢慢開始，可以先從壓力最小的方式試試看。',
    secondaryCta: '也可以看看詐騙防禦；知識庫裡好讀的內容，能陪你用輕鬆方式認識財務。',
    actions: [
      resourceAction('ask-ivy', {
        isPrimary: true,
        description: '輕鬆聊聊也可以，慢慢來也沒關係',
      }),
      resourceAction('fraud-defense', {
        description: '也許可以先了解一些基本的自我保護',
      }),
      resourceAction('knowledge-base', {
        description: '短文與圖文，用零壓力的閱讀慢慢累積對錢的熟悉感',
      }),
      resourceAction('online-consultation', {
        description: '需要人陪著面對帳單或債務時可試試',
      }),
    ],
  },
  hypervigilance: {
    intro: '壓力一來的時候，你可能較容易反覆檢查、對自己要求很高。',
    primaryCta: '很多人會先看看家庭財務韌性，了解自己真實的安全程度。',
    secondaryCta: '也可以問問AI；知識庫裡有不少觀點與案例，能陪你更溫柔地看待自己的理財節奏。',
    actions: [
      resourceAction('financial-resilience', {
        isPrimary: true,
        description: '也許看到真實數字，會發現自己比想像中穩定',
      }),
      resourceAction('ask-ivy', {
        description: '聊聊看，幫助建立合理的預期與節奏',
      }),
      resourceAction('knowledge-base', {
        description: '觀念與真實故事，幫你多給自己一點肯定與呼吸空間',
      }),
      resourceAction('online-consultation', {
        description: '若焦慮已影響生活，可尋求專業陪伴',
      }),
    ],
  },
};

export const FEATURES = [
  {
    title: '看見壓力下的反應傾向',
    description: '幾道簡單題目，整理錢的壓力一來時，你可能較容易陷入哪一種焦慮',
    icon: '📊',
  },
  {
    title: '貼近你狀況的提醒',
    description: '依你的傾向，給出可以試著調整的方向（僅供參考）',
    icon: '💡',
  },
  {
    title: '五個面向一眼看完',
    description: '用雷達圖呈現五種常見反應，方便對照自己哪邊較吃力',
    icon: '📈',
  },
  {
    title: '可參考的下一步',
    description: '結果頁會連結好理家在等資源，依你的傾向選擇試試看',
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
    question: '這個檢測準嗎？算心理測驗嗎？',
    answer:
      '這是一份簡單的自我整理工具，幫你觀察財務壓力來臨時，自己可能較容易出現哪一種焦慮反應。\n\n結果僅供參考，不作為臨床診斷或人格分類，也不能替代專業心理健康或財務建議。\n\n若你感到非常困擾，請尋求專業協助。',
  },
  {
    question: '我的結果會被保存嗎？',
    answer:
      '不會。我們不收集、保存或共享你的任何資料，檢測過程在你自己的裝置上完成。',
  },
  {
    question: '可以重複做嗎？',
    answer:
      '可以。你隨時都能再做一次，壓力狀況不同時，感受也會變，多試幾次有助於觀察自己的變化。',
  },
  {
    question: '如果顯示的焦慮程度很高怎麼辦？',
    answer:
      '若你覺得已影響生活或情緒，請優先尋求專業協助，例如心理健康專業人士、財務顧問或各地心理諮商／安心專線。\n\n你也可以使用「好理家在」的免費線上財務諮詢，讓顧問陪你一起面對。',
  },
  {
    question: '大概要多久？',
    answer: '共有 15 題，通常約 4～7 分鐘可以完成。',
  },
  {
    question: '題目在問什麼？',
    answer:
      '題目圍繞五種常見的財務壓力反應：生存壓力、未雨綢繆、失控無力、逃避凍結與過度警戒——從中觀察你在壓力下可能較常出現哪一種。',
  },
];
