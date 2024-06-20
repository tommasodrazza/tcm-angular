export interface ApiHttpRequest<T> {
    result: boolean,
    message: string,
    code: number,
    listInfo: {
        total: number,
        pages: number
    }
    content: T[],
}