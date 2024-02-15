'use client'
import {Form, Input, DatePicker, Button, Select} from "antd"
import type { SelectProps } from 'antd'
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import React, {useMemo, useState, useRef, useEffect} from "react";
import { BaseSelectRef } from "rc-select";
import dayjs, {Dayjs} from 'dayjs';
import useRouter from "@/hooks/useRouter";
import { PRIMARY_COLOR } from "@/constants/color";
import {createDayjs} from "@/utils/date";
import { getKnowledgeBases } from "@/requests/client/note/knowledgeBase";
import { useDispatch } from "react-redux";
import {showMessage} from "@/store/message/messageSlice";
import useNoteKnowledgeBaseList from "@/hooks/useNoteKnowledgeBaseList";
import { isNotNull } from "@/utils/objectUtil";

const {RangePicker} = DatePicker;

export interface TaskFormType {
    taskName: string,
    startTime: Dayjs,
    endTime: Dayjs,
    knowledgeBaseId: number
}

function TaskForm({ onFinish }: {
    onFinish: (value: TaskFormType) => Promise<void>
}) {
    const dispatch = useDispatch()

    const { searchParams } = useRouter()
    const [taskForm, setTaskForm] = useState<{
        id: number,
        taskName: string,
        startTime: Dayjs,
        endTime: Dayjs,
        knowledgeBaseId: number
    }>({
        id: parseInt(searchParams.get("id") || "0"),
        taskName: searchParams.get("taskName") || "",
        startTime: createDayjs(searchParams.get("startTime")),
        endTime: createDayjs(searchParams.get("endTime")),
        knowledgeBaseId: parseInt(searchParams.get("knowledgeBaseId") || "0")
    });
    const [baseOptions, setBaseOptions] = useState<{label: string, value: number}[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const basesPageRef = useRef<{
        page: number,
        pageSize: number,
        total: number
    }>({
        page: 0,
        pageSize: 100,
        total: 1
    })

    const selectBasesRef = useRef<any>()

    const getBaseList = async ({page, pageSize}: {
        page: number,
        pageSize: number
    }) => {
        return await getKnowledgeBases({
            page: page,
            pageSize: pageSize,
            permissions: 1
        }).then(res => res.data.data)
    }

    const getMoreBases = async () => {
        if (basesPageRef.current.page < basesPageRef.current.total) {
            const pageBean = await getBaseList({
                page: basesPageRef.current.page + 1,
                pageSize: basesPageRef.current.pageSize
            })
            const newOption = pageBean.rows.map((item) => ({
                label: item.knowledgeBaseName,
                value: item.id
            }))
            if (newOption.length > 0 && taskForm.knowledgeBaseId === 0) {
                console.log(taskForm)
                setTaskForm({
                    ...taskForm,
                    knowledgeBaseId: newOption[0].value
                })
            }
            setBaseOptions([...baseOptions, ...newOption])
            basesPageRef.current = {
                ...basesPageRef.current,
                page: basesPageRef.current.page + 1,
                total: basesPageRef.current.total
            }
        }
    }


    useEffect(() => {
        getMoreBases().then(res => res)
    }, []);

    const onPopupScroll = (e: React.UIEvent<HTMLElement>) => {
        const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget;
        if (scrollTop + offsetHeight === scrollHeight) {
            getMoreBases().then(r => r)
        }
    };

    const finish = async (value: TaskFormType) => {
        if (value.startTime.isAfter(value.endTime)) {
            dispatch(showMessage({
                type: "warning",
                content: "任务开始时间必须早于截止时间"
            }))
            return
        }
        setIsLoading(true)
        onFinish(value).finally(() => setIsLoading(false))
    }


    return (
        <Form
            className="w-full max-w-[450px]"
            onFinish={finish}
            initialValues={taskForm}
        >
            <Form.Item
                name={'taskName'}
                label={'任务名称'}
                rules={[
                    {
                        required: true,
                        message: "任务名称不能为空"
                    }
                ]}
            >
                <Input name={'taskName'}/>
            </Form.Item>

            <Form.Item
                name={'startTime'}
                label={'开始时间'}
                rules={[
                    {
                        required: true,
                        message: "开始时间不能为空"
                    }
                ]}
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                        hideDisabledOptions: true,
                    }}
                />
            </Form.Item>

            <Form.Item
                label='截止时间'
                name='endTime'
                rules={[
                    {
                        required: true,
                        message: "截止时间不能为空"
                    }
                ]}
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                        hideDisabledOptions: true,
                    }}
                />
            </Form.Item>
            <Form.Item
                label="知识库"
                name="knowledgeBaseId"
                rules={[
                    {
                        required: true,
                        message: "知识库不能为空不能为空"
                    }
                ]}
            >
                <Select
                    onClick={() => console.log(selectBasesRef.current)}
                    ref={selectBasesRef}
                    options={baseOptions}
                    onPopupScroll={onPopupScroll}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    className={`bg-[${PRIMARY_COLOR}]`}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block={true}
                    loading={isLoading}
                >
                    保存
                </Button>
            </Form.Item>
        </Form>
    )
}

export default withThemeConfigProvider(TaskForm)
