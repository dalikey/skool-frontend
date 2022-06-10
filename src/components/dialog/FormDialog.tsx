import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import create from 'zustand';
import { ReactNode } from 'react';

type FormDialogStore = {
    title: string;
    children: ReactNode;
    open: boolean;
    close: () => void;
};

export const formDialog = (title: string, children: ReactNode) => {
    useFormDialogStore.setState({
        title,
        children,
        open: true,
    });
};

export const useFormDialogStore = create<FormDialogStore>((set) => ({
    title: '',
    children: <></>,
    open: false,
    close: () =>
        set({
            open: false,
        }),
}));

const FormDialog = () => {
    const { title, children, open } = useFormDialogStore();

    return (
        <Dialog open={open} maxWidth={false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default FormDialog;
