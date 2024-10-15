import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  getUserByEmail(email: string) {
    const user = this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  comparePassword(password: string, hashedPassword: string) {
    return password === hashedPassword;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
