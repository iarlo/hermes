import type { IRegexUtilidades } from "../interfaces/regex";
import type { Slot } from "../interfaces/slots";
import { staticImplements } from "./staticImplements";

@staticImplements<IRegexUtilidades>()
class RegexUtilidades {
  /**
   * Juntar um array de regex e strings em um único regex.
   * @param {Array<RegExp|string>} valores - O array de regex e strings.
   * @returns {RegExp} A regex gerada.
   */
  public static juntarRegex(valores: (RegExp | string)[]) {
    const valor = valores.reduce((acumulador, valor) => {
      return (
        acumulador +
        (valor instanceof RegExp ? valor.source : new RegExp(valor).source)
      );
    }, "");
    return valor instanceof RegExp ? valor : new RegExp(valor);
  }

  /**
   * Gera um array de regex a partir de um array de slots ou strings.
   * Se o valor for uma string, ele será retornado como um regex pronto para uso.
   * Se o valor for um slot, uma regex será gerada com o padrão do slot e comprimento.
   * @param {Array<Slot|string>} valores - O array de slots ou strings.
   * @returns {Array<RegExp>} O array de regex gerado.
   */
  public static gerarArrayRegex(valores: (Slot | string)[]) {
    return valores.map((slot) => {
      if (typeof slot === "string") return slot;
      return new RegExp(slot.padrao.source + `{${slot.placeholder.length}}`);
    });
  }
}

export { RegexUtilidades };
