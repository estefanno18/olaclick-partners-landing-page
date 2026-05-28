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
            'modules/fiscal-notes/homologation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'category',
          label: 'Fiscal Notes',
          items: [
            'api-reference/fiscal-notes/update-kyc-status',
            'api-reference/fiscal-notes/receive-orders',
            'api-reference/fiscal-notes/notify-invoice',
          ],
        },
        {
          type: 'category',
          label: 'Orders',
          items: [
            'api-reference/orders/get-order',
          ],
        },
      ],
    },
    'error-codes',
  ],
};

export default sidebars;
