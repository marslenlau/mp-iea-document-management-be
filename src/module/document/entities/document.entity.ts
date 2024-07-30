export class Document {
    id: number;
    name: string;
    description?: string | null;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}
