#!/bin/bash
REDIS_URL="redis://localhost:6379"
GREEN="\e[32m"
YELLOW="\e[33m"
NC="\e[0m"

echo -e "${GREEN}🚀 Live Redis monitoring started...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"

redis-cli -u $REDIS_URL PSUBSCRIBE "chat:*" "voice:*" | while read line; do
    echo -e "${GREEN}Redis Event: ${NC}$line"
done
