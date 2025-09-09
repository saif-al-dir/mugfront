import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './AdminProductForm.module.css';
import axiosInstance from '../../api/axiosInstance';

export default function AdminProductForm () {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [product, setProduct] = useState({ title: '', price: 0 });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axiosInstance.get(`/api/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(() => setError('Load failed'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axiosInstance.put(`/api/products/${id}`, product);
      } else {
        await axiosInstance.post('/api/products', product);
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
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Main Image URL*:
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Additional Images URLs (comma separated):
          <input
            type="text"
            name="additionalImages"
            value={product.additionalImages}
            onChange={handleChange}
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
          />
        </label>
        <label>
          Price*:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
          />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <Link to="/admin/products" className={styles.cancelButton}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
