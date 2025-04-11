FROM golang:1.22 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o app ./cmd

# Финальный образ
FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/app .
COPY parsedata ./parsedata  

EXPOSE 8008

CMD ["./app"]
