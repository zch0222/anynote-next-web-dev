import {Layout, Menu} from "antd";

import DashboardSider from "../../components/dashboard/Sider";
import React from "react";

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {

    return (
        <div className="flex-grow flex flex-row w-full h-full">
            <div>
                <DashboardSider/>
            </div>
            <div className="flex-grow h-full">
                {children}
            </div>
        </div>
    )
}
