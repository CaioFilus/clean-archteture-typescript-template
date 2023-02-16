import IHashService from "../../AplicationBusiness/services/IHashService";

export default class HashService implements IHashService {
    compareSha256(text: string, hashedText: string): boolean {
        return text === hashedText
    }

    sha256(text: string): string {
        return "123";
    }

}
