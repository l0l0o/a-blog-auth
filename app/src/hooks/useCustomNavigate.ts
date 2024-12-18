import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
    const navigate = useNavigate();
    const customNavigate = (path: string) => {
        navigate(path);
    }

    return customNavigate;
}
 
export default useCustomNavigate;