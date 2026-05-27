# 🏋️‍♂️ GymPass Style API

Uma API para gestão de check-ins em academias, baseada no modelo do GymPass, desenvolvida aplicando princípios de SOLID, Design Patterns e testes automatizados.

## 📌 Índice
- [Requisitos Funcionais (RFs)](#-requisitos-funcionais-rfs)
- [Regras de Negócio (RNs)](#-regras-de-negócio-rns)
- [Requisitos Não-Funcionais (RNFs)](#-requisitos-não-funcionais-rnfs)

---

## 🎯 Requisitos Funcionais (RFs)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

---

## 💼 Regras de Negócio (RNs)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] A academia só pode ser cadastrada por administradores;

---

## ⚙️ Requisitos Não-Funcionais (RNFs)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);