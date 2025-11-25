"use client";
import { getHistorico, salvarProgressoVerbo } from "@/actions/play-game";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";

export default function TermoGame({ jogoId, palavra, maxTentativas, dica }) {
  const palavraUpper = palavra.toUpperCase();
  const tamanho = palavraUpper.length;
  const [tentativas, setTentativas] = useState([]);
  const [linhaAtual, setLinhaAtual] = useState("");
  const [status, setStatus] = useState("");
  const [teclas, setTeclas] = useState({});
  const QWERTY = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  function atualizarCoresDoTeclado(tentativa) {
    const nova = { ...teclas };

    tentativa.split("").forEach((letra, idx) => {
      const correta = palavraUpper[idx] === letra;
      const existe = palavraUpper.includes(letra);

      const atual = nova[letra];

      if (correta) nova[letra] = "blue";
      else if (existe && atual !== "blue") nova[letra] = "yellow";
      else if (!existe && !atual) nova[letra] = "gray";
    });

    setTeclas(nova);
  }

  async function confirmarTentativa() {
    if (linhaAtual.length !== tamanho) {
      setStatus(`A palavra deve ter ${tamanho} letras.`);
      return;
    }

    const tentativa = linhaAtual;
    const novas = [...tentativas, tentativa];

    atualizarCoresDoTeclado(tentativa);

    setTentativas(novas);
    setLinhaAtual("");

    const acertou = tentativa === palavraUpper;

    console.log("jogo id front: ", jogoId);
    await salvarProgressoVerbo(jogoId, tentativa, acertou, maxTentativas);

    if (acertou) {
      setStatus("Você acertou!");
      return;
    }

    if (novas.length >= maxTentativas) {
      setStatus(`Fim de jogo! A palavra era: ${palavraUpper}`);
      return;
    }

    setStatus("");
  }

  useEffect(() => {
    async function carregarHistorico() {
      const historico = await getHistorico(jogoId);

      if (!historico || !historico.progresso || !historico.progresso.verbo) return;

      const verbo = historico.progresso.verbo;

      if (verbo.palavras?.length > 0) {
        setTentativas(verbo.palavras);

        verbo.palavras.forEach((t) => atualizarCoresDoTeclado(t));
      }

      if (verbo.acertou) {
        setStatus("Você acertou!");
      } else if (verbo.palavras.length >= maxTentativas) {
        setStatus(`Fim de jogo! A palavra era: ${palavraUpper}`);
      }
    }

    carregarHistorico();
  }, [jogoId]);

  useEffect(() => {
    function handleKey(e) {
      if (status.includes("🎉") || status.includes("❌")) return;

      if (e.key === "Backspace") {
        setLinhaAtual((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key === "Enter") {
        confirmarTentativa();
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        setLinhaAtual((prev) => (prev.length < tamanho ? prev + e.key.toUpperCase() : prev));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [linhaAtual, status]);

  function calcularCor(letra, index, linhaIndex) {
    const tentativa = tentativas[linhaIndex];
    if (!tentativa) return "bg-transparent border-4 border-[#312a2c] text-black dark:text-white";

    if (palavraUpper[index] === letra) return "bg-[#39a293] text-white";
    if (palavraUpper.includes(letra)) return "bg-[#d3ad69] text-white";
    return "bg-[#312a2c] text-white";
  }

  function getLetra(linhaIndex, colIndex) {
    if (tentativas[linhaIndex]) return tentativas[linhaIndex][colIndex];
    if (linhaIndex === tentativas.length) return linhaAtual[colIndex] ?? "";
    return "";
  }

  function pressKey(key) {
    if (key === "ENTER") return confirmarTentativa();
    if (key === "DEL") {
      setLinhaAtual((prev) => prev.slice(0, -1));
      return;
    }

    if (linhaAtual.length < tamanho) {
      setLinhaAtual((prev) => prev + key);
    }
  }

  function corTecla(letra) {
    const cor = teclas[letra];
    if (cor === "blue") return "bg-[#39a293] text-white";
    if (cor === "yellow") return "bg-[#d3ad69] text-white";
    if (cor === "gray") return "bg-[#312a2c] text-white opacity-30";
    return "bg-[#312a2c] text-white";
  }

  return (
    <div className="space-y-6 select-none">
      {dica && <p className="text-gray-400 text-sm text-center">Dica: {dica}</p>}

      <div className="space-y-2 flex flex-col items-center">
        {[...Array(maxTentativas)].map((_, linha) => (
          <div key={linha} className="flex gap-2">
            {[...Array(tamanho)].map((_, col) => {
              const letra = getLetra(linha, col);
              const cor = calcularCor(letra, col, linha);

              return (
                <div
                  key={col}
                  className={`w-12 h-12 flex items-center justify-center 
                    font-bold  text-xl rounded ${cor}`}
                >
                  {letra}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="font-semibold">{status}</p>

      <div className="space-y-2 mx-auto w-full max-w-md">
        {QWERTY.map((linha, i) => (
          <div key={i} className="flex justify-center gap-1">
            {i === 2 && (
              <button
                onClick={() => pressKey("DEL")}
                className="px-3 bg-[#312a2c] rounded text-sm text-white"
              >
                <Delete />
              </button>
            )}

            {linha.split("").map((letra) => (
              <button
                key={letra}
                onClick={() => pressKey(letra)}
                className={`w-10 h-12 rounded font-bold ${corTecla(letra)}`}
              >
                {letra}
              </button>
            ))}

            {i === 2 && (
              <button
                onClick={() => pressKey("ENTER")}
                className="px-3 bg-[#312a2c]  rounded text-sm text-white"
              >
                ENTER
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
