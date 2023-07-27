// import React from 'react';
import { useEffect, useState } from 'react';
import '../pages/LoginStyles.css';
// import BottomNav from '../components/BottomNav';
import { createClient } from '@supabase/supabase-js';
// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';


const supabase = createClient(
    import.meta.env.VITE_REACT_APP_PODS_SUPABASE_URL, 
    import.meta.env.VITE_REACT_APP_PODS_SUPABASE_ANON_KEY
  );

export default function Account() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser()
            .then((value) => {
                // value.data.user
                if(value.data?.user) {
                    console.log(value.data.user);
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    // sign out user
    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error)
        } else {
            navigate('/login');
        }

        }
    

  return (
      <div className="success--display">
        { Object.keys(user).length !== 0 ?
        <>
            <h2>Success! Welcome to Pods.</h2>
            <button onClick={() => signOutUser()}>Sign Out</button>
        </> :
        <>
            <h2>User not logged in</h2>
            <button onClick={() => navigate('/')}>Go back home</button>
        </>
        }
        
      </div>
  );
}
