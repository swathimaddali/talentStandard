import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'
import Video from './jsx.jsx'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.userClick = this.userClick.bind(this);
        this.state = {
            flag: true           
        }
       
    };

    userClick() {
        console.log(" user click");
        this.state.flag ? this.setState({ flag: false }) : this.setState({ flag: true });
    }
    
    render() {
        const job = this.props.Details;
        console.log("job details inside TALENTcARD" + JSON.stringify(job));
        const cEmp = job.currentEmployment ? job.currentEmployment : ""
        const visa = job.visa ? job.visa : ""
        const level = job.level ? job.level : ""
        const image = job.photoId ? job.photoId : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
        const videoUrl = job.videoUrl ? job.videoUrl : ""

        let pdes = 
            <div className="ui  grid">
                <div className="row">
                    <div className="six wide column">
                        <div className="ui medium image">
                            <img src={image} alt="No image" />
                        </div>
                    </div>
                
                    <div className="ten wide column">
                    
                        <div className="header">Talent snapshot</div>
                        <div className="meta">CURRENT EMPLOYER</div>
                        <div className="meta">{cEmp}</div>
                        <div className="meta">VISA STATUS</div>
                        <div className="meta">{visa}</div>
                        <div className="meta">Position</div>
                        <div className="meta">{level}</div>

                    
                    </div>
                    
                </div>
            </div>


        
      
        let vdes = <div className="description">
            <div className="ui fluid video">
                <Video videoUrl={videoUrl} />
            </div>
        </div>

        let pdes1 = 
            <div >
                <div class="ui medium image">
                    <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                </div>
            <div className="content">
                    <div class="header">Talent snapshot</div>
                    <div class="meta">Current Employer</div>
                    <div class="meta">{job.currentEmployment}</div>
                    <div class="meta">Visa Status</div>
                    <div class="meta">{job.visa}</div>
                    <div class="meta">Position</div>
                    <div class="meta">{job.level}</div>
                    <br />           
            </div>
     


            
            </div>


        let user = <button className="ui  basic button" onClick={ this.userClick }>
                        <Icon name='user' />
                        <br />
                  </button>
        let vid = <button className="ui  basic button" onClick={this.userClick }>
                    <Icon name='video' />
                    <br />
                  </button>

        let des = (this.state.flag) ? vdes : pdes;
        let but = (this.state.flag)? user: vid;

        return (
            <div className="ui raised link job card">
                <div className="left aligned header"><h4>{job.name} <Icon className="ui right floated" name='star outline' />  </h4> </div>  
                <br />   <br />
                <div className="content">                                     
                    {des}
              
                </div>
                <div className="extra content">
                    <div className=" ui four right floated buttons">
                        {but}
                        <button className="ui  basic button">
                            <Icon name='file pdf outline' />
                            <br />
                        </button>
                        <button className="ui  basic button">
                            <Icon name='linkedin' />
                            <br />
                        </button>
                        <button className="ui  basic button">
                            <Icon name='github' />
                            <br />
                        </button>
                        
                        
                        
                        
                    </div>
                    
                </div>
                </div>
            
        );
    }
}

