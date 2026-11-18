/**
 * Educational routing logic for the Wallet Fit concept.
 * It never guarantees token support; users are sent to Cypherock's live coin list.
 */
export function getWalletRecommendation({ networks = [], priority = '', setup = '' }) {
  const normalized = networks.map((network) => network.toLowerCase());
  const needsWiderCoverage = normalized.some((network) =>
    ['solana', 'icp', 'stellar', 'near', 'canton'].includes(network)
  );

  if (needsWiderCoverage) {
    return {
      product: 'X1',
      title: 'Start by exploring Cypherock X1',
      reason: 'You selected a network that Cypherock identifies as requiring its wider chain coverage. Check the live supported-coin list for the exact asset before deciding.',
      href: 'https://www.cypherock.com/cypherock-x1',
      certainty: 'Product-fit direction, not a token-support guarantee'
    };
  }

  const X0NetworksOnly = normalized.length > 0 && normalized.every((network) =>
    ['bitcoin', 'ethereum', 'evm'].includes(network)
  );

  if (X0NetworksOnly && (priority === 'mobile' || setup === 'phone')) {
    return {
      product: 'X0',
      title: 'Start by exploring Cypherock X0',
      reason: 'Your selected needs appear aligned with X0’s published Bitcoin, Ethereum and EVM-compatible coverage, and you prefer a phone-led setup. Verify your exact asset and phone compatibility before purchase.',
      href: 'https://www.cypherock.com/cypherock-x0',
      certainty: 'Product-fit direction, not a token-support guarantee'
    };
  }

  return {
    product: 'COMPARE',
    title: 'Compare both before choosing',
    reason: 'Your answers do not point clearly to one device. Check your exact assets and compare the setup experience before deciding.',
    href: 'https://www.cypherock.com/coin-support',
    certainty: 'More information needed for a confident recommendation'
  };
}
