import React, { FormHTMLAttributes } from "react"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
};
export default function Form({
  children,
  ...props
}: FormProps) {
  return (
    <form {...props} onInvalid={(e) => {
    }}>
      {children}
    </form>
  )
}
