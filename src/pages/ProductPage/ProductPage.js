import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load product');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity }));
        navigate('/cart');
    };

    if (loading) return <div className={styles.container}>Loading product...</div>;
    if (error) return <div className={styles.container}>Error: {error}</div>;
    if (!product) return <div className={styles.container}>Product not found</div>;

    // Combine main image and additional images into one array
    const images = [product.image, ...(product.additionalImages || [])];

    // Slider settings (customize as needed)
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backLink}>&larr; Back to products</Link>
            <div className={styles.productWrapper}>
                <div className={styles.imagesSection}>
                    <Slider {...sliderSettings}>
                        {images.map((img, idx) => (
                            <div key={idx}>
                                <img
                                    src={img}
                                    alt={`${product.title} ${idx + 1}`}
                                    className={styles.carouselImage}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className={styles.detailsSection}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <p className={styles.price}>Price: {product.price} zł</p>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.quantityWrapper}>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className={styles.quantityInput}
                        />
                    </div>
                    <button onClick={handleAddToCart} className={styles.addButton}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;