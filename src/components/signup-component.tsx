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
import { UserAddForm, UserBase } from "../models/user-params";
import { useAuthContext } from "../context/AuthContext";
import { axiosClient } from "../context/AxiosClient";

/**
 * 新規登録コンポーネント
 */
export const SignupComponent = () => {

  // 新規登録データ管理
  const [formData, setFormData] = useState<UserAddForm>({
    email: '',
    user_name: '',
    password: '',
  });

  // パスワード表示・非表示状態管理
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useAuthContext();

  /** 新規登録ボタン押下イベント */
  const handleClick = () => {
    axiosClient<UserBase>({
      url: 'user',
      method: 'post',
      data: formData,
    })
    .then(res => setAuth(res.data))
    .catch(e => console.error(e.stack));
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

      {/* ユーザ名フォーム */}
      <FormControl variant="standard">
        <InputLabel>user_name*</InputLabel>
        <Input
          type="text"
          name="user_name"
          value={formData.user_name}
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

      {/* 新規登録ボタン */}
      <Button
        variant="contained"
        onClick={handleClick}
      >
        新規登録
      </Button>
    </Stack>
  )
}
