export class Instrument {
    id: number;
    name: string;
    description?: string | null;
    status: boolean;
    instruments?: Instrument[];
    created_at: Date;
    updated_at: Date;
}
