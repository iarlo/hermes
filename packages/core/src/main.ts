import type { HermesConfig, IHermes } from "./interfaces/hermes";
import { Slot } from "./interfaces/slots";
import { RegexUtilidades } from "./utils/regex";
import { SeparadoresUtilidades } from "./utils/separadores";
import { DataUtilidades } from "./utils/data";

class Hermes implements IHermes {
  slotAtual: Slot | null = null;

  constructor(private readonly config: HermesConfig) {}

  public get mascara() {
    return this.config.mascara;
  }

  public get placeholder() {
    return this.criarPlaceholder();
  }

  public get regexCompleto() {
    return RegexUtilidades.juntarRegex(this.listaRegexes);
  }

  private criarPlaceholder() {
    return this.config.mascara
      .map((slot) => (typeof slot === "string" ? slot : slot.placeholder))
      .join("");
  }

  public get listaRegexes() {
    return RegexUtilidades.gerarArrayRegex(this.config.mascara);
  }

  private _corrigirValorZero(parte: string, slot: Slot): string {
    const { placeholder, minimo } = slot;
    return placeholder &&
      parte.length === placeholder.length &&
      Number(parte) === 0 &&
      minimo === 1
      ? "01"
      : parte;
  }

  private _limitarValorMaximo(parte: string, slot: Slot): string {
    const { placeholder, maximo } = slot;
    return placeholder &&
      maximo &&
      parte.length === placeholder.length &&
      Number(parte) > maximo
      ? maximo.toString().padStart(placeholder.length, "0")
      : parte;
  }

  private _processarSlotLiteral(
    slot: string,
    mascara: (string | Slot)[],
    indice: number,
    indiceRelativo: number,
  ): string | null {
    const anterior = mascara[indice - 1];
    return anterior &&
      typeof anterior !== "string" &&
      indiceRelativo >= anterior.placeholder.length
      ? slot
      : null;
  }

  private _processarSlotNumerico(
    slot: Slot,
    valorLimpo: string,
    indice: number,
  ): { parte: string; indice: number } {
    const tamanhoSlot = slot.placeholder?.length ?? 0;
    const parte = valorLimpo.substring(indice, indice + tamanhoSlot);

    if (
      slot.maximo &&
      parte.length === 1 &&
      tamanhoSlot === 2 &&
      Number(parte) > Number(slot.maximo.toString()[0])
    ) {
      return { parte: "0" + parte, indice: indice + parte.length + 1 };
    }

    return {
      parte: this._limitarValorMaximo(
        this._corrigirValorZero(parte, slot),
        slot,
      ),
      indice: indice + parte.length,
    };
  }

  public formatar(termo: string): string {
    const valorLimpo = termo.replace(/\D/g, "");
    if (!valorLimpo) return "";

    const resultado = [];

    for (let i = 0, j = 0; i < this.mascara.length; i++) {
      if (j >= valorLimpo.length) break;

      const slot = this.mascara[i];

      if (typeof slot === "string") {
        const literal = this._processarSlotLiteral(slot, this.mascara, i, j);
        if (literal) {
          resultado.push(literal);
        }
        continue;
      }

      if (!slot) continue;
      const { parte, indice } = this._processarSlotNumerico(
        slot,
        valorLimpo,
        j,
      );
      resultado.push(parte);
      j = indice;
    }
    return resultado.join("");
  }

  public validarSlots(valorFormatado: string): boolean {
    let currentPos = 0;
    for (const slot of this.mascara) {
      if (typeof slot === "string") {
        currentPos += slot.length;
        continue;
      }

      const tamanhoSlot = slot.placeholder.length;
      const valorSlot = valorFormatado.substring(
        currentPos,
        currentPos + tamanhoSlot,
      );
      currentPos += tamanhoSlot;

      if (
        (slot.minimo === undefined && slot.maximo === undefined) ||
        valorSlot.length < tamanhoSlot ||
        !/^\d+$/.test(valorSlot)
      ) {
        continue;
      }

      const valorNumerico = parseInt(valorSlot, 10);

      if (valorNumerico === 0) {
        continue;
      }

      if (slot.minimo !== undefined && valorNumerico < slot.minimo) {
        return false;
      }
      if (slot.maximo !== undefined && valorNumerico > slot.maximo) {
        return false;
      }
    }

    return true;
  }

  public aoMudar(valor: string, valorBruto: string) {
    const formatado = !this.validarSlots(this.formatar(valor))
      ? this.formatar(valorBruto)
      : this.formatar(valor);
    const bruto = SeparadoresUtilidades.removerSeparadores(formatado);
    return { bruto, formatado };
  }
}

export { Hermes, RegexUtilidades, SeparadoresUtilidades, DataUtilidades };
export type { IHermes, Slot, HermesConfig };
