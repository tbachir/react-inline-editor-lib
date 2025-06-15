import React from "react";

import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import { CheckCircle, AlertCircle, XCircle, Info, LucideProps } from 'lucide-react';

interface NotificationContextValue {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  loading: (message: string, options?: ToastOptions) => string;
  dismiss: (toastId?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => Promise<T>;
}

const NotificationContext = React.createContext<NotificationContextValue | null>(null);

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

const CustomToast = ({ 
  type, 
  message, 
  icon: Icon 
}: { 
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}) => (
  <div className={`
    flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md border
    ${type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' : ''}
    ${type === 'error' ? 'bg-red-50/90 border-red-200 text-red-800' : ''}
    ${type === 'warning' ? 'bg-amber-50/90 border-amber-200 text-amber-800' : ''}
    ${type === 'info' ? 'bg-blue-50/90 border-blue-200 text-blue-800' : ''}
    transition-all duration-300 ease-out
  `}>
    <Icon size={20} className={`
      ${type === 'success' ? 'text-emerald-600' : ''}
      ${type === 'error' ? 'text-red-600' : ''}
      ${type === 'warning' ? 'text-amber-600' : ''}
      ${type === 'info' ? 'text-blue-600' : ''}
    `} />
    <span className="font-medium text-sm">{message}</span>
  </div>
);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const success = (message: string, options?: ToastOptions) => {
    toast.custom(
      <CustomToast type="success" message={message} icon={CheckCircle} />,
      {
        duration: 4000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.custom(
      <CustomToast type="error" message={message} icon={XCircle} />,
      {
        duration: 6000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.custom(
      <CustomToast type="warning" message={message} icon={AlertCircle} />,
      {
        duration: 5000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.custom(
      <CustomToast type="info" message={message} icon={Info} />,
      {
        duration: 4000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const loading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        color: '#374151',
        fontWeight: '500',
        fontSize: '14px',
      },
      ...options,
    });
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, messages, {
      position: 'top-right',
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        fontWeight: '500',
        fontSize: '14px',
      },
      success: {
        style: {
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#065f46',
        },
      },
      error: {
        style: {
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#991b1b',
        },
      },
    });
  };

  const value: NotificationContextValue = {
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 80,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            color: '#374151',
            fontWeight: '500',
            fontSize: '14px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        }}
      />
    </NotificationContext.Provider>
  );
};