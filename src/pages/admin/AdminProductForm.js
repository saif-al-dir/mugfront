import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './AdminProductForm.module.css';
import api from '../../api/axiosInstance';


export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    salePrice: 0,
    image: '',
    additionalImages: [],
    description: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`)
        .then(res => {
          const data = res.data;
          // Ensure additionalImages is an array
          if (typeof data.additionalImages === 'string') {
            data.additionalImages = data.additionalImages.split(',').map(s => s.trim());
          }
          setProduct(data);
        })
        .catch(() => setError('Load failed'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'salePrice' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert additionalImages back to array if needed
      const payload = {
        ...product,
        salePrice: product.salePrice || null,
        additionalImages: Array.isArray(product.additionalImages)
          ? product.additionalImages
          : product.additionalImages.split(',').map(s => s.trim()),
      };

      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      navigate('/admin/products');
    } catch {
      setError('Save failed');
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title*:
          <input type="text" name="title" value={product.title} onChange={handleChange} required />
        </label>
        <label>
          Main Image URL*:
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </label>
        <label>
          Additional Images URLs (comma separated):
          <input
            type="text"
            name="additionalImages"
            value={Array.isArray(product.additionalImages) ? product.additionalImages.join(', ') : product.additionalImages}
            onChange={handleChange}
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
          />
        </label>
        <label>
          Price*:
          <input type="number" name="price" value={product.price} onChange={handleChange} min="0" step="0.01" required />
        </label>
        <label>
          Sale Price:
          <input type="number" name="salePrice" value={product.salePrice} onChange={handleChange} min="0" step="0.01" />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} rows="4" />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <Link to="/admin/products" className={styles.cancelButton}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
