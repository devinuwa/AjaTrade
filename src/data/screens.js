// Illustrative sample copy for the marketing mockups, not production advice.
export const screens = [
  {
    id: "crop-doctor",
    title: "Crop Doctor",
    caption: "A photo and a voice note become a clear next step.",
    language: "Hausa",
    messages: [
      { type: "image", side: "user", caption: "Ga ganyen masara na.", timestamp: "10:41" },
      { type: "voice", side: "user", duration: "0:12", timestamp: "10:42" },
      { type: "voice", side: "bot", duration: "0:18", timestamp: "10:42" },
      {
        type: "result",
        side: "bot",
        title: "Crop check",
        rows: [
          ["Problem", "Maize leaf spot"],
          ["Treatment", "Remove affected leaves"],
          ["Dose", "Follow the label"],
        ],
        timestamp: "10:43",
      },
    ],
  },
  {
    id: "soil-health",
    title: "Soil Health",
    caption: "Turn a soil-test photo into practical Yoruba guidance.",
    language: "Yoruba",
    messages: [
      { type: "image", side: "user", caption: "Eyi ni abajade idanwo ile.", timestamp: "09:16" },
      {
        type: "text",
        side: "bot",
        text: "Ile re ni acidity die, ati potasiomu kere.",
        timestamp: "09:17",
      },
      {
        type: "text",
        side: "bot",
        text: "Fi compost kun un, ki o tun idanwo se ki o to gbin.",
        timestamp: "09:17",
      },
    ],
  },
  {
    id: "fertilizer-plan",
    title: "Fertilizer Plan",
    caption: "Type your numbers in Pidgin and get a simple plan.",
    language: "Pidgin",
    messages: [
      {
        type: "text",
        side: "user",
        text: "I get 2 acres maize. How many fertilizer bags I need?",
        timestamp: "14:05",
      },
      {
        type: "result",
        side: "bot",
        title: "Your fertilizer plan",
        rows: [
          ["Bags needed", "4 bags"],
          ["Timing", "2 applications"],
          ["Estimated cost", "₦168,000"],
        ],
        timestamp: "14:06",
      },
    ],
  },
  {
    id: "find-water",
    title: "Find Water",
    caption: "Describe your land in Igbo and explore a water option.",
    language: "Igbo",
    messages: [
      {
        type: "text",
        side: "user",
        text: "Ala a dị n'akụkụ ugwu. Ebee ka olulu mmiri ga-adị mma?",
        timestamp: "11:28",
      },
      {
        type: "text",
        side: "bot",
        text: "Họrọ ebe dị n'okpuru mkpọda, ma zere ebe mmiri na-ejupụta.",
        timestamp: "11:29",
      },
      {
        type: "result",
        side: "bot",
        title: "Best next step",
        rows: [
          ["Best spot", "Lower middle slope"],
          ["Option", "Test for a well"],
          ["Check", "Ask a local driller"],
        ],
        timestamp: "11:29",
      },
    ],
  },
  {
    id: "striga-alert",
    title: "Striga Alert",
    caption: "Spot a serious weed early and get a control plan.",
    language: "English",
    messages: [
      { type: "image", side: "user", caption: "What weed is this?", timestamp: "08:52" },
      {
        type: "text",
        side: "bot",
        text: "This looks like Striga. Remove it before it sets seed.",
        timestamp: "08:53",
      },
      {
        type: "result",
        side: "bot",
        title: "Control plan",
        rows: [
          ["Now", "Pull and bag plants"],
          ["Next", "Rotate the crop"],
          ["Season", "Use a tolerant variety"],
        ],
        timestamp: "08:53",
      },
    ],
  },
  {
    id: "seed-choice",
    title: "Seed Choice & Germination",
    caption: "Choose a variety, then test the seeds before planting.",
    language: "English",
    messages: [
      {
        type: "text",
        side: "user",
        text: "Which maize seed fits a late start and dry spell?",
        timestamp: "16:20",
      },
      {
        type: "result",
        side: "bot",
        title: "Seed recommendation",
        rows: [
          ["Pick", "Early-maturing variety"],
          ["Why", "Handles a shorter season"],
          ["Test", "10 seeds on a damp cloth"],
        ],
        timestamp: "16:21",
      },
      {
        type: "text",
        side: "bot",
        text: "Count sprouts after 5 days. Aim for 8 or more.",
        timestamp: "16:21",
      },
    ],
  },
];
