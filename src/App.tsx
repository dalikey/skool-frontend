import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';
import SignIn from './views/sign-in/SignIn';
import RegistrationManagement from './views/user-management/RegistrationManagement';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='' element={<AppLayout />}>
                    <Route path='dashboard' element={<div></div>} />
                    <Route path='gebruikersbeheer' element={<RegistrationManagement />} />
                    <Route path='workshops' element={<div></div>} />
                    <Route path='profiel' element={<div></div>} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
