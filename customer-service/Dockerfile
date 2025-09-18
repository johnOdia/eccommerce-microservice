# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json tsconfig.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy source code
COPY ./src ./src

# 6. Expose service port (injected via .env or docker-compose)
EXPOSE 4000

# 7. Default command (dev mode)
CMD ["npm", "test"]
