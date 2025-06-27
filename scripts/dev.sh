#!/bin/bash

# AI Question Builder - Development Script
# Starts both Rails API server and React frontend

set -e

echo "🚀 Starting AI Question Builder development servers..."

# Check if PostgreSQL is running
if ! brew services list | grep postgresql@16 | grep started > /dev/null; then
    echo "📊 Starting PostgreSQL..."
    brew services start postgresql@16
fi

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping development servers..."
    jobs -p | xargs -r kill
}

trap cleanup EXIT

# Start Rails server in the background
echo "🔧 Starting Rails API server (port 3000)..."
cd backend
eval "$(rbenv init -)" && export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
rails server -p 3000 &
RAILS_PID=$!

# Wait a moment for Rails to start
sleep 2

# Start React frontend in the background
echo "⚛️  Starting React frontend (port 5173)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development servers started!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 API: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for either process to exit
wait