import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Button, Card ,Label} from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';


export default class Job extends React.Component {


    constructor(props) {
        super(props);
        this.state = {expired:false}
        this.closeClick = this.closeClick.bind(this); 
   
        
    }
    componentWillMount() {
        
        if (moment() > moment(this.props.jobDetails.expiryDate))
            this.setState({ expired: true })
        else this.setState({ expired: false });
        
      /*
        this.setState({
                expired: ((moment() > moment(this.props.jobDetails.expiryDate)) ? 'true' : 'false')
        })
        */
        console.log(this.state.expired);
    }
    closeClick(id) {
        
        this.props.closeJob(id);
    };  


    render() {
        const job = this.props.jobDetails;
             
        const style = {

            opacity: this.state.expired ?"1": "0" ,
            width: "100px"
        
            }
        
        return (




            <Card style={{ height: '350px' , width:'400px' }}>
                        <Card.Content>
                            <Card.Header > {job.title}</Card.Header>
                    <Card.Meta>{job.location["country"]} {job.location.city}</Card.Meta>
                    <Label as='a' color='black' ribbon='right'>
                        <Icon name='user' />  0
                    </Label>
                    <br/>
                    <Card.Description >{job.summary} </Card.Description>
                   
                        </Card.Content>
                <Card.Content extra>
                  
                   
                        <div className="ui three right floated buttons">
                        <Label color='red' style={style}> Expired &nbsp; </Label>
                            <Button.Group style={{whiteSpace:'nowrap',maxWidth:'100%' }}>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <Button style={{ width: "100px" }} basic color='blue' onClick={() => { this.closeClick(job.id) }}>
                                <Icon name='ban' />
                                Close
                             </Button>     
                             <Link to={'/EditJob/' + job.id}>
                                <Button style={{ width: "100px" }} className="ui right floated" basic color='blue'  >
                                    <Icon name='edit' />
                                    Edit
                                 </Button>
                            </Link>
                                                   
                            
                              <Link to={'/PostJob/' + job.id}>    
                                <Button style={{ width: "100px" }}  basic color='blue'  >
                                    <Icon name='copy' />
                                        Copy
                                </Button>
                               </Link>
                            </Button.Group>  
                            </div>
                             
                        
                        </Card.Content>
                </Card>
             
             
                  

               



            )
       

    }


}