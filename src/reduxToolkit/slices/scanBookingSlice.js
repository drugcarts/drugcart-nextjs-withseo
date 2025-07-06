import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    scanBookingList: [],
    newScanBooking: {},
    scanBooking: {},
}
const scanBookingSlice = createSlice({
    name: 'scanBooking',
    initialState: initialState,
    reducers: {
        addBooking: (state, { payload }) => {
            state.newScanBooking = payload
        },
        getBookings: (state, { payload }) => {
            state.scanBookingList = payload
        },
        getBooking: (state, { payload }) => {
            state.scanBooking = payload
        },
    }
})

export const { addBooking, getBookings, getBooking } = scanBookingSlice.actions
export default scanBookingSlice.reducer