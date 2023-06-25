import { isValidCard, validator } from "@/utils/validation";
import React, { InputHTMLAttributes, useCallback, useMemo, useRef, useState } from "react"

interface CardProps extends InputHTMLAttributes<HTMLInputElement> {
    validate?: (value: string) => string | void
    label?: string;
    value?: string;
};
export default function Card({
    label,
    type,
    id,
    value,
    autoFocus,
    validate,
    ...props
}: CardProps): React.JSX.Element {
    const inp1 = useRef<HTMLInputElement>(null);
    const inp2 = useRef<HTMLInputElement>(null);
    const inp3 = useRef<HTMLInputElement>(null);
    const inp4 = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');
    const memoInputs = useMemo(() => {
        return [inp1, inp2, inp3, inp4]
    }, [])
    const memoValues = useMemo(() => [
        value?.slice(0, 4),
        value?.slice(4, 8),
        value?.slice(8, 12),
        value?.slice(12, 16),
    ], [value])
    const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 4) {
            let value = '';
            for (const inp of memoInputs) {
                value += inp.current?.value;
                if (inp.current?.value.length !== 4) {
                    inp.current?.focus();
                    break;
                }
            }
            validator({
                event, setMessage,
                validate: isValidCard,
                value
            })
        }

    }, [memoInputs])

    return (
        <label htmlFor={id} className="block my-5">
            <span className="text-2xl">{label}</span>
            <div className="flex space-x-2">
                <input className="border w-full rounded-sm p-2 mt-2" value={memoValues[0]} ref={inp1} type='text' maxLength={4} autoFocus={autoFocus} onInput={handleInput} {...props} />
                <input className="border w-full rounded-sm p-2 mt-2" value={memoValues[1]} ref={inp2} type='text' maxLength={4} onInput={handleInput} {...props} />
                <input className="border w-full rounded-sm p-2 mt-2" value={memoValues[2]} ref={inp3} type='text' maxLength={4} onInput={handleInput} {...props} />
                <input className="border w-full rounded-sm p-2 mt-2" value={memoValues[3]} ref={inp4} type='text' maxLength={4} onInput={handleInput} {...props} />
            </div>
            <span className="text-red-500 text-sm">{message}</span>
        </label>
    )
}
