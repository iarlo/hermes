import { describe, it, expect } from "bun:test";
import { DataUtilidades } from "../src/utils/data";

describe("Utilidades de datas - Hermes", () => {
  describe("validar()", () => {
    it("deve retornar true para uma data válida", () => {
      expect(DataUtilidades.validar("19/09/2025")).toBe(true);
    });

    it("deve retornar true para uma data de ano bissexto válida", () => {
      expect(DataUtilidades.validar("29/02/2024")).toBe(true);
    });

    it("deve retornar false para uma data de ano bissexto inválida", () => {
      expect(DataUtilidades.validar("29/02/2025")).toBe(false);
    });

    it("deve retornar false para um mês inválido", () => {
      expect(DataUtilidades.validar("19/13/2025")).toBe(false);
    });

    it("deve retornar false para um dia inválido no mês", () => {
      expect(DataUtilidades.validar("31/04/2025")).toBe(false);
    });
  });

  describe("validarDia()", () => {
    it("deve retornar true para dias válidos", () => {
      expect(DataUtilidades.validarDia("1")).toBe(true);
      expect(DataUtilidades.validarDia("31")).toBe(true);
    });

    it("deve retornar false para dias inválidos", () => {
      expect(DataUtilidades.validarDia("0")).toBe(false);
      expect(DataUtilidades.validarDia("32")).toBe(false);
    });

    it("deve retornar false para entrada não numérica", () => {
      expect(DataUtilidades.validarDia("abc")).toBe(false);
    });
  });

  describe("validarMes()", () => {
    it("deve retornar true para meses válidos", () => {
      expect(DataUtilidades.validarMes("1")).toBe(true);
      expect(DataUtilidades.validarMes("12")).toBe(true);
    });

    it("deve retornar false para meses inválidos", () => {
      expect(DataUtilidades.validarMes("0")).toBe(false);
      expect(DataUtilidades.validarMes("13")).toBe(false);
    });

    it("deve retornar false para entrada não numérica", () => {
      expect(DataUtilidades.validarMes("abc")).toBe(false);
    });
  });
});
