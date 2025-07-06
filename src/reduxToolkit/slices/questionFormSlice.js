import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questionFormList: [],
    newQuestion: {},
    question: {},
}
const questionSlice = createSlice({
    name: 'question',
    initialState: initialState,
    reducers: {
        addQuestion: (state, { payload }) => {
            state.newQuestion = payload
        },
        getQuestions: (state, { payload }) => {
            state.questionFormList = payload
        },
        getQuestion: (state, { payload }) => { 
            state.question = payload
        }
    }
})

export const { addQuestion, getQuestions, getQuestion } = questionSlice.actions
export default questionSlice.reducer