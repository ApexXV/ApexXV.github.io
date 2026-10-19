#!/usr/bin/env bash
# Build the website timelapse clips from Bambu Lab timelapse exports.
#
# Usage (from source/): bash scripts/video-assets.sh <folder with the original .mp4 files>
# Requires ffmpeg with libx264, and Python 3 with Pillow.
#
# Originals are not kept in the repo (size). Each clip is brightened slightly,
# sped up, given a short hold on the finished part, stamped with the AP3X logo,
# encoded as silent H.264 MP4 (fast start) plus a VP9 WebM fallback, and gets a WebP
# poster of its last frame.
set -euo pipefail
src="${1:?pass the folder holding the original timelapse .mp4 files}"
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/public/video"
mkdir -p "$out"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

WIDTH=960
# Logo: reversed (white/cyan) horizontal logo at 22% of width, 92% opacity.
python3 -I - "$root/public/brand/ap3x-logo-horizontal-reversed.png" "$tmp/logo.png" "$WIDTH" <<'PY'
import sys
from PIL import Image
src, dst, width = sys.argv[1], sys.argv[2], int(sys.argv[3])
logo = Image.open(src).convert("RGBA")
w = round(width * 0.22)
logo = logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS)
logo.putalpha(logo.getchannel("A").point(lambda a: round(a * 0.92)))
logo.save(dst)
PY
MARGIN=$(( WIDTH * 35 / 1000 ))

# name | source filename prefix | speed factor | extra filter before retiming
CLIPS=(
  "lattice-vase|0934ac0b|2.6|null"
  # Frames 6-14 are the printer's red laser-scan pass; drop them.
  "batch-tiles|226bfa9d|0.8|select='not(between(n\,6\,14))'"
  "enclosure-set|9bd47746|1.0|null"
  "box-print|5bc9e8ec|1.6|null"
)

for clip in "${CLIPS[@]}"; do
  IFS='|' read -r name prefix speed pre <<< "$clip"
  input=$(ls "$src"/"$prefix"*.mp4 | head -1)
  vf="[0:v]${pre},setpts=N/24/TB,setpts=PTS/${speed},fps=24,scale=${WIDTH}:-2:flags=lanczos,eq=brightness=0.03:contrast=1.08:saturation=1.05:gamma=1.12,tpad=stop_mode=clone:stop_duration=1.2[v];[v][1:v]overlay=W-w-${MARGIN}:H-h-${MARGIN}:format=auto,format=yuv420p[o]"
  ffmpeg -v error -y -i "$input" -i "$tmp/logo.png" -filter_complex "$vf" -map "[o]" -an \
    -c:v libx264 -preset slow -crf 27 -profile:v high -level 4.0 -movflags +faststart \
    -map_metadata -1 "$out/$name.mp4"
  # VP9 WebM fallback for browsers without H.264 (some Linux builds); each viewer downloads one.
  ffmpeg -v error -y -i "$out/$name.mp4" -an -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
    -map_metadata -1 "$out/$name.webm"
  ffmpeg -v error -y -sseof -0.5 -i "$out/$name.mp4" -frames:v 1 -update 1 "$tmp/$name.png"
  python3 -I -c "from PIL import Image; Image.open('$tmp/$name.png').convert('RGB').save('$out/$name-poster.webp', quality=78, method=6)"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out/$name.mp4")
  size=$(du -k "$out/$name.mp4" | cut -f1); wsize=$(du -k "$out/$name.webm" | cut -f1)
  echo "$name  ${dur%.*}.$(echo ${dur#*.} | cut -c1)s  mp4 ${size} KB  webm ${wsize} KB"
done
