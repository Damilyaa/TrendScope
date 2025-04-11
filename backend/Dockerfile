# Этап сборки
FROM golang:1.22 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum и загружаем зависимости
COPY go.mod ./
RUN go mod tidy

# Копируем все исходники
COPY . .

# Собираем приложение с дополнительными логами для отладки
RUN go build -o /app/app ./cmd || { echo "Build failed"; exit 1; }

# Финальный образ
FROM debian:bookworm-slim

# Рабочая директория
WORKDIR /app

# Копируем исполнимый файл из стадии сборки
COPY --from=builder /app/app .

# Копируем дополнительные данные, если нужно
COPY parsedata ./parsedata

# Открываем порт
EXPOSE 8008

# Запускаем приложение
CMD ["./app"]
