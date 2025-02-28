'use client'

import {Upload, Button} from "antd";
import {RcFile} from "antd/es/upload";
import {showMessage} from "@/store/message/messageSlice";
import { useDispatch } from "react-redux";
import { createMoocCoverUploadTask } from "@/requests/client/note/mooc";
import { upload } from "@/utils/uploadUtil";
import {getObjectUrlByObjectName} from "@/requests/client/file/oss";

export default function CreateMooc() {
    const dispatch = useDispatch()

    const beforeUpload = (file: RcFile) => {
        console.log(file.type)
        const isJpgOrPng = file.type === 'image/jpeg' ;
        if (!isJpgOrPng) {
            dispatch(showMessage({
                type: "error",
                content: "上传文档类型只能为jpg"
            }))
        }
        const isLt200M = file.size / 1024 / 1024 < 200;
        if (!isLt200M) {
            dispatch(showMessage({
                type: "error",
                content: "图片大小必须小于200MB"
            }))
        }
        return isJpgOrPng && isLt200M;
    };

    const uploadCover = (option: any) => {
        const { file } = option
        createMoocCoverUploadTask({
            fileName: file.name,
            hash: "TEST",
            fileSize: file.size / 1024 / 1024,
            contentType: file.type
        }).then(res => {
            const data = res.data.data;
            upload(data.uploadId, file, (percent: number, isDone: boolean, ossSliceUploadComposeOV) => {
                if (isDone && ossSliceUploadComposeOV) {
                    console.log(ossSliceUploadComposeOV)
                    getObjectUrlByObjectName(ossSliceUploadComposeOV.objectName)
                        .then(res => console.log(res.data.data))
                }
                else {
                    console.log("PERCENT:" + percent)
                }
            });
        })
    }

    return (
        <div>
            <Upload
                customRequest={uploadCover}
                beforeUpload={beforeUpload}
            >
                <Button/>
            </Upload>
        </div>
    )
}