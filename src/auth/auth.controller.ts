import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')    
    public signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.authService.createNewUser(signUpDto);
    }

    @Post('/signin')    
    public signIn(@Body() signInDto: SignInDto): Promise<User> {
        return this.authService.validateUserpassword(signInDto);
    }
}
