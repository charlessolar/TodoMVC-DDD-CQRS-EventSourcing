
export class Todo {
    constructor(data: any) {
        (<any>Object).assign(this, data);
    }
    id: string;
    active: boolean;

    message: string;
}