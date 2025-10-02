#!/bin/bash
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
NC="\e[0m"

BASE_URL="http://localhost:5000"

echo -e "${GREEN}🚀 Quick test for Restaurant AI in Codespaces${NC}"

# ----------------------
# 1️⃣ Redis check via Node.js
# ----------------------
echo -e "${YELLOW}🔹 Checking Redis via Node.js...${NC}"
node -e "
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
redis.ping()
  .then(res => console.log('${GREEN}✅ Redis response:${NC}', res))
  .catch(err => console.error('${RED}❌ Redis error:${NC}', err));
"

# ----------------------
# 2️⃣ Ensure dummy audio exists
# ----------------------
mkdir -p audio_samples
for i in 1 2 3; do
  if [ ! -f "audio_samples/sample${i}.mp3" ]; then
    touch "audio_samples/sample${i}.mp3"
    echo -e "${YELLOW}⚠️ Created dummy audio file sample${i}.mp3${NC}"
  fi
done

# ----------------------
# 3️⃣ API root check
# ----------------------
echo -e "${YELLOW}🔹 API root endpoint check...${NC}"
curl -s $BASE_URL | python3 -m json.tool || echo -e "${RED}❌ API root not returning valid JSON${NC}"

# ----------------------
# 4️⃣ Chat route test
# ----------------------
echo -e "${YELLOW}🔹 Chat route test...${NC}"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message","userId":"user1"}' | python3 -m json.tool || echo -e "${RED}❌ Chat route not returning valid JSON${NC}"

# ----------------------
# 5️⃣ Voice route test
# ----------------------
echo -e "${YELLOW}🔹 Voice route test...${NC}"
curl -s -X POST $BASE_URL/voice \
  -F "audio=@audio_samples/sample1.mp3" \
  -F "userId=user1" | python3 -m json.tool || echo -e "${RED}❌ Voice route not returning valid JSON${NC}"

echo -e "${GREEN}✅ Quick test completed${NC}"
