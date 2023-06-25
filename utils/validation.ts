import { FormEvent } from "react";

// export function validator(e: FormEvent<HTMLInputElement>, setMessage:(val: React.SetStateAction<string>) => void,validation?: (val:string) => string | void, value?:string) {
//     const target = e.target;
//     if (target instanceof HTMLInputElement) {
//         const message = validation ? validation(value ?? target.value) : target.validationMessage;
//         setMessage(message ?? '');
//         if (validation) target.setCustomValidity(message ?? '');
//         target.reportValidity();
//     }
// }
export function validator({
    event, 
    setMessage,
    validate, 
    value
}: {
    event: FormEvent<HTMLInputElement>,
    setMessage: (val: React.SetStateAction<string>) => void,
    validate?: (val:string) => (string | void), 
    value?: string
}) {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
        const message = validate ? validate(value ?? target.value) : target.validationMessage;
        setMessage(message ?? '');
        if (validate) target.setCustomValidity(message ?? '');
        target.reportValidity();
    }
}

export function isRequired(val: string) {
    if(val.length < 1) return '입력해주세요';
}
export function isPhone(val:string) {
    if(!/^01([0-9]{0,1})(-| )?([0-9]{3,4})(-| )?([0-9]{4})$/.test(val)) return '연락처 형식을 확인해주세요.'
  }
export function isName(val:string) {
    if(!/^[가-힣]{2,}$|^[a-zA-Z]{3,}$/.test(val)) return '2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳일 것'
  }
export function isSame(val:string, other: string, message: string) {
    if (other !== val) return message
}
export function isPassword(val:string) {
    if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(val)) return '영문 숫자 특수기호 포함 8자리'
}
export function isValidCard(val:string) {
    if (val.length === 16) {
        return +(val.split('').reduceRight((acc,val,i) => {
            if (i % 2) return +acc + +val;
            return (+val * 2).toString().split('').reduce((a,v) => +a + +v,0)+acc
        },0)) % 10 === 0 ? '' : '카드 번호가 뭔가 수상함'
    }
    if (val.length % 4 !== 0) return '4자리씩 16개의 카드 번호를 적어주세요'
}