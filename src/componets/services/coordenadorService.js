import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// --- Funções do CRUD de Coordenador ---

export const getCoordenadores = () => {
    return axios.get(`${API_URL}/coordenadores`);
};

// ATUALIZAÇÃO: Comentário ajustado para refletir a lógica correta do backend.
export const createCoordenador = (coordenadorData) => {
    // O backend espera os dados completos do novo coordenador (nome, cpf, email, etc.)
    return axios.post(`${API_URL}/coordenadores`, coordenadorData);
};

// NOVO: Função para buscar um único coordenador por ID (essencial para a tela de edição)
export const getCoordenadorById = (id) => {
    return axios.get(`${API_URL}/coordenadores/${id}`);
};

// NOVO: Função para enviar os dados atualizados de um coordenador
export const updateCoordenador = (id, coordenadorData) => {
    return axios.put(`${API_URL}/coordenadores/${id}`, coordenadorData);
};

export const deleteCoordenador = (id) => {
    return axios.delete(`${API_URL}/coordenadores/${id}`);
};


// --- Funções para popular os formulários ---

// Esta função será útil no futuro se você criar um CRUD de professores.
export const getProfessores = () => {
    return axios.get(`${API_URL}/professores`); // Supondo que este endpoint exista
};

// Esta função é essencial para os formulários de criar e editar.
export const getCursos = () => {
    return axios.get(`${API_URL}/cursos`); // Supondo que este endpoint exista
};