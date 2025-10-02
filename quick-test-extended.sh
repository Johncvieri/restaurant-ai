#!/bin/bash
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
NC="\e[0m"

BASE_URL="http://localhost:5000"

echo -e "${GREEN}🚀 Extended Quick Test for Restaurant AI in Codespaces${NC}"

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

# ----------------------
# 6️⃣ Supabase client check
# ----------------------
echo -e "${YELLOW}🔹 Supabase client check...${NC}"
node -e "
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
if(!supabaseUrl || !supabaseKey) { console.error('${RED}❌ Supabase URL or KEY missing${NC}'); process.exit(1); }
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);
supabase.from('restaurants').select('*').limit(1)
  .then(res => console.log('${GREEN}✅ Supabase query response:${NC}', res))
  .catch(err => console.error('${RED}❌ Supabase query error:${NC}', err));
"

# ----------------------
# 7️⃣ OpenAI API check
# ----------------------
echo -e "${YELLOW}�� OpenAI API check...${NC}"
node -e "
const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Hello' }]
})
.then(res => console.log('${GREEN}✅ OpenAI response OK${NC}'))
.catch(err => console.error('${RED}❌ OpenAI error:${NC}', err));
"

echo -e "${GREEN}✅ Extended Quick Test Completed${NC}"
