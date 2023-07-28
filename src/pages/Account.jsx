// import React from 'react';
import { useEffect, useState } from 'react';
import '../pages/LoginStyles.css';
import BottomNav from '../components/BottomNav';
// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../main';
import { Button } from '@mui/material';

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
            <h2>Welcome to Pods. :) </h2>
            <h3>{user.email}</h3>
            <Button 
                onClick={() => signOutUser()}
                variant='outlined'
                color='secondary'
                style={{cursor: 'pointer'}}
                >
                Sign Out
            </Button>
        </> :
        <div className='account--login' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <h2>Hey, looks like you are not logged in :( </h2>
            <Button 
                onClick={() => navigate('/login')}
                variant='outlined'
                color='secondary'
                style={{cursor: 'pointer'}}
                >
                Sign me in!
            </Button>
        </div>
        }
        <BottomNav />
      </div>
  );
}
