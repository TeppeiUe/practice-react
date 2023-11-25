import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { axiosClient } from '../../context/AxiosClient';
import { DialogState, useDialogContext } from '../../context/DialogContext';
import { TweetFormComponent } from '../tweet-form-component';

/**
 * メニューに表示する情報の定義
 */
interface MenuItemInfo {
  /** 遷移パス（兼tip表示） */
  path: string;
  /** Icon Element */
  element: JSX.Element;
  /** ログインユーザ画面に表示？ */
  isPrivate: boolean;
  /** ハンドラ */
  handler: (path: string) => void;
}

/**
 * メニューリスト
 */
export const MenuListComponent = (props: { open: boolean }) => {
  const { open } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();
  const { setDialog } = useDialogContext();

  /**
   * 通常ハンドラ
   * @param path 遷移パス
   */
  const handleClick = (path: string) => {
    navigate(`/${path}`);
  }

  /**
   * ログアウト用ハンドラ
   */
  const handleLogoutClick = () => {
    axiosClient({
      url: 'logout',
      method: 'delete',
    })
    .then(() => setAuth(null))
    .catch(e => console.error(e.stack));
  }

  /**
   * ツイート用ハンドラ
   */
  const handleTweetAddClick = () => {
    setDialog(new DialogState(
      <TweetFormComponent />,
      true
    ));
  };

  /**
   * メニューに表示する情報リスト
   */
  const menuList: MenuItemInfo[] = [{
    path: 'login',
    element: <LoginIcon />,
    isPrivate: false,
    handler: handleClick,
  }, {
    path: 'signup',
    element: <PersonAddIcon />,
    isPrivate: false,
    handler: handleClick,
  }, {
    path: 'tweets',
    element: <ForumIcon />,
    isPrivate: true,
    handler: handleClick,
  }, {
    path: 'users',
    element: <PeopleIcon />,
    isPrivate: true,
    handler: handleClick,
  }, {
    path: 'tweet',
    element: <AddIcon />,
    isPrivate: true,
    handler: handleTweetAddClick,
  }, {
    path: 'logout',
    element: <LogoutIcon />,
    isPrivate: true,
    handler: handleLogoutClick,
  }];

  return (
    <List>
      {menuList
      .filter(({ isPrivate }) => !!auth === isPrivate)
      .map(({ path, element, handler }) => (
        <Tooltip
          title={path}
          placement='right-end'
          key={path}
        >
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={() => handler(path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={location.pathname === `/${path}`}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {element}
              </ListItemIcon>

              <ListItemText
                primary={path}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  )
}
