import { useState, useRef, useEffect } from "react";

export default function VideoItem({ video, videos, onSelectVideo }) {
  const [play, setPlay] = useState(true);
  const [theatre, setTheatre] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [miniplayer, setMiniplayer] = useState(false);
  const [volume, setVolume] = useState(1);
  const [screenSizeSmall, setScreenSizeSmall] = useState(window.screen.width < 768)
  const [time, setTime] = useState({
    currentTime: "00:00",
    totalTime: "00:00",
  });
  const [speed, setSpeed] = useState("1X");
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const timeLineContainerRef = useRef(null);

  useEffect(() => {
    const timeLineContainer = timeLineContainerRef.current;
    const video = videoRef.current;
    const handleKeyDown = (event) => {
      const currentElement = document.activeElement.tagName.toLowerCase();
      if (currentElement === "input") return;
      switch (event.key.toLowerCase()) {
        case " ": // Spacebar
          if (currentElement === "button") return;
          event.preventDefault();
        case "k":
          handlePlayPause();
          break;
        case "arrowleft":
          video.currentTime -= 10;
          break;
        case "arrowright":
          video.currentTime += 10;
          break;
        case "f":
          toggleFullscreen();
          break;
        case "t":
          handleTheatreToggle();
          break;
        default:
          break;
      }
    };

    const loadDuration = () => {
      setTime({
        ...time,
        totalTime: durationFormatting(video.duration),
      });
    };

    const updateCurrentTime = () => {
      setTime({
        ...time,
        totalTime: durationFormatting(video.duration),
        currentTime: durationFormatting(video.currentTime),
      });
      const currentPercentage = video.currentTime / video.duration;
      timeLineContainer.style.setProperty(
        "--progress-position",
        currentPercentage
      );
    };

    const handleTimelineUpdate = (event) => {
      const video = videoRef.current;
      const rectangle = timeLineContainer.getBoundingClientRect();
      const percentage =
        Math.min(Math.max(0, event.x - rectangle.x), rectangle.width) /
        rectangle.width;
      timeLineContainer.style.setProperty("--progress-position", percentage);
      video.currentTime = video.duration * percentage;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("enterpictureinpicture", () =>
      setMiniplayer(true)
    );
    document.addEventListener("leavepictureinpicture", () =>
      setMiniplayer(false)
    );
    window.addEventListener("resize", () => setScreenSizeSmall(window.screen.width < 768))
    
    video.addEventListener("loadeddata", loadDuration);
    video.addEventListener("timeupdate", updateCurrentTime);
    timeLineContainer.addEventListener("click", handleTimelineUpdate);
    
    return () => {
      timeLineContainer.removeEventListener("click", handleTimelineUpdate);
      document.removeEventListener("enterpictureinpicture", () =>
      setMiniplayer(true)
      );
      document.removeEventListener("leavepictureinpicture", () =>
      setMiniplayer(false)
      );
      video.removeEventListener("loadeddata", loadDuration);
      document.removeEventListener("keydown", handleKeyDown);
      video.removeEventListener("timeupdate", updateCurrentTime);
      window.removeEventListener("resize", () => setScreenSizeSmall(window.screen.width < 768))
    };
  }, []);
  // Duration Formatting

  const durationFormatting = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    const leadingZeroesFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });

    if (hours === 0) {
      return `${leadingZeroesFormatter.format(
        minutes
      )}:${leadingZeroesFormatter.format(seconds)}`;
    }
    return `${hours}:${leadingZeroesFormatter.format(
      minutes
    )}:${leadingZeroesFormatter.format(seconds)}`;
  };

  // Event Handlers
  function handlePlayPause() {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      setPlay(true);
    } else {
      video.pause();
      setPlay(false);
    }
  }

  function handleTheatreToggle() {
    setTheatre((theatre) => !theatre);
  }

  function enterFullscreen() {
    const videoElem = videoContainerRef.current;
    if (videoElem.requestFullscreen) {
      videoElem.requestFullscreen();
    } else if (videoElem.mozRequestFullScreen) {
      // Firefox
      videoElem.mozRequestFullScreen();
    } else if (videoElem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      videoElem.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      enterFullscreen();
      setFullscreen(true);
    } else {
      exitFullscreen();
      setFullscreen(false);
    }
  }

  function toggleMiniplayer() {
    if (miniplayer) {
      document.exitPictureInPicture();
      setMiniplayer(false);
    } else {
      videoRef.current.requestPictureInPicture();
      setMiniplayer(true);
    }
  }

  const handleMute = () => {
    const video = videoRef.current;
    if (volume == 0) {
      setVolume(1);
      video.volume = 1;
    } else {
      setVolume(0);
      video.volume = 0;
    }
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const currentVolume = parseFloat(e.target.value);
    setVolume(currentVolume);
    video.volume = currentVolume;
  };

  const changePlayBackSpeed = () => {
    const video = videoRef.current;
    let playbackRate = video.playbackRate + 0.25;
    if (playbackRate > 2) {
      playbackRate = 0.25;
    }
    setSpeed(`${playbackRate}X`);
    video.playbackRate = playbackRate;
  };
  return (
    <div
      ref={videoContainerRef}
      className={`video-container ${play ? "" : "paused"} ${
        theatre ? "theatre" : ""
      } ${fullscreen ? "fullscreen" : ""} ${miniplayer ? "mini-player" : ""}`}
      data-volume-level={`${
        volume == 0 ? "none" : volume > 0 && volume < 0.5 ? "low" : "high"
      }`}
    >
      <div className={`video-controls-container ${screenSizeSmall ? 'hidden' : ''}`}>
        <div
          className="timeline-container h-2 mx-1 group"
          ref={timeLineContainerRef}
        >
          <div
            className="timeline h-1 w-full transition-all duration-200 ease-in-out group-hover:h-full group-hover:before:block relative cursor-pointer items-center bg-gray-700
          before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:bg-gray-400 after:content-[''] after:absolute after:left-0
          after:top-0 after:bottom-0 after:bg-red-700"
          >
            <div className="thumb-indicator absolute transition-transform bg-red-700 aspect-square"></div>
          </div>
        </div>
        <div className="controls">
          {/* ! Play pause buttons */}
          <button
            type="button"
            className="play-pause-btn"
            onClick={handlePlayPause}
          >
            <svg className="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>

          {/* Volume Container */}
          <div className="group flex justify-center">
            <button className="mute-btn" onClick={handleMute}>
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            <input
              className="w-0 origin-left scale-x-0 transition-all duration-150 ease-in-out group-hover:w-24 group-hover:scale-100"
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="flex items-center gap-1 flex-grow">
            <div>{time.currentTime}</div>/<div>{time.totalTime}</div>
          </div>

          {/* Playback Speed */}
          <button className="mx-4" onClick={changePlayBackSpeed}>
            {speed}
          </button>
          {/* ! Miniplayer button */}
          <button className="mini-player" onClick={toggleMiniplayer}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>

          {/* ! Theatre button */}
          <button className="theatre-btn" onClick={handleTheatreToggle}>
            <svg className="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
              />
            </svg>
          </button>

          {/* Full Screen Toggles */}
          <button className="full-screen-btn" onClick={toggleFullscreen}>
            <svg className="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
      </div>
      {video ? (
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          onClick={handlePlayPause}
          controls={screenSizeSmall ? true : false}
          autoPlay={true}
          onEnded={() => {
            const currVideoId = video.id;
            let nextVidId = 0;
            if (currVideoId < videos.length - 1) {
              nextVidId = parseInt(currVideoId) + 1;
            }
            onSelectVideo(videos.filter((vid) => vid.id == nextVidId)[0]);
          }}
        >
          Your Browser Doesn't Support Videos!
        </video>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
