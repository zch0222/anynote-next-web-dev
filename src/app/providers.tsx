// app/providers.tsx
'use client'
import {useRouter} from 'next/navigation'
import { Provider } from "react-redux";
import store from "@/store";
import { ThemeProvider } from 'next-themes';
import AntdRegistry from "@/lib/AntdRegistry";
import { ThemeProviderProps } from "next-themes/dist/types";
import React from "react";
import {ConfigProvider} from "antd";
import {NextUIProvider} from "@nextui-org/react";


export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()

    return (
        <Provider store={store}>
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        token: {
                            // Seed Token，影响范围大
                            colorPrimary: '#01B96B',
                        },
                    }}
                >
                    <NextUIProvider navigate={router.push}>
                        <ThemeProvider {...themeProps}>
                            {children}
                        </ThemeProvider>
                    </NextUIProvider>
                </ConfigProvider>
            </AntdRegistry>
        </Provider>
    )
}

// export const Providers = withRedux(({ children, themeProps }: ProvidersProps) => {
//     const { theme, setTheme } = useTheme()
//     const globalTheme = useSelector((state: RootState) => state.theme)
//     const router = useRouter();
//
//     useEffect(() => {
//         console.log(globalTheme)
//         setTheme(globalTheme)
//     }, [globalTheme])
//
//     console.log(themeProps)
//     return (
//         <AntdRegistry>
//             <ThemeProvider {...themeProps}>
//                 <ConfigProvider
//                     theme={{
//                         token: {
//                             // Seed Token，影响范围大
//                             colorPrimary: '#01B96B',
//                         },
//                     }}
//                 >
//                     {children}
//                 </ConfigProvider>
//             </ThemeProvider>
//         </AntdRegistry>
//     )
// })

