import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'onboarding',
    'intro',
    {
      type: 'category',
      label: 'Fiscal Notes',
      items: [
        'modules/fiscal-notes/onboarding',
        {
          type: 'category',
          label: 'KYC Phase',
          items: [
            'modules/fiscal-notes/kyc/iframe',
            'modules/fiscal-notes/kyc/update-status',
          ],
        },
        {
          type: 'category',
          label: 'Emission Phase',
          items: [
            'modules/fiscal-notes/emission/receive-orders',
            'modules/fiscal-notes/emission/get-order',
            'modules/fiscal-notes/emission/notify-invoice',
          ],
        },
        {
          type: 'category',
          label: 'Cancellation Phase',
          items: [
            'modules/fiscal-notes/cancellation/receive-cancellation',
            'modules/fiscal-notes/cancellation/confirm-cancellation',
          ],
        },
        'modules/fiscal-notes/homologation',
      ],
    },
  ],
};

export default sidebars;
