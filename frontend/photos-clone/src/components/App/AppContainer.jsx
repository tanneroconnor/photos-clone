import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../../../App.css'
import { MantineProvider } from '@mantine/core';
import {NotificationsProvider} from "@mantine/notifications";

function AppContainer() {
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("dark-mode")) && true);

    const handleToggle = () => {
        setIsDarkMode(prevState => !prevState);
    };

    useEffect(() => {
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
            <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }}>
                <NotificationsProvider position="bottom-right">
                    <App isDarkMode={isDarkMode} handleToggle={handleToggle}/>
                </NotificationsProvider>
            </MantineProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppContainer />)
