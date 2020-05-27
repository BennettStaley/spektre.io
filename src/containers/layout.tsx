// import styled from 'styled-components';

import { ReactElement } from 'react';
import styled from 'styled-components';

type LayoutProps = {
  children?: ReactElement;
  className?: string;
  showFooter?: boolean;
  showNavigation?: boolean;
};

const LayoutBase = (props: LayoutProps) => {
  const { showFooter, className, showNavigation, children } = props;
  console.log('props', props);
  return (
    <div className={className}>
      {showNavigation && <div>app bar</div>}
      {children}
      {showFooter && <div>footer</div>}
    </div>
  );
};

export const Layout = styled(LayoutBase)`
  font-size: 102px;
`;
