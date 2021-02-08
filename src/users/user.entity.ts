import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    async validatePassword(password: string):Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, this.salt);
        return this.password === hashedPassword;    
    }
}