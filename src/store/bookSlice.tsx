import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, PageType, Cart } from '../models/models';

const initialState: {
    name: string,
    token: string,
    cart: Cart | null,
    page: PageType,
    userID: string,
    books: Book[] | null,
    formState: "Add" | "Edit",
    orders: Cart[] | null,
    server: string,

} = {
    name: "",
    token: "",
    cart: null,
    page: "Books",
    userID: "",
    books: null,
    formState: "Add",
    orders: null,
    server: 'http://quilltome.us-east-2.elasticbeanstalk.com'
    // server: 'http://localhost:4000'
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

        setCart: (state, action: PayloadAction<Cart | null>) => {
            state.cart = action.payload;

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

        setFormState: (state, action: PayloadAction<"Add" | "Edit">) => {
            state.formState = action.payload;
        },

        editBook: (state, action: PayloadAction<Book>) => {
            if (state.books !== null)
                state.books = [...state.books.map((book) => book.id !== action.payload.id ? book : action.payload)];
        },

        setOrder: (state, action) => {
            state.orders = action.payload;
        },

        resetStore: (state) => {
            state.name = "";
            state.token = "";
            state.cart = null;
            state.page = "Books";
            state.userID = "";
            state.orders = null;
        }
    }
});

export const bookSliceActions = bookSliceReducer.actions;
