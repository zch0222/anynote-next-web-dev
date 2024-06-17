'use client'

import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import { useState, useCallback } from "react";

import StartNode from "./StartNode";
import 'reactflow/dist/style.css';

const nodeTypes = {
    startNode: StartNode
}

function AIWorkflow() {


    // const initialNodes = [
    //     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    //     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    // ];
    // const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

    const [nodes, setNodes] = useState([
        {
            id: '1',
            type: 'startNode',
            position: { x: 0, y: 0 },
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
        }
    ]);
    const [edges, setEdges] = useState([
        { id: '1-2', source: '1', sourceHandle: 'right', target: '2' }
    ]);
    const onNodesChange = useCallback(
        // @ts-ignore
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        // @ts-ignore
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        // @ts-ignore
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [],
    );



    return (
        <div className="w-full h-full">
            <ReactFlow
                //@ts-ignore
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default withThemeConfigProvider(AIWorkflow)