import { IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsUrl() 
  image: string;

  @IsString()
  categoryName: string;
}
