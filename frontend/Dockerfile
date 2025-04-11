# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если они есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .


# Экспонируем порт, на котором будет работать Vite
EXPOSE 5173

# Запускаем сервер разработки Vite
CMD ["npm", "run", "dev"]
