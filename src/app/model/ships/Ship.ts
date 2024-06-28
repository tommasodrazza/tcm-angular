export default class Ship {

    constructor(id?: string, signature?: string, draft?: number, lenght?: number) {
        this.id = id ?? "";
        this.signature = signature ?? "";
        this.draft = draft ?? 0;
        this.length = lenght ?? 0;
    }

    id!: string; 
    signature!: string;
    draft!: number;
    length!: number;
}