import Playlist from "./Playlist";
import VideoItem from "./VideoItem";
import data from "../assets/videos.json";
import { useState } from "react";

export default function Hero() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(data.videos[0]);
  const [videos, setVideos] = useState(data.videos);

  const handleVideoSelect = (index) => {
    setSelectedVideoIndex(index);
  };

  const handleVideosArray = (newVidArr) => {
    setVideos(newVidArr);
  };
  return (
    <div className="grid grid-cols-3 my-8">
      <div className="col-span-1 pl-8">
        <Playlist
          videos={videos}
          onSelectVideo={handleVideoSelect}
          onChangeOrder={handleVideosArray}
        />
      </div>
      <div className="col-span-2 pt-4">
        <VideoItem
          video={selectedVideoIndex}
          videos={videos}
          onSelectVideo={handleVideoSelect}
        />
      </div>
    </div>
  );
}
