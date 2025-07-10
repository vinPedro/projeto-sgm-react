// api/editalService.js

export async function fetchEditais() {
  // Simulação de uma chamada API (substitua pela real)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          titulo: "Edital 001/2025",
          descricao: "Processo seletivo para monitoria de Algoritmos.",
        },
        {
          id: 2,
          titulo: "Edital 002/2025",
          descricao: "Seleção para bolsas de pesquisa em IA.",
        },
        {
          id: 3,
          titulo: "Edital 003/2025",
          descricao: "Monitoria em Estrutura de Dados.",
        },
        {
          id: 4,
          titulo: "Edital 004/2025",
          descricao: "Iniciação Científica em Sistemas Distribuídos.",
        },
        {
          id: 5,
          titulo: "Edital 005/2025",
          descricao: "Processo seletivo para estágio supervisionado.",
        },
      ]);
    }, 500); // simula latência
  });
}
