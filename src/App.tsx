import React, { useRef, useState } from "react";
import "./App.css";
import ReactHlsPlayer from "./Player";
import {
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsVolumeUpFill,
  BsFullscreen,
  BsFillVolumeMuteFill,
  BsFillCameraVideoFill
} from "react-icons/bs";

function App() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hlsUrl, setHlsUrl] = useState(
    "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
  );
  const [destroy, setDestroy] = useState(false);
  const [slider, setSlider] = useState(50);
  const [progress, setProgress] = useState(0);

  function _handleEnter(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      setHlsUrl(inputRef?.current?.value ?? "");
    }
  }
  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    let control = playerRef?.current;
    if (control) {
      setProgress((control.currentTime / control.duration) * 100);
      control.currentTime = (control.currentTime / control.duration) * 100
    }
  };
  function _handlevolume(e: React.ChangeEvent<HTMLInputElement>) {
    setSlider(e.target.valueAsNumber);
    let volcontrol = playerRef?.current;
    if (volcontrol) volcontrol.volume = e.target.valueAsNumber / 100;
  }
  function _handleDestroyClick() {
    setDestroy(true);
  }
  function playVideo() {
    playerRef?.current?.play();
  }

  function pauseVideo() {
    playerRef?.current?.pause();
  }
  function fullScreen() {
    playerRef?.current?.requestFullscreen();
  }

  function _handleToggleControls() {
    if (playerRef?.current?.hasAttribute("controls")) {
      playerRef.current.removeAttribute("controls");
    } else {
      playerRef?.current?.setAttribute("controls", "true");
    }
  }
  function PlayNewVideo(vidsource: string) {
    if (vidsource) {
      setHlsUrl(vidsource);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Video Player</h1>
        </div>
      </div>
      <div className="row mt-5">

        <div className="col-9 vidcontainer">
          {!destroy ? (
            <ReactHlsPlayer
              loop={true}
              width="100%"
              height="100%"
              controls={true}
              autoPlay
              playerRef={playerRef}
              src={hlsUrl}
            />
          ) : null}
          <div className="controls controls-dark" style={{ marginBottom: -57 }}>
            <button
              onClick={playVideo}
              className="btn btn-lg "
              data-bs-toggle="tooltip"
              title="Play Video"
              type="button"
            >
              <BsFillPlayCircleFill />
            </button>
            <button
              onClick={pauseVideo}
              className="btn btn-lg "
              data-bs-toggle="tooltip"
              title="Pause Video"
              type="button"
            >
              <BsPauseCircleFill />
            </button>
            <button
              className="btn btn-lg "
              data-bs-toggle="tooltip"
              title="Full Screen"
              type="button"
            >
              <BsVolumeUpFill />
            </button>
            <input
              style={{ verticalAlign: "middle" }}
              type="range"
              value={slider}
              onChange={_handlevolume}
              min="0"
              max="100"
              step="1"
            />
            <progress id="progress" max="100" value={progress}>
              Progress
            </progress>
            <button
              onClick={fullScreen}
              className="btn btn-lg "
              data-bs-toggle="tooltip"
              title="Play Video"
              type="button"
            >
              <BsFullscreen />
            </button>
          </div>
        </div>
        <div className="col-3">
          <div>
            <h1 className="text-center">Playlist</h1>
            <ul className="playlist">
              <li className="playlist" onClick={() => PlayNewVideo("https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/index_0_av.m3u8")} > <BsFillCameraVideoFill /> Big Buck Bunny</li>
              <li className="playlist" onClick={() => PlayNewVideo("https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8")}> <BsFillCameraVideoFill /> Akamai </li>
              <li className="playlist" onClick={() => PlayNewVideo("https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8")}> <BsFillCameraVideoFill /> Video 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
