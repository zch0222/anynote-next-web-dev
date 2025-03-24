'use client'

import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';

import { Milkdown, useEditor, MilkdownProvider } from '@milkdown/react'
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord'
import {useEffect, useState} from "react";
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { math } from '@milkdown/plugin-math';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { block } from '@milkdown/plugin-block';
import '@milkdown/theme-nord/style.css';
import { tooltip, TooltipView } from './Tooltip';
import 'katex/dist/katex.min.css';
import { diagram } from '@milkdown/plugin-diagram';
import { BlockView } from './Block';
import "./prism-nord.css"
import { prism } from '@milkdown/plugin-prism';
import { ProsemirrorAdapterProvider, useNodeViewFactory } from '@prosemirror-adapter/react'
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { $view } from "@milkdown/utils";
import {upload, uploadConfig, Uploader} from '@milkdown/plugin-upload';
import { slash, SlashView } from './Slash';

import {
    codeBlockSchema,
} from "@milkdown/preset-commonmark";

import {CodeBlock} from "@/components/MilkdownEditor/CodeBlock";
import "./index.css"

export const MilkdownEditor = ({onInput, onBlur, onUpload, content, vditorRef}: {
    onInput: (value: string) => void,
    onBlur?: (value: string) => void,
    onUpload?: (files: File[]) => string | Promise<string | void> | Promise<null> | null,
    content: string,
    vditorRef?: any
}) => {
    const pluginViewFactory = usePluginViewFactory();
    const nodeViewFactory = useNodeViewFactory();

    const uploader: Uploader = async (files, schema) => {
        const images: File[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (!file) {
                continue;
            }

            // You can handle whatever the file type you want, we handle image here.
            if (!file.type.includes('image')) {
                continue;
            }

            images.push(file);
        }

        const nodes: Node[] = await Promise.all(
            images.map(async (image) => {
                if (!onUpload) {
                    // return schema.nodes.image.createAndFill({
                    //     '',
                    //     '',
                    // }) as Node;
                    return null
                }
                const src = await onUpload([image]);
                console.log("src", src)
                // alert(url)
                const alt = image.name;
                console.log(src)
                return schema.nodes.image.createAndFill({
                    src,
                    alt,
                }) as Node;
            }),
        );
        console.log("nodes", nodes)

        return nodes;
    };


    useEditor((root) => {
        return Editor
            .make()
            .config(ctx => {

                ctx.set(rootCtx, root)
                ctx.set(defaultValueCtx, content)
                ctx.set(tooltip.key, {
                    view: pluginViewFactory({
                        component: TooltipView,
                    })
                })
                // ctx.set(block.key, {
                //     view: pluginViewFactory({
                //         component: BlockView,
                //     })
                // })
                ctx.set(block.key, {
                    view: pluginViewFactory({
                        component: BlockView,
                    })
                })

                const listener = ctx.get(listenerCtx);
                listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
                    if (markdown !== prevMarkdown) {
                        console.log(markdown)
                        onInput(markdown)
                    }
                })
                ctx.update(uploadConfig.key, (prev) => ({
                    ...prev,
                    uploader,
                }));
                // ctx.set(slash.key, {
                //     view: pluginViewFactory({
                //         component: SlashView,
                //     })
                // })
                // ctx.set(slash.key, {
                //     view: pluginViewFactory({
                //         component: SlashView,
                //     })
                // })
                // slash.config(ctx)
            })
            .config(nord)
            .use(commonmark)
            .use(gfm)
            .use(history)
            .use(clipboard)
            .use(cursor)
            .use(math)
            .use(block)
            .use(diagram)
            .use(prism)
            .use(tooltip)
            .use(listener)
            .use(upload)
            // .use([...remarkDirective, directiveNode, inputRule])
            // .use(slash.plugins)
            .use(
                $view(codeBlockSchema.node, () =>
                    nodeViewFactory({ component: CodeBlock })
                )
            )
            // .use(slash)
    }, [])

    return (
        <Milkdown />

    )
}

export default function MilkdownEditorWrapper({onInput, onBlur, onUpload, content, vditorRef}: {
    onInput: (value: string) => void,
    onBlur?: (value: string) => void,
    onUpload?: (files: File[]) => string | Promise<string | void> | Promise<null> | null,
    content: string,
    vditorRef?: any
}) {

    const [isClient, setIsClient] = useState(false);

    // Wait until after client-side hydration to show
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <MilkdownProvider>
            <ProsemirrorAdapterProvider>
                <div className="w-full h-full">
                    {isClient &&
                        <MilkdownEditor
                            onInput={onInput}
                            onBlur={() => {}}
                            content={content}
                            onUpload={onUpload}
                        />}
                </div>
            </ProsemirrorAdapterProvider>
        </MilkdownProvider>
    )
}
