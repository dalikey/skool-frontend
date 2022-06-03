import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';
import SignIn from './views/sign-in/SignIn';
import ForgotPassword from './views/forgot-password/ForgotPassword';
import ConfirmPassword from './views/forgot-password/ConfirmPassword';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/' element={<AppLayout />} />
                <Route
                    path='/wachtwoord-vergeten'
                    element={<ForgotPassword />}
                />
                <Route
                    path='/bevestig-wachtwoord'
                    element={<ConfirmPassword />}
                />
                <Route path='' element={<div>dashboard</div>} />
                <Route path='workshops' element={<div>workshops</div>} />
                <Route path='profiel' element={<div>profiel</div>} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
