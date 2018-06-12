export interface Entity<T> {
    fromObject(json: object): T;
    toPostObject(): object;
}