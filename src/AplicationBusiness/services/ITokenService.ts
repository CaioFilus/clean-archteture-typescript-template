export default interface ITokenService {
    generateToken<T>(data: T): string;
}
