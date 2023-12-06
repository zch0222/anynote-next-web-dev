import clientRequest, { Method } from "@/utils/client-request";

import { LoginRequest, UserInfo } from "@/types/authTypes";
import { ResData } from "@/types/requestTypes";

export const loginUrl = "/api/auth/login"

export function login(params: LoginRequest) {
    return  clientRequest<ResData<UserInfo>>({
        url: loginUrl,
        method: Method.POST,
        needToken: false,
        data: params
    })
}
