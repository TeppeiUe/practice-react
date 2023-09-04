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
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AuthCommunicationService
} from '../../services/auth-communication-service';
import { ErrorResponse } from '../../models/shared-params';
import { useAuthContext } from '../../services/auth-context-service';
import {
  ResponseState,
  useResponseContext
} from '../../services/response-context-service';

/**
 * メニューに表示する情報の定義
 */
interface MenuItemInfo {
  /** 遷移パス */
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
  const { setResponse } = useResponseContext();

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
    const authCommunicationService = new AuthCommunicationService();
    authCommunicationService.destroy()
    .then(() => {
      setResponse(new ResponseState());
      setAuth(null);
      navigate('/login');
    })
    .catch(e => {
      if (e !== undefined) {
        const { message } = e.data as ErrorResponse;
        const responseState = new ResponseState();
        responseState.severity = 'error';
        responseState.message = message;
        setResponse(responseState);
      }
    });
  }

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
