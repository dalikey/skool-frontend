import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';
import SignIn from './views/sign-in/SignIn';
import Profile from './views/profile/Profile';
import UserManagement from './views/user-management/UserManagement';
import WorkshopsManagement from './views/workshop-management/Workshops';
import CustomerManagement from './views/customer-management/CustomerManagement';
import ShiftManagement from './views/shift-management/ShiftManagement';
import Shifts from './views/shifts/Shifts';
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='' element={<AppLayout />}>
                    <Route path='dashboard' element={<div></div>} />
                    <Route
                        path='gebruikersbeheer'
                        element={<UserManagement />}
                    />
                    <Route path='shifts' element={<Shifts />} />
                    <Route
                        path='workshopbeheer'
                        element={<WorkshopsManagement />}
                    />
                    <Route path='profiel' element={<Profile />} />

                    <Route path='shiftbeheer' element={<ShiftManagement />} />
                    <Route
                        path='klantenbeheer'
                        element={<CustomerManagement />}
                    />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
