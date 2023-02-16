export default interface IHashService {
    sha256(text: string): string;
    compareSha256(text: string, hashedText: string): boolean;
}
