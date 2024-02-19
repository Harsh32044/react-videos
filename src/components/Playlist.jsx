import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import ListItem from "./ListItem";

export default function Playlist({ videos, onSelectVideo }) {
  return (
    <>
      <header className="font-semibold text-lg">Current Queue</header>
      <div className="max-h-[30rem] overflow-y-scroll scroll-smooth">
        <Droppable droppableId="playlist-1">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {videos.map((video, index) => (
                <ListItem
                  key={video.id}
                  index={index}
                  video={video}
                  videos={videos}
                  onSelectVideo={onSelectVideo}
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
