"use client"

import { sendChatMessage } from "@/components/ChatCompletions";
import MilkdownEditorWrapper, {MilkdownEditor} from "@/components/MilkdownEditor";
import {useEffect, useState} from "react";
import {Note} from "@/types/noteTypes";
import { Editor } from '@milkdown/core';

export default function Test() {
    const [data, setData] = useState({
        content: "测试补全",
    })

    const handleSendMessage = async (prompt: string) => {
        try {
            const messages = await sendChatMessage({
                model: "gemma2",
                prompt: prompt,
                conversationId: null
            });

            console.log('收到的消息:', messages);
            return messages[0]?.content || '';
        } catch (error) {
            console.error('发送消息失败:', error);
            return '';
        }
    };

    const onInput = (value: string) => {
        console.log(value)
        setData(prev => ({...prev, content: value}));
    }

    const handleTabCompletion = async (editor: Editor) => {
        const view = (editor as any).view;
        if (!view) return;

        const { state } = view;
        const { selection } = state;
        const { from } = selection;

        // 获取当前行的内容
        const $pos = state.doc.resolve(from);
        const lineStart = $pos.start();
        const lineEnd = $pos.end();
        const currentLine = state.doc.textBetween(lineStart, lineEnd);

        // 构建提示词
        const prompt = `请根据以下文本内容，在光标位置补充合适的内容。当前行内容：${currentLine}。请只返回需要补充的内容，不要包含任何解释。`;

        // 获取补全内容
        const completion = await handleSendMessage(prompt);

        if (completion) {
            // 插入补全内容
            view.dispatch(view.state.tr.insertText(completion, from));
        }
    };

    return (
        <div>
            <MilkdownEditorWrapper
                onInput={onInput}
                onBlur={() => {}}
                content={data.content}
            />
        </div>
    );
}
