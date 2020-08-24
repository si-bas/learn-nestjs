import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService 
    ) {}
    
    public async createNewUser(signUpDto: SignUpDto): Promise<User> {
        const user = this.userRepository.create(signUpDto);
        
        try {
            await user.save();
        } catch (error) {            
            if (error.code === '23505')
                throw new ConflictException('Username already exists');
            
            throw new InternalServerErrorException();            
        }        
    
        return user;
    }
    
    public async validateUserpassword(sigInDto: SignInDto): Promise<any> {
        const { username, password } = sigInDto;
        const user = await this.userRepository.findOne({ username });        
        
        if (!user || !user.validatePassword(password))
            throw new UnauthorizedException('Invalid credentials');

        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        
        return { accessToken };
    }
}