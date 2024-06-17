enum ToolTypes { 'gru', 'gangway', 'tankPump' }

export default class Tool {
    constructor(id: string, toolType: ToolTypes, isFree?: boolean, usingShip?: string ) {
        this.toolId = id;
        this.toolType = toolType;
        this.isFree = isFree ?? false;
        this.usingShip = usingShip ?? "";
    }
    toolId!: string;
    toolType!: ToolTypes;
    isFree: boolean = false;
    usingShip: string = "";
}