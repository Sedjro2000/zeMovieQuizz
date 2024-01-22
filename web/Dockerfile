# Stage 1: Install dependencies
FROM node:16-alpine AS deps

# Install libc6-compat if needed
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

# Copy only the package.json and pnpm-lock.yaml files to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: Copy code and build
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Build your application (if needed)
# RUN yarn build

# Final stage: Use a smaller base image and copy only necessary files
FROM node:16-alpine AS final

# Set the working directory
WORKDIR /app

# Copy from the build stage
COPY --from=build /app .

# Optional: Install only production dependencies
# RUN pnpm install --frozen-lockfile --prod

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["pnpm", "start"]

