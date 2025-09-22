import { describe, it, expect } from "bun:test";
import { RegexUtilidades } from "../src/utils/regex";
import type { Slot } from "../src/interfaces/slots";

describe("Utilidades de regex - Hermes", () => {
  describe("juntarRegex()", () => {
    it("deve juntar partes de regex e strings em um único regex", () => {
      const parts = [/^\d{2}/, "/", /\d{2}$/];
      const result = RegexUtilidades.juntarRegex(parts);
      expect(result).toBeInstanceOf(RegExp);
      expect(result.source).toBe("^\\d{2}\\/\\d{2}$");
    });
  });

  describe("gerarArrayRegex()", () => {
    it("deve gerar um array de regex a partir de uma máscara", () => {
      const mascara: (Slot | string)[] = [
        { padrao: /\d/, placeholder: "dd" },
        "/",
        { padrao: /[A-Z]/, placeholder: "AA" },
      ];
      const result = RegexUtilidades.gerarArrayRegex(mascara);

      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(RegExp);
      expect((result[0] as RegExp).source).toBe("\\d{2}");
      expect(result[1]).toBe("/");
      expect(result[2]).toBeInstanceOf(RegExp);
      expect((result[2] as RegExp).source).toBe("[A-Z]{2}");
    });
  });
});
