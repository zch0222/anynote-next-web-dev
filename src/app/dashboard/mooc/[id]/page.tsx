'use client'

import type { CSSProperties } from 'react';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import {Button, Card, CollapseProps} from 'antd';
import { Collapse, theme } from 'antd';
import Title from "@/components/Title";
import {SWRResponse} from "swr";
import {PageBean} from "@/types/requestTypes";
import Loading from "@/components/Loading";
import useMoocItem from "@/hooks/mooc/useMoocItem";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: <div><Button type="primary" shape="circle">1</Button>介绍</div>,
        children: <p>映射是高等数学中一个基础且重要的概念，它在函数、线性代数等多个领域都有广泛的应用，是理解和研究各种数学结构和变换的重要工具。</p>,
        style: panelStyle,
    },
    {
        key: '2',
        label: <div><Button type="primary" shape="circle">2</Button>映射</div>,
        children: <p>{text}</p>,
        style: panelStyle,
    },
    {
        key: '3',
        label: <div><Button type="primary" shape="circle">3</Button>函数</div>,
        children: <p>{text}</p>,
        style: panelStyle,
    },
];

const createItems = ({ page, pageSize, swr, params }: {
    params: any,
    page: number,
    pageSize: number,
    swr: ({params, page, pageSize}: {
        params: any,
        page: number,
        pageSize: number
    }) => SWRResponse<PageBean<any>>
}) => {
    const { data, error } = swr({
        page: page,
        pageSize: pageSize,
        params: params
    })

    if (!data) return <Loading/>;

    return data.rows.map((item, index) => {
        return {
            key: index,
            label: <div><Button type="primary" shape="circle">{index}</Button>介绍</div>,
            children: <p>映射是高等数学中一个基础且重要的概念，它在函数、线性代数等多个领域都有广泛的应用，是理解和研究各种数学结构和变换的重要工具。</p>,
        }
    })
}

export default function MoocCatalogue({params}: {
    params: {
        id: number
    }
}) {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    const {data, isLoading} = useMoocItem({
        moocId: params.id
    })
    if (isLoading) return <Loading/>


    return (
        <div className="flex flex-col h-full box-border overflow-hidden p-8">
            <Title text={data?.title as string} />
            <Card title="目录">
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ background: token.colorBgContainer }}
                    items={getItems(panelStyle)}
                    expandIconPosition={"end"}
                />
            </Card>
        </div>
    )
}
