import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
  public func sorteio(nomes: [Text]) : async { array1: [Text]; array2: [Text] } {
    let num = nomes.size();
    if (num < 1) {
      return { array1 = []; array2 = [] };
    };

    var nomesDisponiveis = Buffer.fromArray<Text>(nomes);
    var array1 = Buffer.Buffer<Text>(num / 2);
    var array2 = Buffer.Buffer<Text>(num / 2);

    var alternar = true;

    while (nomesDisponiveis.size() > 0) {
      let index = await sortearNumero(nomesDisponiveis.size());
      let sorteado = nomesDisponiveis.remove(index - 1);

      if (alternar) {
        array1.add(sorteado);
      } else {
        array2.add(sorteado);
      };
      alternar := not alternar;
    };

    return { array1 = Buffer.toArray(array1); array2 = Buffer.toArray(array2) };
  };

  public func sortearNumero(maximo: Nat) : async Nat {
    if (maximo < 1) {
      return 1;
    };

    let blob = await Random.blob();
    
    let random = Random.Finite(blob);
    
    switch (random.range(8)) {
      case (?valor) { (valor % maximo) + 1 };
      case null { 1 };
    };
  };

  // ===============================
  // Novas funções adicionadas aqui:
  // ===============================

  // Lista de pessoas dinâmica
  var listaDePessoas = Buffer.Buffer<Text>(0);

  // Adiciona uma pessoa à lista
  public func adicionarPessoa(nome: Text) : async () {
    listaDePessoas.add(nome);
  };

  // Mostra o total de pessoas na lista
  public func totalPessoas() : async Nat {
    return listaDePessoas.size();
  };

  // Mostra a lista completa
  public func mostrarLista() : async [Text] {
    return Buffer.toArray(listaDePessoas);
  };

  // Sorteia 1 ou mais pessoas da lista
  public func sortearPessoas(qtd: Nat) : async [Text] {
    let total = listaDePessoas.size();
    if (total == 0 or qtd == 0) {
      return [];
    };

    var nomesDisponiveis = Buffer.fromArray<Text>(Buffer.toArray(listaDePessoas));
    var sorteados = Buffer.Buffer<Text>(qtd);

    let quantidade = if (qtd > total) total else qtd;

    while (sorteados.size() < quantidade) {
      let index = await sortearNumero(nomesDisponiveis.size());
      let nomeSorteado = nomesDisponiveis.remove(index - 1);
      sorteados.add(nomeSorteado);
    };

    return Buffer.toArray(sorteados);
  };
};
