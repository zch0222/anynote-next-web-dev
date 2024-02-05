import { useSearchParams as useNextSearchParams, useRouter as useNextRouter, usePathname } from "next/navigation";


export default function useRouter() {
    const searchParams = useNextSearchParams();
    const router = useNextRouter();
    const pathname = usePathname();

    function setSearchParams(params:  {key: string, value: string}[], type: 'push' | 'replace' = 'replace') {
        const newParams = new URLSearchParams(searchParams.toString())
        params.forEach(({key, value}) => {
            console.log(`key: ${key}, value: ${value}`)
            newParams.set(key, value)
        })
        if (type === 'push') {
            router.push(`${pathname}?${newParams.toString()}`)
        }
        else {
            router.replace(`${pathname}?${newParams.toString()}`)
        }
    }

    return {
        router: router,
        pathname: pathname,
        searchParams: searchParams,
        setSearchParams: setSearchParams
    }
}