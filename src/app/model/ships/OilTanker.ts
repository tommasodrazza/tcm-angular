import Ship from "./Ship";

class Tank{
    id!: string;
    capacity!: number;
    liquid!: string;
    isFull!: boolean;
}

export default class OilTanker extends Ship{
    constructor(id?: string, signature?: string, draft?: number, lenght?: number, dwt?: number, tanks?: Array<Tank>) {
        super(id, signature, draft, lenght);
        this.dwt = dwt ?? 0;
        this.tanks = tanks ?? [];
    }
    dwt!: number;
    tanks: Array<Tank> = [];
    literCapacity: number = 0;
    literEffective: number = 0;
}