FROM nginx:1.20

user root

COPY dist/spa/ /usr/share/nginx/html
