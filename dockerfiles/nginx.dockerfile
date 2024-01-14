FROM nginx:alpine

COPY dockerfiles/vhost.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www

# Copy static assets from builder stage
COPY ./src/dist .
