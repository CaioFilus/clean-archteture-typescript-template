import {z} from "zod";

export default {
    string (opts: {minLength?: number, maxLength?: number} = {}) {
        const validator = z.string();
        if (opts.minLength) validator.min(opts.minLength);
        if (opts.maxLength) validator.max(opts.maxLength);
        return validator;
    },
    number(opts: {min?: number, max?: number} = {}) {
        const validator = z.number();
        if (opts.min) validator.min(opts.min);
        if (opts.max) validator.max(opts.max);
        return validator;
    },
    enum: <T>(values: [ T, ...(T)[]]) => z.enum(['2']),
    email: () => z.string().email(),
    password: () => z.string().min(6),
}
