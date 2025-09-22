"use client";

import {
  cloneElement,
  ComponentPropsWithRef,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHermes } from "./useHermes";

type HermesInputPropriedades = ComponentPropsWithRef<"input"> &
  PropsWithChildren & {
    className?: string;
    instancia: ReturnType<typeof useHermes>;
    aoMudar?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    permitirPlaceholder?: boolean;
  };

export const HermesInput = forwardRef<
  HTMLInputElement,
  Readonly<HermesInputPropriedades>
>(
  (
    { children, instancia, permitirPlaceholder, className, ...propriedades },
    forwardedRef,
  ) => {
    const [tamanho, setTamanho] = useState<number>(0);
    const targetRef = useRef<HTMLInputElement>(null);

    const mergedRef = (node: HTMLInputElement) => {
      targetRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    useEffect(() => {
      const observer = new ResizeObserver(([entry]) => {
        if (entry) {
          setTamanho(entry.contentRect.width);
        }
      });

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div
        style={{
          position: "relative",
        }}
      >
        {isValidElement(children) &&
          cloneElement(children as never, {
            value: instancia.valorFormatado,
            onChange: instancia.onChange,
            ref: mergedRef,
            ...propriedades,
          })}
        {permitirPlaceholder && (
          <div
            className={className}
            style={{
              pointerEvents: "none",
              position: "absolute",
              inset: "0px",
              display: "flex",
              alignItems: "center",
              whiteSpace: "pre",
              fontSize: "medium",
              width: `${tamanho}px`,
              textOverflow: "clip",
              userSelect: "none",
            }}
          >
            <span
              style={{
                color: "transparent",
              }}
            >
              {instancia.valorFormatado}
            </span>
            <span
              style={{
                color: "currentColor",
              }}
            >
              {instancia.placeholder.slice(instancia.valorFormatado.length)}
            </span>
          </div>
        )}
      </div>
    );
  },
);

HermesInput.displayName = "HermesInput";
