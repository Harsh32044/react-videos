export default function ListItem({video, videos, onSelectVideo}) {
    return (
        <div className="grid md:grid-cols-2 gap-3 cursor-pointer items-center py-4 pl-4" onClick={() => {
            const currVideoSelected = videos.filter(vid => vid.id === video.id)
            onSelectVideo(currVideoSelected[0])
        }}>
            <div><img src={video.thumbnailUrl} alt="" className="rounded-lg"/></div>
            <div className="flex flex-col justify-between">
                <div className="font-bold text-sm">{video.title}</div>
                <div className="text-xs">{video.author}</div>
                <div className="text-xs">{video.views} views | {video.uploadTime}</div>
            </div>
        </div>
    )
}