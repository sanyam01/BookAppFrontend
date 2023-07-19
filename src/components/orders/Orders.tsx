import { useSelector } from 'react-redux';
import CartItem from '../topBar/CartItem';

import './Orders.scss';
import { useEffect } from 'react';
import axios from 'axios';
interface IProps {

}

const Orders = (props: IProps) => {


    const allOrders = useSelector((state: any) => state.orders);

    const getDate = (stringDate: string) => {


        const date = new Date(stringDate);

        return (
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}hr:${date.getMinutes()}m:${date.getSeconds()}s`
        )

    }

    const getTotlaPrice = (order: any) => {
        let totalPrice = 0;
        order.books.forEach((book: any) => {
            totalPrice = totalPrice + Number(book.book.price);
        });
        return totalPrice;
    }

    return (
        <div className="overallOrders">
            <div className="orderHead">
                My Orders
            </div>
            {allOrders.length > 0 && <div className="allOrders">
                {allOrders?.map((order: any) => {
                    if (!order || order.length === 0) {
                        return null
                    }
                    else
                        return (<div className="orderItem">
                            <div className="orderHeader">
                                <div className="headerName">
                                    <div className="name">Order Placed on : </div>
                                    <div>{getDate(order.date)}</div>
                                </div>
                                <div className="headerName">
                                    <div className="name">Total price : </div>
                                    <div>{getTotlaPrice(order)}</div>
                                </div>
                            </div>
                            {order?.books.map((item: any) => {
                                return (<CartItem book={item.book} quantity={item.quantity} noBorder={true} />);
                            })}
                        </div>);
                })}
            </div>}
        </div >
    );



}

export default Orders;