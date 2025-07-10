// api/editalService.js

export async function fetchMonitorias() {
  // Simulação de uma chamada API (substitua pela real)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          nome: "Pedro",
          disciplina: "Algoritmos",
        },
        {
          id: 2,
          nome: "João",
          disciplina: "DAC",
        },
        {
          id: 3,
          nome: "Renan",
          disciplina: "EDA",
        },
        {
          id: 4,
          nome: "Deda",
          disciplina: "Matemática",
        },
        {
          id: 5,
          nome: "Talles",
          disciplina: "EDA",
        },
      ]);
    }, 500); // simula latência
  });
}
