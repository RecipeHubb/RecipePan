FROM alpine:latest

COPY ./pocketbase /pocketbase

EXPOSE 8080
VOLUME ["/pb_data"]

CMD ./pocketbase serve
