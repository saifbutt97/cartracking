import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { isUnique } from "src/decorators/is-unique/is-unique.decorator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsEmail()
    @isUnique({tableName: 'users', column: 'email'})
    email:string;
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'this password is too weak.',
    })
    password:string;
}
