import React from "react";
class Video extends React.Component {

    constructor(props) {
        super(props);
       
       

    };
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

    render() {

        
        const vid = this.props.videoUrl ? this.props.videoUrl : "https://assets.polestar.com/video/test/polestar-1_09.mp4"
        return (
            <div>
                <video
                    ref="vidRef"
                    width="400" 
                    height="300" controls
                    src={vid}
                    type="video/mp4"/>

               
                </div>
            
        );
    };
}

export default Video;