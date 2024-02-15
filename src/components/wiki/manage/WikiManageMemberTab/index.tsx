'use client'
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import createPage from "@/components/hoc/createPage/createPage";
import Pagination from "@/components/Pagination";
import useKnowledgeBaseMemberList from "@/hooks/useKnowledgeBaseMemberList";
import { importUsers } from "@/requests/client/note/knowledgeBase";
import {KnowledgeBaseMember} from "@/types/noteTypes";
import {UserOutlined} from "@ant-design/icons";
import {useTheme} from "next-themes";
import {useState} from "react";
import { Button, Link } from "@nextui-org/react";

function MemberItem({ data }: {
    data: KnowledgeBaseMember
}) {
    const {theme} = useTheme()
    const [isHovered, setIsHovered] = useState(false);
    const hoveredBg = 'light' === theme ? 'bg-[#FAFAFA]' :  'bg-[#262626]'

    return (
        <div
            className={`w-full flex flex-row items-center justify-between p-2 ${isHovered ? hoveredBg : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-row items-center">
                <div>
                    <UserOutlined
                        style={{
                            fontSize: 30
                        }}
                    />
                </div>
                <div className="flex flex-col ml-2">
                    <div className="text-base font-bold">
                        {data.nickname}
                    </div>
                    <div className="text-sm text-gray-500">
                        {data.username}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )

}

function WikiManageMemberTab({ id }: {
    id: number
}) {



    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-row items-center w-full">
                <Button
                    className="text-white mr-2"
                    color="primary"
                    href="https://anynote.obs.cn-east-3.myhuaweicloud.com/anynote_%20Shanghai/knowledge_base/files/import_user_template.xls"
                    as={Link}
                >
                    下载导入模板
                </Button>
                <Button
                    className="text-white"
                    color="primary"
                >
                    导入用户
                </Button>
            </div>
            <div className="flex-grow overflow-hidden">
                <Pagination
                    Page={createPage(MemberItem)}
                    swr={useKnowledgeBaseMemberList}
                    params={{
                        knowledgeBaseId: id
                    }}
                    direction={'col'}
                />
            </div>
        </div>
    )
}

export default withThemeConfigProvider(WikiManageMemberTab)