import { forwardRef } from "react";

interface AuthInputProps {
    disabled: boolean
    type: string
    error: { success: boolean, message: string } | null
    successIcon: JSX.Element
    failureIcon: JSX.Element
    placeholder: string
    id: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({
    disabled,
    type,
    error,
    successIcon,
    failureIcon,
    placeholder,
    id
}, ref) => (
    <>
        {error && error.message.includes(type) ? (
            <div className="flex flex-col pt-4">
                <label className="text-danger-dark font-semibold">{error.message}</label>
                <div className="flex relative">
                    <span className="px-3 inline-flex items-center shadow-sm text-sm border-t border-l border-b bg-gray-700 border-gray-500 text-gray-500">{failureIcon}</span>
                    <input className="flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-gray-800 text-white-700 placeholder-gray-400 shadow-sm text-base focus:border-greenish-light focus:outline-none" ref={ref} disabled={disabled} required type={type} id={id} placeholder={placeholder} />
                </div>
            </div>
        ) : (
            <div className="flex flex-col pt-4">
                <div className="flex relative">
                    <span className="px-3 inline-flex items-center shadow-sm text-sm border-t border-l border-b bg-gray-700 border-gray-500 text-gray-500">{successIcon}</span>
                    <input className="flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-gray-800 text-white-700 placeholder-gray-400 shadow-sm text-base focus:border-greenish-light focus:outline-none" ref={ref} disabled={disabled} required type={type} id={id} placeholder={placeholder} autoComplete="on" minLength={type === 'password' ? 6 : 0} />
                </div>
            </div>
        )}
    </>
));