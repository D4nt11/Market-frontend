import api from "../http/axios"


export default class AuthService {
    static async login(email: string, password: string): Promise{
        return api.post()        
    }
}