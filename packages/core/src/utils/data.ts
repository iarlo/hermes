import { format, type DateArg, parse, isValid } from "date-fns";
import type { IDataUtilidades } from "../interfaces/data";
import { staticImplements } from "./staticImplements";

@staticImplements<IDataUtilidades>()
class DataUtilidades {
  public static readonly formatoPadrao = "dd/MM/yyyy";

  /**
   * Formata uma data no formato especificado ou no formato padrão (dd/MM/yyyy).
   * @param {Date} termo - A data a ser formatada.
   * @param {string} [formato] - O formato a ser utilizado. Se não for definido, o formato padrão será utilizado.
   * @returns {string} A data formatada.
   */
  public static formatar(
    termo: DateArg<Date>,
    formato = this.formatoPadrao,
  ): string {
    return format(termo, formato);
  }

  /**
   * Separa uma string de datas em um array de strings.
   * @param {string} termo - A string a ser separada.
   * @param {string} separador - O separador a ser utilizado.
   * @returns {string[]} O array de strings separadas.
   */
  public static separarDatas(termo: string, separador: string): string[] {
    return termo.split(separador);
  }

  /**
   * Valida se uma string de data corresponde a uma data válida.
   * Leva em conta meses com 30/31 dias e anos bissextos.
   * @param {string} dataString - A string da data a ser validada.
   * @param {string} [formato] - O formato da string de data. O padrão é "dd/MM/yyyy".
   * @returns {boolean}
   */
  public static validar(
    dataString: string,
    formato = this.formatoPadrao,
  ): boolean {
    const dataParseada = parse(dataString, formato, new Date());
    return isValid(dataParseada);
  }

  /**
   * Valida se um valor de dia é possível.
   * @param {string} diaString - O dia a ser validado
   * @returns {boolean}
   */
  public static validarDia(diaString: string): boolean {
    if (!/^\d+$/.test(diaString)) return false;
    const dia = parseInt(diaString, 10);
    return dia >= 1 && dia <= 31;
  }

  /**
   * Valida se um valor de mês é possível.
   * @param {string} mesString - O mês a ser validado
   * @returns {boolean}
   */
  public static validarMes(mesString: string): boolean {
    if (!/^\d+$/.test(mesString)) return false;
    const mes = parseInt(mesString, 10);
    return mes >= 1 && mes <= 12;
  }
}

export { DataUtilidades };
