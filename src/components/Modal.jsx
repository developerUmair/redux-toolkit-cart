import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { closeModal } from '../features/Modal/modalSlice'

const Modal = () => {
    const dispatch = useDispatch()

    const handleConfirm = () => {
        dispatch(clearCart())
        dispatch(closeModal())
    }
    return (
        <div className="modal-container">
            <div className="modal">
                <h4>Are you sure you want to remove all items?</h4>
                <div className="btn-container">
                    <button className='btn confirm-btn' onClick={() => handleConfirm()}>Confirm</button>
                    <button className='btn clear-btn' onClick={() => dispatch(closeModal())}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal