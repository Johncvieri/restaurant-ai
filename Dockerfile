FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install sox & redis-tools untuk dummy audio & monitor
RUN apt-get update && apt-get install -y sox libsox-fmt-mp3 redis-tools jq

# Buat folder dummy audio
RUN mkdir -p audio_samples

# Generate 3 dummy audio files
RUN for i in 1 2 3; do sox -n -r 16000 -c 1 audio_samples/sample${i}.mp3 synth 1 sine 440; done

# Build TypeScript
RUN npm run build

EXPOSE 5000

CMD bash -c "\
  ./redis-live-monitor.sh & \
  npm run dev & \
  ./chat-voice-loop-full.sh"
