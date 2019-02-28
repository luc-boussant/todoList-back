import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Credentials } from './interfaces/credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { JwtToken } from './interfaces/jwt-token.interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async checkCredentials(credentials: Credentials): Promise<JwtToken> {
    let user: User;
    try {
      user = await this.userRepository.findOneOrFail({ email: credentials.email });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      throw error;
    }
    const areCredentialsValid = await compare(credentials.password, user.password);
    if (!areCredentialsValid) {
      throw new UnauthorizedException();
    }
    return this.createJwt(user);
  }

  createJwt(user: User): JwtToken {
    const jwtPayload: JwtPayload = { userId: user.id };
    const access = this.jwtService.sign(jwtPayload);
    return {
      access,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(payload.userId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UnauthorizedException();
      }
      throw error;
    }
  }
}
