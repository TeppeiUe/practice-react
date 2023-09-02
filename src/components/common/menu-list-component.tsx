import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink, useLocation } from 'react-router-dom';

/**
 * メニューリスト
 */
export const MenuListComponent = (props: { open: boolean }) => {
  const { open } = props;
  const menuList = [
    ['login', <LoginIcon />],
    ['signup', <PersonAddIcon />],
    ['tweets', <ForumIcon />],
    ['users', <PeopleIcon />],
  ];
  const location = useLocation();

  return (
    <List>
      {menuList.map(([text, icon]) => (
        <ListItem
          disablePadding
          sx={{ display: 'block' }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            selected={location.pathname===`/${text}`}
            component={NavLink}
            to={`/${text}`}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {icon}
            </ListItemIcon>
            
            <ListItemText
              primary={text}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

