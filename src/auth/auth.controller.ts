import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './interfaces/credentials.dto';
import { JwtToken } from './interfaces/jwt-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('jwt/create')
  async createJwt(@Body() credentials: Credentials): Promise<JwtToken> {
    return await this.authService.checkCredentials(credentials);
  }
}
