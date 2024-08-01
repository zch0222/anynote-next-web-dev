'use client'
import Muya from "@marktext/muya";
import {useEffect, useState} from "react";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

import '@marktext/muya/dist/assets/style.css';

function MuyaMarkDownEditor() {

    const [muya, setMuya] = useState<Muya>()

    useEffect(() => {
        const container = document.getElementById("muyaEditor")
        // @ts-ignore
        setMuya(new Muya(container))
        muya?.init()
    }, [muya]);

    return (
        <div
            id="muyaEditor"
            className="w-full h-full"
        >

        </div>
    )
}

export default withThemeConfigProvider(MuyaMarkDownEditor)