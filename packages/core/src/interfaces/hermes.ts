import type { Slot } from "./slots";

type Mascara = Array<Slot | string>;

interface HermesConfig {
  mascara: Mascara;
  pularLiterais?: boolean;
  aoMudar?: (valor: string, valorFormatado?: string) => void;
  aoCompletar?: (valor: string, valorFormatado?: string) => void;
}

interface IHermes {
  readonly listaRegexes: (RegExp | string)[];
  readonly regexCompleto: RegExp;
  mascara: Mascara;
  placeholder: string;
  slotAtual: Slot | null;

  formatar: (termo: string) => string;
  validarSlots: (valorFormatado: string) => boolean;
  aoMudar: (
    valor: string,
    valorBruto: string,
  ) => { bruto: string; formatado: string };
}

export type { HermesConfig, IHermes };
