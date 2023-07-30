import { v4 as uuidv4 } from 'uuid';

export interface Book {
    id: string;
    name: string;
    author: string;
    image: File | null;
    description: string;
    price: string;
    categoryID: string;
    userID: string;
}

export interface Books {
    books: Book[];
}

export interface User {
    id: string;
    name: string;
    orderID: string[];
}

export interface Users {
    users: User[]
}


export interface Category {
    id: string;
    name: string;
}

export interface Categories {
    categories: Category[]
}

export const initBook = (): Book => {
    return ({
        id: uuidv4(),
        name: "",
        author: "",
        image: null,
        description: "",
        price: "",
        categoryID: "",
        userID: ""
    })
}

export interface SignupData {
    username: string;
    password: string;
    confirmPassword: string;
    userID: string;
}

export const initSignup = () => {
    return ({
        username: "",
        password: "",
        confirmPassword: "",
        userID: uuidv4()
    });
}

export type PageType = "Manage" | "Books" | "Orders";

export interface Cart {
    books: Array<{ book: Book, quantity: number }>,
    userID: string,
    date: string
}

export interface Order {
    userID: string;
    books: Array<{ bookID: string, quantity: number, price: string }>;
}

export interface Image {
    id: string;
    image: string;
}