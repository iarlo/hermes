import type { DateArg } from "date-fns";

interface IDataUtilidades {
  formatar(termo: DateArg<Date>, formato: string): string;
  separarDatas(termo: string, separador: string): string[];
  validar(dataString: string, formato: string): boolean;
  validarDia(diaString: string): boolean;
  validarMes(mesString: string): boolean;
}

export type { IDataUtilidades };
