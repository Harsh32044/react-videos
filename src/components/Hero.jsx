import Playlist from "./Playlist";
import VideoItem from "./VideoItem";
import data from "../assets/videos.json";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

export default function Hero() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(data.videos[0]);
  const [videos, setVideos] = useState(data.videos);

  const handleVideoSelect = (index) => {
    setSelectedVideoIndex(index);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const videosArr = Array.from(videos);

    const removedVideoIndex = videosArr.findIndex(
      (vid) => vid.id === draggableId
    ); // Getting the array index

    videosArr.splice(source.index, 1); // Removing the video corresponding to draggableId
    videosArr.splice(destination.index, 0, videos[removedVideoIndex]); // Placing the removed video at destination index
    setVideos(videosArr);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 my-8">
        <div className="col-span-1 lg:col-span-2 my-6">
          <VideoItem
            video={selectedVideoIndex}
            videos={videos}
            onSelectVideo={handleVideoSelect}
          />
        </div>
        <div className="col-span-1 pl-4">
          <Playlist videos={videos} onSelectVideo={handleVideoSelect} />
        </div>
      </div>
    </DragDropContext>
  );
}
