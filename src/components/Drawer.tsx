import { Drawer as MUIDrawer } from '@material-ui/core';
import styled from 'styled-components';

type DrawerProps = {
  drawerState: boolean;
  setDrawerState: (state: boolean) => void;
  children: React.ReactNode;
};

const StyledMUIDrawer = styled(MUIDrawer)`
  .MuiPaper-root {
    width: 250px;
  }
`;

export const Drawer = ({
  children,
  drawerState,
  setDrawerState,
}: DrawerProps) => {
  return (
    <StyledMUIDrawer
      anchor="left"
      open={drawerState}
      onClose={() => setDrawerState(false)}
    >
      {children}
    </StyledMUIDrawer>
  );
};
