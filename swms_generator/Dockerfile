# Stage 1: Building the code
FROM node:18-alpine as builder

# Declare ARG variables
ARG NEXTAUTH_SECRET
ARG SENDGRID_API_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

# Set ARG variables as ENV variables
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV SENDGRID_API_KEY=$SENDGRID_API_KEY
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

WORKDIR /app

# Set NODE_ENV to production. This helps in optimizing the build
ENV NODE_ENV production

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Running the code
FROM node:18-alpine

WORKDIR /app

# Again, set NODE_ENV to production for the runtime environment
ENV NODE_ENV production
ENV NEXTAUTH_URL http://13.236.165.201
# Copy the build artifacts from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
