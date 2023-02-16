import ITokenService from "../../AplicationBusiness/services/ITokenService";

export default class TokenService implements ITokenService {
    generateToken<T>(data: T): string {
        return "123";
    }
}
