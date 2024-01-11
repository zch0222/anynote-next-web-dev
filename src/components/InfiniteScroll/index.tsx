import React, {ComponentType, ReactElement, useState, useRef, useEffect} from "react";
import Loading from "../Loading";
import {SWRResponse} from "swr";
import { PageBean } from "@/types/requestTypes";
import { Pagination as NextUIPagination } from "@nextui-org/react";
import ReactInfiniteScroll from 'react-infinite-scroll-component';
import useSWR from "swr";
import {nanoid} from "nanoid";


function Page({ Item, swr, page, pageSize, params, itemProps }: {
    Item: ComponentType<{data: any, itemProps?: any}>,
    swr: ({params, page, pageSize}: {
        params: any,
        page: number,
        pageSize: number
    }) => SWRResponse<PageBean<any>>,
    page: number,
    pageSize: number,
    params: any
    itemProps?: any
}) {
    const { data } = swr({
        params: params,
        page: page,
        pageSize: pageSize
    })
    if (!data) {
        return <div className="flex justify-center items-center font-bold">加载中....</div>
    }
    return (
        <>
            {data.rows.map(data => (
                <div
                    className="flex-col justify-center w-full"
                    key={nanoid()}
                >
                    <Item itemProps={itemProps} data={data}/>
                </div>

            ))}
        </>
    )
}

function InfiniteScroll(props: {
    // Page: ComponentType<{
    //     page: number,
    //     pageSize: number,
    //     params: any,
    //     swr: ({params, page, pageSize}: {
    //         params: any,
    //         page: number,
    //         pageSize: number
    //     }) => SWRResponse<PageBean<any>>
    // }>,

    swr: ({params, page, pageSize}: {
        params: any,
        page: number,
        pageSize: number
    }) => SWRResponse<PageBean<any>>,
    params: any | undefined,
    Item: ComponentType<{data: any}>,
    itemProps?: any
}) {

    const pages: ReactElement[] = []

    const { swr, params, Item, itemProps} = props;
    const reactInfiniteScrollRef = useRef()

    const [hasMore, setHasMore] = useState<boolean>(true)

    const [pageParam, setPageParam] = useState<{
        page: number,
        pageSize: number
    }>({
        page: 1,
        pageSize: 15,
    })

    const { data, error } = swr({
        params: params,
        page: 1,
        pageSize: 15
    })

    useEffect(() => {
        // if (reactInfiniteScrollRef.current) {
        //     const resizeObserver = new ResizeObserver(entries => {
        //         for (let entry of entries) {
        //             console.log('Height:', entry.target.offsetHeight);
        //         }
        //     });
        //
        // }
    }, [data])

    if (!data) {
        console.log("Loading....")
        return <Loading/>
    }


    if (hasMore && pageParam.page >= data.pages) {
        setHasMore(false)
    }

    // const onPageChange = (page: number) => {
    //     console.log(page)
    //     setPageParam({
    //         ...pageParam,
    //         page: page
    //     })
    // }

    const next = () => {
        setPageParam({
            ...pageParam,
            page: pageParam.page + 1
        })
    }



    for (let i = 0; i < pageParam.page; ++i) {
        pages.push(<Page key={nanoid()} Item={Item} itemProps={itemProps} swr={swr} page={i + 1} pageSize={pageParam.pageSize} params={params}/>)
    }

    return (
        <div
            id={"scrollableDiv"}
            className={`flex h-full flex-col w-full overflow-y-auto`}
        >
            <ReactInfiniteScroll
                className="overflow-hidden"
                next={next}
                hasMore={hasMore}
                loader={"loading..."}

                dataLength={pages.length}
                scrollableTarget="scrollableDiv"
            >
                {pages}
            </ReactInfiniteScroll>

        </div>
    )
}

export default InfiniteScroll
