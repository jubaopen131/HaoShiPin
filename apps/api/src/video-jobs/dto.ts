import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateVideoJobDto {
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  productUrl?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  productCopy?: string;
}
