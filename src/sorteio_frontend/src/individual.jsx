import React, { useState, useEffect } from "react";
import { sorteio_backend } from "declarations/sorteio_backend";

function Individual() {
  const [nome, setNome] = useState("");
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState(0);
  const [qtdSorteio, setQtdSorteio] = useState(1);
  const [sorteados, setSorteados] = useState([]);

  useEffect(() => {
    atualizarLista();
  }, []);

  const adicionarPessoa = async () => {
    if (nome.trim()) {
      await sorteio_backend.adicionarPessoa(nome);
      setNome("");
      atualizarLista();
    }
  };

  const atualizarLista = async () => {
    const novaLista = await sorteio_backend.mostrarLista();
    setLista(novaLista);
    setTotal(await sorteio_backend.totalPessoas());
  };

  const sortearPessoas = async () => {
    const resultado = await sorteio_backend.sortearPessoas(qtdSorteio);
    setSorteados(resultado);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      adicionarPessoa();
    }
  };

  return (
    <div className="outrocon">
      <div className="de-cima">
        <div>
          <input
            className="nomes"
            type="text"
            placeholder="Digite um nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={adicionarPessoa}>Adicionar</button>
        </div>
        <div>
          <input
            className="numeros"
            type="number"
            min="1"
            value={qtdSorteio}
            onChange={(e) => setQtdSorteio(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="para">
      <p>Total de pessoas: {total}</p>
      </div>
      <ul className="sorte">
        {lista.map((pessoa, index) => (
          <li key={index}>{pessoa}</li>
        ))}
      </ul>
      <div className="sorte2">
        <button onClick={sortearPessoas}>Sortear</button>
        <p>Sorteados: {sorteados.join(" ")}</p>
      </div>
    </div>
  );
}

export default Individual;
