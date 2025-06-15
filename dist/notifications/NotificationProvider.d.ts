import React from "react";
import { ToastOptions } from 'react-hot-toast';
interface NotificationContextValue {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    loading: (message: string, options?: ToastOptions) => string;
    dismiss: (toastId?: string) => void;
    promise: <T>(promise: Promise<T>, messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
    }) => Promise<T>;
}
export declare const useNotifications: () => NotificationContextValue;
interface NotificationProviderProps {
    children: React.ReactNode;
}
export declare const NotificationProvider: React.FC<NotificationProviderProps>;
export {};
