import { validator } from "@/utils/validation";
import React, { InputHTMLAttributes, useState } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    validate?: (value: string) => (string | void)
    label?: string;
};
export default function Input({
    label,
    type,
    id,
    validate,
    ...props
}: InputProps) {
    const [message, setMessage] = useState('');
    return (
        <label htmlFor={id} className="block my-5">
            <span className="text-2xl">{label}</span>
            <input className="border w-full rounded-sm p-2 mt-2" type={type ?? 'text'} id={id} {...props} onInput={($event) => validator({ event: $event, setMessage, validate })} />
            <span className="text-red-500 text-sm">{message}</span>
        </label>
    )
}
