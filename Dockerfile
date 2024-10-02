# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files into the Nginx directory
COPY html/ /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY sum.js /usr/share/nginx/html/sum.js

# Expose port 80 (default Nginx port)
EXPOSE 80
