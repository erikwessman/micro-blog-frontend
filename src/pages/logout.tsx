import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenManager from "@/utils/userManager";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenManager = new TokenManager();
        tokenManager.removeToken();
        navigate("/");
    }, [navigate])

    return (
        <div>
            Logging out, please wait...
        </div>
    )
}