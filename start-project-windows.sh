#!/bin/bash

# Run yarn install
echo "Running yarn install..."
yarn install

# Run docker-compose up --build
echo "Building Docker containers..."
docker-compose up --build -d  # -d flag runs containers in detached mode

# Open a new terminal window and run yarn dev
echo "Opening new terminal for yarn dev..."

# Determine the appropriate command to open a new terminal window on Windows
if command -v start; then
  start cmd.exe /K "yarn dev"
else
  echo "Unable to open new terminal window. Please manually run 'yarn dev' in a new terminal window."
fi

# echo "Running migration..."
# docker-compose exec app php artisan migrate

# Open browser tab with localhost:8000
# echo "Opening browser at localhost:8000..."
# start http://localhost:8000