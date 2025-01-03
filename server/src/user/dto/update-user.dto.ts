import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsEmpty()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}
