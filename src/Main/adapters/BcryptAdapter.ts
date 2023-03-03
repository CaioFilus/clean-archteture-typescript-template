import {IHashAdapter} from "@/InterfaceAdapters/services/HashService";
import {bcrypt} from "bcrypt";


export default class BcryptAdapter implements IHashAdapter {
    compare256(text: string, hashedText: string): boolean {
        return bcrypt.compareSync(text, hashedText);
    }

    sha256(text: string): string {
        return bcrypt.hashSync(text, 10);
    }
}
