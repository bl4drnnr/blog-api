import { Matches } from 'class-validator';
import { EmailRegex } from '@regex/email.regex';
import { PasswordRegex } from '@regex/password.regex';
import { ValidationError } from '@enums/validation-error.enum';
import { ApiProperty } from '@nestjs/swagger';
import { DocsProperty } from '@enums/docs-property.enum';

export class RegistrationDto {
  @ApiProperty({
    type: String,
    description: DocsProperty.EMAIL_DESC,
    example: DocsProperty.EMAIL_EXAMPLE
  })
  @Matches(EmailRegex, { message: ValidationError.WRONG_EMAIL_FORMAT })
  readonly email: string;

  @ApiProperty({
    type: String,
    description: DocsProperty.PASSWORD_DESC,
    example: DocsProperty.PASSWORD_EXAMPLE
  })
  @Matches(PasswordRegex, {
    message: ValidationError.WRONG_PASSWORD_FORMAT
  })
  readonly password: string;
}
