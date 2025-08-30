import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, X, ChevronUp, ChevronDown } from 'lucide-react';

interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    variant?: 'filled' | 'outlined' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    type?: 'text' | 'email' | 'password';
    showClearButton?: boolean;
    showPasswordToggle?: boolean;
    loading?: boolean;
    id?: string;
}

interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
    render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    value = '',
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    showClearButton = false,
    showPasswordToggle = false,
    loading = false,
    id,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isPassword = type === 'password' || showPasswordToggle;
    const actualType = isPassword && showPassword ? 'text' : type;
    const hasError = invalid || !!errorMessage;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
    };

    const handleClear = () => {
        const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
        setInternalValue('');
        onChange?.(syntheticEvent);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg'
    };

const variantClasses = {
    filled: `bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 ${hasError ? 'bg-red-50 border-red-300' : ''}`,
    outlined: `bg-white border border-gray-300 focus:border-blue-500 ${hasError ? 'border-red-500' : ''}`,
    ghost: `bg-transparent border border-transparent border-b-gray-300 rounded-none focus:border-b-blue-500 ${hasError ? 'border-b-red-500' : ''}`
};

const baseClasses = "w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20";
const disabledClasses = "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200";
const errorClasses = hasError ? "focus:ring-red-500 focus:ring-opacity-20" : "";

return (
    <div className="w-full">
        {label && (
        <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-2 ${hasError ? 'text-red-700' : 'text-gray-700'}`}
        >
            {label}
        </label>
    )}

        <div className="relative">
        <input
            id={inputId}
            type={actualType}
            value={onChange ? internalValue : value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            aria-invalid={hasError}
            aria-describedby={`${inputId}-helper ${inputId}-error`}
            className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${disabledClasses}
            ${errorClasses}
            ${variant !== 'ghost' ? 'rounded-lg' : ''}
            ${(showClearButton && internalValue) || isPassword ? 'pr-12' : ''}
        `}
        />

        {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
        )}

        {!loading && showClearButton && internalValue && !disabled && (
            <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear input"
            >
            <X size={18} />
            </button>
        )}
        {!loading && isPassword && (
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${showClearButton && internalValue ? 'right-10' : 'right-3'}`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        )}
    </div>

        {(helperText || errorMessage) && (
        <div className="mt-2">
            {errorMessage && (
            <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
                {errorMessage}
            </p>
            )}
            {helperText && !errorMessage && (
            <p id={`${inputId}-helper`} className="text-sm text-gray-500">
                {helperText}
            </p>
        )}
        </div>
    )}
    </div>
);
}

export default InputField;