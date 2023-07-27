import BottomNav from '../components/BottomNav';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function Account() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <PermIdentityOutlinedIcon />

            <span>Manage your account</span>

            <button>Sign Out</button>
            <BottomNav />
        </div>
    )
}