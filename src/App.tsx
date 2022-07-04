import { Suspense, useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Routing } from './routing';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import { UserContext } from './context';
import APIClient from './utils/api-client';
import { Login } from './pages/Login';
import { Spin } from 'antd';

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState({});
    document.title = 'Dashboard - KAT ITB 2022'
    useEffect(() => {
        APIClient.checkToken().then((result) => {
            setUser(result);
            setLoggedIn((Object.keys(result).length > 0));
            setLoading(false);
        }).catch(() => {
            setLoggedIn(false);
            setLoading(false);
        });
    }, [isLoggedIn]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <UserContext.Provider value={{ user, setUser, setLoggedIn }}>
                <Suspense fallback={<div>Loading...</div>}>
                    {isLoggedIn ? (<BrowserRouter>
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
                    </BrowserRouter>) : (isLoggedIn === null) ?
                        <div className='w-screen h-screen bg-zinc-800 opacity-70' /> :
                        <Login setState={setLoggedIn} />}
                </Suspense>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable={false}
                />
            </UserContext.Provider>
        </Spin>
    );
}

export default App;
