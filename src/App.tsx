import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import SignUp from './views/sign-up/SignUp';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='/sign-in' element={<SignUp />} />
                <Route path='/' element={<AppLayout />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
