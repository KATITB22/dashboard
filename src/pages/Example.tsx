const PageFactory = (content: string) => () =>
    (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <h1 className="text-3xl font-bold text-cyan-400">{content}</h1>
        </div>
    );

export const DefaultPage = PageFactory(
    import.meta.env.VITE_APP_TITLE || 'Template Project'
);
export const Page1 = PageFactory('Page 1');
export const Page2 = PageFactory('Page 2');
export const Page3 = PageFactory('Page 3');
export const PageNotFound = PageFactory('Page Not Found');
