'use client'
import {Form, Input, DatePicker, Button} from "antd"
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {useState} from "react";
import dayjs, {Dayjs} from 'dayjs';
import useRouter from "@/hooks/useRouter";
import { PRIMARY_COLOR } from "@/constants/color";
import {createDayjs} from "@/utils/date";
import { isNotNull } from "@/utils/objectUtil";

const {RangePicker} = DatePicker;

function TaskForm({ onFinish }: {
    onFinish: (value: any) => void
}) {

    const { searchParams } = useRouter()
    const [taskForm, setTaskForm] = useState<{
        id: number,
        taskName: string,
        startTime: Dayjs,
        endTime: Dayjs
    }>({
        id: parseInt(searchParams.get("id") || "0"),
        taskName: searchParams.get("taskName") || "",
        startTime: createDayjs(searchParams.get("startTime")),
        endTime: createDayjs(searchParams.get("endTime"))

    });


    return (

        <Form
            className="w-full max-w-[450px]"
            onFinish={onFinish}
            initialValues={taskForm}
        >
            <Form.Item name={'taskName'} label={'任务名称'}>
                <Input name={'taskName'}/>
            </Form.Item>

            <Form.Item name={'startTime'} label={'开始时间'}>
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
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                        hideDisabledOptions: true,
                    }}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    className={`bg-[${PRIMARY_COLOR}]`}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block={true}
                >
                    保存
                </Button>
            </Form.Item>
        </Form>
    )
}

export default withThemeConfigProvider(TaskForm)
