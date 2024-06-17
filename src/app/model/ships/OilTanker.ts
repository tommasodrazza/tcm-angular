import Ship from "./Ship";

export default class OilTanker extends Ship{
    constructor(id: string, signature: string, draft: number, lenght: number, dwt: number, tanks?: Array<string>) {
        super(id, signature, draft, lenght);
        this.dwt = dwt;
        this.tanks = tanks ?? [];
    }
    dwt!: number;
    tanks: Array<string> = [];
}