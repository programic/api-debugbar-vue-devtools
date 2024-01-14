FROM node:18.14.2-bullseye

WORKDIR /var/www

# Making the container persistent
CMD tail -f /dev/null
