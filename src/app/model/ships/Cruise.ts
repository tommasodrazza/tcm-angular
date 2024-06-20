import PeopleShip from "./People";

export default class Cruise extends PeopleShip{
    constructor(id: string, signature: string, draft: number, lenght: number, onBoardPeople: number, peopleCapacity: number, nRooms: number) {
        super(id, signature, draft, lenght, onBoardPeople, peopleCapacity);
        this.nRooms = nRooms;
    }
    nRooms!: number;
}