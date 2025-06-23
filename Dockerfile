FROM node:20-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy everything
COPY . .

# Install and build
RUN pnpm install
RUN pnpm build

# Expose port and run
EXPOSE 3000
CMD ["pnpm", "start"]