'use client'
import {Avatar, Button} from "@nextui-org/react";
import { useSelector } from "react-redux";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import {RootState} from "@/store";
import {SettingOutlined} from "@ant-design/icons";

function UserCard() {

    const user = useSelector((state: RootState) => state.user)

    return (
        <div className="w-full flex flex-row justify-between items-center p-2">
            <div className="flex flex-row items-center">
                <Avatar src={user.avatar}/>
                <div className="flex flex-col ml-2.5">
                    <div className="text-base font-bold">{user.nickname}</div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                </div>
            </div>
            <div>
                <Button isIconOnly={true} variant="light">
                    <SettingOutlined style={{fontSize: 18}}/>
                </Button>
            </div>
        </div>
    )
}

export default withThemeConfigProvider(UserCard)