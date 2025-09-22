class SeparadoresUtilidades {
  public static readonly SEPARADORES = /[/_.\-()\\\s]/g;

  /**
   * Remove todos os separadores de uma string.
   * @param termo - A string que terá os separadores removidos.
   * @returns A string sem os separadores.
   */
  public static removerSeparadores(termo: string): string {
    return termo.replaceAll(this.SEPARADORES, "");
  }
}

export { SeparadoresUtilidades };
