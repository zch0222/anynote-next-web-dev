import request, {Method} from "@/utils/client-request"
import {ResData} from "@/types/requestTypes";
import {SysUserInfo} from "@/types/manageTypes";

export function getMyUserInfo() {
    return request<ResData<SysUserInfo>>({
        url: "/api/system/user/mine",
        method: Method.GET,
        needToken: true
    })
}