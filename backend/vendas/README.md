# UPFY API (Node + TypeScript + Express + TypeORM)

API de músicas com **TypeORM** e **PostgreSQL**

## Principais recursos
- Entidades: `User`, `Music`, `Playlist`, `PlaylistMusic` (N:N com metadados).
- Relacionamentos:
  - User 1—N Playlist (owner)
  - User 1—N Music (uploader opcional, `SET NULL` on delete)
  - Playlist N—N Music via `PlaylistMusic` (com `position` e `added_at`)
- Rotas separadas: `/users`, `/musics`, `/playlists` (+ subrotas de items).
- Migrations e DataSource singleton.

## Setup
1. Crie `.env` com base em `.env.example`.
2. Instale dependências:
   ```bash
   npm install
   ```
3. Rode migrations:
   ```bash
   npm run typeorm -- migration:run
   ```
4. Execute em desenvolvimento:
   ```bash
   npm run dev
   ```

## Observações de Modelagem
- A relação **Playlist↔Music** é `N:N` modelada por `PlaylistMusic`, pois precisamos de metadados por item (ordem e data).
- Em `Music.uploader`, usamos `onDelete: 'SET NULL'` para não deletar músicas quando um usuário é removido.
- Em `Playlist.owner`, usamos `onDelete: 'CASCADE'` para remover playlists de um usuário apagado.
- Índices e unique em `playlists_musics` evitam duplicidade e aceleram queries.


## Typeorm

Ao modificar os campos das entidades gere uma nova migration.

```bash
npx typeorm-ts-node-commonjs migration:generate src/migrations/AddPathToMusic -d src/config/data-source.ts
```