import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import ListItem from "./ListItem";
import { useRecoilValue } from "recoil";
import { videosAtom } from "../atoms";

export default function Playlist() {
  const videos = useRecoilValue(videosAtom)
  return (
    <>
      <header className="font-semibold text-lg px-5">Current Queue</header>
      <div className="max-h-dvh place-items-baseline overflow-y-scroll scroll-smooth">
        <Droppable droppableId="playlist-1">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {videos.map((video, index) => (
                <ListItem
                  key={video.id}
                  index={index}
                  video={video}
                  videos={videos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}
