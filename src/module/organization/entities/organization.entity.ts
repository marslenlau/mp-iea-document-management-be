export class Organization {
    id: number;
    name: string;
    description?: string | null;
    status: boolean;
    organization: Organization;
    id_organization: number;
    created_at: Date;
    updated_at: Date;
}
