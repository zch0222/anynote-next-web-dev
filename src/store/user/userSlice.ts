import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "@/types/authTypes";
import jsCookie from "js-cookie"

const initialState: UserInfo = getUserInfo()

function getUserInfo() {
    console.log("get userInfo-----")
    if (typeof window !== "undefined") {
        const userInfo = jsCookie.get("userInfo")
        if (userInfo) {
            console.log(userInfo)
            return JSON.parse(userInfo)
        }

    }
    return {
        username: "test",
        nickname: "",
        role: "",
        avatar: "",
        token: null
    }

}

async function saveUserInfo(userInfo: UserInfo) {
    const { default: jsCookie } = await import("js-cookie");
    jsCookie.set("userInfo", JSON.stringify(userInfo))
    console.log("saving----------")
    // localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            saveUserInfo(action.payload).then();
            return action.payload;
        },
        clearUserInfo: (state) => {
            return initialState
        }
    }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
