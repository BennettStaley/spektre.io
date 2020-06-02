import styled from 'styled-components';
import { wrapPage } from '../enhancers/wrapPage';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const HomeBase = ({ className }: { className?: string }) => {
  return <Title className={className}>about page</Title>;
};

export default wrapPage(HomeBase, {
  appLayout: {
    showFooter: false,
  },
});
