export default abstract class TagError<T = any> extends Error {

    abstract tag: string;

    data?: T;
}
