import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

import { UserDto } from './interfaces/user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  findAll() {
    return this.userRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRepository.findOneUser(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userRepository.updateUser(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRepository.removeUser(id);
  }
}
