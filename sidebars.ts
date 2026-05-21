import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'onboarding',
    'intro',
    'authentication',
    {
      type: 'category',
      label: 'Modules',
      items: [
        {
          type: 'category',
          label: 'Fiscal Notes',
          items: [
            'modules/fiscal-notes/onboarding',
            'modules/fiscal-notes/kyc-iframe',
            'modules/fiscal-notes/activate-integration',
            'modules/fiscal-notes/receive-orders',
            'modules/fiscal-notes/notify-invoice',
            'modules/fiscal-notes/homologation',
          ],
        },
        {
          type: 'category',
          label: 'Orders',
          items: [
            'modules/orders/get-order',
          ],
        },
      ],
    },
    'error-codes',
  ],
};

export default sidebars;
