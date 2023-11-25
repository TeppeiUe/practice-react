import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogState, useDialogContext } from '../../context/DialogContext';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ダイアログコンポーネント
 */
export const DialogComponent = () => {
  const { dialog, setDialog } = useDialogContext();
  const { open, element } = dialog;

  /** 閉じるボタン押下イベント */
  const handleClose = () => setDialog(new DialogState);

  return (
    <Dialog open={open} onClose={handleClose}>

      {/* 閉じるボタン */}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* 表示コンテンツ */}
      <DialogContent>{element}</DialogContent>
    </Dialog>
  );
}
