import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ArgsProps} from "antd/es/message";

const initialState: ArgsProps = {
    content: null
}


export const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {
        showMessage: (state, action: PayloadAction<ArgsProps>) => {
            return action.payload
        }
    }
})

export const { showMessage } = messageSlice.actions

export default messageSlice.reducer
