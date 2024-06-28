import Tool from "./Tool";
import Ship from "./ships/Ship";

export default class Dock {
    
    constructor(id?: string, length?: number, tools?: Array<Tool>, dockedShips?: Array<Ship>) {
        this.id = id = "";
        this.length = length ?? 0;
        this.tools = tools ?? [];
        this.dockedShips = dockedShips ?? [];
    }

    id!: string;
    length!: number;
    tools: Array<Tool> = [];
    dockedShips: Array<Ship> = [];
}