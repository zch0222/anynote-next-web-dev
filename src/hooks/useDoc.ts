import useSWR from "swr";
import { getDocById } from "@/requests/client/note/doc";


export default function useDoc(docId: number) {
    return useSWR(`/api/note/docs/${docId}`, () => getDocById({
        docId: docId
    }).then(res => res.data.data))
}