

import { useState } from 'react';
import { useRouter } from 'next/router';

import "./firebase";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ログイン成功時に profile ページにリダイレクト
      router.push('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <input className="login-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="login-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};


export default LoginPage;
