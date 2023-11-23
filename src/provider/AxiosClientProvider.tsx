import { ReactNode, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { axiosClient } from "../context/AxiosClient";

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
          `[request success] url=[${url}], ` +
          `params=[${JSON.stringify(params) ?? ''}], ` +
          `data=[${JSON.stringify(data) ?? ''}]`
        );
        return req;
      },
      e => {
        console.error(`[request failure] ${e}`);
        return Promise.reject(e);
      }
    );

    // レスポンスログを設定
    const responseInterceptor = axiosClient.interceptors.response.use(
      res => {
        console.log(`[response success] ${JSON.stringify(res.data)}`);
        if (res.config.method !== 'get') {
          setResponse(new ResponseState());
        }
        return res;
      },
      e => {
        console.error(`[response failure] ${e}`);
        if(e?.response?.data !== undefined) {
          const { message } = e.response.data;
          const responseState = new ResponseState();
          responseState.severity = 'error';
          responseState.message = message;
          setResponse(responseState);
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
