# 🐳 Docker Quick Start Guide

## Prerequisites

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Start Docker Desktop
3. Open Terminal/Command Prompt

## Learning Path (Recommended for Beginners)

### Option 1: Interactive Learning (RECOMMENDED)

```bash
cd skycart
chmod +x scripts/learn-docker.sh
./scripts/learn-docker.sh
```

This script will:

- ✅ Teach you Docker concepts step-by-step
- ✅ Build images one by one
- ✅ Show you what's happening at each step
- ✅ Let you test as you go

### Option 2: Quick Start (For experienced users)

```bash
cd skycart

# Build all images
docker build -t skycart/backend:latest -f server/Dockerfile .
docker build -t skycart/dashboard:latest -f mfe-dashboard/Dockerfile .
docker build -t skycart/inventory:latest -f mfe-inventory/Dockerfile .
docker build -t skycart/analytics:latest -f mfe-analytics/Dockerfile .
docker build -t skycart/shell:latest -f shell/Dockerfile .

# Start everything
docker-compose up -d

# Wait 30 seconds, then open: http://localhost:3000
```

## Common Issues & Solutions

### Issue: "Cannot connect to Docker daemon"

**Solution:** Start Docker Desktop application

### Issue: "Port already in use"

**Solution:**

```bash
# Stop existing containers
docker-compose down

# Or kill processes on ports
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

### Issue: "Build failed"

**Solution:**

```bash
# Check Docker logs
docker-compose logs backend

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build
```

### Issue: "Module Federation not loading"

**Solution:** Check browser console. MFEs might not be ready yet. Wait 30 seconds.

## Useful Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Restart a service
docker-compose restart backend

# Rebuild and restart
docker-compose up -d --build

# Clean everything (fresh start)
docker-compose down -v
docker system prune -a

# Check what's using disk space
docker system df
```

## What's Running Where?

| Service          | URL                   | Port |
| ---------------- | --------------------- | ---- |
| Shell (Main App) | http://localhost:3000 | 3000 |
| Dashboard MFE    | http://localhost:4101 | 4101 |
| Inventory MFE    | http://localhost:4300 | 4300 |
| Analytics MFE    | http://localhost:4400 | 4400 |
| Backend API      | http://localhost:5000 | 5000 |
| PostgreSQL       | localhost:5432        | 5432 |

## Next Steps

After Docker works, try Kubernetes:

```bash
./scripts/deploy-k8s.sh
```
