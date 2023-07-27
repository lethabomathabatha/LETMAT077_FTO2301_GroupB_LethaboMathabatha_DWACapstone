// Login.jsx
// import React from 'react';
import '../pages/LoginStyles.css';
import BottomNav from '../components/BottomNav';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_PODS_SUPABASE_URL, 
  import.meta.env.VITE_REACT_APP_PODS_SUPABASE_ANON_KEY
);

export default function Login() {
  return (
    <div className="login--form">
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='light'
        providers={["google"]}
      />
      <BottomNav />
    </div>
  );
}
