import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @ApiProperty()
  phoneNumber: number;

  @ApiProperty()
  password: string;
}
