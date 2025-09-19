import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminProductsPage.module.css';
import LogoutButton from '../../components/LogoutButton';
import api from '../../api/axiosInstance';


export default function AdminProductsPage () {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`); // ✅ no API_URL
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1>Admin - Products</h1>
      <Link to="/admin/products/new" className={styles.addButton}>
        + Add New Product
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price (zł)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, title, price }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{price}</td>
              <td>
                <button
                  onClick={() => navigate(`/admin/products/${id}/edit`)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <LogoutButton />
    </div>
  );
};
