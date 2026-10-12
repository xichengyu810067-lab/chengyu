import type { Scenario } from "../types.js";

/** 英文的對話情境（純資料，會被 api/tutor 匯入，請勿 import 執行期模組） */
const scenarios: Scenario[] = [
  {
    id: "english.junior.s-restaurant",
    subject: "english",
    stage: "junior",
    title: "在美式餐廳點餐",
    setting:
      "暑假你和家人到美國旅行，走進一家叫 Sunny Diner 的家庭餐廳。今天所有午餐套餐都是 10 美元、附一杯飲料。服務生 Amy 笑著走過來。",
    aiRole: "服務生 Amy",
    aiAvatar: "👩‍🍳",
    userRole: "到美國旅行的國中生",
    goal: "用完整、有禮貌的句子點主餐和飲料、詢問價錢並結帳",
    persona:
      "你是美國家庭餐廳 Sunny Diner 的服務生 Amy，友善、有耐心、充滿活力。對方是來自臺灣的國中生，英文程度約 CEFR A1–A2，請只用簡單常見的英文單字，每次回覆 1–3 個短句，說話清楚。菜單：所有午餐套餐都是 10 dollars，主餐可選 hamburger、chicken sandwich、spaghetti 或 salad，附一杯飲料（orange juice、iced tea、milk 或 water）；薯條 fries 加點 3 dollars。教學目標：引導學生用完整句子點餐（I'd like ..., please. / Can I have ...?）、選飲料、詢問價錢（How much is it?）並結帳。規則：一次只問一個問題；學生只說單字或有文法錯誤時，先友善地用正確的完整句子重述一次（例如 Oh, you'd like a hamburger? Great choice!），再鼓勵他自己說一次完整句子，不要直接批評；學生說得好時具體稱讚他用了哪個句型。始終留在餐廳點餐的情境，若學生離題，親切地把話題拉回點餐。結束時用一句話總結他今天學到的點餐句型。",
    language: "en",
    suggestions: [
      "Can I see the menu, please?",
      "I'd like a hamburger, please.",
      "How much is it?",
    ],
    maxTurns: 8,
    start: "start",
    script: {
      start: {
        say: "Hi, welcome to Sunny Diner! I'm Amy. All our lunch sets are ten dollars today, and they come with a drink. Are you ready to order?",
        options: [
          {
            label: "Yes. I'd like a hamburger, please.",
            next: "drink",
            good: true,
            feedback: "I'd like ..., please. 是最有禮貌的點餐句型！",
          },
          {
            label: "Can I see the menu, please?",
            next: "menu",
            good: true,
            feedback: "先看菜單再點餐，很好！Can I ...? 是禮貌的請求。",
          },
          {
            label: "Hamburger.",
            next: "full",
            good: false,
            feedback: "只說單字聽起來有點突兀，試著說完整句子：I'd like a hamburger, please.",
          },
        ],
      },
      menu: {
        say: "Of course. Here you are. We have hamburgers, chicken sandwiches, spaghetti, and salads. What would you like?",
        options: [
          {
            label: "I'd like a chicken sandwich, please.",
            next: "drink",
            good: true,
            feedback: "完整又有禮貌的點餐句子！",
          },
          {
            label: "I want eat salad.",
            next: "fix",
            good: false,
            feedback:
              "want 後面要接 to + 原形動詞：I want to eat a salad. 點餐時用 I'd like a salad, please. 更有禮貌。",
          },
        ],
      },
      full: {
        say: 'Oh, a hamburger? Great choice! Next time, you can say, "I\'d like a hamburger, please." Can you try it?',
        options: [
          {
            label: "I'd like a hamburger, please.",
            next: "drink",
            good: true,
            feedback: "說得很好！完整句子讓人聽起來更有禮貌。",
          },
        ],
      },
      fix: {
        say: 'A salad? Sure! You can say, "I\'d like a salad, please." Would you like to try?',
        options: [
          {
            label: "I'd like a salad, please.",
            next: "drink",
            good: true,
            feedback: "完全正確！",
          },
        ],
      },
      drink: {
        say: "Sure thing! What would you like to drink? We have orange juice, iced tea, milk, and water.",
        options: [
          {
            label: "Can I have an iced tea, please?",
            next: "size",
            good: true,
            feedback: "Can I have ..., please? 也是禮貌的點餐說法。",
          },
          {
            label: "Just water, please.",
            next: "extra",
            good: true,
            feedback: "簡短又有禮貌，加上 please 很加分！",
          },
          {
            label: "Give me milk.",
            next: "polite",
            good: false,
            feedback: "Give me ... 是命令語氣，聽起來不太禮貌。試試 Can I have some milk, please?",
          },
        ],
      },
      polite: {
        say: 'Milk? No problem! A more polite way is, "Can I have some milk, please?" Anything else?',
        options: [
          {
            label: "No, thank you. That's all.",
            next: "bill",
            good: true,
            feedback: "No, thank you. 是有禮貌的拒絕。",
          },
        ],
      },
      size: {
        say: "Small, medium, or large?",
        options: [
          { label: "Medium, please.", next: "extra", good: true, feedback: "回答簡短清楚！" },
          {
            label: "Large one.",
            next: "extra",
            good: false,
            feedback: "可以說得更完整：A large one, please.",
          },
        ],
      },
      extra: {
        say: "Got it. Would you like anything else? Our fries are only three dollars.",
        options: [
          {
            label: "No, thank you. That's all. How much is it?",
            next: "bill",
            good: true,
            feedback: "How much is it? 是問價錢的標準說法。",
          },
          {
            label: "How many is it?",
            next: "bill",
            good: false,
            feedback: "問價錢要用 How much（多少錢）；How many 是問「幾個」。",
          },
        ],
      },
      bill: {
        say: "It's ten dollars, please. Would you like to pay in cash or by card?",
        options: [
          {
            label: "By card, please. Here you are.",
            next: "end",
            good: true,
            feedback: "Here you are. 是把東西交給別人時的說法。",
          },
          {
            label: "Cash, please. Here's twenty dollars.",
            next: "change",
            good: true,
            feedback: "很好！清楚說出付款方式。",
          },
        ],
      },
      change: {
        say: "Thank you! Here's your change. That's ten dollars.",
        options: [
          {
            label: "Thank you very much!",
            next: "end",
            good: true,
            feedback: "記得道謝，服務生會很開心！",
          },
        ],
      },
      end: {
        say: 'You did a great job ordering in English! Remember: "I\'d like ..., please," "Can I have ...?" and "How much is it?" Enjoy your meal!',
        end: true,
      },
    },
  },
  {
    id: "english.senior.s-interview",
    subject: "english",
    stage: "senior",
    title: "大學申請面試",
    setting:
      "你正在準備大學申請，今天要參加一場全英文的模擬面試。面試官 Dr. Carter 請你坐下，面試即將開始。",
    aiRole: "面試官 Dr. Carter",
    aiAvatar: "👩‍🏫",
    userRole: "申請大學的高三學生",
    goal: "用完整句子回答面試問題，並用轉折語與具體例子支持自己的說法",
    persona:
      "你扮演大學入學面試的面試官 Dr. Carter，態度溫和、專業、有耐心。對方是準備申請大學的臺灣高三學生，英文程度約 CEFR B1，請全程使用清楚、自然、不過度艱深的英文，每次只問一個問題，回覆以 2–4 句為原則。面試流程：自我介紹 → 申請動機 → 一段能展現興趣的具體經驗 → 遇到的困難與解決方法 → 學生是否有問題要問。教學目標：鼓勵學生用完整句子回答，並使用 First、In addition、However、As a result 等轉折語讓回答有條理，用具體例子支持觀點。若學生回答太短或空泛，用追問引導（例如 Could you give me an example?），不要替他回答；若有明顯文法錯誤，在你的回應中自然地示範正確說法。不評論學生的家庭背景，也不做任何錄取承諾。最後給一句具體的鼓勵，並提出一個改進建議。",
    language: "en",
    suggestions: [
      "Good morning, Dr. Carter. My name is ...",
      "Could you repeat the question, please?",
      "First, I'm interested in ... In addition, ...",
    ],
    maxTurns: 10,
    start: "start",
    script: {
      start: {
        say: "Good morning. Please have a seat. I'm Dr. Carter. Could you briefly introduce yourself?",
        options: [
          {
            label:
              "Good morning, Dr. Carter. My name is Chen Yi-ting. I'm a senior at a high school in Taichung, and I'm interested in environmental science.",
            next: "why",
            good: true,
            feedback: "先問候，再說姓名、學校與興趣，清楚又完整！",
          },
          {
            label: "I'm Yi-ting. That's all.",
            next: "more",
            good: false,
            feedback: "太簡短了。自我介紹可以包含學校、興趣或目標，讓面試官更認識你。",
          },
        ],
      },
      more: {
        say: "Nice to meet you, Yi-ting. Could you tell me a little more? For example, what are you interested in?",
        options: [
          {
            label:
              "Sure. I'm especially interested in environmental science because I care about climate change.",
            next: "why",
            good: true,
            feedback: "用 because 說明理由，回答更有內容！",
          },
        ],
      },
      why: {
        say: "Thank you. Why do you want to study environmental science at our university?",
        options: [
          {
            label:
              "First, your department does a lot of research on renewable energy. In addition, I'd like to join your field research program.",
            next: "example",
            good: true,
            feedback: "First、In addition 讓兩個理由層次分明，很棒！",
          },
          {
            label: "Because it's famous.",
            next: "specific",
            good: false,
            feedback: "回答太空泛。請具體說明這個科系的什麼地方吸引你。",
          },
        ],
      },
      specific: {
        say: "I see. Could you be more specific? What exactly attracts you to our department?",
        options: [
          {
            label:
              "Your research on renewable energy, especially solar power, attracts me the most.",
            next: "example",
            good: true,
            feedback: "具體指出研究方向，說服力大增！",
          },
        ],
      },
      example: {
        say: "Interesting. Can you tell me about an experience that shows your interest in this field?",
        options: [
          {
            label:
              "Last year, I led a project in which we recorded plastic waste on a local beach. As a result, our school started a recycling campaign.",
            next: "challenge",
            good: true,
            feedback: "具體經驗加上 As a result 帶出成果，非常有說服力！",
          },
          {
            label: "I like nature very much.",
            next: "example2",
            good: false,
            feedback: "喜歡大自然很好，但面試官想聽一個具體的經驗。",
          },
        ],
      },
      example2: {
        say: "That's nice, but can you give me a specific example?",
        options: [
          {
            label:
              "Sure. Last year, my classmates and I cleaned up a beach every month and recorded the trash we found.",
            next: "challenge",
            good: true,
            feedback: "有時間、有行動、有細節，這就是好例子！",
          },
        ],
      },
      challenge: {
        say: "What was the biggest challenge in that project, and how did you deal with it?",
        options: [
          {
            label:
              "At first, few students joined us. However, we shared our data at a school assembly, so more people became interested.",
            next: "ask",
            good: true,
            feedback: "用 However 帶出轉折，清楚說明問題與解決方法！",
          },
          {
            label: "There were no challenges.",
            next: "challenge2",
            good: false,
            feedback: "面試官想了解你如何面對困難。誠實分享問題並說明解法，會更加分。",
          },
        ],
      },
      challenge2: {
        say: "Really? Most projects have some difficulties. Was there anything that didn't go as planned?",
        options: [
          {
            label:
              "Well, it rained a lot, so we had to change our schedule several times. We learned to be flexible.",
            next: "ask",
            good: true,
            feedback: "說出困難和學到的事，展現了反思能力！",
          },
        ],
      },
      ask: {
        say: "Thank you for sharing. Do you have any questions for me?",
        options: [
          {
            label: "Yes. What kinds of research opportunities do first-year students have?",
            next: "end",
            good: true,
            feedback: "準備好一個問題，展現你對科系的熱忱！",
          },
          {
            label: "No.",
            next: "end",
            good: false,
            feedback: "可以事先準備一個問題，例如課程或研究機會，展現你的積極。",
          },
        ],
      },
      end: {
        say: "Thank you for coming today. You explained your ideas clearly and supported them with examples. Next time, try to add one more detail about what you learned. Good luck!",
        end: true,
      },
    },
  },
];

export default scenarios;
