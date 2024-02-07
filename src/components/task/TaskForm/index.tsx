'use client'
import { Form, Input, DatePicker } from "antd"
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {useState} from "react";
import dayjs from 'dayjs';
import useRouter from "@/hooks/useRouter";
import { isNotNull } from "@/utils/objectUtil";

const {RangePicker} = DatePicker;

function TaskForm() {

    const { searchParams } = useRouter()
    const [taskForm, setTaskForm] = useState<{
        id: number,
        taskName: string,
        startTime: Date,
        endTime: Date
    }>({
        id: parseInt(searchParams.get("id") || "0"),
        taskName: searchParams.get("taskName") || "",
        startTime: new Date(searchParams.get("startTime") || ""),
        endTime: new Date(searchParams.get("endTime") || "")

    });


    return (

        <Form
            className="w-full max-w-[450px]"
            
            initialValues={taskForm}
        >
            <Form.Item name={'taskName'} label={'任务名称'}>
                <Input name={'taskName'}/>
            </Form.Item>

            <Form.Item name={'startTme'} label={'开始时间'}>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                        hideDisabledOptions: true,
                    }}
                    defaultValue={dayjs(new Date())}
                />
            </Form.Item>

            <Form.Item
                label='截止时间'
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                        hideDisabledOptions: true,
                    }}
                    defaultValue={dayjs(new Date())}
                />
            </Form.Item>

            <Form.Item>

            </Form.Item>
        </Form>
    )
}

export default withThemeConfigProvider(TaskForm)
