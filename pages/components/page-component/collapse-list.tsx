import { StarBorder } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Link from "next/link";

export interface CollapsibleListItem {
  title: string;
  url: string;
}

export interface CollapsibleListProps {
  open: boolean;
  listItems?: CollapsibleListItem[];
}

export const CollapsibleList = ({ open, listItems }: CollapsibleListProps) => {
  console.log(listItems);
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {listItems &&
          listItems.map((item, idx) => {
            return (
              <Link key={`${idx}-${item.title}`} href={item.url} passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            );
          })}
      </List>
    </Collapse>
  );
};
