import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';
import api from '../../api/axiosInstance';
import { useHead } from '../../hooks/useHead';

export default function AdminLogin () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const headElements = [
    'Login Page', // Sets <title>
    {
      tag: 'meta',
      props: { name: 'description', content: 'Page description' }
    }
  ];
  useHead(headElements);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post(`/auth/login`, { username, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/admin/products');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Username:
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
};
