import type { StorybookConfig } from '@storybook/core-common';

export const rootMain: StorybookConfig = {
  stories: [],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
