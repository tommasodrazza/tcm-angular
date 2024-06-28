import Ship from "./Ship";

export default class ContainerCargo extends Ship{
    
    constructor(id?: string, signature?: string, draft?: number, lenght?: number, dwt?: number, containers?: Array<string>, availableVolume?: number, occupatedVolume?: number) {
        super(id, signature, draft, lenght);
        this.dwt = dwt ?? 0;
        this.availableVolume = availableVolume ?? 0;
        this.occupatedVolume = occupatedVolume ?? 0;
        this.containers = containers ?? [];
    }
    dwt!: number;
    containers: Array<string> = [];
    availableVolume: number = 0;
    occupatedVolume: number = 0;
}