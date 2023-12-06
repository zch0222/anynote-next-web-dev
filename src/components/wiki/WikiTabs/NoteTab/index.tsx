'use client'
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { useTheme } from "next-themes";
import {useRouter} from "next/navigation";

import useNoteList from "@/hooks/useNoteList";

import createPage from "@/components/hoc/createPage/createPage";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

import NoteIcon from "@/components/svg/NoteIcon";
import { NoteInfo } from "@/types/noteTypes";
import Pagination from "@/components/Pagination";
import { NOTE } from "@/constants/route";

function NoteItem({ data }: {
    data: NoteInfo
}) {
    const router = useRouter()

    const [isHovered, setIsHovered] = useState(false);
    const {theme} = useTheme()

    const hoveredBg = 'light' === theme ? 'bg-[#FAFAFA]' :  'bg-[#262626]'

    const getPermissions = (notePermissions: number) => {
        if (7 === notePermissions) {
            return <Chip color="primary">管理</Chip>
        }
        else if (6 === notePermissions) {
            return <Chip color="secondary">编辑</Chip>
        }
        else if (4 == notePermissions) {
            return <Chip color="warning">阅读</Chip>
        }
        else {
            return <Chip color="default">无权限</Chip>
        }
    }

    return (
        <div
            className={`flex flex-row items-center w-full justify-between p-2 cursor-pointer border-b ${isHovered ? hoveredBg : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push(`${NOTE}/${data.id}`)}
        >
            <div className="flex flex-row items-center">
                <div className="mr-2">
                    <NoteIcon
                        width={24}
                        height={45}
                    />
                </div>
                <div className="select-none">
                    {data.title}
                </div>
            </div>
            <div className="text-white">
                {getPermissions(data.notePermissions)}
            </div>
        </div>
    )

}

function NoteTab({ knowledgeBaseId }: {
    knowledgeBaseId: number
}) {


    return (
        <div className="mt-2">
            <Pagination
                direction="col"
                Page={createPage(NoteItem)}
                swr={useNoteList}
                params={{
                    knowledgeBaseId: knowledgeBaseId
                }}
            />
        </div>
    )
}

export default withThemeConfigProvider(NoteTab)
