import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, DropdownDivider, DropdownItem, DropdownHeader, Checkbox, Accordion, Form, Segment, Button, Card, Header, Container, Grid, CardGroup } from 'semantic-ui-react';
import  Job  from './Job.jsx';
import { isNull } from 'util';
import moment from 'moment';





export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData;
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        console.log(loader);
        this.state = {
           
            jobData: [],          
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);         
        this.closeJob = this.closeJob.bind(this);
       
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        console.log("ManageJob:: constructor::" + this.state.loaderData.isLoading);
    };

    init() {
        console.log("ManageJob::inside init");
        this.loadData();
        console.log("this.state.loaderData" + this.state.loaderData.isLoading)
    }

    componentDidMount() {
        this.init();    
    };




    loadData() {
        console.log("ManageJob:: inside loadData");
       
        var params = "?showActive="+this.state.filter.showActive + "&showClosed=" + this.state.filter.showClosed + "&showDraft=" + this.state.filter.showDraft + "&showExpired=" + this.state.filter.showExpired + "&showUnexpired=" + this.state.filter.showUnexpired + "&activePage=" + this.state.activePage + "&sortbyDate=" + this.state.sortBy.date;
        var link = "http://localhost:51689/listing/listing/getSortedEmployerJobs" + params;
       // var link = "https://talentservicestalent3.azurewebsites.net/listing/listing/getSortedEmployerJobs" + params;

        console.log("link is" + link);
        var cookies = Cookies.get('talentAuthToken');       
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {            
                let employerData = null;
                if (res.myJobs) {
                    console.log("myJobsData", JSON.stringify(res.myJobs));             
                    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
                    loaderData.isLoading = false;
                    this.setState({ loaderData, jobData: res.myJobs, activePage: 1})
                   
                }

            }.bind(this),
            error: function (res) {
                console.log(res.status)
                TalentUtil.notification.show(res.message, "error", null, null);
            }
        })

    }

 
    //close job for given id
    closeJob(id) {
        console.log(" CloseJob"+id);

        var cookies = Cookies.get('talentAuthToken');
      
        $.ajax({
           url: 'http://localhost:51689/listing/listing/closeJob',
            //url: 'https://talentservicestalent3.azurewebsites.net/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            type: "post",  
            data: "\"" + id + "\"",
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show(res.message, "success", null, null);                             
                    const data = Object.assign({}, this.state.jobData);
                    this.loadNewData(data);           

                } else {
                    TalentUtil.notification.show(res.message, "error", null, null)
                }

            }.bind(this)
        })

       
    }
    

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

   

    handlePaginationChange(e, { activePage })
    { this.setState({ activePage }) }


    rowsdata() {
        const options = [
            {
                key: 'Newest First',
                text: 'Newest First',
                value: 'Newest First',
               
            },
            {
                key: 'Oldest First',
                text: 'Oldest First',
                value: 'Oldest First',
               
            }
        ]

        const fOptions = [
            {
                key: 'choose filter',
                text: 'choose filter',
                value: 'choose filter'

            }
           
        ]


        return (           
                   
            <div>
                <div className="row">
                            <div className="sixteen wide center aligned padded column">                            
                                <h2>List of Jobs </h2>
                    </div>
                    </div>
                <div className=" row">
                    <span> 
                           Filter:   
 
                            <Dropdown inline options={fOptions} defaultValue={fOptions[0].value}  icon='filter' /> 
                           
                            Sort by date{''}:
                           
                            <Dropdown inline icon='calendar' options={options} defaultValue={options[0].value} />
                          </span>
                                       
                             
                </div>
                </div>
            
            
            )

    }
    
   
render() {
    const { jobDetails } = this.state.jobData;
    console.log("render::this.state.loaderData.." + this.state.loaderData.isLoading)
    //console.log("this.state.loadJobs" + JSON.stringify(this.state.jobData));
       
    if ((this.state.jobData).length == 0) {

        return (

            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div>
                            {this.rowsdata()}                            
                        </div>
                        <br />
                        <br />
                <div>
                    <h1>    No Jobs Found</h1>
                    </div>

                                   
                    </section>

                </BodyWrapper >
            )

    }
    else{

            // return (<div>{this.state.loadJobs.map((job, index) => <p key={job.id}>hello,{job.title} ,{job.summary},{job.location["country"]},{job.location.city} </p>)}</div>);
            return (
                         
                        <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <section className="page-body">
                        <div className="header-text" >
                       
                                {this.rowsdata()}
                        <br />
                        <br />
                                
                                 <Container>
                                        <br />
                                <Grid columns={2} stretched>
                                    <CardGroup> 
                                        {this.state.jobData.map((job) =>
                                            <Job key={job.id} jobDetails={job} closeJob={this.closeJob} editJob={this.editJob} copyJob={this.copyJob} />

                                            )}
                                            </CardGroup> 
                                            </Grid>
                                   
                                </Container>
                            <br />
                           
                            </div>
                      
                        <div className="header-text" style={{ marginLeft: '300px'}} >
                           
                            <Pagination   boundaryRange={1}
                                defaultActivePage={1}
                                onPageChange={this.handlePaginationChange}
                                siblingRange={1}
                                totalPages={1} />
                        </div>
                        
                    </section>
                   
                </BodyWrapper>
                
            )

        }


        

    }

}


    

