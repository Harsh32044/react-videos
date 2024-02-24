import Playlist from "./Playlist";
import VideoItem from "./VideoItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext } from "react-beautiful-dnd";
import { selectedVideoAtom, theatreModeAtom, videosAtom } from "../atoms";
import { useState } from "react";

export default function Hero() {
  const [videos, setVideos] = useRecoilState(videosAtom);
  const currentVideo = useRecoilValue(selectedVideoAtom);
  const [isDescVisible, setIsDescVisible] = useState(false)
  const theatreMode = useRecoilValue(theatreModeAtom)

  const approxFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  const exactFormatterIndian = new Intl.NumberFormat('en-IN', {
    useGrouping: true,
    maximumFractionDigits: 0
  });  

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
        <div className={`col-span-1 lg:col-span-2 ${theatreMode ? 'lg:col-span-3' : ''} mt-6`}>
          <VideoItem />
          <div className="pt-2 mx-4 md:mx-10">
            <div className="font-bold text-xl">{currentVideo.title}</div>
            <div className="text-xs text-gray-400">{approxFormatter.format(parseFloat(currentVideo.subscriber))} Subscribers</div>
            <div className={`${isDescVisible ? '' : 'line-clamp-1'} cursor-pointer`} onClick={() => setIsDescVisible(!isDescVisible)}>
            <div className="text-md pt-4">{currentVideo.description}</div>
            <div className="text-md pt-4">{exactFormatterIndian.format(parseFloat(currentVideo.subscriber))} Subscribers</div>
            </div>
          </div>
        </div>
        <div className="col-span-1 pl-4">
          <Playlist />
        </div>
      </div>
    </DragDropContext>
  );
}
