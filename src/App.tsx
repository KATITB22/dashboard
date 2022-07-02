import { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Routing } from './routing';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
