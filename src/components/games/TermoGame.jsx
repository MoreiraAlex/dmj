"use client";
import { getHistorico, salvarProgressoVerbo } from "@/actions/play-game";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import { ModalGameOver } from "@/components/modals/gameOver";
import { HintModal } from "../modals/hint";
import { AchievementsSonner } from "@/components/sonner/AchievementsSonner";

export default function TermoGame({ jogoId, palavra, maxTentativas, dica }) {
  const palavraUpper = palavra.toUpperCase();
  const tamanho = palavraUpper.length;
  const [tentativas, setTentativas] = useState([]);
  const [linhaAtual, setLinhaAtual] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [ganhou, setGanhou] = useState(false);
  const [usouDica, setUsouDica] = useState(false);
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
      setGanhou(true);
      setModalAberto(true);
      return;
    }

    if (novas.length >= maxTentativas) {
      setGanhou(false);
      setModalAberto(true);
      return;
    }
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
        setGanhou(true);
        setModalAberto(true);
      } else if (verbo.palavras.length >= maxTentativas) {
        setGanhou(false);
        setModalAberto(true);
      }
    }

    carregarHistorico();
  }, [jogoId]);

  useEffect(() => {
    function handleKey(e) {
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
  }, [linhaAtual]);

  function calcularCor(letra, index, linhaIndex) {
    const tentativa = tentativas[linhaIndex];
    if (!tentativa) {
      return "bg-transparent border-4 border-[#312a2c] text-black dark:text-white";
    }

    const guess = tentativa.split("");
    const secret = palavraUpper.split("");

    const freq = {};
    secret.forEach((l) => {
      freq[l] = (freq[l] || 0) + 1;
    });

    const result = Array(guess.length).fill(null);
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secret[i]) {
        result[i] = "green";
        freq[guess[i]]--;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (result[i]) continue;

      const letraAtual = guess[i];
      const disponivel = freq[letraAtual] || 0;

      if (disponivel > 0) {
        result[i] = "yellow";
        freq[letraAtual]--;
      } else {
        result[i] = "gray";
      }
    }

    const cor = result[index];

    if (cor === "green") return "bg-[#39a293] text-white";
    if (cor === "yellow") return "bg-[#d3ad69] text-white";
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
    <div className="flex flex-col justify-between h-[70vh] w-full select-none py-4 gap-6">
      <div className="space-y-6">
        <ModalGameOver
          aberto={modalAberto}
          ganhou={ganhou}
          tentativas={`${tentativas.length}/${maxTentativas}`}
          ajuda={usouDica}
          palavraUpper={palavraUpper}
          link="/select/play?game=verb"
        />
      </div>

      <div className="flex flex-col items-start justify-start flex-1 overflow-y-scroll">
        <div className="space-y-2 w-full">
          {[...Array(maxTentativas)].map((_, linha) => (
            <div key={linha} className="flex justify-around">
              {[...Array(tamanho)].map((_, col) => {
                const letra = getLetra(linha, col);
                const cor = calcularCor(letra, col, linha);

                return (
                  <div
                    key={col}
                    className={`max-w-8 h-8 xt-xl rounded ${cor} flex justify-center items-center p-2`}
                  >
                    {letra}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 mx-auto w-full max-w-md pb-4">
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
                className="px-3 bg-[#312a2c] rounded text-sm text-white"
              >
                ENTER
              </button>
            )}
          </div>
        ))}
      </div>

      {dica && <HintModal hint={dica} setClicou={setUsouDica} />}
    </div>
  );
}
