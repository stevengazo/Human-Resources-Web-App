# ---------- Build ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Variables VITE_* se hornean en el bundle en tiempo de build, no de
# ejecución: hay que recibirlas como build args. Vacías por defecto: sin
# VITE_API_URL, apiClient.js cae a la ruta relativa /api (proxy de Nginx);
# sin VITE_GOOGLE_CLIENT_ID, el botón de Google simplemente no se muestra.
ARG VITE_API_URL=""
ARG VITE_GOOGLE_CLIENT_ID=""
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN npm run build

# ---------- Runtime ----------
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
