import { useEffect } from 'react';
import '../pages/LoginStyles.css';
// import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../main';


// const supabaseUrl = import.meta.env.VITE_REACT_APP_PODS_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_REACT_APP_PODS_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
  // after the user logs in, send them to the home page
  const navigate = useNavigate();

  useEffect(() => {
    // send user to home page if user is logged in, if not, send them to login
    if (supabase.auth.getUser()) {
      navigate('/');
    } else {
      navigate('/login');
    }


    
   });

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
