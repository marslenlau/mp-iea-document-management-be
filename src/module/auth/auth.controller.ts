import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthVerifyDto } from './dto/auth-verify.dto';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  authentication(@Body() authVerifyDto: AuthVerifyDto) {
    return this.authService.authentication(authVerifyDto);
  }
  
  @Get('private')
  @Auth(  ValidRoles.ADMIN )
  privateRoute(
    @GetUser() user: User
  ){
    return {
      ok: true,
      user
    };
  }
}
