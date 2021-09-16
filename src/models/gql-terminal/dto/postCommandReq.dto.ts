import { IsNumber, IsString } from "class-validator";

export class postCommandReq {
  @IsNumber()
  id: number;

  @IsString()
  cli: number;
}
