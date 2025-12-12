#!/bin/bash

echo "🎓 Welcome to Docker Learning - SkyCart Project"
echo "================================================"
echo ""

# Function to wait for user
wait_for_user() {
    echo ""
    echo "Press Enter to continue..."
    read
}

# Step 1: Check Docker
echo "📋 Step 1: Checking if Docker is installed..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    exit 1
fi
echo "✅ Docker is installed!"
docker --version
wait_for_user

# Step 2: Build one image first (Dashboard)
echo "🏗️  Step 2: Let's build the Dashboard Docker image first"
echo "This will:"
echo "  1. Create a container with Node.js"
echo "  2. Copy your code into it"
echo "  3. Run 'npm install' and 'npm run build'"
echo "  4. Copy the built files to an Nginx container"
echo ""
echo "Running: docker build -t skycart/dashboard:latest -f mfe-dashboard/Dockerfile ."
wait_for_user

docker build -t skycart/dashboard:latest -f mfe-dashboard/Dockerfile .

if [ $? -eq 0 ]; then
    echo "✅ Dashboard image built successfully!"
else
    echo "❌ Build failed. Check the errors above."
    exit 1
fi
wait_for_user

# Step 3: List images
echo "📦 Step 3: Let's see the Docker image we just created"
echo "Running: docker images | grep skycart"
docker images | grep skycart
echo ""
echo "You can see the image size, when it was created, etc."
wait_for_user

# Step 4: Run the dashboard container
echo "🚀 Step 4: Let's run the Dashboard container"
echo "This will start a container from the image we built"
echo "Running: docker run -d --name test-dashboard -p 4101:80 skycart/dashboard:latest"
wait_for_user

docker run -d --name test-dashboard -p 4101:80 skycart/dashboard:latest

if [ $? -eq 0 ]; then
    echo "✅ Dashboard container is running!"
    echo "🌐 Open your browser and go to: http://localhost:4101"
    echo ""
    echo "You should see your dashboard (but API calls will fail - that's normal)"
fi
wait_for_user

# Step 5: View running containers
echo "📊 Step 5: Let's see all running containers"
echo "Running: docker ps"
docker ps
wait_for_user

# Step 6: View container logs
echo "📜 Step 6: Let's see the container logs"
echo "Running: docker logs test-dashboard"
docker logs test-dashboard
wait_for_user

# Step 7: Stop and remove
echo "🛑 Step 7: Let's stop and remove the test container"
echo "Running: docker stop test-dashboard && docker rm test-dashboard"
wait_for_user

docker stop test-dashboard
docker rm test-dashboard
echo "✅ Container stopped and removed"
wait_for_user

# Step 8: Build all images
echo "🏗️  Step 8: Now let's build ALL images"
echo "This will take a few minutes..."
echo "Building: Backend, Dashboard, Inventory, Analytics, Shell"
wait_for_user

echo "Building backend..."
docker build -t skycart/backend:latest -f server/Dockerfile . && echo "✅ Backend done"

echo "Building dashboard..."
docker build -t skycart/dashboard:latest -f mfe-dashboard/Dockerfile . && echo "✅ Dashboard done"

echo "Building inventory..."
docker build -t skycart/inventory:latest -f mfe-inventory/Dockerfile . && echo "✅ Inventory done"

echo "Building analytics..."
docker build -t skycart/analytics:latest -f mfe-analytics/Dockerfile . && echo "✅ Analytics done"

echo "Building shell..."
docker build -t skycart/shell:latest -f shell/Dockerfile . && echo "✅ Shell done"

wait_for_user

# Step 9: Show all images
echo "📦 Step 9: Here are all your Docker images"
docker images | grep skycart
wait_for_user

# Step 10: Start with docker-compose
echo "🎼 Step 10: Now let's start everything with Docker Compose"
echo "Docker Compose will:"
echo "  - Start PostgreSQL database"
echo "  - Start Backend API"
echo "  - Start all 3 micro-frontends"
echo "  - Start the Shell app"
echo "  - Connect them all together in a network"
echo ""
echo "Running: docker-compose up -d"
wait_for_user

docker-compose up -d

echo ""
echo "✅ All containers are starting!"
echo "Wait about 30 seconds for everything to initialize..."
sleep 30

echo ""
echo "📊 Let's check if everything is running:"
docker-compose ps

wait_for_user

# Step 11: Test the application
echo "🧪 Step 11: Let's test the application"
echo ""
echo "🌐 Open these URLs in your browser:"
echo "   • Main App:  http://localhost:3000"
echo "   • Dashboard: http://localhost:4101"
echo "   • Inventory: http://localhost:4300"
echo "   • Analytics: http://localhost:4400"
echo "   • Backend:   http://localhost:5000/api/flights"
echo ""
echo "Try navigating between pages!"
wait_for_user

# Step 12: View logs
echo "📜 Step 12: Let's see the logs"
echo "Running: docker-compose logs --tail=50"
docker-compose logs --tail=50
wait_for_user

# Step 13: Explain what's happening
echo "🎓 Step 13: Understanding what just happened"
echo ""
echo "1. Docker Images:"
echo "   - Like a blueprint or recipe for your application"
echo "   - Contains your code, dependencies, and runtime"
echo ""
echo "2. Docker Containers:"
echo "   - A running instance of an image"
echo "   - Isolated from your computer and other containers"
echo ""
echo "3. Docker Network:"
echo "   - Allows containers to talk to each other"
echo "   - 'backend' can connect to 'postgres' by name"
echo ""
echo "4. Docker Volumes:"
echo "   - Persistent storage for database data"
echo "   - Data survives even if container is deleted"
echo ""
wait_for_user

# Step 14: Useful commands
echo "📚 Step 14: Useful Docker commands for you"
echo ""
echo "View running containers:"
echo "  docker ps"
echo ""
echo "View all containers (including stopped):"
echo "  docker ps -a"
echo ""
echo "View logs of a specific container:"
echo "  docker logs skycart-backend"
echo "  docker logs -f skycart-backend  (follow logs in real-time)"
echo ""
echo "Stop all containers:"
echo "  docker-compose down"
echo ""
echo "Stop and remove volumes (fresh start):"
echo "  docker-compose down -v"
echo ""
echo "Rebuild and restart:"
echo "  docker-compose up -d --build"
echo ""
echo "Execute command in running container:"
echo "  docker exec -it skycart-backend sh"
echo ""
echo "View container resource usage:"
echo "  docker stats"
echo ""
wait_for_user

echo "🎉 Congratulations! You've learned Docker basics!"
echo ""
echo "Your application is running at: http://localhost:3000"
echo ""
echo "To stop everything, run: docker-compose down"
echo "To restart, run: docker-compose up -d"
echo ""
echo "Happy learning! 🚀"