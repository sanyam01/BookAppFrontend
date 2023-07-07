import { v4 as uuidv4 } from 'uuid';

export interface Book {
    id: string;
    name: string;
    author: string;
    image: string;
    description: string;
    price: string;
    categoryID: string;
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

export interface OrderBook {
    bookID: string;
    numBook: string;
    price: string;
}

export interface Order {
    orderID: string;
    books: OrderBook[];
}

export interface Category {
    id: string;
    name: string;
}

export interface Categories {
    categories: Category[]
}

export const initBook = () => {
    return ({
        id: uuidv4(),
        name: "",
        author: "",
        image: "",
        description: "",
        price: "",
        categoryID: ""
    })
}

export interface SignupData {
    username: string;
    password: string;
    confirmPassword: string;
}

export const initSignup = () => {
    return({
        username:"",
        password:"",
        confirmPassword:""
    });
   

}