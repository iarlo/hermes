import { Hermes, HermesConfig } from "@hermes/core";
import { useMemo, useState } from "react";

function useHermes(config: HermesConfig) {
  const hermes = useMemo(() => new Hermes(config), [config]);

  const [valorBruto, setValorBruto] = useState("");
  const [valorFormatado, setValorFormatado] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { bruto, formatado } = hermes.aoMudar(e.target.value, valorBruto);

    setValorBruto(bruto);
    setValorFormatado(formatado);

    config.aoMudar?.(bruto, formatado);
    if (config.aoCompletar && hermes.regexCompleto.test(formatado)) {
      config.aoCompletar(bruto, formatado);
    }
  };

  return {
    valorBruto,
    valorFormatado,
    onChange,
    placeholder: hermes.placeholder,
  };
}

export { useHermes };
