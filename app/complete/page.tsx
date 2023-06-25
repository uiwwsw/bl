
"use client";

import { CookieJs } from "@/utils/cookie";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Complete() {
  useEffect(() => {
    if (CookieJs.get('step') !== '3') redirect('/')
  }, [])
  return (
    <main>
      <h1 className="text-3xl">
        {CookieJs.get('name')}님<br />
        회원가입 되었습니다.
      </h1>
      이메일: {CookieJs.get('email')}<br />
      주소: {CookieJs.get('address')}<br />
      연락처: {CookieJs.get('tel')?.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
    </main>
  )
}
