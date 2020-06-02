import { useState } from 'react';
import {
  ListItem,
  //   Button,
  Collapse,
  List,
  //   ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { StarBorder, ExpandMore, ExpandLess } from '@material-ui/icons';

export const DropDownMenu = ({ title, subNav }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subNav.map(item => (
          <List component="div" disablePadding>
            <ListItem
              button
              css={`
                padding-left: 32px !important;
              `}
            >
              {/* <ListItemIcon>
                <StarBorder />
              </ListItemIcon> */}
              <ListItemText primary={item.title} />
            </ListItem>
          </List>
        ))}
      </Collapse>
    </>
  );
};
