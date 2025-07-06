import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contactUsList: [],
    newContactUs: {},
    contactus: {},
}
const contactUsSlice = createSlice({
    name: 'contact_us',
    initialState: initialState,
    reducers: {
        addContactUs: (state, { payload }) => {
            state.newContactUs = payload
        },
        getContactUsList: (state, { payload }) => {
            state.contactUsList = payload
        },
        getContactUs: (state, { payload }) => { 
            state.contactus = payload
        }
    }
})

export const { addContactUs, getContactUsList, getContactUs } = contactUsSlice.actions
export default contactUsSlice.reducer