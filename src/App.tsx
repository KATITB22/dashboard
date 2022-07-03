import { Suspense, useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Routing } from './routing';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import { UserContext } from './context';
import APIClient from './utils/api-client';

function App() {
    const [user, setUser] = useState({});
    document.title = 'Dashboard - KAT ITB 2022'
    useEffect(() => {
        APIClient.checkToken(false).then((result) => setUser(result));
    }, [])
    return (
        <UserContext.Provider value={user}>
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Routes>
                        {Routing.map((route) => {
                            const Component = route.component;
                            return (
                                <Route
                                    caseSensitive
                                    path={route.path}
                                    key={route.path}
                                    element={<Component />}
                                />
                            );
                        })}
                    </Routes>
                </BrowserRouter>
            </Suspense>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </UserContext.Provider>
    );
}

export default App;
