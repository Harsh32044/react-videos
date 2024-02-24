import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { selectedVideoAtom } from "../atoms";

export default function ListItem({ video, index }) {

  const onSelectVideo = useSetRecoilState(selectedVideoAtom)
  return (
    <Draggable draggableId={video.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="grid grid-cols-2 gap-3 items-center py-4 md:px-5"
          onClick={() => {
            onSelectVideo(video);
          }}
        >
          <img
            src={video.thumbnailUrl}
            alt=""
            className="rounded-lg aspect-video object-cover"
          />
          <div className="flex flex-col justify-between">
            <div className="font-bold text-sm">{video.title}</div>
            <div className="text-xs">{video.author}</div>
            <div className="text-xs">
              {video.views} views | {video.uploadTime}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
