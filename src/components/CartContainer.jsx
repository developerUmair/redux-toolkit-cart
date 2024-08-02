import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem';
import { calculateTotals, clearCart } from '../features/cart/cartSlice';
import { openModal } from '../features/Modal/modalSlice';

const CartContainer = () => {
    const { cartItems, amount, total } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals())
    }, [cartItems, dispatch])

    return (
        <section className="cart">
            <header>
                <h2>Your Bag</h2>
            </header>
            {amount < 1 ? <h4 className="empty-cart">is currently empty</h4> : (
                <>
                    <div>{cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    </div>
                    <footer>
                        <hr />
                        <div className="cart-total">
                            <h4>total<span>${total?.toFixed(2)}</span></h4>
                        </div>
                        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>Clear Cart</button>
                    </footer>
                </>
            )}

        </section>
    )
}

export default CartContainer