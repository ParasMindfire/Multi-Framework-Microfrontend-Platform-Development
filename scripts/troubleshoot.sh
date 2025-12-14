#!/bin/bash

echo "🔍 SkyCart Troubleshooting Tool"
echo "==============================="
echo ""

echo "1. Checking running containers..."
docker-compose ps
echo ""

echo "2. Checking for errors in logs..."
echo ""
echo "Backend logs:"
docker-compose logs backend | grep -i error | tail -10
echo ""
echo "Shell logs:"
docker-compose logs shell | grep -i error | tail -10
echo ""

echo "3. Testing backend API..."
curl -s http://localhost:5000/api/flights > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Backend API is responding"
else
    echo "❌ Backend API is not responding"
fi
echo ""

echo "4. Testing frontend services..."
for service in "shell:3000" "dashboard:4101" "inventory:4300" "analytics:4400"; do
    name=$(echo $service | cut -d: -f1)
    port=$(echo $service | cut -d: -f2)
    
    curl -s http://localhost:$port > /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ $name is responding"
    else
        echo "❌ $name is not responding"
    fi
done
echo ""

echo "5. Checking network connectivity..."
docker exec skycart-backend wget -q --spider http://postgres:5432
if [ $? -eq 0 ]; then
    echo "✅ Backend can reach database"
else
    echo "❌ Backend cannot reach database"
fi
echo ""

echo "Run 'docker-compose logs <service-name>' to see detailed logs"
echo "Example: docker-compose logs backend"