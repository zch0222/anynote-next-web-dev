'use client'

import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {Button, Form, Input, Upload, UploadFile, UploadProps} from "antd";
import {Image} from "@nextui-org/react";
import {nanoid} from "nanoid";
import {useRef, useState} from "react";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {showMessage} from "@/store/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "@/store";
import{ UploadRequestOption } from 'rc-upload/lib/interface'

function WikiInfoForm({ onFinish, buttonText, initialValues }: {
    onFinish: (value: {
        name: string,
        detail: string
    }) => void,
    buttonText: string,
    initialValues: {
        name: string,
        detail: string,
        cover: string
    }
}) {
    const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false)
    const [cover, setCover] = useState<string>(initialValues.cover)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const coverUrlRef = useRef(initialValues.cover)

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === "image/jpg";
        if (!isJpgOrPng) {
            dispatch(showMessage({
                type: "error",
                content: "上传图片类型只能为jpeg、jpg、png"
            }))
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            dispatch(showMessage({
                type: "error",
                content: "图片大小必须小于2MB"
            }))
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadCover = (value: UploadRequestOption) => {
        console.log(value)
    }

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setIsUploadingCover(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setIsUploadingCover(false);
                setCover(url);
            });
        }
    };

    return (
        <div>
            <Form
                layout="vertical"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item>
                    <div className="flex flex-row items-center">
                        <div className="mr-3">
                            <Image
                                className="object-cover"
                                isLoading={isUploadingCover}
                                src={cover}
                                width={120}
                                height={150}
                            />
                        </div>
                        <div>
                            <Upload
                                beforeUpload={beforeUpload}
                                // action={`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/bases/covers`}
                                // data={{
                                //     uploadId: nanoid()
                                // }}
                                customRequest={uploadCover}
                                onChange={handleChange}
                                showUploadList={false}
                                // headers={{
                                //     "accessToken": user.token?.accessToken || ""
                                // }}
                                // method="PUT"
                            >
                                <Button>上传</Button>
                            </Upload>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="name"
                >
                    <Input placeholder={"知识库名称"}/>
                </Form.Item>
                <Form.Item
                    name="detail"
                >
                    <Input.TextArea placeholder="知识库描述(选填)"/>
                </Form.Item>
                <Form.Item>
                    <Button
                        className="bg-[#01B96B]"
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block={true}
                        loading={isLoading}
                    >
                        {buttonText}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withThemeConfigProvider(WikiInfoForm)