FROM node:20-alpine

WORKDIR /app

# Copy package.json and lock files to leverage Docker cache
COPY package.json yarn.lock* package-lock.json* ./

# Install frontend dependencies
RUN yarn install --frozen-lockfile || npm install --force

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Start the Vite development server
CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "5173"]
# If you prefer npm, use: CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]