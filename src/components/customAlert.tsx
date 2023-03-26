import { Snackbar, Alert, AlertColor } from "@mui/material"

export interface ICustomAlert {
    open: boolean;
    severity?: AlertColor;
    message?: string;
    duration?: number;
    handleClose?(): void;
}

export function CustomAlert({ open, severity = "info", message, duration = 3000, handleClose }: ICustomAlert) {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}