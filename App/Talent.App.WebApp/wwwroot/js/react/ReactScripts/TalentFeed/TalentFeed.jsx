import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        

    };

    init() {
        console.log("inside talent feed...init");
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false
        //swa
        
        var Position = this.state.loadPosition
        var Number = this.state.loadNumber
        
       
        var link = "http://localhost:60290/profile/profile/getTalent?Position=" + Position + "&Number=" + Number;
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
              
                if (res.data) {
                    console.log("data  ", JSON.stringify(res.data));
                    let loadP = this.state.loadPosition + 5;
                    let loadN = this.state.loadNumber + 5;
                    console.log("loadP" + loadP + "loadN" + loadN);
                  //  this.setState({ feedData: res.data, loadPosition: loadP, loadNumber: loadN })
                    this.setState({ feedData: res.data, loadPosition:5, loadNumber:10 })

                }

            }.bind(this),
            error: function (res) {
                console.log(res.status)
                TalentUtil.notification.show(res.message, "error", null, null);
            }
        })
        //swa
        this.setState({ loaderData, })
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.init()
    };

    //swa
    handleScroll() {
        console.log("inside talent feed...handlescroll");
        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
            console.log("loading call ajax" + this.state.loadPosition + this.state.loadNumber);
           // this.init();
            //load ajax and update states
            //call state and update state;
            //let loaderData = TalentUtil.deepCopy(this.state.loaderData)
            //loaderData.isLoading = false
            

            var Position = this.state.loadPosition
            var Number = this.state.loadNumber


            var link = "http://localhost:60290/profile/profile/getTalent?Position=" + Position + "&Number=" + Number;
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
                    if (res.data) {
                        console.log("data on scroll", JSON.stringify(res.data));
                        let loadP = this.state.loadPosition + 5;
                        let loadN = this.state.loadNumber + 5;
                        console.log("loadP" + loadP + "loadN" + loadN);
                        this.setState({ feedData: res.data, loadPosition: loadP, loadNumber: loadN })
                       // $("#load-more-loading").hide();
                    }

                }.bind(this),
                error: function (res) {
                    console.log(res.status)
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            })
            //this.setState({ loaderData, }) 
        }
    };

    render() {

        if ((this.state.feedData).length == 0) {

            return (           
                    

            
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui grid talent-feed container">
                        <div className="four wide column">
                            <CompanyProfile />
                        </div>
                        <div className="eight wide column">
                            <section className="page-body">                             
                                <br />
                                <br />
                                <div>
                                    <h1> No talent Found</h1>
                                </div>
                            </section>
                            
                        </div>
                        <div className="four wide column">
                            <div className="ui card">
                                <FollowingSuggestion />
                            </div>
                        </div>
                    </div>
                </BodyWrapper>

            )

        }
        else {

            // return (<div>{this.state.loadJobs.map((job, index) => <p key={job.id}>hello,{job.title} ,{job.summary},{job.location["country"]},{job.location.city} </p>)}</div>);

            return (

                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui grid talent-feed container">
                        <div className="four wide column">
                            <CompanyProfile />
                        </div>
                        <div className="eight wide column">


                            {this.state.feedData.map((feed) =>
                                <TalentCard key={feed.Name} Details={feed} />

                            )}


                            <p id="load-more-loading">
                                <img src="/images/rolling.gif" alt="Loading…" />
                            </p>
                        </div>
                        <div className="four wide column">
                            <div className="ui card">
                                <FollowingSuggestion />
                            </div>
                        </div>
                    </div>
                </BodyWrapper>
            )

        }
    }

}
