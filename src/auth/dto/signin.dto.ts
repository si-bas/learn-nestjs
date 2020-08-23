import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "../user.entity";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(User.passwordMinLength)
    password: string;
}