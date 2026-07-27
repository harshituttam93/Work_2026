const customers = [
  {
    id: "C1001",
    phone: "98765 12001",
    name: "Aarav Mehta",
    segment: "Premium mobile upgrader",
    owned: [
      { product: "Galaxy S21", category: "Mobile", purchaseDate: "2021-11-18" },
      { product: "Galaxy Buds Pro", category: "Wearable", purchaseDate: "2022-04-09" },
    ],
    appEvents: [
      { type: "view", product: "Galaxy S24 Ultra", count: 7 },
      { type: "view", product: "Galaxy AI camera features", count: 5 },
      { type: "cart", product: "Samsung Care+", count: 1 },
    ],
    campaigns: ["Galaxy AI upgrade email", "Trade-in push", "Samsung Care+ reminder"],
    offlineNotes: ["Asked about exchange value last visit", "Prefers EMI over upfront payment"],
    priceSensitivity: "Medium",
    channel: "Store assisted",
  },
  {
    id: "C1002",
    phone: "98765 12002",
    name: "Meera Iyer",
    segment: "Connected home explorer",
    owned: [
      { product: "Neo QLED 55 inch TV", category: "TV", purchaseDate: "2024-01-12" },
      { product: "Galaxy A54", category: "Mobile", purchaseDate: "2023-07-20" },
    ],
    appEvents: [
      { type: "view", product: "Q-Series Soundbar", count: 8 },
      { type: "view", product: "SmartThings setup", count: 6 },
      { type: "cart", product: "Wall mount service", count: 1 },
    ],
    campaigns: ["TV soundbar bundle email", "SmartThings onboarding push"],
    offlineNotes: ["Family watches OTT and sports", "Asked about installation support"],
    priceSensitivity: "Low",
    channel: "Store demo",
  },
  {
    id: "C1003",
    phone: "98765 12003",
    name: "Kabir Khan",
    segment: "Gaming and performance shopper",
    owned: [
      { product: "Galaxy M52", category: "Mobile", purchaseDate: "2021-06-03" },
      { product: "Galaxy Tab A8", category: "Tablet", purchaseDate: "2022-10-14" },
    ],
    appEvents: [
      { type: "view", product: "Galaxy S24+", count: 5 },
      { type: "view", product: "120Hz display", count: 4 },
      { type: "view", product: "Gaming performance", count: 6 },
    ],
    campaigns: ["Performance upgrade SMS", "Festival EMI offer"],
    offlineNotes: ["Compares specs with OnePlus", "Sensitive to discount timing"],
    priceSensitivity: "High",
    channel: "WhatsApp follow-up",
  },
  {
    id: "C1004",
    phone: "98765 12004",
    name: "Ritika Sharma",
    segment: "Recent flagship buyer",
    owned: [
      { product: "Galaxy S24", category: "Mobile", purchaseDate: "2026-03-04" },
      { product: "Galaxy Watch4", category: "Wearable", purchaseDate: "2022-02-10" },
    ],
    appEvents: [
      { type: "view", product: "Galaxy Watch7", count: 6 },
      { type: "view", product: "Samsung Health", count: 8 },
      { type: "cart", product: "Galaxy Buds3", count: 1 },
    ],
    campaigns: ["Watch upgrade push", "Buds accessory bundle", "Samsung Health challenge"],
    offlineNotes: ["Interested in fitness tracking", "Asked whether old watch exchange is available"],
    priceSensitivity: "Medium",
    channel: "App push and store",
  },
  {
    id: "C1005",
    phone: "98765 12005",
    name: "Sanjay Rao",
    segment: "Offline loyalist",
    owned: [
      { product: "Galaxy A32", category: "Mobile", purchaseDate: "2020-12-21" },
      { product: "Samsung Refrigerator", category: "Appliance", purchaseDate: "2023-05-08" },
    ],
    appEvents: [
      { type: "view", product: "Galaxy A55", count: 3 },
      { type: "view", product: "Exchange offers", count: 4 },
      { type: "view", product: "No-cost EMI", count: 3 },
    ],
    campaigns: ["A-series upgrade SMS", "Offline exchange event invite"],
    offlineNotes: ["Buys only after store explanation", "Concerned about data transfer"],
    priceSensitivity: "High",
    channel: "Phone call",
  },
];

