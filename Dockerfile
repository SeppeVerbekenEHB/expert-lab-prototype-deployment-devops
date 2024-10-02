# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files into the Nginx directory
COPY ../html/index.html /usr/share/nginx/html/index.html
COPY ../css/indexStyle.css /usr/share/nginx/html/indexStyle.css
COPY sum.js /usr/share/nginx/html/sum.js

# Expose port 80 (default Nginx port)
EXPOSE 80
