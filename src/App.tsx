import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';
import SignIn from './views/sign-in/SignIn';
import UserManagement from './views/user-management/UserManagement';
import WorkshopManagement from './views/workshop-management/WorkshopOverview';
import Profile from './views/profile/Profile';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='' element={<AppLayout />}>
                    <Route path='dashboard' element={<div></div>} />
                    <Route path='workshops' element={<div></div>} />
                    <Route
                        path='gebruikersbeheer'
                        element={<UserManagement />}
                    />
                    <Route
                        path='workshopbeheer'
                        element={<WorkshopManagement />}
                    />
                    <Route path='profiel' element={<Profile />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
