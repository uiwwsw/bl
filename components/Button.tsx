import React, { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
};
export default function Button({
    children,
    ...props
}: ButtonProps) {
    return (
        <button className="block border text-2xl w-full bg-orange-500 text-white p-4 rounded-md" {...props}>
            {children}
        </button>
    )
}
