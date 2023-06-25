"use client";
import Button from '@/components/Button';
import Card from '@/template/Card';
import Form from '@/components/Form';
import Input from '@/components/Input';
import { CookieJs } from '@/utils/cookie';
import { isName, isPassword, isPhone, isRequired, isSame} from '@/utils/validation';
import React, { useEffect, useState } from 'react'
import { Address,useDaumPostcodePopup } from 'react-daum-postcode';
import { redirect, useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  let password = '';
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const [address,setAddress] = useState('');
  const [step, setStep] = useState('');
  const handleComplete = (data: Address) => {
    setAddress(data.address)
  }
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  useEffect(() => {
    if (step === '0') CookieJs.clear();
    else if (step === '3') redirect('/complete')
    else setStep(CookieJs.get('step') ?? '0')
  }, [])
  return (
    <main>
      {step === '0' &&<Form onSubmit={(e:React.SyntheticEvent)=>{
        e.preventDefault();
        const target = e.target as typeof e.target & {
          email: HTMLInputElement;
          password: HTMLInputElement;
        };
        const step = '1';
        const email = target.email.value;
        const password = target.password.value;
        // if (password !== rePassword) return
        CookieJs.setObj([{key:'email',value: email}, {key: 'password', value: password}, {key:'step',value: step}])
        setStep(step);
      }} 
      // onInput={(e:React.SyntheticEvent) => {
      //   const target = e.target as typeof e.target & HTMLInputElement
      //   // // const email = target.email.value;
      //   // // const password = target.password.value;
      //   // // const rePassword = target.rePassword.value;
      //   target.setCustomValidity('');
      // }}
      >
        <Input required type="email" name="email" label="이메일" autoFocus/>
        <Input required type="password" label="비밀번호" validate={isPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => password = e.target.value} name="password"/>
        <Input required type="password" label="비밀번호 확인" validate={(val)=>isSame(val,password,'비밀번호가 일치하지 않습니다.')} name="rePassword"/>
        <Button>다음</Button>
      </Form>}
      {step === '1' &&<Form onSubmit={(e:React.SyntheticEvent)=>{
         e.preventDefault();
         const target = e.target as typeof e.target & {
           name: HTMLInputElement;
           tel: HTMLInputElement;
           address: HTMLInputElement;
         };
         const step = '2';
         const name = target.name.value;
         const tel = target.tel.value;
         const address = target.address.value;
         // if (password !== rePassword) return
         CookieJs.setObj([{key:'name',value: name}, {key: 'tel', value: tel.replace(/-/g,"")},{key:'address',value: address}, {key:'step',value: step}])
         setStep(step);
       }} >
        <Input required name="name" label="이름" validate={isName} />
        <Input required type="tel" name="tel" label="연락처" validate={isPhone} />
        <Input required value={address} type="address" name="address" label="주소" validate={isRequired} onClick={handleClick} onInput={handleClick}/>
        <Button>다음</Button>
      </Form>}
      {step === '2' &&<Form onSubmit={(e:React.SyntheticEvent)=>{
         e.preventDefault();
         let value = '';
         const target = e.target as typeof e.target & {
          card: HTMLInputElement[];
         };
         //  const name = target.name.value;
         //  const address = target.address.value;
         for(const c of target.card) {
          value += c.value;
         }
         // if (password !== rePassword) return
         CookieJs.setObj([{key:'card',value},{key:'step',value: '3',maxAge: Infinity}])
         router.push('/complete')
       }}>
        <Card name='card' required autoFocus/>
        <Button>다음</Button>
      </Form>}
      
    </main>
  )
}
