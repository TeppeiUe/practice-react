import { ReactNode, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { axiosClient } from "../context/AxiosClient";
import { isCancel } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { DialogState, useDialogContext } from "../context/DialogContext";

/**
 * スナックバーの表示状態
 */
class ResponseState {
  /** スナックバーを表示するか */
  open: boolean = true;
  /** メッセージ */
  message: string = 'success';
  /** Alertのseverityプロパティ */
  severity: 'success' | 'error' = 'success';
}

/**
 * Axiosインスタンスプロバイダー
 */
export const AxiosClientProvider = ({ children }: { children: ReactNode }) => {

  const navigate = useNavigate();
  const { setAuth } = useAuthContext();
  const { setDialog } = useDialogContext();

  const responseDefault = new ResponseState();
  responseDefault.open = false;

  const [response, setResponse] = useState<ResponseState>(responseDefault);
  const { open, message, severity } = response;

  useEffect(() => {
    // リクエストログを設定
    const requestInterceptor = axiosClient.interceptors.request.use(
      req => {
        const { data, params, url } = req;
        console.log(
          `[request] url=[${url}], ` +
          `params=[${JSON.stringify(params) ?? ''}], ` +
          `data=[${JSON.stringify(data) ?? ''}]`
        );
        return req;
      },
      e => {
        console.error(`[request] ${e}`);
        return Promise.reject(e);
      }
    );

    // レスポンスログを設定
    const responseInterceptor = axiosClient.interceptors.response.use(
      res => {
        const { data, status, statusText, config } = res;
        console.log(`[response] status=[${status} ${statusText}], ` +
          `body=[${data ? JSON.stringify(data) : ''}]`
        );

        // getメソッド以外の場合スナックバーを表示
        if (config.method !== 'get') {
          setResponse(new ResponseState());
        }

        return res;
      },
      e => {
        if (e.isAxiosError && !isCancel(e)) {
          const { data, status, statusText } = e.response;
          console.log(
            `[response] status=[${status} ${statusText}], ` +
            `body=[${JSON.stringify(data)}]`
          );

          // 非ログインの場合
          if (status === 401) {
            setAuth(null);
            setDialog(new DialogState);
            navigate('/login');
          }

          // エラー内容のスナックバーを表示
          if(data?.message !== undefined) {
            const responseState = new ResponseState();
            responseState.severity = 'error';
            responseState.message = data.message;
            setResponse(responseState);
          }
        }

        return Promise.reject(e);
      }
    );

    // クリーンアップ
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptor);
      axiosClient.interceptors.response.eject(responseInterceptor);
    }

  }, []);

  /** スナックバー非表示用ハンドラ */
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setResponse({ ...response, open: false });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={severity === 'error' ? null : 6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          severity={severity}
          sx={{ width: '100%', whiteSpace: 'pre-line' }}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}
