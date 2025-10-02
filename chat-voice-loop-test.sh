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

# Array voice files (pastikan ada di folder yang sama)
voiceFiles=(
  "sample1.mp3"
  "sample2.mp3"
  "sample3.mp3"
)

LOOPS=${#chatMessages[@]}

for (( i=0; i<$LOOPS; i++ ))
do
  echo -e "${YELLOW}💬 Chatbot test message: ${chatMessages[$i]}${NC}"
  curl -s -X POST $BASE_URL/chat \
    -H "Content-Type: application/json" \
    -d "{\"message\":\"${chatMessages[$i]}\"}" | jq .
  echo -e "\n"

  echo -e "${YELLOW}🎤 Voice transcription test: ${voiceFiles[$i]}${NC}"
  curl -s -X POST $BASE_URL/voice \
    -F "audio=@${voiceFiles[$i]}" | jq .
  echo -e "\n"
done

echo -e "${GREEN}✅ Selesai looping chat + voice simulation!${NC}"
