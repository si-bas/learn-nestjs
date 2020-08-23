import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'users'
})
@Unique(['username'])
export class User extends BaseEntity {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    static passwordMinLength: number = 7;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()    
    username: string;
        
    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    salt: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;    

    @BeforeInsert()
    passwordHash(): void {
        this.salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, this.salt);
    }

    validatePassword(password: string): boolean {
        const hash = bcrypt.hashSync(password, this.salt);
        return hash === this.password;
    }

    toJSON(): any {
        return classToPlain(this);
    }
}