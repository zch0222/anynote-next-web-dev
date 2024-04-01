'use client'
import {useState, useRef, useEffect} from "react";
// @ts-ignore
import { usePdf } from '@mikecousins/react-pdf';
import { Card, Button, Image, CardHeader, CardBody, Input } from "@nextui-org/react";
import { Document, Page, pdfjs, Outline } from "react-pdf";
import Plus from "@/components/svg/Plus";
import Reduce from "@/components/svg/Reduce"
import Catalogue from "@/components/svg/Catalogue";
import { Drawer } from "antd";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";
import { useTheme } from "next-themes";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import PDFPage from "@/components/chat-pdf/PDFPage";
import Chat from "@/components/chat-pdf/Chat";
import Loading from "@/components/Loading";
import Close from "@/components/svg/Close";
import {blob} from "stream/consumers";
import {nanoid} from "nanoid";

pdfjs.GlobalWorkerOptions.workerSrc = "https://anynote.obs.cn-east-3.myhuaweicloud.com/cdn/pdfjs-dist/%403.11.174/build/pdf.worker.js"
function PDFViewer({ src }: {
    src: string
}) {
    const { theme } = useTheme()

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [page, setPage] = useState(1)
    const [isShowChat, setIsShowChat] = useState<boolean>(false)
    const [isCatalogueDrawerOpen, setIsCatalogueDrawerOpen] = useState<boolean>(false)
    const [scale, setScale] = useState(1.0)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [numPages , setNumPages ] = useState(0)
    const [inputPage, setInputPage] = useState<string>(page.toString())

    const viewerBackgroundColor = theme === 'light' ? "bg-[#F7F7F8]" : "bg-black"


    useEffect(() => {
        fetch(src)
            .then(res => res.blob())
            .then(data => {
                const url = URL.createObjectURL(data)
                console.log(url)
                setPdfUrl(url)
            })
    }, [src])

    useEffect(() => {
        if (page.toString() !== inputPage) {
            console.log("Change input page")
            setInputPage(page.toString())
        }
    }, [page]);

    const previous = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const next = () => {
        if (page < numPages) {
            setPage(page + 1)
        }
    }

    const onItemClick = ({ pageIndex }: {
        pageIndex: number
    }) => {
        // 实现页面导航逻辑
        console.log(`Navigating to page: ${pageIndex + 1}`);
        setPage(pageIndex + 1)
    };

    if (!pdfUrl) {
        return (
            <Loading/>
        )
    }



    return (
        <div className="w-full h-full">
            {
                isShowChat ?
                    <Card className="absolute z-50 max-w-[500px] max-h-[500px] w-[80%] h-[80%] right-2 top-[70px]">
                        <CardHeader className="flex flex-row justify-end">
                            <div
                                className="w-[35px] h-[35px] cursor-pointer"
                                onClick={() => setIsShowChat(false)}
                            >
                                <Close
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Chat
                                pdfUrl={src}
                            />
                        </CardBody>
                    </Card>
                :
                <></>
            }
            <div className="flex flex-col items-center w-full h-full">
                <Card
                    className="flex flex-row items-center justify-center w-full p-1 pl-2 pr-2 h-[60px] min-h-[60px]"
                    radius="none"
                >
                    <Button
                        className="mr-2"
                        variant="light"
                        onClick={() => setIsCatalogueDrawerOpen(!isCatalogueDrawerOpen)}
                    >
                        <Catalogue width={16} height={16}/>
                    </Button>
                    <Button size="sm" onClick={previous}>Previous</Button>
                    <div className="flex justify-center items-center mr-1 ml-1">
                        <span>
                            <Input
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setPage(+inputPage)
                                    }
                                }}
                                size="sm"
                                className="w-[60px]"
                                value={inputPage}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d+$/.test(value)) {
                                        if (+value > numPages) {
                                            setInputPage(numPages.toString())
                                        }
                                        else {
                                            setInputPage(value)
                                        }
                                    } else if (value === '') {
                                        // 允许清空输入
                                        setInputPage('')
                                    }
                                }}
                            />
                        </span>
                        {`/${numPages}`}
                    </div>
                    <Button size="sm" onClick={next}>
                        Next
                    </Button>
                    <div
                        className="ml-2 cursor-pointer select-none"
                        onClick={() => {
                            if (parseFloat(scale.toFixed(1)) > 0.1) {
                                setScale(scale - 0.1)
                            }
                        }}
                    >
                        <Reduce width={16} height={16}/>
                    </div>
                    <div className="flex justify-center items-center w-[45px] select-none">
                        {`${(100 * scale).toFixed(0)}%`}
                    </div>
                    <div
                        className="cursor-pointer select-none"
                        onClick={() => {
                            if (scale < 4.5) {
                                setScale(scale + 0.1)
                            }
                        }}
                    >
                        <Plus width={16} height={16}/>
                    </div>

                    <div className="flex-grow flex flex-row justify-end">
                        <Card isPressable className="rounded-[50px]" onClick={() => {
                            setIsShowChat(!isShowChat)
                        }}>
                            <Image
                                className="select-none object-cover rounded-[50px] w-[50px] h-[50px]"
                                src="https://anynote.obs.cn-east-3.myhuaweicloud.com/images/gpt_button.jpg"
                                alt="chat"
                            />
                        </Card>
                    </div>
                </Card>
                <div
                    className={`w-full flex-grow overflow-auto ${viewerBackgroundColor}`}
                >
                    <div className="z-0 relative w-full min-h-full flex flex-col items-center">
                        <Drawer
                            mask={false}
                            contentWrapperStyle={{
                                width: 350
                            }}
                            closeIcon={null}
                            placement="left"
                            open={isCatalogueDrawerOpen}
                            getContainer={false}
                            onClose={() => setIsCatalogueDrawerOpen(false)}
                        >
                            <div className="flex flex-col items-center">
                                <Document
                                    file={pdfUrl}
                                    onLoadSuccess={({ numPages } ) => {
                                        console.log(numPages)
                                    }}
                                    onLoadError={(e) => {
                                        console.log(e)
                                    }}

                                >
                                    <Outline onItemClick={onItemClick}/>

                                    {/*{new Array(numPages).fill('').map((item, index) => {*/}
                                    {/*    return (*/}
                                    {/*        <div*/}
                                    {/*            className="mt-2 select-none cursor-pointer"*/}
                                    {/*            key={index}*/}
                                    {/*            onClick={() => setPage(index+1)}*/}
                                    {/*        >*/}
                                    {/*            <Page className="select-none" pageNumber={index+1} width={150}/>*/}
                                    {/*            <div>*/}
                                    {/*                {index + 1}*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    )*/}
                                    {/*})}*/}
                                </Document>
                            </div>
                        </Drawer>
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={({ numPages } ) => {
                                setNumPages(numPages)
                            }}
                            onItemClick={onItemClick}
                        >
                            <Page className="w-[80%]" pageNumber={page} scale={scale}/>
                        </Document>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withThemeConfigProvider(PDFViewer)

