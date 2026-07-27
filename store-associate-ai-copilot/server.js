const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
loadEnv(path.join(ROOT, ".env"));
const PORT = Number(process.env.PORT || 8010);
const MODEL = process.env.OPENAI_MODEL || "gpt-5";

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

const productCatalog = [
  {
    product: "Galaxy S24 Ultra",
    category: "Mobile",
    approvedClaims: ["Galaxy AI editing", "premium camera experience", "long battery life", "S Pen productivity"],
    eligibleOffers: ["Trade-in", "No-cost EMI", "Samsung Care+", "Buds3 Pro bundle"],
  },
  {
    product: "Galaxy S24+",
    category: "Mobile",
    approvedClaims: ["120Hz display", "strong performance", "all-day battery", "Galaxy ecosystem continuity"],
    eligibleOffers: ["Exchange", "Festival EMI", "charger and case bundle"],
  },
  {
    product: "Galaxy A55",
    category: "Mobile",
    approvedClaims: ["reliable everyday performance", "bright display", "camera upgrade", "long software support"],
    eligibleOffers: ["Exchange", "No-cost EMI", "Smart Switch support", "case bundle"],
  },
  {
    product: "Q-Series Soundbar",
    category: "Home Entertainment",
    approvedClaims: ["TV sound enhancement", "simple Samsung TV pairing", "SmartThings control", "immersive movie and sports sound"],
    eligibleOffers: ["TV owner bundle", "installation support", "wall mount service"],
  },
  {
    product: "Galaxy Watch7",
    category: "Wearable",
    approvedClaims: ["health tracking", "sleep insights", "workout tracking", "phone continuity"],
    eligibleOffers: ["Watch exchange evaluation", "Buds3 add-on", "Samsung Health onboarding"],
  },
];

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "customer_summary",
    "likely_upgrade_need",
    "best_product_to_pitch",
    "best_offer_bundle",
    "why_this_recommendation",
    "possible_objections",
    "recommended_talking_points",
    "associate_script",
    "follow_up_message",
    "confidence",
  ],
  properties: {
    customer_summary: { type: "string" },
    likely_upgrade_need: { type: "string" },
    best_product_to_pitch: { type: "string" },
    best_offer_bundle: { type: "string" },
    why_this_recommendation: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5,
    },
    possible_objections: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 4,
    },
    recommended_talking_points: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5,
    },
    associate_script: { type: "string" },
    follow_up_message: { type: "string" },
    confidence: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
  },
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, {
        ok: true,
        openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
        model: MODEL,
      });
    }

    if (req.method === "POST" && url.pathname === "/api/copilot") {
      const body = await readJson(req);
      const customer = findCustomer(body.customerId);
      if (!customer) {
        return sendJson(res, 404, { error: "Customer not found" });
      }

      const deterministic = buildDeterministicRecommendation(customer);
      if (!process.env.OPENAI_API_KEY) {
        return sendJson(res, 200, {
          mode: "demo-fallback",
          model: "local-rules",
          ...deterministic,
          backend_note: "OPENAI_API_KEY is not configured, so the backend returned the transparent local fallback.",
        });
      }

      const aiResult = await generateWithOpenAI(customer, deterministic);
      return sendJson(res, 200, {
        mode: "openai",
        model: MODEL,
        ...aiResult,
        backend_note: "Generated by the backend using the OpenAI Responses API with approved customer context and product guardrails.",
      });
    }

    if (req.method === "POST" && url.pathname === "/api/chat") {
      const body = await readJson(req);
      const customer = findCustomer(body.customerId);
      if (!customer) {
        return sendJson(res, 404, { error: "Customer not found" });
      }
      const question = String(body.question || "").trim();
      if (!question) {
        return sendJson(res, 400, { error: "Question is required" });
      }

      const deterministic = buildDeterministicRecommendation(customer);
      if (!process.env.OPENAI_API_KEY) {
        return sendJson(res, 200, {
          mode: "demo-fallback",
          model: "local-rules",
          answer: buildFallbackChatAnswer(customer, deterministic, question),
        });
      }

      const answer = await chatWithOpenAI(customer, deterministic, question);
      return sendJson(res, 200, {
        mode: "openai",
        model: MODEL,
        answer,
      });
    }

    if (req.method === "POST" && url.pathname === "/api/outcome") {
      const body = await readJson(req);
      return sendJson(res, 200, {
        ok: true,
        message: `Outcome '${body.outcome}' captured for ${body.customerId}. In production this would write to the CRM learning table.`,
      });
    }

    return serveStatic(req, res, url.pathname);
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Server error", detail: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Store Associate AI Assistant running at http://127.0.0.1:${PORT}`);
  console.log(`OpenAI backend: ${process.env.OPENAI_API_KEY ? `enabled with ${MODEL}` : "demo fallback, set OPENAI_API_KEY to enable"}`);
});

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

function findCustomer(id) {
  return customers.find((customer) => customer.id === id || customer.phone === id);
}

function daysSince(dateString) {
  const reference = new Date("2026-07-27T00:00:00");
  const date = new Date(`${dateString}T00:00:00`);
  return Math.round((reference - date) / (1000 * 60 * 60 * 24));
}

