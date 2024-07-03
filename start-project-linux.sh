#!/bin/bash

# Run yarn install
echo "Running yarn install..."
yarn install

# Run docker-compose up --build
echo "Building Docker containers..."
docker-compose up --build -d  # -d flag runs containers in detached mode

# Open a new terminal window and run yarn dev
echo "Opening new terminal for yarn dev..."

# Command to open new terminal on Linux
gnome-terminal -- bash -c "yarn dev"

# Optionally, you can use other terminal emulators like xterm or konsole:
# xterm -e "yarn dev"
# konsole -e "yarn dev"

# Open browser tab with localhost:8000
echo "Opening browser at localhost:8000..."
xdg-open http://localhost:8000