import { Post } from './../posts/post.entity';
import { Address } from './address.entity';
import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @Index()
    email: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @OneToOne(type => Address, { eager: true, cascade: true })
    @JoinColumn()
    address: Address;

    @OneToMany(type => Post, (post:Post) => post.author)
    posts: Post[];

    async validatePassword(password: string):Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, this.salt);
        return this.password === hashedPassword;    
    }
}