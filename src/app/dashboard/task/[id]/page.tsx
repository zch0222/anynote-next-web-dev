'use client'

import { Popover } from "antd";
import { Card, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Pagination from "@/components/Pagination";
import createPage from "@/components/hoc/createPage/createPage";
import useNoteTaskSubmissionsInfoList from "@/hooks/useNoteTaskSubmissionsInfoList";
import useAdminNoteTask from "@/hooks/useAdminNoteTask";
import Title from "@/components/Title";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import Loading from "@/components/Loading";
import TaskManageNoteEditChart from "@/components/task";
import {NoteTaskSubmissionInfo} from "@/types/noteTypes";
import NoteIcon from "@/components/svg/NoteIcon";
import { getDateString } from "@/utils/date";
import {useTheme} from "next-themes";
import {useState} from "react";
import {NOTE} from "@/constants/route";
import {EditOutlined, MoreOutlined} from "@ant-design/icons";
import {RED} from "@/constants/color";
import CardButton from "@/components/CardButton";
import useRouter from "@/hooks/useRouter";
import {CARD_BUTTON_ICON_FONT_SIZE} from "@/constants/size";
import MarkDownViewer from "@/components/MarkDownViewer";
import { returnTaskSubmission } from "@/requests/client/note/noteTask";
import { useDispatch } from "react-redux";
import { showMessage } from "@/store/message/messageSlice";

function SubmissionItem({ data }: {
    data: NoteTaskSubmissionInfo
}) {
    const {theme} = useTheme()
    const [isHovered, setIsHovered] = useState(false);
    const [isReturning, setIsReturning] = useState<boolean>(false)
    const [isRetunMoadalOpen, setIsReturnModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch()

    if (!data) {
        return <Loading/>
    }

    const hoveredBg = 'light' === theme ? 'bg-[#FAFAFA]' :  'bg-[#262626]'

    const moreContent = (
        <div className="flex flex-col w-[120px] select-none">
            <div
                className={`p-1 ${isHovered ? hoveredBg : ''} cursor-pointer`}
                style={{
                    color: RED
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    setIsReturnModalOpen(true)
                }}
            >
                退回
            </div>
        </div>
    )



    return (
        <>
            <div
                className={`flex flex-row justify-between items-center w-full p-2 cursor-pointer ${isHovered ? hoveredBg : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => window.open(`${NOTE}/${data.noteId}`)}
            >
                <div className="flex flex-row items-center">
                    <NoteIcon width={40} height={40}/>
                    <div className="flex flex-col ml-1">
                        <div>{data.noteTitle}</div>
                        <div className="text-sm text-gray-500">
                            <span className="font-bold mr-1">{data.submissionNickname}</span>
                            <span>{`提交时间: ${getDateString(new Date(data.submitTime))}`}</span>
                        </div>

                    </div>
                </div>
                <div
                    className="p-2"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <Popover
                        content={moreContent}
                        trigger="click"
                        overlayStyle={{
                            padding: 0
                        }}
                    >
                        <MoreOutlined
                            style={{
                                fontSize: 18
                            }}
                        />
                    </Popover>
                </div>
            </div>
            <Modal
                isOpen={isRetunMoadalOpen}
                onClose={() => {
                    setIsReturnModalOpen(false)
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">退回任务</ModalHeader>
                            <ModalBody>
                                确定要退回任务吗？退回后用户可以在任务时间内再次提交。
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button
                                    isLoading={isReturning}
                                    color="primary"
                                    onPress={() => {
                                        setIsReturning(true)
                                        returnTaskSubmission(data.id).then(res => {
                                            dispatch(showMessage({
                                                type: "success",
                                                content: "退回成功"
                                            }))
                                            onClose()
                                        }).catch((e) => console.log(e)).finally(() => {
                                            setIsReturning(false)
                                        })
                                    }}
                                >
                                    退回
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

function Task({params}: {
    params: {
        id: number
    }
}) {
    const { push } = useRouter()
    const {id} = params
    const { data } = useAdminNoteTask(id)

    return (
        <div className="w-full h-full flex flex-col p-5">
            <Title text={data === undefined ? "加载中..." : data.taskName}/>
            <div className="mb-2">
                <CardButton
                    icon={<EditOutlined style={{fontSize: CARD_BUTTON_ICON_FONT_SIZE}}/>}
                    title="编辑任务"
                    content="修改任务信息"
                    clickEvent={() => push({
                        pathname: `/dashboard/task/${id}/edit`,
                        params: [
                            {
                                key: "taskName",
                                value: data?.taskName || "",
                            },
                            {
                                key: "startTime",
                                value: encodeURI(data?.startTime || "")
                            },
                            {
                                key: "endTime",
                                value: encodeURI(data?.endTime || "")
                            }
                        ]
                    })}
                />
            </div>
            <TaskManageNoteEditChart noteTaskId={id}/>
            {data?.taskDescribe ?
                <Card
                    className="flex flex-col w-full p-2 max-h-[300px] overflow-y-auto"
                    radius="sm"
                >
                    <div className="text-xl font-bold mb-3">任务描述：</div>
                    <MarkDownViewer content={data.taskDescribe} />
                </Card>
                : <></>}
            <div className="flex-grow overflow-hidden">
                <Pagination
                    Page={createPage(SubmissionItem)}
                    swr={useNoteTaskSubmissionsInfoList}
                    params={{
                        noteTaskId: id
                    }}
                    direction="col"
                />
            </div>
        </div>
    )
}

export default withThemeConfigProvider(Task)