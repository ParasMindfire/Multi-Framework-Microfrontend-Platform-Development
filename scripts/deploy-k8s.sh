#!/bin/bash

set -e  # Exit on error

echo "🚀 Deploying SkyCart to Kubernetes..."
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a deployment is ready
wait_for_deployment() {
    local deployment=$1
    local namespace=$2
    local timeout=${3:-300}
    
    echo -e "${YELLOW}⏳ Waiting for $deployment to be ready...${NC}"
    kubectl wait --for=condition=available \
        --timeout=${timeout}s \
        deployment/$deployment \
        -n $namespace \
        2>/dev/null || {
            echo -e "${RED}❌ Timeout waiting for $deployment${NC}"
            kubectl get pods -n $namespace -l app=$deployment
            kubectl logs -n $namespace -l app=$deployment --tail=50
            return 1
        }
    echo -e "${GREEN}✅ $deployment is ready${NC}"
    echo ""
}

# Function to check if pods are ready
wait_for_pods() {
    local label=$1
    local namespace=$2
    local timeout=${3:-300}
    
    echo -e "${YELLOW}⏳ Waiting for pods with label $label...${NC}"
    kubectl wait --for=condition=ready \
        --timeout=${timeout}s \
        pod -l $label \
        -n $namespace \
        2>/dev/null || {
            echo -e "${RED}❌ Timeout waiting for pods${NC}"
            kubectl get pods -n $namespace -l $label
            return 1
        }
    echo -e "${GREEN}✅ Pods are ready${NC}"
    echo ""
}

# 1. Create namespace
echo "📦 Creating namespace..."
kubectl apply -f k8s/namespace.yaml
echo ""

# 2. Deploy PostgreSQL
echo "🗄️  Deploying PostgreSQL..."
kubectl apply -f k8s/postgres-deployment.yaml
wait_for_pods "app=postgres" "skycart" 120

# Verify postgres is actually ready
echo "🔍 Verifying PostgreSQL connection..."
kubectl run postgres-test \
    --image=postgres:16-alpine \
    --namespace=skycart \
    --restart=Never \
    --rm -it \
    --command -- psql \
    -h postgres.skycart.svc.cluster.local \
    -U postgres \
    -d skycart \
    -c "SELECT 1;" 2>/dev/null || {
        echo -e "${YELLOW}⚠️  Warning: Could not verify PostgreSQL connection${NC}"
    }
echo ""

# 3. Deploy backend
echo "🔧 Deploying Backend..."
kubectl apply -f k8s/backend-deployment.yaml
wait_for_deployment "backend" "skycart" 180

# Test backend health
echo "🔍 Testing backend health..."
kubectl run backend-test \
    --image=curlimages/curl:latest \
    --namespace=skycart \
    --restart=Never \
    --rm -it \
    --command -- curl -s http://backend.skycart.svc.cluster.local:5000/api/health || {
        echo -e "${YELLOW}⚠️  Warning: Backend health check failed${NC}"
    }
echo ""

# 4. Deploy micro-frontends
echo "🎨 Deploying Dashboard..."
kubectl apply -f k8s/dashboard-deployment.yaml
wait_for_deployment "dashboard" "skycart" 120

echo "📦 Deploying Inventory..."
kubectl apply -f k8s/inventory-deployment.yaml
wait_for_deployment "inventory" "skycart" 120

echo "📊 Deploying Analytics..."
kubectl apply -f k8s/analytics-deployment.yaml
wait_for_deployment "analytics" "skycart" 120

# 5. Deploy shell
echo "🐚 Deploying Shell..."
kubectl apply -f k8s/shell-deployment.yaml
wait_for_deployment "shell" "skycart" 120

# 6. Show deployment status
echo ""
echo "======================================"
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo "======================================"
echo ""

echo "📊 Deployment Status:"
kubectl get pods -n skycart -o wide
echo ""

echo "🌐 Services:"
kubectl get svc -n skycart
echo ""

# Get LoadBalancer IP/URL
echo "🔗 Access URLs:"
SHELL_IP=$(kubectl get svc shell -n skycart -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "pending")
if [ "$SHELL_IP" = "pending" ] || [ -z "$SHELL_IP" ]; then
    SHELL_IP=$(kubectl get svc shell -n skycart -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "pending")
fi

if [ "$SHELL_IP" != "pending" ] && [ -n "$SHELL_IP" ]; then
    echo -e "  Shell App: ${GREEN}http://$SHELL_IP${NC}"
else
    echo -e "  Shell App: ${YELLOW}Waiting for LoadBalancer IP...${NC}"
    echo "  Run: kubectl get svc shell -n skycart -w"
fi

echo ""
echo "🔍 To check logs:"
echo "  kubectl logs -f -n skycart deployment/backend"
echo "  kubectl logs -f -n skycart deployment/shell"
echo ""
echo "🔄 To restart a deployment:"
echo "  kubectl rollout restart deployment/backend -n skycart"
echo ""
echo "🗑️  To cleanup:"
echo "  ./scripts/cleanup.sh"