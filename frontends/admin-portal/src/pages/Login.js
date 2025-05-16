import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;