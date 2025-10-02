#!/bin/bash
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
NC="\e[0m"

BASE_URL="http://localhost:5000"

echo -e "${GREEN}🚀 Quick test for Restaurant AI services${NC}"

# ----------------------
# 1️⃣ Redis check
# ----------------------
if command -v redis-cli >/dev/null 2>&1; then
    echo -e "${YELLOW}🔹 Redis ping...${NC}"
    if redis-cli ping | grep -q PONG; then
        echo -e "${GREEN}✅ Redis is running${NC}"
    else
        echo -e "${RED}❌ Redis did not respond${NC}"
    fi
else
    echo -e "${RED}❌ redis-cli not found, skipping Redis test${NC}"
fi

# ----------------------
# 2️⃣ API root check
# ----------------------
echo -e "${YELLOW}🔹 API root endpoint check...${NC}"
curl -s $BASE_URL | jq .

# ----------------------
# 3️⃣ Chat route test
# ----------------------
echo -e "${YELLOW}🔹 Chat route test...${NC}"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message","userId":"user1"}' | jq .

# ----------------------
# 4️⃣ Voice route test
# ----------------------
echo -e "${YELLOW}🔹 Voice route test...${NC}"
if [ -f "audio_samples/sample1.mp3" ]; then
  curl -s -X POST $BASE_URL/voice \
    -F "audio=@audio_samples/sample1.mp3" \
    -F "userId=user1" | jq .
else
  echo -e "${RED}❌ Dummy audio file not found, skip voice test${NC}"
fi

echo -e "${GREEN}✅ Quick test completed${NC}"
