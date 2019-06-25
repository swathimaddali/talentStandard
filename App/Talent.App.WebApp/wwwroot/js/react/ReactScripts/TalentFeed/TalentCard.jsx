import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'
import Video from './jsx.jsx'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
       
    };

    
    
    render() {
        return (
            <div className="ui raised link job card">
                <div className="content">
                    <div className="header">testing</div>
                    <div className="meta">
                        <span className="category">Full time</span>
                    </div>
                    <div className="description">
                        <p>testing</p>
                        <p>testing</p>
                        <div className="ui fluid video">
                          <Video />
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left floated">
                        <button className="ui blue basic button">Apply now</button>
                    </div>
                    <div className="right floated author">
                        <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> Company Z
                    </div>
                </div>
            </div>
        );
    }
}

