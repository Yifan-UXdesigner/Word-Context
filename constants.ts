
import { PhaseData, PhaseId, Language } from './types';

const PHASES_EN: PhaseData[] = [
  {
    id: PhaseId.Food,
    title: "Phase 1: Physical Food Product",
    year: "1937–1950s",
    description: "SPAM, a canned luncheon meat product, became a household name.",
    colorTheme: "text-spam-yellow"
  },
  {
    id: PhaseId.Repetition,
    title: "Phase 2: Repetition as a Pattern",
    year: "1970s",
    description: "SPAM became associated with endless repetition through comedy sketches and media culture.",
    colorTheme: "text-green-400"
  },
  {
    id: PhaseId.Accumulation,
    title: "Phase 3: Accumulation & Loss of Control",
    year: "1990s",
    description: "SPAM became a metaphor for digital noise, especially in emails and online forums.",
    colorTheme: "text-cyan-300"
  },
  {
    id: PhaseId.Warning,
    title: "Phase 4: Warning and Interruption",
    year: "2000s",
    description: "SPAM became synonymous with unsolicited and annoying digital content, like email spam.",
    colorTheme: "text-alert-red"
  },
  {
    id: PhaseId.Noise,
    title: "Phase 5: Environmental Noise",
    year: "2010s–Now",
    description: "Today: SPAM is a constant presence in digital spaces, flooding our lives with unwanted content.",
    colorTheme: "text-purple-400"
  },
  {
    id: PhaseId.Summary,
    title: "Summary",
    year: "The Evolution",
    description: "From shelf to screen: The journey of a word.",
    colorTheme: "text-white"
  }
];

const PHASES_JP: PhaseData[] = [
  {
    id: PhaseId.Food,
    title: "フェーズ 1: 物理的な食品",
    year: "1937–1950年代",
    description: "缶詰のランチョンミート「スパム」は、家庭の定番商品となりました。",
    colorTheme: "text-spam-yellow"
  },
  {
    id: PhaseId.Repetition,
    title: "フェーズ 2: パターンとしての反復",
    year: "1970年代",
    description: "コメディスケッチやメディア文化を通じて、「スパム」は「終わりのない反復」と結びつけられるようになりました。",
    colorTheme: "text-green-400"
  },
  {
    id: PhaseId.Accumulation,
    title: "フェーズ 3: 蓄積と制御不能",
    year: "1990年代",
    description: "「スパム」はデジタルノイズ、特に電子メールやオンラインフォーラムにおける隠喩となりました。",
    colorTheme: "text-cyan-300"
  },
  {
    id: PhaseId.Warning,
    title: "フェーズ 4: 警告と中断",
    year: "2000年代",
    description: "「スパム」は、迷惑メールのように、求められていない不快なデジタルコンテンツの代名詞となりました。",
    colorTheme: "text-alert-red"
  },
  {
    id: PhaseId.Noise,
    title: "フェーズ 5: 環境ノイズ",
    year: "2010年代–現在",
    description: "今日、「スパム」はデジタル空間に常に存在し、私たちの生活を不要なコンテンツで溢れさせています。",
    colorTheme: "text-purple-400"
  },
  {
    id: PhaseId.Summary,
    title: "要約",
    year: "進化の過程",
    description: "棚から画面へ：ある言葉の旅路。",
    colorTheme: "text-white"
  }
];

const PHASES_CN: PhaseData[] = [
  {
    id: PhaseId.Food,
    title: "第一阶段：实体食品",
    year: "1937–1950年代",
    description: "午餐肉（SPAM），作为一种罐头肉类产品，成为了家喻户晓的名字。",
    colorTheme: "text-spam-yellow"
  },
  {
    id: PhaseId.Repetition,
    title: "第二阶段：重复的模式",
    year: "1970年代",
    description: "通过喜剧小品和媒体文化，“午餐肉”一词开始与“无休止的重复”联系在一起。",
    colorTheme: "text-green-400"
  },
  {
    id: PhaseId.Accumulation,
    title: "第三阶段：堆积与失控",
    year: "1990年代",
    description: "它成为了数字噪音的隐喻，特别是在电子邮件和在线论坛中。",
    colorTheme: "text-cyan-300"
  },
  {
    id: PhaseId.Warning,
    title: "第四阶段：警告与干扰",
    year: "2000年代",
    description: "它成为了未经请求且令人恼火的数字内容（如垃圾邮件）的代名词。",
    colorTheme: "text-alert-red"
  },
  {
    id: PhaseId.Noise,
    title: "第五阶段：环境噪音",
    year: "2010年代–至今",
    description: "如今，垃圾信息在数字空间中无处不在，用不需要的内容充斥着我们的生活。",
    colorTheme: "text-purple-400"
  },
  {
    id: PhaseId.Summary,
    title: "总结",
    year: "演变历程",
    description: "从货架到屏幕：一个单词的旅程。",
    colorTheme: "text-white"
  }
];

export const getPhases = (lang: Language): PhaseData[] => {
  switch(lang) {
    case 'JP': return PHASES_JP;
    case 'CN': return PHASES_CN;
    default: return PHASES_EN;
  }
};

