import { useNavigate } from "react-router-dom";

interface NavTabProps {
    url: string;
    children: React.ReactNode;
}

export const NavTab = ({ url, children }: NavTabProps) => {
    const navigate = useNavigate();
    return (<div onClick={() => {
        navigate(url);
    }}>
        {children}
    </div>)
};