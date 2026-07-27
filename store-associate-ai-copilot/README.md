# Samsung Store Associate AI Assistant

This is a runnable GenAI product demo for the retail use case:

> When a customer walks into a Samsung store and shares a phone number or customer ID, the associate receives a concise customer summary, likely upgrade need, best product to pitch, best offer or bundle, possible objections, and recommended talking points.

The product has:

- A store associate frontend in `index.html`, `styles.css`, and `app.js`
- A Node.js backend in `server.js`
- An OpenAI/ChatGPT generation endpoint at `POST /api/copilot`
- A ChatGPT sales coach endpoint at `POST /api/chat`
- An outcome capture endpoint at `POST /api/outcome`
- A local fallback mode when `OPENAI_API_KEY` is not configured

## Run

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Add your OpenAI API key in `.env`:

```text
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-5
PORT=8010
```

3. Start the product:

```bash
npm start
```

4. Open:

```text
http://127.0.0.1:8010
```

## Backend API

### Health

```bash
curl http://127.0.0.1:8010/api/health
```

### Generate Store Associate Recommendation

```bash
curl -X POST http://127.0.0.1:8010/api/copilot \
  -H "Content-Type: application/json" \
  -d '{"customerId":"C1001"}'
```

The backend sends approved customer context, product catalog, campaign history, and retail guardrails to the OpenAI Responses API. It asks the model to return structured JSON with:

- customer summary
- likely upgrade need
- best product to pitch
- best offer or bundle
- reasons for recommendation
- possible objections
- talking points
- associate script
- follow-up message
- confidence score

### Ask The ChatGPT Sales Coach

```bash
curl -X POST http://127.0.0.1:8010/api/chat \
  -H "Content-Type: application/json" \
  -d '{"customerId":"C1001","question":"How should I handle a price objection?"}'
```

The chat endpoint lets the store associate ask follow-up questions about the selected customer. The model receives only approved customer context, product catalog, and recommendation baseline.

### Capture Outcome

```bash
curl -X POST http://127.0.0.1:8010/api/outcome \
  -H "Content-Type: application/json" \
  -d '{"customerId":"C1001","outcome":"Demo booked"}'
```

## Open-Source Dataset Basis

The included customer records are small Samsung-flavored sample records for demonstration. They are mapped from common open-source retail dataset structures:

- UCI Online Retail: transaction history, customer ID, invoice date, product description, basket history.
  - https://archive.ics.uci.edu/dataset/352/online+retail
- RetailRocket ecommerce dataset: visitor events such as view, add-to-cart, transaction.
  - https://www.kaggle.com/datasets/retailrocket/ecommerce-dataset
- OTTO Recommender Systems Dataset: session events such as clicks, carts, orders.
  - https://www.kaggle.com/datasets/otto/recsys-dataset
- Instacart Market Basket Analysis: repeat-purchase and basket-affinity patterns.
  - https://www.kaggle.com/c/instacart-market-basket-analysis

Local sample files:

- `data/customer_transactions_sample.csv`
- `data/digital_events_sample.csv`
- `data/campaign_history_sample.csv`

The UI and backend use the same sample records. In production, these would come from CRM, app event tables, ecommerce events, offline POS, campaign history, product catalog, inventory, consent flags, and propensity models.

## Demo Logic

The assistant uses two layers:

1. A transparent scoring and fallback layer:

- Device age contributes to upgrade need.
- Browsing and cart-like events contribute to digital intent.
- Campaign exposure informs the pitch reason.
- Price sensitivity changes confidence and objection handling.
- Segment playbooks define product recommendation, offer bundle, objections, and talking points.

2. A ChatGPT/OpenAI layer:

- Converts raw customer context into associate-ready language.
- Explains why the product is recommended.
- Generates possible objections and talking points.
- Creates a concise associate script.
- Answers associate follow-up questions as an in-store sales coach.
- Stays inside the approved product catalog and offer rules.

For production, replace the in-file sample records with live customer 360 data, product catalog, inventory, campaign history, consent flags, model scores, and approved offer rules.

## Guardrails

The backend prompt tells the model:

- Do not invent discounts.
- Do not invent stock availability.
- Do not invent financing terms.
- Do not invent warranty terms.
- Use only approved product claims.
- Return structured JSON only.
