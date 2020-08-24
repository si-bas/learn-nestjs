import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    public signIn(@Body() signInDto: SignInDto): Promise<{ accessToken }> {
        return this.authService.validateUserpassword(signInDto);
    }

    @UseGuards(AuthGuard())
    @Post('/test')
    public test(@Req() req): void {
        console.log(req);
    }
}
