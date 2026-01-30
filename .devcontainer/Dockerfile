# Use the official lightweight Node.js image
FROM node:20-alpine

# Install necessary build tools and compatibility libraries
# libc6-compat is required for Next.js/Turbopack and Sharp on Alpine
RUN apk add --no-cache libc6-compat git python3 make g++

# Set the working directory
WORKDIR /workspaces/my-app

# Set environment to development
ENV NODE_ENV=development

# Expose the Next.js default port
EXPOSE 3000

# The command is handled by devcontainer.json, but this keeps the container alive
CMD ["sleep", "infinity"]