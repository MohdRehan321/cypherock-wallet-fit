# Wallet Fit — Independent Cypherock Product Discovery Concept

A responsive React + Tailwind CSS prototype exploring a guided pre-purchase decision flow for Cypherock X0 and X1.

> This is an independent concept. It is not affiliated with, endorsed by, or operated by Cypherock. It does not provide security advice or guarantee token compatibility.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verify

```bash
npm test
npm run build
```

## What is included

- Premium dark fintech/Web3 visual direction
- Responsive desktop and mobile layouts
- Three-step interactive wallet-fit questionnaire
- Deterministic recommendation logic with conservative fallback
- Links to official Cypherock product, FAQ, and coin-support pages
- Simplified 2-of-5 security explainer
- Proposed measurement plan (no fabricated baseline or uplift)

## Product research and assumptions

Research checked on 19 November 2026 against public Cypherock pages:

- FAQ: https://www.cypherock.com/faq
  - FAQ describes X0 Founder’s Edition support for Bitcoin, Ethereum and 50+ EVM-compatible chains, and recommends X1 for non-EVM requirements such as Solana or ICP.
  - FAQ says X0 and X1 use the same 2-of-5 Shamir's Secret Sharing security standard.
  - FAQ says X0 requires an NFC-enabled smartphone.
- X0 product page: https://www.cypherock.com/cypherock-x0
- X1 product page: https://www.cypherock.com/cypherock-x1
- Coin support: https://www.cypherock.com/coin-support
- 2-of-5 scheme explainer: https://docs.cypherock.com/design-decisions/using-shamir-secret-sharing-vs.-multi-sig/why-cypherock-has-a-default-2-5-threshold-scheme

Important: product editions and supported assets can change. This prototype intentionally links users to the live coin-support page to verify the exact token, chain, and device. The questionnaire gives a starting direction only. It does not collect wallet addresses, seed phrases, private keys, or personal data.

## Measurement proposal

Primary: finder completion rate.

Secondary: official product click-through, product-page-to-checkout conversion, and pre-purchase support themes.

Validation: compare a current journey cohort with a guided-flow cohort or run an A/B test if traffic permits. Establish a baseline before setting targets. No internal analytics were available while creating this concept, so no uplift is claimed.

## Suggested Loom walkthrough (75–85 seconds)

1. 0–12s: Introduce yourself and explain this is an independent concept.
2. 12–28s: Show the public coin-support page and explain the opportunity: a guided decision before detailed token lookup.
3. 28–55s: Complete the three-step finder and show its conservative recommendation.
4. 55–72s: Show the measurement panel and explain what you'd validate.
5. 72–85s: Close by asking whether this is a problem the team is exploring.

## Deployment

Push this folder to a Git repository, import it into Vercel, keep the default Vite build command (`npm run build`) and output directory (`dist`).
