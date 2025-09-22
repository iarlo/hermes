import { describe, it, expect } from "bun:test";
import { Hermes } from "../src/main";

describe("Lógica central - Hermes", () => {
  const hermes = new Hermes({
    mascara: [
      { padrao: /\d/, placeholder: "dd", maximo: 31, minimo: 1 },
      "/",
      { padrao: /\d/, placeholder: "mm", maximo: 12, minimo: 1 },
      "/",
      { padrao: /\d/, placeholder: "aaaa" },
    ],
  });

  describe("formatar()", () => {
    it("deve formatar uma data completa", () => {
      expect(hermes.formatar("19092025")).toBe("19/09/2025");
    });

    it("deve formatar uma data parcial", () => {
      expect(hermes.formatar("1909")).toBe("19/09");
    });

    it("deve retornar uma string vazia para uma entrada vazia", () => {
      expect(hermes.formatar("")).toBe("");
    });

    it("deve remover caracteres que não são numéricos", () => {
      expect(hermes.formatar("abc19def09ghi")).toBe("19/09");
    });

    it("não deve formatar além do comprimento da máscara", () => {
      expect(hermes.formatar("1909202512345")).toBe("19/09/2025");
    });
  });

  describe("validarSlots()", () => {
    it("deve retornar true para uma data válida", () => {
      expect(hermes.validarSlots("19/09/2025")).toBe(true);
    });

    it("deve retornar false para um dia maior que o máximo", () => {
      expect(hermes.validarSlots("32/09/2025")).toBe(false);
    });

    it("deve retornar false para um dia menor que o mínimo", () => {
      expect(hermes.validarSlots("00/09/2025")).toBe(false);
    });

    it("deve retornar false para um mês maior que o máximo", () => {
      expect(hermes.validarSlots("19/13/2025")).toBe(false);
    });

    it("deve retornar false para um mês menor que o mínimo", () => {
      expect(hermes.validarSlots("19/00/2025")).toBe(false);
    });

    it("deve retornar true para uma data parcialmente preenchida válida", () => {
      expect(hermes.validarSlots("19/09")).toBe(true);
    });

    it("deve retornar true para uma data parcialmente incompleta", () => {
      expect(hermes.validarSlots("19/09/2")).toBe(true);
    });

    it("deve retornar true para uma string vazia", () => {
      expect(hermes.validarSlots("")).toBe(true);
    });
  });
});
