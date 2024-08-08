"use client";

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                action,
                icon,
                ...props
            }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            <div className="flex gap-2 items-center">
                                {icon && <div>{icon}</div>}
                                {title && <ToastTitle>{title}</ToastTitle>}
                            </div>
                            {description && (
                                <ToastDescription className={icon ? "ml-7" : ""}>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
