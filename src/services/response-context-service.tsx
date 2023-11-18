import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

interface UseState<T> {
  response: T;
  setResponse: Dispatch<SetStateAction<T>>;
}

/**
 * レスポンスの状態
 */
class ResponseState {
  open: boolean = true;
  message: string = 'success';
  severity: 'success' | 'error' = 'success';
}

const ResponseContext = createContext<UseState<ResponseState>>({
  response: new ResponseState(),
  setResponse: () => {},
});

const ResponseContextProvider = ({ children }: { children: ReactNode }) => {
  const responseDefault = new ResponseState();
  responseDefault.open = false;
  const [response, setResponse] = useState<ResponseState>(responseDefault);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  )
}

const useResponseContext = () => useContext(ResponseContext);

export {
  ResponseState,
  useResponseContext,
  ResponseContextProvider,
}
