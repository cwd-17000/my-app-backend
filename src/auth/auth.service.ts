import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // adjust path if needed

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string) {
    // 1) Look up the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2) For now, compare plain text (later: use bcrypt)
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3) Return whatever token/payload you want
    return {
      token: 'fake-token-123',
      email: user.email,
    };
  }
}
