export enum Status {
    Loading = "loading",
    Success = "success",
    Error = "error"
}
export interface ICategory {
    id: string,
    name: string,
    description: string,
    createdAt: string
}
export interface ICategoryInitialState {
    categories: ICategory[],
    status: Status
}