import {
  Body,
  Post,
  Controller,
  Logger,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserRoles } from '../user-roles.enum';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    try {
      await this.authService.signUp(signUpDto);
      return { message: 'User Registered Successfully' };
    } catch (error) {
      this.logger.error(
        `Error in signup user. Data: ${JSON.stringify(
          signUpDto,
        )}, error: ${error}`,
      );
      throw new InternalServerErrorException();
    }
  }

  @Post('/signin')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; userRole: UserRoles; message: string }> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (error) {
      this.logger.error(
        `Error in signin user. Data: ${JSON.stringify(
          signInDto,
        )}, error: ${error}`,
      );
      return error.status === 401 ? error.response : error;
    }
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('/test')
  test(@GetUser() user: User) {
    console.log(user);
  }
}
