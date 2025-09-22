import type { Slot } from "./slots";

interface IRegexUtilidades {
  juntarRegex(valores: (RegExp | string)[]): RegExp;
  gerarArrayRegex(valores: (Slot | string)[]): (RegExp | string)[];
}

export type { IRegexUtilidades };
