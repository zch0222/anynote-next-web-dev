'use client'

import {ItemType} from "antd/es/menu/hooks/useItems";
import KnowledgeBaseSVG from "@/components/svg/KnowledgeBaseSVG";
import {UserOutlined, HomeOutlined} from "@ant-design/icons";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {Menu} from "antd";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider"
import { DASHBOARD, WIKIS } from "@/constants/route";

function ManageSiderMenu() {

    const pathname = usePathname()

    const router = useRouter()

    const defaultSelectedKeys = () => {
        if (pathname.startsWith("/dashboard/wikis")) {
            return ['2']
        }
        else if (pathname.startsWith('/dashboard')) {
            return ['1']
        }
        return []
    }

    const menuItems: ItemType[] = [
        {
            key: '1',
            icon: <div className="w-[30px] mr-1"><HomeOutlined style={{fontSize: 25}} /></div>,
            label: (
                <div>
                    开始
                </div>
            ),
            onClick: () => {
                router.push(DASHBOARD)
            }
        },
        {
            key: '2',
            icon: <div className="w-[30px] mr-1"><KnowledgeBaseSVG width={25} height={25}/></div>,
            label: (
                <div>
                    知识库
                </div>
            ),
            onClick: () => {
                router.push(WIKIS)
            }
        }
    ]

    return (
        <Menu
            style={{
                border: "none !important"
            }}
            className="w-full flex-grow"
            mode="inline"
            items={menuItems}
            defaultSelectedKeys={defaultSelectedKeys()}
        />
    )
}

export default withThemeConfigProvider(ManageSiderMenu)
