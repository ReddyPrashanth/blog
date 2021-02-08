import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class UpdatePostDto {
    @IsNumber()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}