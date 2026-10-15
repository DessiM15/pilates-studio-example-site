#!/bin/zsh
# Trims and transcodes the Pexels source clips into lean, self hosted files.
# Usage: scripts/videos.sh <folder with source mp4s>   (outputs to public/video)
# Landscape clips become 1600px wide, portrait clips 900px wide, 9 seconds, H.264, no audio.
set -e
src=$1
out="$(dirname "$0")/../public/video"
mkdir -p "$out"
for f in "$src"/*.mp4; do
  name=$(basename "$f" .mp4)
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f")
  h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$f")
  if [ "$w" -ge "$h" ]; then scale="scale=1600:-2"; else scale="scale=900:-2"; fi
  ffmpeg -y -loglevel error -ss 0 -t 9 -i "$f" -an -vf "$scale,fps=25" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$out/$name.mp4"
  echo "$name: $(du -h "$out/$name.mp4" | cut -f1)"
done
