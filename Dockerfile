# Establece la imagen base
FROM nginx:alpine

# Copia los archivos de tu aplicación a la carpeta de HTML de Nginx
COPY /dist/distribuidora /usr/share/nginx/html

# Expone el puerto 80 para que pueda ser accedido desde afuera del contenedor
EXPOSE 8080

# Comando para iniciar Nginx cuando se inicie el contenedor
CMD ["nginx", "-g", "daemon off;"]
