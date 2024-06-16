'use client'

import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Button, Input} from "@nextui-org/react";
import {Handle, Position} from 'reactflow';
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {useState} from "react";
import {Form, Select} from 'antd';
import {ArrowDownOutlined, ArrowRightOutlined} from "@ant-design/icons";

function StartNode() {

    const [variableList, setVariableList] = useState<{
        key: string,
        type: string,
        description: string,
        defaultValue: any,
        isShowSetting: boolean
    }[]>([
        {
            key: "a",
            type: "number",
            description: "",
            defaultValue: 1,
            isShowSetting: false
        },
        {
            key: "b",
            type: "string",
            description: "",
            defaultValue: "b",
            isShowSetting: false
        },
    ]);

    return (
        <>
            <Handle id="right" type="source" position={Position.Right} />
            <Card
                radius="sm"
            >
                <CardHeader className="flex flex-col items-start">
                    <div className="text-xl font-bold">开始</div>
                    <div className="text-sm text-gray-400 mt-2">这是工作流开始节点，你可以在此处定义任务变量</div>
                </CardHeader>
                <CardBody
                    className="flex flex-col"
                >
                    <Button
                        className="text-white"
                        color="primary"
                        size="sm"
                    >
                        添加变量
                    </Button>
                    {variableList.map(item => (
                        <Card
                            key={item.key}
                            radius="sm"
                            className="bg-gray-100 mt-2"
                        >
                            <CardHeader
                                className="flex flex-row items-center"
                            >
                                <div
                                    onClick={() => {
                                        setVariableList((prevList) => {
                                            // 创建一个新的数组，其中每个元素都是新的对象
                                            return prevList.map(prevItem => {
                                                if (prevItem.key === item.key) {
                                                    // 对匹配的元素进行属性修改，并返回一个新的对象
                                                    return {
                                                        ...prevItem,
                                                        isShowSetting: !prevItem.isShowSetting
                                                    };
                                                }
                                                // 对于不匹配的元素，直接返回原对象
                                                return prevItem;
                                            }); // 返回新的数组，而不是修改原数组
                                        });
                                    }}
                                >
                                    {item.isShowSetting ? <ArrowDownOutlined/> : <ArrowRightOutlined/>}
                                </div>
                                <div className="flex-grow">
                                    <Input
                                        defaultValue={item.key}
                                        placeholder="变量名称"
                                        variant="underlined"
                                        size="sm"
                                    />
                                </div>
                            </CardHeader>
                            {item.isShowSetting ?
                                <CardBody>
                                    <Form
                                        layout="vertical"
                                        initialValues={{
                                            ...item
                                        }}
                                    >
                                        <Form.Item
                                            label="类型"
                                            name="type"
                                        >
                                            <Select/>
                                        </Form.Item>
                                        <Form.Item
                                            label="描述"
                                            name="description"
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            label="默认值"
                                            name="defaultValue"
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Form>
                                </CardBody> : <></>
                            }
                        </Card>
                    ))}
                </CardBody>
            </Card>
        </>
    )
}

export default withThemeConfigProvider(StartNode)