
import React from 'react';
import { Loader, Icon } from 'semantic-ui-react';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import Cookies from 'js-cookie';


export default class CompanyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employerData: {
                name: "",
                location: {city:"",country:""},
                email: "",
                phone: ""
            }
            },
           
           
            //loaderData: loaderData
        

        this.loadData = this.loadData.bind(this);       
        this.init = this.init.bind(this);
    };

    init() {
       // let loaderData = this.state.loaderData;
       // loaderData.allowedUsers.push("Employer");
       // loaderData.allowedUsers.push("Recruiter");
       // loaderData.isLoading = false;
      //  this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
       // console.log("EmployerProfile::: talentAuthToken" + cookies);
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            //url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    //console.log("employerData" + JSON.stringify(employerData))
                    this.setState({ employerData: employerData.companyContact })
                    
                }
   
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }




    render() {  
        if ((this.state.employerData).length == 0) {
            return (
                <div className="ui card">
                    <div className="content">
                        No record found
                        </div>
                </div>

            )
           

        }
        else {

            let name = this.state.employerData.name ? this.state.employerData.name:"";
            let email = this.state.employerData.email ? this.state.employerData.email : "";
            let phone = this.state.employerData.phone ? this.state.employerData.phone : "";
            let city = this.state.employerData.location["city"] ? this.state.employerData.location["city"] : "";
            let country = this.state.employerData.location["country"] ? this.state.employerData.location["country"] : "";
            console.log("hh"+JSON.stringify(this.state.employerData));
            return (
                <div className="ui card">
                    <div className="content">

                        <div className="center aligned author">
                            <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                        </div>
                        <div className="center aligned header">{name}</div>
                        <div className="center aligned meta"> <Icon name='map marker' />{city},{country}</div>
                        <div className="center aligned description">
                            <p>We currently do not have any specific skills that we desire</p>
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="center aligned "><Icon name='phone' />{phone}</div>
                        <div className="center aligned "><Icon name='mail' />{email}</div>
                    </div>
                </div>
            ) 
        }
       
        
    }
}


