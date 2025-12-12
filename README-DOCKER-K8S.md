# Docker & Kubernetes Deployment Guide

## Prerequisites

- Docker Desktop with Kubernetes enabled
- kubectl CLI
- Node.js 20+ (for local development)

## Local Development with Docker Compose

1. Build and run all services:

```bash
docker-compose up --build
```

2. Access the application:

- Shell: http://localhost:3000
- Dashboard: http://localhost:4101
- Inventory: http://localhost:4300
- Analytics: http://localhost:4400
- Backend API: http://localhost:5000

3. Stop services:

```bash
docker-compose down
```

## Kubernetes Deployment

### Step 1: Build Docker Images

```bash
chmod +x scripts/build-images.sh
./scripts/build-images.sh
```

### Step 2: Deploy to Kubernetes

```bash
chmod +x scripts/deploy-k8s.sh
./scripts/deploy-k8s.sh
```

### Step 3: Verify Deployment

```bash
# Check all pods are running
kubectl get pods -n skycart

# Check services
kubectl get services -n skycart

# Get shell service external IP
kubectl get service shell-service -n skycart
```

### Step 4: Access Application

```bash
# If using LoadBalancer (cloud):
# Access via the EXTERNAL-IP shown in shell-service

# If using Minikube/Docker Desktop:
kubectl port-forward service/shell-service 3000:80 -n skycart
# Then access: http://localhost:3000
```

### Step 5: View Logs

```bash
# View backend logs
kubectl logs -f deployment/backend -n skycart

# View shell logs
kubectl logs -f deployment/shell -n skycart
```

### Cleanup

```bash
chmod +x scripts/cleanup-k8s.sh
./scripts/cleanup-k8s.sh
```

## Troubleshooting

### Pods not starting

```bash
kubectl describe pod <pod-name> -n skycart
```

### Check service connectivity

```bash
kubectl exec -it <pod-name> -n skycart -- sh
# Inside pod:
wget -O- http://backend-service:5000/api/flights
```

### Database connection issues

```bash
# Check PostgreSQL logs
kubectl logs -f deployment/postgres -n skycart

# Connect to PostgreSQL
kubectl exec -it deployment/postgres -n skycart -- psql -U postgres -d skycart
```

```

## File Structure Summary
```

skycart/
├── shell/
│ ├── Dockerfile
│ ├── nginx.conf
│ └── .env.production
├── mfe-dashboard/
│ ├── Dockerfile
│ └── nginx.conf
├── mfe-inventory/
│ ├── Dockerfile
│ └── nginx.conf
├── mfe-analytics/
│ ├── Dockerfile
│ └── nginx.conf
└── server/
| └── Dockerfile
├── k8s/
│ ├── namespace.yaml
│ ├── postgres-deployment.yaml
│ ├── backend-deployment.yaml
│ ├── dashboard-deployment.yaml
│ ├── inventory-deployment.yaml
│ ├── analytics-deployment.yaml
│ ├── shell-deployment.yaml
│ └── ingress.yaml
├── scripts/
│ ├── build-images.sh
│ ├── deploy-k8s.sh
│ └── cleanup-k8s.sh
├── docker-compose.yml
└── README-DOCKER-K8S.md
