export class APIErrorObject {
    private errorName: string;

    private message: string;

    public metadata?: Record<string, any>;

    constructor(errorName?: string, message?: string, metadata?: any) {
        this.errorName = 'Error';
        this.message = 'An error unknown has occured.';

        if (errorName) {
            this.errorName = errorName;
        }

        if (message) {
            this.message = message;
        }

        if (metadata) {
            this.metadata = metadata;
        }
    }

    public toString(): string {
        return `${this.errorName}: ${this.message}`;
    }

    public getMessage(): string {
        return this.message;
    }
}
