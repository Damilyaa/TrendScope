# Этап сборки
FROM golang:1.22 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum (если есть) и загружаем зависимости
COPY go.mod ./
RUN go mod download

# Копируем все исходники в контейнер
COPY . .

# Собираем приложение
RUN go build -o /app/app ./cmd

# Финальный образ
FROM debian:bookworm-slim

# Устанавливаем рабочую директорию
WORKDIR /app


RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Almaty /etc/localtime && \
    echo "Asia/Almaty" > /etc/timezone && \
    update-ca-certificates --fresh && \
    rm -rf /var/lib/apt/lists/*

# Копируем исполнимый файл из стадии сборки
COPY --from=builder /app/app .

# Копируем дополнительные данные, если нужно
COPY parsedata ./parsedata

# Открываем порт
EXPOSE 8008

# Запускаем приложение
CMD ["./app"]
