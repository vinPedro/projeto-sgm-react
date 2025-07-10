// api/editalService.js

export async function fetchAlunos() {

  // Simulação de uma chamada API (substitua pela real)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          nome: "Pedro teste hello",
          matricula: "9999999999",
          email: 'teste@gmail.com',
          emailAcademico: 'testeAc@gmail.com',
          cpf: '0000000000',
          curso: 'ADS',
        
        },
        {
          id: 2,
          nome: "João",
          matricula: "9999999991",
          email: 'teste@gmail.com',
          emailAcademico: 'testeAc@gmail.com',
          cpf: '0000000000',
          curso: 'ADS',
        },
        {
          id: 3,
          nome: "Renan",
          matricula: "9999999992",
          email: 'teste@gmail.com',
          emailAcademico: 'testeAc@gmail.com',
          cpf: '0000000000',
          curso: 'ADS',
        },
        {
          id: 4,
          nome: "Kaio",
          matricula: "9999999993",
          email: 'teste@gmail.com',
          emailAcademico: 'testeAc@gmail.com',
          cpf: '0000000000',
          curso: 'ADS',
        },
        {
          id: 5,
          nome: "Vitor",
          matricula: "9999999994",
          email: 'teste@gmail.com',
          emailAcademico: 'testeAc@gmail.com',
          cpf: '0000000000',
          curso: 'ADS',
        },
      ]);
    }, 500); // simula latência
  });
}
