import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateQuantity,
    removeFromCart,
    updateDescription,
} from '../../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (productId, value) => {
        const quantity = Math.max(1, Number(value));
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleDescriptionChange = (productId, value) => {
        dispatch(updateDescription({ productId, description: value }));
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const handleProceedToOrder = () => {
        navigate('/order');
    };

    if (cartItems.length === 0) {
        return (
            <div className={styles.container}>
                <h2>Your cart is empty</h2>
                <Link to="/" className={styles.backLink}>
                    &larr; Back to products
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Your Cart</h1>
            <table className={styles.cartTable}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price (zł)</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Subtotal (zł)</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(({ product, quantity, description }) => (
                        <tr key={product.id}>
                            <td>
                                <Link to={`/product/${product.id}`} className={styles.productLink}>
                                    {product.title}
                                </Link>
                            </td>
                            <td>{product.price}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    className={styles.quantityInput}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => handleDescriptionChange(product.id, e.target.value)}
                                    placeholder="Add description"
                                    className={styles.descriptionInput}
                                />
                            </td>
                            <td>{(product.price * quantity).toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className={styles.removeButton}
                                    aria-label={`Remove ${product.title} from cart`}
                                >
                                    &times;
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.total}>
                <strong>Total: {totalPrice.toFixed(2)} zł</strong>
            </div>
            <button onClick={handleProceedToOrder} className={styles.orderButton}>
                Proceed to Order
            </button>
        </div>
    );
};

export default CartPage;