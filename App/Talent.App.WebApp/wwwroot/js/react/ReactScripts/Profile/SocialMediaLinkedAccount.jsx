/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Label ,Button} from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github:""
                
            }
        this.state = {
            showEditSection: false,
            linkAct: linkedAccounts,
            
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }

    componentDidMount() {
        console.log("inside socialmedia");
        $('.ui.button.social-media')
            .popup();
    }

   
    openEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            linkAct: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.linkAct)
        console.log("event.target.name" + event.target.name + "event.target.value" + event.target.value);
        data[event.target.name] = event.target.value
        this.setState({
            linkAct: data
        })
    }

    saveContact() {
        // console.log(this.props.componentId)
        console.log("this.state.linkAct" + JSON.stringify(this.state.linkAct))
        const data = Object.assign({}, this.state.linkAct)       
        this.props.updateProfileData(this.props.componentId, data)
        this.closeEdit()
    }



    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="linkdin"
                    name="linkedIn"
                    value={this.state.linkAct.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Linkdin URL"
                    errorMessage="Please enter"
                />
                <ChildSingleInput
                    inputType="text"
                    label="github"
                    name="github"
                    value={this.state.linkAct.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github URL"
                    errorMessage="Please enter"
                />
                
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        // LinkedIn = "";
       // Github = "";
        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : "" 
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Label.Group size='large'>
                        <Label className="ui ten wide column" color="blue" ><i class="linkedin icon"></i> LinkedIn  </Label>
                        <Label className="ui ten wide column" color="black" > <i class="github icon"></i> GitHub  </Label>                   
                        </Label.Group>
                     </React.Fragment>
                    <Button  className="ui right floated teal button" color="black" onClick={this.openEdit}>Edit</Button>
                </div>
            </div>
        )
    }


}