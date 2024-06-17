import Ship from "./Ship";

export default class PeopleShip extends Ship{
    constructor(id: string, signature: string, draft: number, lenght: number, onBoardPeople: number, peopleCapacity: number) {
        super(id, signature, draft, lenght);
        this.peopleCapacity = peopleCapacity;
        this.onBoardPeople = onBoardPeople;
    }

    onBoardPeople!: number;
    peopleCapacity!: number;
}