# ==============================================================================
# Estágio 1: Build da Aplicação
# ==============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

# Instala uma versão específica do pnpm
RUN npm install -g pnpm@11.21.0

# Configura o pnpm para não bloquear scripts de dependências
RUN pnpm config set strict-dep-builds false

# Copia os manifestos de dependências
COPY package.json pnpm-lock.yaml* ./

# Instala todas as dependências
RUN pnpm install --frozen-lockfile

# Copia código-fonte e configuração do TypeScript
COPY tsconfig.json ./
COPY src ./src

# Compila o TypeScript gerando a pasta dist/
RUN pnpm run build

# Remove as dependências de desenvolvimento
RUN pnpm prune --prod

# ==============================================================================
# Estágio 2: Imagem Final de Execução (Produção)
# ==============================================================================
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Cria usuário sem privilégios de root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copia o package.json original para referência
COPY --from=builder /app/package.json ./package-original.json

# Define o pacote como CommonJS para executar o JavaScript compilado
RUN echo '{"type":"commonjs"}' > package.json

# Copia as dependências e os arquivos compilados
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
