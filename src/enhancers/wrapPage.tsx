import React, { FunctionComponent } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { Layout } from '../containers/layout';
import { createMuiTheme } from '@material-ui/core/styles';

import { defaultTheme } from '../styles/theme';

import { NextPageContext } from 'next';

type AppLayout = {
  title: string;
  showFooter: boolean;
  showNavigation: boolean;
};

type StateFunctionType<T> = (ctx: NextPageContext) => Promise<Partial<T>>;

type StateOptionType<T> = Partial<T> | StateFunctionType<T> | null;

interface PageProps {
  /**
   * AppLayout - configure the Apps Layout.
   * sets up the layout for the page.
   */
  appLayout?: StateOptionType<AppLayout>;
  /**
   * theme - styled components theme.
   */
  theme?: StateOptionType<DefaultTheme>;
  /**
   * className - auto generated from StyledComponents.
   */
  className?: string;
}

/**
 * determineState - adds the functionality to safeguard
 * null or undefined and also async functions
 */
async function determineState<T>(
  ctx: NextPageContext,
  stateOption?: StateOptionType<T>,
): Promise<Partial<T>> {
  if (!stateOption) return {};
  if (typeof stateOption === 'function') return await stateOption(ctx);
  return stateOption;
}

export type PageType = FunctionComponent<{
  className?: string;
}> & { getInitialProps?: (ctx: object) => Promise<any> };

export function wrapPage(
  PageComponent: PageType,
  options: PageProps = {},
): FunctionComponent<any> {
  const EnhancedPage = (pageProps: PageProps) => {
    const { theme, appLayout } = pageProps;
    const injectedTheme = { ...defaultTheme, ...theme };
    const MUITheme = {
      ...createMuiTheme(injectedTheme as DefaultTheme),
    };
    return (
      <StyledThemeProvider theme={injectedTheme}>
        <MaterialThemeProvider theme={MUITheme}>
          <Layout {...appLayout}>
            <PageComponent {...pageProps} />
          </Layout>
        </MaterialThemeProvider>
      </StyledThemeProvider>
    );
  };

  EnhancedPage.getInitialProps = async (ctx: NextPageContext) => {
    const pageProps = PageComponent.getInitialProps
      ? await PageComponent.getInitialProps(ctx)
      : {};

    const defaultAppLayout = {
      showFooter: true,
      showNavigation: true,
    };

    return {
      pageProps,
      theme: {
        // ...defaultTheme, we cant add default theme here
        // because if we DO, it gets serialized, and all functions are stripped out
        // having Merlin Labs flashbacks right now.
        ...(await determineState<AppLayout>(ctx, options.theme)),
      },
      appLayout: {
        ...defaultAppLayout,
        ...(await determineState<AppLayout>(ctx, options.appLayout)),
      },
    };
  };

  return EnhancedPage;
}
