import { Strip } from "../objects/strip";

export interface IPlayerConstructor {
  strip: Strip;
  name: string;
  color: number;
  position: number;
}
