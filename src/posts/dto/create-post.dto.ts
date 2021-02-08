import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}