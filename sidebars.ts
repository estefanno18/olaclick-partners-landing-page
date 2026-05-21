import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'onboarding',
    'authentication',
    {
      type: 'category',
      label: 'Fiscal Notes',
      items: [
        'fiscal-notes/onboarding',
        'fiscal-notes/kyc-iframe',
        'fiscal-notes/activate-integration',
        'fiscal-notes/receive-orders',
        'fiscal-notes/notify-invoice',
      ],
    },
    {
      type: 'category',
      label: 'Orders',
      items: [
        'orders/get-order',
      ],
    },
    'homologation',
    'error-codes',
  ],
};

export default sidebars;
