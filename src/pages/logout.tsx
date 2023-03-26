import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenManager from "@/utils/tokenManager";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenManager = new TokenManager();
        tokenManager.removeToken();
        setTimeout(() => {
            navigate("/");
        }, 500)
    }, [navigate])

    return (
        <div>
            Logging out, please wait...
        </div>
    )
}