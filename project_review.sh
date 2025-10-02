#!/bin/bash

OUTPUT="project_review.txt"
echo "===== Project Review =====" > $OUTPUT

# 1. Struktur folder & file
echo "===== Folder & File Structure =====" >> $OUTPUT
ls -R >> $OUTPUT

# 2. API Endpoints
echo "===== Order API =====" >> $OUTPUT
cat app/api/order/route.ts >> $OUTPUT

echo "===== Stripe Webhook =====" >> $OUTPUT
cat app/api/webhook/route.ts >> $OUTPUT

echo "===== AI Chatbot =====" >> $OUTPUT
cat app/api/ai/chat/route.ts >> $OUTPUT

echo "===== AI Image =====" >> $OUTPUT
cat app/api/ai/image/route.ts >> $OUTPUT

echo "===== AI OCR =====" >> $OUTPUT
cat app/api/ai/ocr/route.ts >> $OUTPUT

echo "===== AI Voice =====" >> $OUTPUT
cat app/api/ai/voice/route.ts >> $OUTPUT

# 3. Frontend Pages
echo "===== Home Page =====" >> $OUTPUT
cat app/page.tsx >> $OUTPUT

echo "===== Chat Page =====" >> $OUTPUT
cat app/chat/page.tsx >> $OUTPUT

echo "===== Admin Dashboard =====" >> $OUTPUT
cat app/admin/page.tsx >> $OUTPUT

# 4. Env Variables
echo "===== ENV VARIABLES =====" >> $OUTPUT
cat .env >> $OUTPUT

echo "===== Project review completed! ====="
echo "Check file: $OUTPUT"
