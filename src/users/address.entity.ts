import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;
    
    @Column()
    city: string;

    @Column()
    country: string;

    @OneToOne(type => User, (user: User) => user.address)
    public user: User;
}