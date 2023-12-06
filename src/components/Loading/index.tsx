'use client'
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
    return (
        <div className="flex mt-50 w-full justify-center items-center">
            <Spin
              size="large"
            />
        </div>
    )
}
