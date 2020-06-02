import {
  Typography,
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  ListItem,
  List,
  ListItemText,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Drawer } from './Drawer';
import { MenuItems } from '../constants/MenuItems';
import { useState } from 'react';

import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';

export const AppBar = () => {
  const [drawerState, setDrawerState] = useState<boolean>(false);

  return (
    <>
      <MUIAppBar position="static">
        <Toolbar
          css={`
            padding-left: 8px !important;
          `}
        >
          <div
            css={`
              float: left;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 145px;
            `}
          >
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => setDrawerState(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Spektre.io
            </Typography>
          </div>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </MUIAppBar>
      <Drawer drawerState={drawerState} setDrawerState={setDrawerState}>
        <List>
          {MenuItems.map(({ title, link, subNav }) => {
            if (link)
              return (
                <Link as={link.as} href={link.href}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              );
            else if (subNav)
              return <DropDownMenu title={title} subNav={subNav} />;
            else return <ListItem>{title}</ListItem>;
          })}
        </List>
      </Drawer>
    </>
  );
};
