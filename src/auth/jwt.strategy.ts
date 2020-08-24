import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: { username: string }): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });

        if (!user)
            throw new UnauthorizedException('Invalid credentials');
        
        return user;
    }
}