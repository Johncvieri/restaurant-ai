#!/bin/bash

BASE_URL="https://sturdy-doodle-p56gxx7rv77h7qpr-5000.app.github.dev"
GREEN="\e[32m"
YELLOW="\e[33m"
NC="\e[0m"

# Chat messages
chatMessages=(
  "Halo AI, buatkan saya resep pizza"
  "Apa menu terbaik hari ini?"
  "Tambahkan ekstra keju pada pizza"
)

# Dummy audio files
voiceFiles=(
  "audio_samples/sample1.mp3"
  "audio_samples/sample2.mp3"
  "audio_samples/sample3.mp3"
)

LOOPS=${#chatMessages[@]}

for (( i=0; i<$LOOPS; i++ ))
do
  echo -e "${YELLOW}💬 Chatbot test message: ${chatMessages[$i]}${NC}"
  curl -s -X POST $BASE_URL/chat \
    -H "Content-Type: application/json" \
    -d "{\"message\":\"${chatMessages[$i]}\"}" | jq .
  echo -e "\n"

  if [ -f "${voiceFiles[$i]}" ]; then
    echo -e "${YELLOW}🎤 Voice transcription test: ${voiceFiles[$i]}${NC}"
    curl -s -X POST $BASE_URL/voice \
      -F "audio=@${voiceFiles[$i]}" | jq .
    echo -e "\n"
  else
    echo -e "${RED}⚠️ File ${voiceFiles[$i]} tidak ditemukan, skip voice test${NC}"
  fi
done

echo -e "${GREEN}✅ Selesai looping chat + voice simulation!${NC}"
