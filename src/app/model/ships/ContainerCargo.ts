import Ship from "./Ship";

export default class ContainerCargo extends Ship{
    constructor(id: string, signature: string, draft: number, lenght: number, dwt: number, containers?: Array<string>) {
        super(id, signature, draft, lenght);
        this.dwt = dwt;
        this.containers = containers ?? [];
    }
    dwt!: number;
    containers: Array<string> = [];
}