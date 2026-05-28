import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OlaClick Partners',
  tagline: 'Integration documentation for fiscal notes providers',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  url: 'https://partners.olaclick.com',
  baseUrl: '/',

  organizationName: 'olaclick',
  projectName: 'partners-portal',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/olaclick-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OlaClick Partners',
      logo: {
        alt: 'OlaClick Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Get Started',
              to: '/',
            },
            {
              label: 'Authentication',
              to: '/authentication',
            },
            {
              label: 'Fiscal Notes',
              to: '/modules/fiscal-notes/onboarding',
            },
            {
              label: 'API Reference',
              to: '/api-reference/fiscal-notes/update-kyc-status',
            },
          ],
        },
        {
          title: 'OlaClick',
          items: [
            {
              label: 'Website',
              href: 'https://olaclick.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OlaClick. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
