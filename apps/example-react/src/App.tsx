import "./App.css";
import { useState } from "react";
import { DataUtilidades } from "@hermes/core";
import { HermesInput, useHermes } from "@hermes/react-adapter";

function App() {
  const [dataRangeFormatada, setDataRangeFormatada] = useState<string>("");

  const aoCompletarDataRange = (valor: string, valorFormatado?: string) => {
    if (!valorFormatado) return;
    setDataRangeFormatada(
      DataUtilidades.separarDatas(valorFormatado, " - ").join(" a "),
    );
  };

  const dataRange = useHermes({
    mascara: [
      { padrao: /\d/, placeholder: "dd", minimo: 1, maximo: 31 },
      "/",
      { padrao: /\d/, placeholder: "mm", minimo: 1, maximo: 12 },
      "/",
      { padrao: /\d/, placeholder: "aaaa" },
      " - ",
      { padrao: /\d/, placeholder: "dd", minimo: 1, maximo: 31 },
      "/",
      { padrao: /\d/, placeholder: "mm", minimo: 1, maximo: 12 },
      "/",
      { padrao: /\d/, placeholder: "aaaa" },
    ],
    aoCompletar: aoCompletarDataRange,
  });

  const cpf = useHermes({
    mascara: [
      { padrao: /\d/, placeholder: "000" },
      ".",
      { padrao: /\d/, placeholder: "000" },
      ".",
      { padrao: /\d/, placeholder: "000" },
      "-",
      { padrao: /\d/, placeholder: "00" },
    ],
  });

  const telefone = useHermes({
    mascara: [
      { padrao: /\d/, placeholder: "" },
      "(",
      { padrao: /\d/, placeholder: "00" },
      ") ",
      { padrao: /\d/, placeholder: "0" },
      " ",
      { padrao: /\d/, placeholder: "0000" },
      "-",
      { padrao: /\d/, placeholder: "0000" },
    ],
  });

  return (
    <div className="flex flex-col gap-4">
      <section>
        <label htmlFor="data">Data</label>
        <HermesInput
          instancia={dataRange}
          className="text-gray-400 px-2"
          permitirPlaceholder
        >
          <input name="data" className="border-2 px-1.5" />
        </HermesInput>
        <div className="flex flex-col">
          {dataRange.valorFormatado && (
            <span>Valor formatado: {dataRange.valorFormatado}</span>
          )}
          {dataRange.valorBruto && (
            <span>Valor bruto: {dataRange.valorBruto}</span>
          )}
          {dataRangeFormatada && (
            <span>Valores separados: {dataRangeFormatada}</span>
          )}
        </div>
      </section>
      <section>
        <label htmlFor="cpf">CPF</label>
        <HermesInput
          instancia={cpf}
          className="text-gray-400 px-2"
          permitirPlaceholder
        >
          <input name="cpf" className="border-2 px-1.5" />
        </HermesInput>
        <div className="flex flex-col">
          {cpf.valorFormatado && (
            <span>Valor formatado: {cpf.valorFormatado}</span>
          )}
          {cpf.valorBruto && <span>Valor bruto: {cpf.valorBruto}</span>}
        </div>
      </section>
      <section>
        <label htmlFor="telefone">Telefone</label>
        <HermesInput
          instancia={telefone}
          className="text-gray-400 px-2"
          permitirPlaceholder
        >
          <input name="telefone" className="border-2 px-1.5" />
        </HermesInput>
        <div className="flex flex-col">
          {telefone.valorFormatado && (
            <span>Valor formatado: {telefone.valorFormatado}</span>
          )}
          {telefone.valorBruto && (
            <span>Valor bruto: {telefone.valorBruto}</span>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
