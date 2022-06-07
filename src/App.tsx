import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';
import SignIn from './views/sign-in/SignIn';
import UserManagement from './views/user-management/UserManagement';
import Workshops from './views/workshops/Workshops';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='' element={<AppLayout />}>
                    <Route path='dashboard' element={<div></div>} />
                    <Route path='gebruikersbeheer' element={<UserManagement />} />
                    <Route path='workshops' element={<Workshops/>} />
                    <Route path='profiel' element={<div></div>} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
