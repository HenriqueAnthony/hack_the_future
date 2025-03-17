import { useState } from "react";
import { sorteio_backend } from "declarations/sorteio_backend";

function App() {
  const [numMembros, setNumMembros] = useState(1);
  const [totalEquipes, setTotalEquipes] = useState();
  const [nomesEquipes, setNomesEquipes] = useState([]);
  const [resultadoSorteio, setResultadoSorteio] = useState(null);

  function handleTotalEquipesChange(e) {
    const total = Number(e.target.value);
    setTotalEquipes(total);
    setNomesEquipes(Array(total).fill(Array(numMembros).fill("")));
  }

  function handleNumMembrosChange(e) {
    const membros = Number(e.target.value);
    setNumMembros(membros);
    setNomesEquipes(Array(totalEquipes).fill(Array(membros).fill("")));
  }

  function handleNomeChange(e, equipeIndex, membroIndex) {
    const novoNome = e.target.value;
    const novasEquipes = [...nomesEquipes];

    novasEquipes[equipeIndex] = [...novasEquipes[equipeIndex]];
    novasEquipes[equipeIndex][membroIndex] = novoNome;

    setNomesEquipes(novasEquipes);
  }

  async function handleSortear(event) {
    event.preventDefault();

    if (totalEquipes === 0) {
      alert("Por favor, insira o número de equipes/jogadores.");
      return;
    }

    try {
      console.log("Enviando sorteio para o backend...");
      const resultado = await sorteio_backend.sorteio(nomesEquipes.flat());
      console.log("Resultado do sorteio:", resultado);
      setResultadoSorteio(resultado);
    } catch (error) {
      console.error("Erro ao realizar o sorteio:", error);
    }
  }

  return (
    <section className="container">
      <div>
        <h1>Sorteador</h1>
        <div className="cartao">
          <div className="numeros">
            <div className="grupo-input">
              <div className="dois">
                <label htmlFor="tipo-equipe">Tipo de jogo: </label>
                <select
                  id="tipo-equipe"
                  value={numMembros}
                  onChange={handleNumMembrosChange}
                >
                  <option>Equipes</option>
                </select>
                <div className="grupo-input">
                  <div className="total-equipes">
                    <label htmlFor="tota">Total de Equipes: </label>
                    
                    <input
                      type="number"
                      id="total-equipes"
                      value={totalEquipes}
                      onChange={handleTotalEquipesChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grupo-input">
              <div className="mostrar">
                <label>Informe os nomes das Equipes</label>
                {nomesEquipes.map((equipe, equipeIndex) => (
                  <div key={equipeIndex} className="equipe">
                    <strong>Equipe </strong>
                    {equipe.map((nome, membroIndex) => (
                      <div key={membroIndex}>
                        <input
                          type="text"
                          placeholder={`Jogador`}
                          value={nome}
                          onChange={(e) =>
                            handleNomeChange(e, equipeIndex, membroIndex)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleSortear}>Sortear</button>

            {resultadoSorteio && (
              <div className="resultados">
                <h2>DISPUTAS</h2>
                <div className="lista">
                  <p>
                    {resultadoSorteio.array1
                      .map(
                        (nome, index) =>
                          `${nome} X ${
                            resultadoSorteio.array2[index] || "Aguardando"
                          }`
                      )
                      .join("\n")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
