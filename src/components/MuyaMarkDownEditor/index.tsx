'use client'
import Muya from "@marktext/muya";
import {MutableRefObject, useEffect, useState} from "react";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

import '@marktext/muya/dist/assets/style.css';
import Vditor from "vditor";
import {ImageEditTool} from "@marktext/muya/dist/ui";

function MuyaMarkDownEditor({onInput, content}: {
    onInput: (value: string) => void,
    // onBlur: (value: string) => void,
    // onUpload: (files: File[]) => string | Promise<string> | Promise<null> | null,
    content: string,
    // vditorRef: MutableRefObject<Vditor | undefined>
}) {

    // const [muya, setMuya] = useState()


    useEffect(() => {

        if (typeof window !== "undefined") {
            console.log(window)
            const container = document.querySelector('#muyaEditor')
            // @ts-ignore
            const muya = new Muya(container)
            muya.init()
            muya.setContent(content)
            muya.domNode.addEventListener("input", (e) => {
                // console.log(e.target.innerText)
                onInput(e.target.innerText)
                // console.log(e)
                // onInput(e.target.innerText)
                // muya.setContent(e.target.innerText)
            })

            muya.domNode.addEventListener("keydown", (e) => {
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    onInput(e.target.innerText);
                }
            });

            muya.domNode.addEventListener('paste', (e) => {
                onInput(e.target.innerText)
            })

            muya.domNode.addEventListener('cut', (e) => {
                onInput(e.target.innerText)
            })
        }


        // muya.domNode.addEventListener('paste', async function(event) {
        //     // 阻止默认的粘贴行为
        //     event.preventDefault();
        //     // 获取粘贴的数据
        //     const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        //
        //     const selection = window.getSelection();
        //     const range = selection.getRangeAt(0);
        //     const cursorPosition = range.startOffset;
        //     console.log(cursorPosition)
        //     muya.setContent(muya.getMarkdown().slice(0, cursorPosition) + "TEST" + muya.getMarkdown().slice(cursorPosition))
        //     muya.domNode
        //     // 遍历粘贴的数据项
        //     for (const item of items) {
        //         if (item.type.indexOf('image') === 0) {
        //             // 如果数据项是图片
        //             const blob = item.getAsFile(); // 获取图片文件
        //             // onUpload([blob])
        //
        //             const reader = new FileReader();
        //
        //             reader.onload = function(event) {
        //                 // 此处可以处理图片，例如显示在页面上
        //                 console.log('Pasted image:', event.target.result);
        //                 // // 例如，可以将图片显示在一个<img>元素中
        //                 // const img = document.createElement('img');
        //                 // img.src = event.target.result;
        //                 // document.body.appendChild(img);
        //             };
        //
        //             reader.readAsDataURL(blob); // 读取图片文件为DataURL
        //         }
        //     }
        //
        //
        // })



    }, [onInput, content]);

    return (
        <div
            id="muyaEditor"
            className="w-full h-full"
        >

        </div>
    )
}

export default withThemeConfigProvider(MuyaMarkDownEditor)
