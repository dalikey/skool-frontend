import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import create from 'zustand';

type ConfirmDialogStore = {
    title: string;
    message: string;
    onSubmit?: () => void;
    close: () => void;
};

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
    title: '',
    message: '',
    onSubmit: undefined,
    close: () =>
        set({
            onSubmit: undefined,
        }),
}));

export const confirmDialog = (
    title: string,
    message: string,
    onSubmit: () => void
) => {
    useConfirmDialogStore.setState({
        title,
        message,
        onSubmit,
    });
};

const ConfirmDialog = () => {
    const { title, message, onSubmit, close } = useConfirmDialogStore();

    return (
        <Dialog
            open={Boolean(onSubmit)}
            onClose={close}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Annuleren</Button>
                <Button
                    onClick={() => {
                        onSubmit?.();
                        close();
                    }}
                    color='primary'
                    variant='contained'
                    autoFocus
                >
                    Bevestigen
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
