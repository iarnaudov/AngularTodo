import { Status } from "../enums/Status";

export interface ITodoViewModel {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    isDone: boolean;
    status: Status;
    statusCss?: string;
}
