import { ICreated } from './created.interface';
export class Snippet implements ICreated {
    id: number;
    text: string;
    interview_id: number;
    created_by: string;
    created_datetime: Date;
    created_image_link: string;
    updated_by: string;
    updated_datetime: Date;
    updated_image_link: string;
}
