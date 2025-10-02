#!/bin/bash

BASE_URL="https://sturdy-doodle-p56gxx7rv77h7qpr-5000.app.github.dev"
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
NC="\e[0m"

declare -A testData=(
  ["voice_command"]="order pizza"
  ["chat_message"]="Hello AI"
  ["menu_image"]="pizza.jpg"
  ["chef_notes"]="Extra cheese"
)

echo -e "${YELLOW}🚀 Test koneksi Redis...${NC}"
curl -s -X GET $BASE_URL/redis/test | jq .
echo -e "\n"

echo -e "${YELLOW}📡 PING Redis...${NC}"
curl -s -X GET $BASE_URL/redis/ping | jq .
echo -e "\n"

for key in "${!testData[@]}"; do
  value=${testData[$key]}
  echo -e "${YELLOW}📌 Simpan key '$key' = '$value'...${NC}"
  curl -s -X POST $BASE_URL/redis/$key/$value | jq .
  echo -e "\n"
done

for key in "${!testData[@]}"; do
  echo -e "${YELLOW}📌 Ambil key '$key'...${NC}"
  curl -s -X GET $BASE_URL/redis/$key | jq .
  echo -e "\n"
done

for key in "${!testData[@]}"; do
  echo -e "${YELLOW}🗑️ Hapus key '$key'...${NC}"
  curl -s -X DELETE $BASE_URL/redis/$key | jq .
  echo -e "\n"
done

echo -e "${GREEN}✅ Selesai simulasi Redis untuk fitur voice/chatbot/menu!${NC}"
