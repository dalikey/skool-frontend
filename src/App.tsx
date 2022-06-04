import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';
import SignIn from './views/sign-in/SignIn';
import Board from './views/dashboard/Board';
import RegistrationManagement from './views/user-management/RegistrationManagement';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='' element={<AppLayout />}>
                    <Route path='dashboard' element={<Board />} />
                    <Route path='registraties' element={<RegistrationManagement />} />
                    <Route path='workshops' element={<div>workshops</div>} />
                    <Route path='profiel' element={<div>profiel</div>} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
