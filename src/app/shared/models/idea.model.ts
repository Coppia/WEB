import { ICreated } from './created.interface';
export class Idea implements ICreated {
    id: number;
    title: string;
    goal: string;
    status: string;
    created_by: string;
    created_datetime: Date;
    created_image_link: string;
    updated_by: string;
    updated_datetime: Date;
    updated_image_link: string;
}
