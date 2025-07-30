# ImperiumAPI

**ImperiumAPI** é uma API REST para um jogo de estratégia onde os jogadores constroem e expandem seus próprios impérios. Gerencie recursos, desenvolva construções, treine exércitos, entre em guerra e negocie com outros jogadores.

> **Versão 0.1 em desenvolvimento** — implementando as rotas iniciais e estrutura base


## 🧱 Banco de Dados (via Prisma)

Estrutura inicial dos modelos:

* `User`: Conta de acesso do jogador
* `Empire`: Dados do império do jogador
* `Resource`: Controle de recursos do império
* `Building`: Níveis de construções
* `Army`: Tropas treinadas e status militar

> Atualmente utilizando **SQLite** para desenvolvimento local
> Em breve será migrado para **PostgreSQL** para produção

---

## 🛠️ Tecnologias Utilizadas

* **NestJS** — Framework para a API
* **Prisma ORM** — Modelagem de dados e queries
* **SQLite** — Banco temporário para testes locais
* **PostgreSQL** — Banco planejado para produção
* **JWT Auth** — Autenticação via token seguro

---

## Rodando o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/PedroAlexandreDev/ImperiumAPI.git
cd ImperiumAPI

# Instale as dependências
npm install

# Configure o arquivo .env (veja .env.example)
cp .env.example .env

# Rode as migrações (SQLite por enquanto)
npx prisma migrate dev

# Inicie o servidor em modo desenvolvimento
npm run start:dev
```
---

## 🤝 Contribuições

Contribuições são muito bem-vindas!
Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias ou ideias.

---

## 📄 Licença

Este projeto está sob a licença MIT.
Feito com 💻 por [PedroAlexandreDev](https://github.com/PedroAlexandreDev)

