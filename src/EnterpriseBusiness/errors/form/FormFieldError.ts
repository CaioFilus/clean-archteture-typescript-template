import TagError from "@/EnterpriseBusiness/errors/TagError";

export default abstract class FormFieldError extends TagError {
    abstract tag: string;
}
