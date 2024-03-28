import { IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsUrl() // Updated: Validate image URL
  image: string;

  @IsString()
  categoryName: string;
}
