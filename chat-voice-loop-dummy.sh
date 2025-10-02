#!/bin/bash

BASE_URL="https://sturdy-doodle-p56gxx7rv77h7qpr-5000.app.github.dev"
GREEN="\e[32m"
YELLOW="\e[33m"
NC="\e[0m"

# Array chat messages
chatMessages=(
  "Halo AI, buatkan saya resep pizza"
  "Apa menu terbaik hari ini?"
  "Tambahkan ekstra keju pada pizza"
)

LOOPS=${#chatMessages[@]}

for (( i=0; i<$LOOPS; i++ ))
do
  echo -e "${YELLOW}💬 Chatbot test message: ${chatMessages[$i]}${NC}"
  curl -s -X POST $BASE_URL/chat \
    -H "Content-Type: application/json" \
    -d "{\"message\":\"${chatMessages[$i]}\"}" | jq .
  echo -e "\n"

  echo -e "${YELLOW}🎤 Dummy Voice transcription test (no file)${NC}"
  curl -s -X POST $BASE_URL/voice \
    -F "audio=@/dev/null" | jq .
  echo -e "\n"
done

echo -e "${GREEN}✅ Selesai looping chat + dummy voice simulation!${NC}"
