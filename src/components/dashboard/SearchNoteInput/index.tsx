'use client'
import {Input, Modal, ModalContent, ModalBody, ModalHeader} from "@nextui-org/react";
import { SearchOutlined } from "@ant-design/icons";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import { useState } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import useNoteSearchList from "@/hooks/useNoteSearchList";
import {SearchVO} from "@/types/requestTypes";
import { NoteSearchSource, NoteSearchHighlight } from "@/types/noteTypes";
import NoteIcon from "@/components/svg/NoteIcon";
import {useTheme} from "next-themes";
import { useRouter } from "next/navigation";
import { NOTE } from "@/constants/route";
import {Chip} from "@nextui-org/chip";

function SearchItem({ data }: {
    data: SearchVO<NoteSearchHighlight, NoteSearchSource>
}) {

    const {theme} = useTheme()
    const router = useRouter()

    const [isHovered, setIsHovered] = useState(false);
    const hoveredBg = 'light' === theme ? 'bg-[#FAFAFA]' :  'bg-[#262626]'

    const getPermissions = (notePermissions: number) => {
        if (7 === notePermissions) {
            return <Chip size="sm" color="primary">管理</Chip>
        }
        else if (6 === notePermissions) {
            return <Chip size="sm" color="secondary">编辑</Chip>
        }
        else if (4 == notePermissions) {
            return <Chip size="sm" color="warning">阅读</Chip>
        }
        else {
            return <Chip size="sm" color="default">无权限</Chip>
        }
    }

    return (
        <div
            className={`flex flex-row items-center p-2 cursor-pointer ${isHovered ? hoveredBg : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push(`${NOTE}/${data.source.id}`)}
        >
            <div className="mr-3">
                <NoteIcon width={30} height={35}/>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    {data.highlight.title !== undefined ?
                        <div className="mr-1" dangerouslySetInnerHTML={{__html: data.highlight.title}}/> :  <div className="mr-1">{data.source.title}</div>}
                    <div className="text-white">
                        {getPermissions(data.source.permissions)}
                    </div>
                </div>
                {data.highlight.content?.map((item, index) => (
                    <div key={index} className="text-default-500 text-sm">
                        {item !== undefined ?
                            <div dangerouslySetInnerHTML={{__html: item}}/> : <></>}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Search() {

    const [keyword, setKeyword] = useState("")


    return (
        <div className="flex flex-col">
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                size="sm"
                placeholder="请输入关键词"
                startContent={<SearchOutlined style={{fontSize: 18}}/>}
            />
            { keyword !== "" ?
                <InfiniteScroll
                    swr={useNoteSearchList}
                    params={{
                        keyword: keyword
                    }}
                    Item={SearchItem}
                /> : <></>}
        </div>

    )
}

function SearchNoteInput() {

    const [isOpenSearch, setIsOpenSearch] = useState(false)

    return (
        <div
            className="p-2"
            onClick={() => setIsOpenSearch(true)}
        >
            <Input
                className="cursor-pointer"
                classNames={{
                    innerWrapper: [
                        "cursor-pointer"
                    ],
                    input: [
                        "cursor-pointer"
                    ]
                }}
                size="sm"
                startContent={<SearchOutlined style={{fontSize: 18}}/>}
                placeholder="搜索"
            />
            <Modal
                isOpen={isOpenSearch}
                onClose={() => {
                    setIsOpenSearch(false)
                }}
                onOpenChange={(isOpen) => {
                    console.log(isOpen)
                    setIsOpenSearch(false)
                }}
                // hideCloseButton={true}
                backdrop="blur"
                placement="top"
            >
                <ModalContent>
                    <ModalHeader>
                        搜索
                    </ModalHeader>
                    <ModalBody
                        className="p-0"
                    >
                        <Search/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default withThemeConfigProvider(SearchNoteInput)