const productPlaybook = {
  "Premium mobile upgrader": {
    product: "Galaxy S24 Ultra",
    offer: "Trade-in + Samsung Care+ + no-cost EMI",
    bundle: ["Instant exchange value for Galaxy S21", "Samsung Care+ for screen and accidental protection", "Buds3 Pro add-on at bundle price"],
    objections: ["Price feels high versus current phone", "Unsure whether AI features are useful", "Wants better exchange value"],
    talkingPoints: ["Start with camera and Galaxy AI editing", "Show side-by-side night photo improvement", "Anchor EMI after exchange instead of full price", "Position Care+ as risk reduction for premium device"],
  },
  "Connected home explorer": {
    product: "Q-Series Soundbar with SmartThings setup",
    offer: "TV owner soundbar bundle + installation support",
    bundle: ["Q-Series Soundbar", "Wall mount or installation visit", "SmartThings onboarding checklist"],
    objections: ["Unsure if soundbar will work with current TV", "Installation complexity", "Need to justify extra spend after TV purchase"],
    talkingPoints: ["Demo sports and movie sound modes", "Show one-remote and SmartThings control", "Use recent TV purchase as reason to complete the setup", "Offer installation reassurance before discussing price"],
  },
  "Gaming and performance shopper": {
    product: "Galaxy S24+",
    offer: "Festival EMI + exchange + gaming accessory bundle",
    bundle: ["Exchange for Galaxy M52", "No-cost EMI", "Protective case and charger bundle"],
    objections: ["Compares processor and RAM with competitor", "Waiting for deeper discount", "Battery and heating concerns"],
    talkingPoints: ["Lead with display, performance, and battery", "Open a live gaming demo", "Explain update promise and service network", "Convert discount discussion into monthly EMI after exchange"],
  },
  "Recent flagship buyer": {
    product: "Galaxy Watch7",
    offer: "Watch upgrade + Buds3 accessory bundle",
    bundle: ["Galaxy Watch7", "Old watch exchange evaluation", "Buds3 add-on for workouts and calls"],
    objections: ["Current watch still works", "Needs clear health feature difference", "May delay accessory purchase"],
    talkingPoints: ["Connect to Samsung Health usage", "Demo sleep, heart, and workout tracking", "Show phone-watch continuity", "Offer exchange evaluation before closing"],
  },
  "Offline loyalist": {
    product: "Galaxy A55",
    offer: "Exchange + data transfer support + no-cost EMI",
    bundle: ["Galaxy A55", "In-store Smart Switch data transfer", "Screen protector and case", "Samsung app onboarding"],
    objections: ["Worried about data transfer", "Needs price confidence", "May not understand app benefits"],
    talkingPoints: ["Begin with reliability and display upgrade", "Promise assisted data transfer in store", "Show exchange value and EMI clearly", "End with Samsung app setup for service and offers"],
  },
};

const listEl = document.querySelector("#customerList");
const searchEl = document.querySelector("#customerSearch");
const copyButton = document.querySelector("#copyScript");
const outcomeButtons = document.querySelector("#outcomeButtons");
const generateAiButton = document.querySelector("#generateAi");
const aiStatus = document.querySelector("#aiStatus");
const backendNote = document.querySelector("#backendNote");
const chatForm = document.querySelector("#chatForm");
const chatQuestion = document.querySelector("#chatQuestion");
const chatLog = document.querySelector("#chatLog");
const chatMode = document.querySelector("#chatMode");
let selectedId = customers[0].id;
let requestVersion = 0;

function daysSince(dateString) {
  const reference = new Date("2026-07-27T00:00:00");
  const date = new Date(`${dateString}T00:00:00`);
  return Math.round((reference - date) / (1000 * 60 * 60 * 24));
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function computeProfile(customer) {
  const mobile = customer.owned.find((item) => item.category === "Mobile");
  const lastOwned = [...customer.owned].sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))[0];
  const mobileAgeMonths = mobile ? Math.round(daysSince(mobile.purchaseDate) / 30) : 0;
  const eventScore = customer.appEvents.reduce((sum, event) => sum + event.count * (event.type === "cart" ? 3 : 1), 0);
  const ageScore = Math.min(45, Math.round(mobileAgeMonths * 1.3));
  const sensitivityPenalty = customer.priceSensitivity === "High" ? -8 : customer.priceSensitivity === "Medium" ? -3 : 4;
  const confidence = Math.max(58, Math.min(94, 45 + ageScore + Math.round(eventScore * 1.2) + sensitivityPenalty));
  const upgradeNeed = mobileAgeMonths >= 36 ? "High upgrade need" : mobileAgeMonths >= 24 ? "Medium upgrade need" : "Cross-sell opportunity";
  const topInterest = [...customer.appEvents].sort((a, b) => b.count - a.count)[0];
  return { mobile, lastOwned, mobileAgeMonths, eventScore, confidence, upgradeNeed, topInterest };
}

