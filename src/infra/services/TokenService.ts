import ITokenService from "../../data/services/ITokenService";

export default class TokenService implements ITokenService {
    generateToken<T>(data: T): string {
        return "123";
    }
}
