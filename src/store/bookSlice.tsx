import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, PageType, Cart } from '../models/models';

const initialState: {
    name: string,
    token: string,
    cart: Cart | null,
    page: PageType,
    userID: string,
    books: Book[] | null,
    formState: "Add" | "Edit"

} = {
    name: "",
    token: "",
    cart: null,
    page: "Books",
    userID: "",
    books: null,
    formState: "Add"
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

        setCart: (state, action: PayloadAction<Cart>) => {
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
