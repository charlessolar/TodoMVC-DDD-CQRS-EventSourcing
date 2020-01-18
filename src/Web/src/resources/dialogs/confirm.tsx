import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

interface ConfirmProps {
    className?: string;
    open: boolean;
    title: string;
    description: string;

    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationDialog = (props: ConfirmProps) => {
    const {
        className,
        open,
        title,
        description,
        onConfirm,
        onCancel,
        ...rest
    } = props;

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="alert-dialog-description"
            open={open}
        >
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onConfirm()} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};
