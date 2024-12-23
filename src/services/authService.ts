import api from "../http/axios"


export const AuthService = {
     async login(data: any){
        const response = await api.post("/auth/client/sign-in", data);
        return response;
    },

    async registration(data: any){
        const response = await api.post("/auth/client/sign-up", data);
        return response;
    },
    }