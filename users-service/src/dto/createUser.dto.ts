import { Region } from 'src/entity/region.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsDateString,
  MaxDate,
  IsAlpha,
} from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsDateString()
  @MaxDate(new Date())
  birthDate: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(Region)
  region: Region;
}
