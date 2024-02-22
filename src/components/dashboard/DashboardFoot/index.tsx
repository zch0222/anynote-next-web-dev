'use client'
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import UserCard from "@/components/UserCard";

function DashboardFoot() {
    return (
        <div className="w-full flex flex-col">
            <UserCard isShowSetting={true}/>
        </div>
    )
}

export default withThemeConfigProvider(DashboardFoot)