import React from "react";
class Video extends React.Component {
    componentDidMount()  {
        this.playVideo();
    };

    componentWillUnmount () {
        this.pauseVideo();
    };


    playVideo (){
        // You can use the play method as normal on your video ref
        this.refs.vidRef.play();
    };

    pauseVideo ()  {
        // Pause as well
        this.refs.vidRef.pause();
    };

    render()  {
        return (
            <div>
                <video
                    ref="vidRef"
                    src="https://assets.polestar.com/video/test/polestar-1_09.mp4"
                    type="video/mp4"
                />

                <div>
                    <button onClick={this.playVideo}>
                        Play!
              </button>
                    <button onClick={this.pauseVideo}>
                        Pause!
              </button>
                </div>
            </div>
        );
    };
}

export default Video;