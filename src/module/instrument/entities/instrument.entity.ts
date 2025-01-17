export class Instrument {
    id: number;
    name: string;
    description?: string | null;
    status: boolean;
    instruments?: Instrument[];
    id_file?: number;
    created_at: Date;
    updated_at: Date;
}
