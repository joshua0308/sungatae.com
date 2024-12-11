---
title: "Instagram Archive (ig.sungatae.com)"
date: 2024-11-27T00:27:56-05:00
draft: false
categories:
- Life
---

One downside of quitting Instagram is that there’s no easy way to look back at my posts. It feels like I’ve lost a chapter of my life since it was where I used to share life updates. To preserve those memories, I decided to upload photos and videos from Instagram to my own domain. As the title suggests, I intend to treat it as an archive so I won't be uploading any new posts there. Feel free to take a look and catch a glimpse of my life from 2017 to 2022.

[ig.sungatae.com](https://ig.sungatae.com)
[![ig-archive](images/ig-archive.png)](https://ig.sungatae.com)

Below are some useful scripts I used to manipulate files and images to make the website.
```sh
# move files one directory up and rename the files
for file in */*; do
  mv "$file" "$(dirname "$file")/../$(dirname "$file")_$(basename "$file")";
done

# remove directories
for dir in */; do
  rm -r "$dir"
done

# rename file to use the date and the first alphanumeric
# before: 202212_317890708_1497357317424272_173764033022_2218499494.jpg
# after:  202212_317890708.jpg
for file in ./*.{mp4,jpg}; do
    newname=$(echo $(basename "$file") | sed -E 's/^([0-9]+)_([a-zA-Z0-9]+).*\.(mp4|png|jpg)/\1_\2.\3/'); mv "$file" "./$newname";
done

# create thumbnails (300x300 in size cropped in center) for every img in directory
mkdir -p thumbnails
for img in ./posts/*.jpg; do
    magick "$img" -resize 300x300^ -gravity center -extent 300x300 "./thumbnails/$(basename "${img%.*}")_thumbnail.jpg";
done

# extract first frame of video as png
for file in *.mp4; do
    ffmpeg -i "$file" -vf "select=eq(n\,0)" -vframes 1 "${file%.*}.png";
done
```