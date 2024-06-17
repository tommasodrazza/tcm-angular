import Ship from "../model/ships/Ship";

export interface ApiHttpRequest<Type> {
    result: boolean,
    message: string,
    code: number,
    content : ApiHttpRequestContent<Type>
}

interface ApiHttpRequestContent<Type> {
    info: {
        total: number;
        pages: number;
    };
    value: Type[];
}
