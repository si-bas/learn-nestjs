import { PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

export class UserPasswordPipe implements PipeTransform {
    constructor(private readonly configService: ConfigService) {}

    transform(value: string): string {
        const password = bcrypt.hashSync(value, Number(this.configService.get<string>('HASH_SALT')));

        return password;
    }
}