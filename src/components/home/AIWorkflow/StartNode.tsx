'use client'

import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Button, Input, Select, SelectedItems, SelectItem} from "@nextui-org/react";
import {Handle, Position} from 'reactflow';
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {useState} from "react";
import {ArrowDownOutlined, ArrowRightOutlined, DeleteOutlined} from "@ant-design/icons";
import { nanoid } from "nanoid";
import {it} from "node:test";

const variableOptions = [
    {
        label: "string",
        value: "string",
    },
    {
        label: "number",
        value: "number"
    }
]

function StartNode() {

    const [variableList, setVariableList] = useState<{
        id: string,
        key: string,
        type: string,
        description: string,
        defaultValue: any,
        isShowSetting: boolean
    }[]>([
        {
            id: nanoid(),
            key: "a",
            type: "number",
            description: "",
            defaultValue: 1,
            isShowSetting: false
        },
        {
            id: nanoid(),
            key: "b",
            type: "string",
            description: "",
            defaultValue: "b",
            isShowSetting: false
        },
    ]);

    const updateVariableList = (id: string, variable: {
        key?: string,
        type?: string,
        description?: string,
        defaultValue?: any,
        isShowSetting?: boolean
    }) => {
        setVariableList((prevList) => {
            // 创建一个新的数组，其中每个元素都是新的对象
            return prevList.map(prevItem => {
                if (prevItem.id === id) {
                    // 对匹配的元素进行属性修改，并返回一个新的对象
                    return {
                        ...prevItem,
                        ...variable
                    };
                }
                // 对于不匹配的元素，直接返回原对象
                return prevItem;
            }); // 返回新的数组，而不是修改原数组
        });
    }
    return (
        <>
            <Handle id="right" type="source" position={Position.Right} />
            <Card
                radius="sm"
            >
                <CardHeader className="flex flex-col items-start mr-2">
                    <div className="text-xl font-bold">开始</div>
                    <div className="text-sm text-gray-400 mt-2">这是工作流开始节点，你可以在此处定义任务变量</div>
                </CardHeader>
                <CardBody
                    className="flex flex-col"
                >
                    <Button
                        className="text-white mb-2"
                        color="primary"
                        size="sm"
                        onClick={() => setVariableList([...variableList,
                            {
                                id: nanoid(),
                                key: "",
                                type: "string",
                                description: "",
                                defaultValue: "",
                                isShowSetting: false
                            }
                        ])}
                    >
                        添加变量
                    </Button>
                    {variableList.map(item => (
                        <Card
                            key={item.id}
                            radius="sm"
                            className="bg-gray-50 mt-2"
                        >
                            <CardHeader
                                className="flex flex-row items-center"
                            >
                                <div
                                    onClick={() => {
                                        updateVariableList(item.id, {isShowSetting: !item.isShowSetting})
                                    }}
                                >
                                    {item.isShowSetting ? <ArrowDownOutlined/> : <ArrowRightOutlined/>}
                                </div>
                                <div className="flex-grow">
                                    <Input
                                        value={item.key}
                                        placeholder="变量名称"
                                        variant="underlined"
                                        size="sm"
                                        onChange={(e) => updateVariableList(item.id, {
                                            key: e.target.value
                                        })}
                                    />
                                </div>
                                <DeleteOutlined
                                    onClick={() => {
                                        setVariableList((prevList) => prevList
                                            .filter(prevItem => prevItem.id != item.id))
                                    }}
                                />
                            </CardHeader>
                            {item.isShowSetting ?
                                <CardBody>
                                    <div className="flex flex-col">
                                        <div>类型</div>
                                        <Select
                                            aria-label="变量类型Select"
                                            selectedKeys={[item.type]}
                                            selectionMode="single"
                                            onSelectionChange={(value) => updateVariableList(item.id, {
                                                // @ts-ignore
                                                type: [...value][0]
                                            })}
                                        >
                                            {variableOptions.map(option => (
                                                <SelectItem
                                                    key={option.value}
                                                    aria-label={option.label}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>描述</div>
                                        <Input
                                            size="sm"
                                            placeholder="变量描述"
                                            value={item.description}
                                            onChange={(e) => updateVariableList(item.id, {
                                                description: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div>默认值</div>
                                        <Input
                                            size="sm"
                                            placeholder="变量默认值"
                                            value={item.defaultValue}
                                            onChange={(e) => updateVariableList(item.id, {
                                                defaultValue: e.target.value
                                            })}
                                            type={item.type}
                                        />
                                    </div>
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