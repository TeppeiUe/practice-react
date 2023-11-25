import { useState } from "react"
import {
  Stack,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { axiosClient } from "../context/AxiosClient";
import { TweetAddForm } from "../models/tweet-params";
import { DialogState, useDialogContext } from "../context/DialogContext";

/**
 * ツイートフォームコンポーネント
 */
export const TweetFormComponent = () => {

  // ツイートデータ管理
  const [formData, setFormData] = useState<TweetAddForm>({
    message: '',
  });

  const { setDialog } = useDialogContext();

  /** ツイートボタン押下イベント */
  const handleClick = () => {
    axiosClient({
      url: 'tweet',
      method: 'post',
      data: formData,
    })
    .then(() => setDialog(new DialogState))
    .catch(e => console.error(e.stack));
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

      {/* メッセージフォーム */}
      <FormControl variant="standard">
        <InputLabel>message*</InputLabel>
        <Input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </FormControl>

      {/* ツイートボタン */}
      <Button
        variant="contained"
        onClick={handleClick}
      >
        ツイート
      </Button>
    </Stack>
  )
}
