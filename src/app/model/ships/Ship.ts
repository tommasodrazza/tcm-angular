export default class Ship {
    constructor(id: string, signature: string, draft: number, lenght: number) {
        this.id = id;
        this.signature = signature;
        this.draft = draft;
        this.length = lenght;
    }

    id!: string;
    signature!: string;
    draft!: number;
    length!: number;
}