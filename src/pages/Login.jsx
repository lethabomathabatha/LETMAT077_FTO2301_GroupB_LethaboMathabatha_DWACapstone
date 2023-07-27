import { useEffect } from 'react';
import '../pages/LoginStyles.css';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_PODS_SUPABASE_URL, 
  import.meta.env.VITE_REACT_APP_PODS_SUPABASE_ANON_KEY
);

export default function Login() {
  // after the user logs in, send them to the home page
  const navigate = useNavigate();

  useEffect(() => {
    // send user to home page if user is logged in
    if (supabase.auth.user()) {
      navigate('/');
    }
  }, [navigate]);

  
  return (
    <div className="login--form">
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='light'
        providers={["google"]}
      />
    </div>
  );
}
