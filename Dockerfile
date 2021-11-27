FROM nginx:1.20

user root

COPY dist/spa/ /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
