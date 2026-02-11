import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    // Hardcoded demo user
    if (email === 'test@example.com' && password === 'password123') {
      return {
        token: 'fake-token-123',
        email,
      };
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}