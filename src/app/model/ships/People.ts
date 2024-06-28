import Ship from "./Ship";

export default class PeopleShip extends Ship{
    constructor(id?: string, signature?: string, draft?: number, lenght?: number, onBoardPeople?: number, peopleCapacity?: number) {
        super(id, signature, draft, lenght);
        this.peopleCapacity = peopleCapacity ?? 0;
        this.onBoardPeople = onBoardPeople ?? 0;
    }

    onBoardPeople!: number;
    peopleCapacity!: number;
}