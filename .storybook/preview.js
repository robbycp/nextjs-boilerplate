import { RouterContext } from "next/dist/shared/lib/router-context";
import { muiTheme } from 'storybook-addon-material-ui5'

import theme from '../src/styles/theme'

export const decorators = [
	muiTheme([theme])
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}