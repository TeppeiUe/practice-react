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

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    user_name: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    console.dir(formData);
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <FormControl variant="standard">
        <InputLabel>email*</InputLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel>user_name*</InputLabel>
        <Input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel>password*</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          endAdornment={
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

      <Button
        variant="contained"
        onClick={handleClick}
      >
        新規登録
      </Button>
    </Stack>
  )
}

export {
  SignUp,
}
