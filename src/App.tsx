import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';
import Board from './views/dashboard/Board';
import SignUp from './views/sign-up/SignUp';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/dashboard' element={<AppLayout />} />
                <Route path='/board' element={<Board />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
