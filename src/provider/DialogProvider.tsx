import { ReactNode, useState } from "react"
import { DialogContext, DialogState } from "../context/DialogContext";

/**
 * ダイアログ応答コンテクストプロバイダー
 */
export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState(new DialogState);

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  )
}
