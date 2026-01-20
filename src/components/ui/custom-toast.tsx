// components/ui/custom-toast.tsx
'use client';

import { Toaster as SonnerToaster, ToastT, toast as sonnerToast } from 'sonner';
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';

// Custom toast types
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  title: string;
  description?: string;
  type?: ToastType;
}

// Custom toast function
export const toast = ({ title, description, type = 'info' }: ToastProps) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-rose-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  };

  const bgColors = {
    success: 'border-emerald-100 bg-emerald-50',
    error: 'border-rose-100 bg-rose-50',
    info: 'border-blue-100 bg-blue-50',
    warning: 'border-amber-100 bg-amber-50',
  };

  return sonnerToast.custom(
  (id: string | number) => (
    <div
      className={`${bgColors[type]} border-l-4 ${
        type === 'success'
          ? 'border-l-emerald-500'
          : type === 'error'
          ? 'border-l-rose-500'
          : type === 'warning'
          ? 'border-l-amber-500'
          : 'border-l-blue-500'
      } rounded-lg p-4 shadow-lg w-full max-w-md`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icons[type]}</div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 text-sm mt-1">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => sonnerToast.dismiss(id)}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar (static duration) */}
      <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            type === 'success'
              ? 'bg-emerald-500'
              : type === 'error'
              ? 'bg-rose-500'
              : type === 'warning'
              ? 'bg-amber-500'
              : 'bg-blue-500'
          }`}
          style={{
            animation: 'shrink 5000ms linear forwards',
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  ),
  {
    duration: 5000,
  }
);
};


toast.success = (title: string, description?: string) => 
  toast({ title, description, type: 'success' });

toast.error = (title: string, description?: string) => 
  toast({ title, description, type: 'error' });

toast.info = (title: string, description?: string) => 
  toast({ title, description, type: 'info' });

toast.warning = (title: string, description?: string) => 
  toast({ title, description, type: 'warning' });

// Toaster component
export function CustomToaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      expand={true}
      richColors={false}
      visibleToasts={3}
      gap={12}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: '!p-0 !bg-transparent !shadow-none',
        },
      }}
    />
  );
}