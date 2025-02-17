import useSWR from "swr";
import { getKnowledgeBases } from "@/requests/client/note/knowledgeBase";
import { SWRParams } from "@/types/paginationTypes";

export default function useMoocList({params, page, pageSize}: SWRParams<{
    type?: number | undefined,
    status?: number | undefined,
    organizationId?: number | undefined,
    permissions: number
}>) {

    return useSWR({
        url: `/api/mooc/bases?page=${page}&pageSize=${pageSize}&permissions=${params.permissions}`,
        params: params
    }, () => getKnowledgeBases({
        page: page,
        pageSize: pageSize,
        ...params
    }).then(res => {
        return {
            "rows": [
                {
                    "createBy": 2,
                    "createTime": "2024-05-21T22:27:39.000+08:00",
                    "updateBy": 2,
                    "updateTime": "2024-05-21T22:27:39.000+08:00",
                    "id": 38,
                    "knowledgeBaseName": "高等数学",
                    "cover": "https://anynote.obs.cn-east-3.myhuaweicloud.com/images/knowledge_base_cover.png",
                    "type": 0,
                    "status": 0,
                    "permissions": 1,
                    "detail": null
                },
                {
                    "createBy": 2,
                    "createTime": "2024-05-21T22:06:52.000+08:00",
                    "updateBy": 2,
                    "updateTime": "2024-05-21T22:06:52.000+08:00",
                    "id": 37,
                    "knowledgeBaseName": "计算机网络",
                    "cover": "https://anynote.obs.cn-east-3.myhuaweicloud.com/images/knowledge_base_cover.png",
                    "type": 0,
                    "status": 0,
                    "permissions": 1,
                    "detail": null
                },
                {
                    "createBy": 2,
                    "createTime": "2023-12-07T02:37:12.000+08:00",
                    "updateBy": 2,
                    "updateTime": "2023-12-07T02:37:12.000+08:00",
                    "id": 15,
                    "knowledgeBaseName": "操作系统",
                    "cover": "https://anynote.obs.cn-east-3.myhuaweicloud.com/images/knowledge_base_cover.png",
                    "type": 0,
                    "status": 0,
                    "permissions": 1,
                    "detail": null
                },
                {
                    "createBy": 2,
                    "createTime": "2023-12-02T23:35:03.000+08:00",
                    "updateBy": 2,
                    "updateTime": "2023-12-02T23:35:03.000+08:00",
                    "id": 10,
                    "knowledgeBaseName": "计算机组成原理",
                    "cover": "https://anynote.obs.cn-east-3.myhuaweicloud.com/images/knowledge_base_cover.png",
                    "type": 0,
                    "status": 0,
                    "permissions": 1,
                    "detail": "学习随记"
                }
            ],
            "total": 4,
            "current": 1,
            "pages": 1
        }
    }))
}
