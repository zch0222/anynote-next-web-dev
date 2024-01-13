'use client'
import SiderHeader from "@/components/dashboard/SiderHeader";
import { Card } from "antd";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import withThemeConfigProvider from "../../hoc/withThemeConfigProvider"
import DashboardSiderMenu from "../DashboardSiderMenu";
import SearchNoteInput from "@/components/dashboard/SearchNoteInput";
import { useSelector } from "react-redux";
import {RootState} from "@/store";

function DashboardSider() {

    const router = useRouter()
    const pathname = usePathname()
    const cardStyle = {
        padding: 0,
        borderRadius: 0
    }
    const bodyStyle = {
        padding: 0,
        width: "100%",
        height: "100%"
    }
    const cardClassName = "h-full flex flex-col"

    const sideRouter = useSelector((state: RootState) => state.sideRouter)
    const { path } = sideRouter

    return (
        <Card
            className={cardClassName}
            style={cardStyle}
            bodyStyle={bodyStyle}
        >
            <SiderHeader/>
            <SearchNoteInput/>
            <DashboardSiderMenu/>
        </Card>
    )
}

export default withThemeConfigProvider(DashboardSider)
