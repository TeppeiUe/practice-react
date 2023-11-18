import { useState } from "react"
import {
  Stack,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { UserLoginForm } from "../models/user-params";
import {
  AuthCommunicationService
} from "../services/auth-communication-service";
import { useAuthContext } from "../services/auth-context-service";
import {
  ResponseState,
  useResponseContext
} from "../services/response-context-service";

/**
 * ログインコンポーネント
 */
export const LoginComponent = () => {

  // ログインデータ管理
  const [formData, setFormData] = useState<UserLoginForm>({
    email: '',
    password: '',
  });

  // パスワード表示・非表示状態管理
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useAuthContext();
  const { setResponse } = useResponseContext();

  /** ログインボタン押下イベント */
  const handleClick = () => {
    const authCommunicationService = new AuthCommunicationService();
    authCommunicationService.create(formData)
    .then(res => {
      setResponse(new ResponseState());
      setAuth(res);
    })
    .catch(e => {
      const responseState = authCommunicationService.getResponseState(e);
      if (responseState !== undefined) {
        setResponse(responseState);
      }
    });
  }

  /** パスワード表示・非表示切り替えボタン押下イベント */
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  /** フォーム入力データの変更イベント */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <Stack spacing={2} sx={{ m: 2 }}>

      {/* メールアドレスフォーム */}
      <FormControl variant="standard">
        <InputLabel>email*</InputLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      {/* パスワードフォーム */}
      <FormControl variant="standard">
        <InputLabel>password*</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          endAdornment={
            // パスワード表示・非表示切り替えボタン
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* ログインボタン */}
      <Button
        variant="contained"
        onClick={handleClick}
      >
        ログイン
      </Button>
    </Stack>
  )
}
