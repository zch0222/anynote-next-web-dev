'use client'
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import CardButton from "@/components/CardButton";
import {ContainerOutlined, EditOutlined} from "@ant-design/icons";
import CreateWikiForm from "@/components/wiki/CreateWikiForm";

import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

function DashboardHomeButtons() {

    const [isCreateWikiOpen, setIsCreateWikiOpen] = useState<boolean>(false)

    return (
        <div className="flex flex-row mt-3">
            <CardButton
                title="新建笔记"
                content="文档"
                clickEvent={() => console.log(1)}
                icon={<EditOutlined style={{fontSize: 20}}/>}
            />

            <CardButton
                title="新建知识库"
                content="知识库"
                clickEvent={() => setIsCreateWikiOpen(true)}
                icon={<ContainerOutlined style={{fontSize: 20}}/>}
            />
            <Modal
                isOpen={isCreateWikiOpen}
                onClose={() => setIsCreateWikiOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>
                        创建知识库
                    </ModalHeader>
                    <ModalBody>
                        <CreateWikiForm/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default withThemeConfigProvider(DashboardHomeButtons)
