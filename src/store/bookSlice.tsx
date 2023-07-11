import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, PageType } from '../models/models';

const initialState: {
    name: string,
    token: string,
    cart: Array<Book> | null,
    page: PageType,
    userID: string,
    books: Book[] | null

} = {
    name: "",
    token: "",
    cart: null,
    page: "Books",
    userID: "",
    books: null
}

export const bookSliceReducer = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;

        },

        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;

        },

        setCart: (state, action: PayloadAction<Book>) => {
            if (state.cart) {
                state.cart = [...state.cart, action.payload]
            }
            else
                state.cart = [action.payload]

        },

        setPage: (state, action: PayloadAction<PageType>) => {
            state.page = action.payload;

        },

        setID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload;
        },

        setBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload;
        },

        resetStore: (state) => {
            state.name = "";
            state.token = "";
            state.cart = null;
            state.page = "Books";
            state.userID = "";
        }
    }
});

export const bookSliceActions = bookSliceReducer.actions;
