export default interface IHashService {
    hashUserPassword(text: string): string;
    compareUserPassword(text: string, hashedText: string): boolean;
}
