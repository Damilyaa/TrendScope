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

# Устанавливаем переменные окружения для Vite
# Важно указать, что backend работает на порту 8008
ENV VITE_BACKEND_URL=http://backend:8008

# Экспонируем порт, на котором будет работать Vite
EXPOSE 5173

# Запускаем сервер разработки Vite
CMD ["npm", "run", "dev"]
