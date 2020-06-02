// import styled from 'styled-components';

import { ReactElement } from 'react';
import styled from 'styled-components';
import { AppBar } from '../components/AppBar';
import { Container } from '@material-ui/core';

type LayoutProps = {
  children?: ReactElement;
  className?: string;
  showFooter?: boolean;
  showNavigation?: boolean;
};

const LayoutBase = (props: LayoutProps) => {
  const { showFooter, className, showNavigation, children } = props;
  return (
    <>
      {showNavigation && <AppBar />}
      <Container maxWidth="lg">{children}</Container>

      {showFooter && <div>footer</div>}
      <style jsx global>{`
        body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #252525;
        }
      `}</style>
    </>
  );
};

export const Layout = styled(LayoutBase)`
  max-width: 1200px;
  margin: 0 auto;
`;
