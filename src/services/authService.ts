import api from "../api/api"


export const AuthService = {
     async loginClient(data: any){
        const response = await api.post("/auth/client/sign-in", data);
        return response;
    },

    async registrationCLient(data: any){
        const response = await api.post("/auth/client/sign-up", data);
        return response;
    },
    async loginSeller(data: any){
       const response = await api.post("/auth/seller/sign-in", data);
       return response;
   },

   async registrationSeller(data: any){
       const response = await api.post("/auth/seller/sign-up", data);
       return response;
   },
    }