function renderList() {
  const query = searchEl.value.trim().toLowerCase();
  const matched = customers.filter((customer) => {
    return (
      customer.id.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query) ||
      customer.segment.toLowerCase().includes(query)
    );
  });

  listEl.innerHTML = "";
  matched.forEach((customer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `customer-button${customer.id === selectedId ? " is-selected" : ""}`;
    button.innerHTML = `<strong>${customer.name}</strong><span>${customer.id} | ${customer.phone}</span><span>${customer.segment}</span>`;
    button.addEventListener("click", () => {
      selectedId = customer.id;
      render();
    });
    listEl.appendChild(button);
  });
}

function setList(selector, items, ordered = false) {
  const el = document.querySelector(selector);
  el.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
  el.style.listStyleType = ordered ? "decimal" : "disc";
}

function renderSignals(customer, profile) {
  const signals = [
    { value: `${profile.mobileAgeMonths}m`, label: "Mobile device age" },
    { value: profile.eventScore, label: "Weighted digital intent" },
    { value: customer.priceSensitivity, label: "Price sensitivity" },
    { value: customer.channel, label: "Preferred closure path" },
  ];
  const stack = document.querySelector("#signalStack");
  stack.innerHTML = "";
  signals.forEach((signal) => {
    const row = document.createElement("div");
    row.className = "signal";
    row.innerHTML = `<b>${signal.value}</b><div><strong>${signal.label}</strong><span>${customer.segment}</span></div>`;
    stack.appendChild(row);
  });
}

function applyCopilotResponse(result) {
  document.querySelector("#upgradeNeed").textContent = result.likely_upgrade_need;
  document.querySelector("#bestProduct").textContent = result.best_product_to_pitch;
  document.querySelector("#bestOffer").textContent = result.best_offer_bundle;
  document.querySelector("#confidenceFill").style.width = `${result.confidence}%`;
  document.querySelector("#confidenceText").textContent = `${result.confidence}%`;
  document.querySelector("#recommendationReason").textContent = result.customer_summary;
  setList("#bundleItems", result.why_this_recommendation);
  setList("#objections", result.possible_objections);
  setList("#talkingPoints", result.recommended_talking_points, true);
  document.querySelector("#pitchScript").textContent = result.associate_script;
  backendNote.textContent = result.backend_note || "";
  aiStatus.textContent =
    result.mode === "openai"
      ? `Backend status: ChatGPT/OpenAI generated this recommendation using ${result.model}.`
      : "Backend status: local fallback response because OPENAI_API_KEY is not configured.";
  chatMode.textContent = result.mode === "openai" ? `ChatGPT model: ${result.model}` : "Fallback mode";
}

async function generateWithBackend(manual = false) {
  if (window.location.protocol === "file:") {
    aiStatus.textContent = "Backend status: open this through the Node server to enable ChatGPT generation.";
    backendNote.textContent = "Run `npm start` in this folder, then open http://127.0.0.1:8010.";
    return;
  }

  const currentVersion = ++requestVersion;
  generateAiButton.disabled = true;
  generateAiButton.textContent = "Generating...";
  aiStatus.textContent = manual ? "Backend status: asking ChatGPT backend..." : "Backend status: refreshing AI recommendation...";

  try {
    const response = await fetch("/api/copilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: selectedId }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Backend request failed");
    }
    if (currentVersion === requestVersion) {
      applyCopilotResponse(result);
    }
  } catch (error) {
    aiStatus.textContent = `Backend status: ${error.message}. Showing local demo recommendation.`;
    backendNote.textContent = "The frontend can still run, but the full product experience needs the Node backend and OpenAI key.";
  } finally {
    if (currentVersion === requestVersion) {
      generateAiButton.disabled = false;
      generateAiButton.textContent = "Generate with ChatGPT";
    }
  }
}

function addChatMessage(role, text) {
  const message = document.createElement("div");
  message.className = `chat-message ${role === "Associate" ? "user" : "assistant"}`;
  const label = document.createElement("strong");
  label.textContent = role;
  const body = document.createElement("span");
  body.textContent = text;
  message.append(label, body);
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function resetChat(customer) {
  chatLog.innerHTML = "";
  addChatMessage(
    "ChatGPT Coach",
    `Ask me how to pitch, handle objections, choose a demo, or follow up with ${customer.name.split(" ")[0]}.`,
  );
}

async function askChatGPT(question) {
  if (window.location.protocol === "file:") {
    addChatMessage("ChatGPT Coach", "Open this through the Node backend at http://127.0.0.1:8010 to use ChatGPT chat.");
    return;
  }

  addChatMessage("Associate", question);
  const sendButton = document.querySelector("#sendChat");
  sendButton.disabled = true;
  sendButton.textContent = "Asking...";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: selectedId, question }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Chat request failed");
    }
    chatMode.textContent = result.mode === "openai" ? `ChatGPT model: ${result.model}` : "Fallback mode";
    addChatMessage("ChatGPT Coach", result.answer);
  } catch (error) {
    addChatMessage("ChatGPT Coach", `${error.message}. Check that the backend is running and OPENAI_API_KEY is configured.`);
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Ask";
  }
}

