import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { theme } from './app/theme';
import AppLayout from './components/layout/AppLayout';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='/' element={<AppLayout />} />
                <Route path='/sign-in' element={<div>sign in</div>} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
