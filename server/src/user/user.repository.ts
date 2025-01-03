import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { SignUpDto } from "./auth/dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import { SignInDto } from "./auth/dto/sign-in.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { name, email, password } = signUpDto;
    const user = new User();
    const salt = await bcrypt.genSalt();
    user.name = name;
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    try {
      await user.save();
    } catch (error) {
      this.logger.error(`There was some error in creating user. Date: ${JSON.stringify(signUpDto)}, error: ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const { email, password } = signInDto;
    const user = await this.findOne({ 
      select: ['id', 'name', 'email', 'password', 'role', 'salt'], 
      where: { email } 
    });
    if(user && await user.validatePassword(password)) {
      return user;
    } else { 
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}