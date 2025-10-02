#!/bin/bash

echo "🔧 Memperbaiki import middleware..."

# Perbaiki semua yang salah pakai verifyToken
grep -rl '../middleware/verifyToken' src/routes | while read -r file ; do
  echo "   -> Memperbaiki $file"
  sed -i 's#../middleware/verifyToken#../middleware/auth#g' "$file"
done

echo "✅ Semua import middleware sudah diperbaiki!"