function buildDeterministicRecommendation(customer) {
  const mobile = customer.owned.find((item) => item.category === "Mobile");
  const mobileAgeMonths = mobile ? Math.round(daysSince(mobile.purchaseDate) / 30) : 0;
  const topInterest = [...customer.appEvents].sort((a, b) => b.count - a.count)[0];
  const product =
    customer.segment === "Connected home explorer"
      ? "Q-Series Soundbar"
      : customer.segment === "Recent flagship buyer"
        ? "Galaxy Watch7"
        : customer.segment === "Offline loyalist"
          ? "Galaxy A55"
          : customer.segment === "Gaming and performance shopper"
            ? "Galaxy S24+"
            : "Galaxy S24 Ultra";
  const catalogItem = productCatalog.find((item) => item.product === product);
  const confidence = Math.max(58, Math.min(94, 52 + mobileAgeMonths + topInterest.count * 2 - (customer.priceSensitivity === "High" ? 8 : 0)));

  return {
    customer_summary: `${customer.name} owns ${customer.owned.map((item) => item.product).join(", ")}. Recent interest is strongest around ${topInterest.product}.`,
    likely_upgrade_need: mobileAgeMonths >= 36 ? "High upgrade need" : mobileAgeMonths >= 24 ? "Medium upgrade need" : "Cross-sell opportunity",
    best_product_to_pitch: product,
    best_offer_bundle: catalogItem.eligibleOffers.join(" + "),
    why_this_recommendation: [
      `Current customer segment: ${customer.segment}.`,
      `Current mobile age is ${mobileAgeMonths} months.`,
      `Top digital signal is ${topInterest.product} with ${topInterest.count} ${topInterest.type} events.`,
      `Relevant campaign exposure: ${customer.campaigns.join(", ")}.`,
    ],
    possible_objections: customer.offlineNotes,
    recommended_talking_points: catalogItem.approvedClaims.map((claim) => `Show ${claim} in the live demo.`),
    associate_script: `Hi ${customer.name.split(" ")[0]}, since you already use ${mobile?.product || "Samsung products"}, I would recommend ${product}. Let me show the most relevant feature first, then we can check ${catalogItem.eligibleOffers[0].toLowerCase()} and monthly affordability.`,
    follow_up_message: `Thanks for visiting Samsung Store. Your advisor can help you with ${product} and ${catalogItem.eligibleOffers[0].toLowerCase()} when convenient.`,
    confidence,
  };
}

async function generateWithOpenAI(customer, deterministic) {
  const input = [
    {
      role: "system",
      content:
        "You are a Samsung retail store associate AI assistant. Use only the provided customer context, product catalog, and approved offer rules. Do not invent discounts, stock availability, financing terms, medical claims, warranty terms, or unapproved product claims. Write concise, store-ready guidance. Return valid JSON only.",
    },
    {
      role: "user",
      content: JSON.stringify(
        {
          task: "Generate the store associate copilot response for this walk-in customer.",
          customer,
          deterministic_baseline: deterministic,
          approved_product_catalog: productCatalog,
          output_rules: [
            "Keep the associate script under 70 words.",
            "Make talking points actionable for an in-store conversation.",
            "Mention why the recommendation is relevant.",
            "If price sensitivity is high, lead with exchange, EMI, or value framing.",
            "Use clear retail language, not data science jargon.",
          ],
        },
        null,
        2,
      ),
    },
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "store_associate_copilot_response",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI request failed");
  }

  const text = payload.output_text || extractOutputText(payload);
  if (!text) {
    throw new Error("OpenAI response did not include output text");
  }
  return JSON.parse(text);
}

async function chatWithOpenAI(customer, deterministic, question) {
  const input = [
    {
      role: "system",
      content:
        "You are a ChatGPT-powered Samsung retail sales coach for store associates. Answer only from the provided customer context, approved product catalog, and recommendation baseline. Do not invent discounts, inventory, financing terms, warranty terms, or unapproved claims. Keep the answer under 120 words and make it immediately usable in store.",
    },
    {
      role: "user",
      content: JSON.stringify(
        {
          associate_question: question,
          customer,
          recommendation_baseline: deterministic,
          approved_product_catalog: productCatalog,
        },
        null,
        2,
      ),
    },
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      input,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI chat request failed");
  }
  const answer = payload.output_text || extractOutputText(payload);
  if (!answer) {
    throw new Error("OpenAI chat response did not include output text");
  }
  return answer;
}

function buildFallbackChatAnswer(customer, deterministic, question) {
  const lower = question.toLowerCase();
  if (lower.includes("price") || lower.includes("emi") || lower.includes("discount")) {
    return `For ${customer.name}, lead with value before price: show ${deterministic.best_product_to_pitch}, then explain ${deterministic.best_offer_bundle}. Keep the conversation on monthly affordability and exchange value instead of full device price.`;
  }
  if (lower.includes("objection") || lower.includes("handle")) {
    return `Likely objections are: ${deterministic.possible_objections.join("; ")}. A good response is to acknowledge the concern, show one relevant demo, then connect the offer to the customer's current product and recent browsing interest.`;
  }
  if (lower.includes("demo") || lower.includes("show")) {
    return `Start the demo with ${deterministic.recommended_talking_points[0]} Then connect it to ${customer.appEvents[0].product}, because that is one of the customer's strongest recent digital signals.`;
  }
  return `For ${customer.name}, recommend ${deterministic.best_product_to_pitch}. The strongest reason is ${deterministic.why_this_recommendation[2]} Keep the pitch short, practical, and connected to the customer's current Samsung products.`;
}

function extractOutputText(payload) {
  const parts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("");
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT, safePath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, {
      "Content-Type": contentType(filePath),
      "Cache-Control": "no-store",
    });
    res.end(content);
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath);
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".csv") return "text/csv; charset=utf-8";
  if (ext === ".md") return "text/markdown; charset=utf-8";
  return "application/octet-stream";
}
