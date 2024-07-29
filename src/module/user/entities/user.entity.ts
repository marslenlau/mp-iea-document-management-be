import { File } from "src/module/file/entities/file.entity";
import { Role } from "../interfaces";

export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    phone?: string;
    description?: string;
    rol: Role;
    status: boolean;
    file?: File;
    id_file?: number;
    created_at: Date;
    updated_at: Date;
}
