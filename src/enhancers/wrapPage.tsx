import React, { FunctionComponent } from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';

import { Layout } from '../containers/layout';

import { theme as defaultTheme } from '../styles/theme';

import { NextPageContext } from 'next';

type AppLayout = {
  title: string;
  showFooter: boolean;
  showNavigation: boolean;
};

type StateFunctionType<T> = (ctx: NextPageContext) => Promise<Partial<T>>;

type StateOptionType<T> = Partial<T> | StateFunctionType<T> | null;

interface PageOptions {
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
  pageStyle: string = ``,
  options: PageOptions = {},
): FunctionComponent<any> {
  const EnhancedPage = ({
    theme = defaultTheme,
    appLayout = {},
    pageProps = {},
  }) => {
    const Page = styled(PageComponent)`
      ${pageStyle}
    `;
    return (
      <ThemeProvider theme={theme}>
        <Layout {...appLayout}>
          <Page {...pageProps} />
        </Layout>
      </ThemeProvider>
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

    console.log(EnhancedPage);

    return {
      pageProps,
      theme: {
        ...defaultTheme,
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
