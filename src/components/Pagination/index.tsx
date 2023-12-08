import {ComponentType, ReactElement, useState} from "react";
import Loading from "../Loading";
import {SWRResponse} from "swr";
import { PageBean } from "@/types/requestTypes";
import { Pagination as NextUIPagination } from "@nextui-org/react";


function Pagination(props: {
    Page: ComponentType<{
        page: number,
        pageSize: number,
        params: any,
        swr: ({params, page, pageSize}: {
            params: any,
            page: number,
            pageSize: number
        }) => SWRResponse<PageBean<any>>
    }>,
    swr: ({params, page, pageSize}: {
        params: any,
        page: number,
        pageSize: number
    }) => SWRResponse<PageBean<any>>,
    params: any | undefined,
    direction: "col" | "row"
}) {

    const pages: ReactElement[] = []

    const {Page, swr, params, direction} = props;

    const [hasMore, setHasMore] = useState<boolean>(true)

    const [pageParam, setPageParam] = useState<{
        page: number,
        pageSize: number
    }>({
        page: 1,
        pageSize: 10,
    })

    const { data, error } = swr({
        params: params,
        page: 1,
        pageSize: 10
    })

    if (!data) {
        console.log("Loading....")
        return <Loading/>
    }


    if (hasMore && pageParam.page >= data.pages) {
        setHasMore(false)
    }

    const onPageChange = (page: number) => {
        console.log(page)
        setPageParam({
            ...pageParam,
            page: page
        })
    }



    // for (let i = 0; i < pageParam.page; ++i) {
    //     pages.push(
    //         <Page
    //             key={i}
    //             pageSize={pageParam.pageSize}
    //             page={i+1}
    //             params={params}
    //             swr={swr}
    //         />
    //     )
    // }

    return (
        <div
            className={`flex h-full flex-col w-full overflow-y-auto overflow-x-hidden`}
        >
            <div className={`flex ${"row" === direction ? "flex-row flex-wrap" : "flex-col"} pt-3 pb-3`}>
                <Page
                    pageSize={pageParam.pageSize}
                    page={pageParam.page}
                    params={params}
                    swr={swr}
                />
            </div>
            <div className="h-[60px] box-border p-1">
                <NextUIPagination
                    className="text-white"
                    showControls
                    total={data.pages}
                    initialPage={1}
                    onChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default Pagination
