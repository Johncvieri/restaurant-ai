#!/bin/bash

BASE_URL="https://sturdy-doodle-p56gxx7rv77h7qpr-5000.app.github.dev"
GREEN="\e[32m"
YELLOW="\e[33m"
NC="\e[0m"

# Test Chatbot
echo -e "${YELLOW}💬 Test Chatbot...${NC}"
curl -s -X POST $BASE_URL/chat \
-H "Content-Type: application/json" \
-d '{"message":"Halo AI, buatkan saya resep pizza"}' | jq .
echo -e "\n"

# Test Voice
# Pastikan ada file sample.mp3 di folder yang sama
echo -e "${YELLOW}🎤 Test Voice transcription...${NC}"
curl -s -X POST $BASE_URL/voice \
-F "audio=@sample.mp3" | jq .
echo -e "\n"

echo -e "${GREEN}✅ Selesai test Chatbot & Voice!${NC}"
