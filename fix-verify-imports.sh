#!/bin/bash

echo "🔧 Memperbaiki semua import verifyToken..."

# Cari semua import default verifyToken di routes lalu ganti jadi named import
grep -rl 'import verifyToken from' src/routes | while read -r file ; do
  echo "   -> Memperbaiki $file"
  sed -i 's#import verifyToken from#import { verifyToken } from#g' "$file"
done

echo "✅ Semua import verifyToken sudah diperbaiki!"
