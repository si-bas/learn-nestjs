import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "../user.entity";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(User.passwordMinLength)
    password: string;
}