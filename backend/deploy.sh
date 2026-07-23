#!/bin/bash
# ─── Backend Deployment Script ───
# Usage: ./deploy.sh <ec2-host> <pem-file>
# Example: ./deploy.sh ec2-xx-xx-xx-xx.compute-1.amazonaws.com ~/my-key.pem

set -e

HOST=$1
PEM=$2
JAR="target/portfolio-0.0.1-SNAPSHOT.jar"
REMOTE_PATH="/opt/portfolio/backend.jar"

if [ -z "$HOST" ] || [ -z "$PEM" ]; then
  echo "Usage: $0 <ec2-host> <pem-file>"
  exit 1
fi

echo "→ Building JAR…"
./mvnw clean package -DskipTests -q

echo "→ Copying JAR to $HOST:$REMOTE_PATH…"
scp -i "$PEM" "$JAR" "ec2-user@$HOST:$REMOTE_PATH"

echo "→ Restarting service…"
ssh -i "$PEM" "ec2-user@$HOST" "sudo systemctl restart portfolio-backend"

echo "✅ Deployed! Check status with:"
echo "  ssh -i $PEM ec2-user@$HOST 'sudo systemctl status portfolio-backend'"
echo "  ssh -i $PEM ec2-user@$HOST 'sudo journalctl -u portfolio-backend -f'"
