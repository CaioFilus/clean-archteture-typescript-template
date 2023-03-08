import TagError from "@/EnterpriseBusiness/errors/TagError";

export default abstract class FormFieldError extends Error implements TagError {
    abstract tag: string;
}
