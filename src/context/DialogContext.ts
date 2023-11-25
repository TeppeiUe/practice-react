import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext
} from "react";

interface UseState<T=DialogState> {
  /** ダイアログ表示状態 */
  dialog: T;
  /** ダイアログ表示状態の設定 */
  setDialog: Dispatch<SetStateAction<T>>;
}

/**
 * ダイアログ表示状態
 */
export class DialogState {
  /** 表示コンテンツ */
  element: JSX.Element | null;
  /** ダイアログ表示 */
  open: boolean;

  constructor(
    element: JSX.Element | null = null,
    open: boolean = false,
  ) {
    this.element = element;
    this.open = open;
  }
}

/**
 * ダイアログ応答コンテクスト
 */
export const DialogContext = createContext<UseState>({
  dialog: new DialogState,
  setDialog: () => {},
});

/**
 * ダイアログ応答useContext
 */
export const useDialogContext = () => useContext(DialogContext);
