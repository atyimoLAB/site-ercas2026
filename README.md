![CBSOFT Logo](./public/images/logos/cbsoft-logo.svg)

## Início rápido

```bash
cp .env.example .env   # padrões já funcionam para dev local
npm install
npm run dev            # http://localhost:3000/{NEXT_PUBLIC_BASE_PATH}/{LOCALE}
```

Para mais detalhes, veja [Iniciando o projeto manualmente](#iniciando-o-projeto-manualmente) ou [Iniciando o projeto com Docker](#iniciando-o-projeto-com-docker).

## Iniciando o projeto manualmente

### Pré-requisitos

- [Node.js](https://nodejs.org/pt/download) instalado
- Arquivo `.env` na raiz (`cp .env.example .env`) — define URL e _base path_ do site. Veja o `.env.example` para as variáveis.

### Passos para rodar o projeto

1. **Instalar dependências**

```bash
npm install
```

2. **Rodar em modo desenvolvimento**

```bash
npm run dev
```

A aplicação ficará disponível em: [http://localhost:3000/{NEXT_PUBLIC_BASE_PATH}/{LOCALE}](http://localhost:3000/{NEXT_PUBLIC_BASE_PATH}/{LOCALE}).

3. **Gerar o build do projeto**

```bash
npm run build
```

gerando todos os arquivos necessários na pasta `out/`.

## Iniciando o projeto com Docker

Para gerar os arquivos na pasta `out/`

```bash
docker-compose -f docker-compose.yml up --build
```

Para usar o modo watch do docker para desenvolvimento

```bash
docker-compose up --build
```

> [!NOTE]
> O modo desenvolvimento do nextjs consome bastante memória ram.

## Alterações de informações

| Tipo         | Localização             | Observação                 |
| ------------ | ----------------------- | -------------------------- |
| Dados anuais | `public/data/`          | Atualizados anualmente[^1] |
| Traduções    | `locale/` (`pt` e `en`) | Textos traduzidos          |

- **Dados anuais:** Arquivos que precisam ser atualizados todo ano devem ser colocados na pasta `public/data/`.

- **Traduções:** Textos para os idiomas `pt` e `en` devem estar na pasta `locale/`.

Para observar as alterações na página é necessário compilar os _json_'s e os _yaml_'s

```bash
npm run generate-messages
npm run generate-events
npm run generate-data
```

ou simplesmente realizar o build. O `npm run dev` já faz isso automaticamente com o `predev`.

[^1]: Idealmente
