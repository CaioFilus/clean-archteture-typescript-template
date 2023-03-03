import IHashService from "../../AplicationBusiness/services/IHashService";

export interface IHashAdapter {
    compare256(text: string, hashedText: string): boolean;
    sha256(text: string): string;
}

export default class HashService implements IHashService {
    constructor(readonly hashAdapter: IHashAdapter) {
    }

    hashUserPassword(text: string): string {
        return this.hashAdapter.sha256(text);
    }

    compareUserPassword(text: string, hashedText: string): boolean {
        return this.hashAdapter.compare256(text, hashedText);
    }
}
