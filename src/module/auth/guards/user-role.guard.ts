import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/module/user/entities/user.entity";
import { META_ROLES } from "../decorators/role-protected.decorator";

@Injectable()
export class UserRoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: string[] = this.reflector.get( META_ROLES , context.getHandler() )
        if ( !validRoles ) return true;
        if ( validRoles.length === 0 ) return true;
        const req = context.switchToHttp().getRequest();
        const user = req.user as User;
        if ( !user ) 
            throw new BadRequestException('User not found');
        if ( validRoles.includes( user.rol ) ) {
            return true;
        }
        throw new ForbiddenException(
            `User ${ user.first_name } need a valid role: [${ validRoles }]`
        );
    }
}