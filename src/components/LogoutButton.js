import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <button onClick={handleLogout} className={styles.loginButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
