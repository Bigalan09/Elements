/** new line */
import { defineCustomElements } from '../dist/esm/loader';

/** new line */
defineCustomElements();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: false,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};