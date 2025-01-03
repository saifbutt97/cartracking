import { SignUpDto } from './dto/sign-up.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRoles } from '../user-roles.enum';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<void> {
        return this.userRepository.signUp(signUpDto);
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string, userRole: UserRoles, message: string }> {
        const user = await this.userRepository.signIn(signInDto);
        if(!user) {
            throw new UnauthorizedException('Incorrect Email or Password');
        }
        const { id, name, email, role } = user;
        const payload: JwtPayload = { id, name, email, role };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken, userRole: role, message: 'User Logged In Successfully' };
    }

}
