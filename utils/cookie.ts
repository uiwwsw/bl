
export class CookieJs {
    static set({ key, value, path = '/', maxAge = 3600 }: { key: string, value: string, path?: string, maxAge?: number }) {
        document.cookie = `${key}=${value};path=${path};max-age=${maxAge}`
    }
    static setObj(params: { key: string, value: string, path?: string, maxAge?: number }[]) {
        params.forEach((param) => {
            CookieJs.set({
                key: param.key,
                value: param.value,
                path: param.path,
                maxAge: param.maxAge
            })
        })
    }

    static get(key: string) {
        if (typeof window === "undefined") return '';
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;

    }

    static remove(key: string) {
        CookieJs.set({
            key,
            value: '',
            maxAge: 0
        });
    }
    static clear() {
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;max-age=0;path=/"); });
    }
}