const WORDS_EN = [
  { word: 'CLOUD' }, { word: 'VIRUS' }, { word: 'SPAM' }, { word: 'FEED' },
  { word: 'MEMORY' }, { word: 'BOT' }, { word: 'STREAM' }, { word: 'NETWORK' },
  { word: 'PROFILE' }, { word: 'LIKE' }, { word: 'FRIEND' }, { word: 'FOLLOW' },
  { word: 'TREND' }, { word: 'VIRAL' }, { word: 'CONTENT' },
];

const WORDS_JP = [
  { word: 'クラウド' }, { word: 'ウイルス' }, { word: 'スパム' }, { word: 'フィード' },
  { word: 'メモリ' }, { word: 'ボット' }, { word: 'ストリーム' }, { word: 'ネットワーク' },
  { word: 'プロフ' }, { word: 'いいね' }, { word: '友達' }, { word: 'フォロー' },
  { word: 'トレンド' }, { word: 'バズる' }, { word: 'コンテンツ' },
];

const WORDS_CN = [
  { word: '云端' }, { word: '病毒' }, { word: '午餐肉' }, { word: '信息流' },
  { word: '记忆' }, { word: '机器人' }, { word: '流媒体' }, { word: '网络' },
  { word: '资料' }, { word: '点赞' }, { word: '好友' }, { word: '关注' },
  { word: '趋势' }, { word: '爆红' }, { word: '内容' },
];

export const getHomepageWords = (lang: Language) => {
  switch(lang) {
    case 'JP': return WORDS_JP;
    case 'CN': return WORDS_CN;
    default: return WORDS_EN;
  }
};

export const UI_TEXT = {
  EN: {
    title: "Words Don't Change.",
    subtitle: "Context Does.",
    tagline: "Explore how the meaning of words shifts through time and context.",
    returnHome: "Return to Homepage",
    clickToOpen: "[ CLICK TO OPEN ]",
    productRevealed: "PRODUCT REVEALED",
    clickToClaim: "Click to claim",
    criticalError: "Too much SPAM",
    ok: "OK",
    scrollPrompt: "SCROLL TO EXPLORE",
  },
  JP: {
    title: "言葉は変わらない。",
    subtitle: "文脈が変わるのだ。",
    tagline: "言葉の意味が時代と文脈によってどう変化するかを探る。",
    returnHome: "ホームページに戻る",
    clickToOpen: "[ クリックして開く ]",
    productRevealed: "製品が公開されました",
    clickToClaim: "クリックして請求",
    criticalError: "スパムが多すぎます",
    ok: "OK",
    scrollPrompt: "スクロールして続きを見る",
  },
  CN: {
    title: "词汇本身没变。",
    subtitle: "改变的是语境。",
    tagline: "探索词义如何随时间和语境发生转变。",
    returnHome: "返回主页",
    clickToOpen: "[ 点击打开 ]",
    productRevealed: "产品已揭示",
    clickToClaim: "点击领取",
    criticalError: "垃圾信息过多",
    ok: "确定",
    scrollPrompt: "滚动查看更多",
  }
};

export const INTERACTIVE_TEXT = {
  EN: {
    canLabel: "SPAM",
    floatingWord: "SPAM",
    popups: [
      { title: "CONGRATULATIONS!", content: "You have won 1,000,000!" },
      { title: "VIRUS DETECTED", content: "System 32 Error" },
      { title: "HOT DEALS", content: "Buy now, save later!" },
      { title: "FREE MONEY", content: "Claim your prize..." },
      { title: "CLICK HERE", content: "Local singles in area" }
    ],
    notifications: [
      { app: 'Twitter', msg: 'Liked your photo' },
      { app: 'Instagram', msg: 'New follower' },
      { app: 'TikTok', msg: 'Trending now' },
      { app: 'Gmail', msg: 'Security Alert' },
      { app: 'System', msg: 'Battery Low' }
    ]
  },
  JP: {
    canLabel: "スパム",
    floatingWord: "スパム",
    popups: [
      { title: "おめでとう！", content: "100万円当選しました！" },
      { title: "ウイルス検出", content: "システムエラーが発生" },
      { title: "お得情報", content: "今すぐ購入でお得！" },
      { title: "現金プレゼント", content: "賞金を受け取る..." },
      { title: "ここをクリック", content: "近所の友達を探す" }
    ],
    notifications: [
      { app: 'Twitter', msg: '写真にいいねしました' },
      { app: 'Instagram', msg: '新しいフォロワー' },
      { app: 'TikTok', msg: 'トレンド入り' },
      { app: 'Gmail', msg: 'セキュリティ警告' },
      { app: 'System', msg: 'バッテリー残量低下' }
    ]
  },
  CN: {
    canLabel: "午餐肉",
    floatingWord: "午餐肉",
    popups: [
      { title: "恭喜！", content: "您中了100万！" },
      { title: "发现病毒", content: "系统错误" },
      { title: "热门优惠", content: "立即购买！" },
      { title: "免费领钱", content: "领取您的奖金..." },
      { title: "点击这里", content: "查找附近的人" }
    ],
    notifications: [
      { app: 'Twitter', msg: '赞了你的照片' },
      { app: 'Instagram', msg: '新粉丝' },
      { app: 'TikTok', msg: '热门趋势' },
      { app: 'Gmail', msg: '安全警告' },
      { app: 'System', msg: '电量不足' }
    ]
  }
};