async function checkBackend() {
  if (window.location.protocol === "file:") {
    aiStatus.textContent = "Backend status: not connected. Run `npm start` and open http://127.0.0.1:8010.";
    return;
  }

  try {
    const response = await fetch("/api/health");
    const health = await response.json();
    aiStatus.textContent = health.openaiConfigured
      ? `Backend status: OpenAI enabled with ${health.model}.`
      : "Backend status: backend running in demo fallback mode. Add OPENAI_API_KEY to enable ChatGPT.";
    chatMode.textContent = health.openaiConfigured ? `ChatGPT model: ${health.model}` : "Fallback mode";
  } catch {
    aiStatus.textContent = "Backend status: not reachable. Showing local demo recommendation.";
    chatMode.textContent = "Backend offline";
  }
}

function render() {
  const customer = customers.find((item) => item.id === selectedId) || customers[0];
  const profile = computeProfile(customer);
  const playbook = productPlaybook[customer.segment];
  const ownedProducts = customer.owned.map((item) => item.product).join(", ");
  const campaigns = customer.campaigns.join(", ");
  const interest = `${profile.topInterest.product} (${profile.topInterest.count} ${profile.topInterest.type} signals)`;

  document.querySelector("#customerName").textContent = `${customer.name} | ${customer.id}`;
  document.querySelector("#visitChip").textContent = customer.channel;
  document.querySelector("#ownedProducts").textContent = ownedProducts;
  document.querySelector("#lastPurchase").textContent = `${profile.lastOwned.product}, ${formatDate(profile.lastOwned.purchaseDate)}`;
  document.querySelector("#browsingInterest").textContent = interest;
  document.querySelector("#campaignsSeen").textContent = campaigns;
  document.querySelector("#upgradeNeed").textContent = profile.upgradeNeed;
  document.querySelector("#bestProduct").textContent = playbook.product;
  document.querySelector("#bestOffer").textContent = playbook.offer;
  document.querySelector("#confidenceFill").style.width = `${profile.confidence}%`;
  document.querySelector("#confidenceText").textContent = `${profile.confidence}%`;
  document.querySelector("#recommendationReason").textContent =
    `${customer.name.split(" ")[0]} owns ${ownedProducts}. The strongest signal is ${interest.toLowerCase()}, with ${profile.mobileAgeMonths} months since the current mobile purchase and prior campaign exposure to ${customer.campaigns[0].toLowerCase()}.`;

  setList("#bundleItems", playbook.bundle);
  setList("#objections", playbook.objections);
  setList("#talkingPoints", playbook.talkingPoints, true);

  document.querySelector("#pitchScript").textContent =
    `Hi ${customer.name.split(" ")[0]}, I can see you already use ${profile.mobile?.product || "Samsung products"}. Based on what you have been exploring, I would recommend ${playbook.product}. Let me show you the one feature that matters most for your usage, then we can check the ${playbook.offer.toLowerCase()} so you know the real monthly price before deciding.`;
  backendNote.textContent = "Local transparent recommendation shown while the ChatGPT backend is unavailable or loading.";

  document.querySelector("#outcomeNote").textContent = "No outcome logged.";
  document.querySelectorAll("#outcomeButtons button").forEach((button) => button.classList.remove("is-active"));
  renderSignals(customer, profile);
  renderList();
  resetChat(customer);
  generateWithBackend(false);
}

searchEl.addEventListener("input", renderList);

copyButton.addEventListener("click", async () => {
  const script = document.querySelector("#pitchScript").textContent;
  try {
    await navigator.clipboard.writeText(script);
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  } catch {
    copyButton.textContent = "Select text";
  }
});

generateAiButton.addEventListener("click", () => {
  generateWithBackend(true);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatQuestion.value.trim();
  if (!question) return;
  chatQuestion.value = "";
  askChatGPT(question);
});

outcomeButtons.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-outcome]");
  if (!button) return;
  document.querySelectorAll("#outcomeButtons button").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  const customer = customers.find((item) => item.id === selectedId);
  document.querySelector("#outcomeNote").textContent =
    `${button.dataset.outcome} logged for ${customer.name}. This would feed the recommendation and campaign learning loop.`;
  if (window.location.protocol !== "file:") {
    try {
      await fetch("/api/outcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: selectedId, outcome: button.dataset.outcome }),
      });
    } catch {
      // Keep the demo interaction visible even if the backend is unreachable.
    }
  }
});

checkBackend();
render();
