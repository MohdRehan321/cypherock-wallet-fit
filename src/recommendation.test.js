import test from 'node:test';
import assert from 'node:assert/strict';
import { getWalletRecommendation } from './recommendation.js';

test('getWalletRecommendation', async (t) => {
  await t.test('routes non-EVM network requirements to X1 research', () => {
    const result = getWalletRecommendation({ networks: ['Ethereum', 'Solana'] });
    assert.equal(result.product, 'X1');
    assert.match(result.href, /cypherock-x1/);
  });

  await t.test('suggests exploring X0 for EVM-focused, phone-led needs', () => {
    const result = getWalletRecommendation({
      networks: ['Bitcoin', 'Ethereum', 'EVM'],
      priority: 'mobile',
      setup: 'phone'
    });
    assert.equal(result.product, 'X0');
  });

  await t.test('does not force a product choice when answers are incomplete or ambiguous', () => {
    const result = getWalletRecommendation({ networks: ['Bitcoin'], priority: 'security' });
    assert.equal(result.product, 'COMPARE');
    assert.match(result.href, /coin-support/);
  });

  await t.test('always includes a token-support caveat', () => {
    const result = getWalletRecommendation({ networks: ['Solana'] });
    assert.match(result.certainty, /not a token-support guarantee/i);
  });
});
