import PeopleShip from "./People";

enum EngineTypes { 'diesel', 'electric', 'propulsion' }

export default class Yacht extends PeopleShip{
    constructor(id?: string, signature?: string, draft?: number, lenght?: number, onBoardPeople?: number, peopleCapacity?: number, engineType?: EngineTypes) {
        super(id, signature, draft, lenght, onBoardPeople, peopleCapacity);
        this.engineType = engineType ?? 0;
    }
    engineType!: EngineTypes;
}