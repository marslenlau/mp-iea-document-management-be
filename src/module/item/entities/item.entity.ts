import { Organization } from "@prisma/client";

export class Item {
    id: number;
    status: string;
    organization?: Organization;
    id_organization?: number;
    created_at: Date;
    updated_at: Date;
}
