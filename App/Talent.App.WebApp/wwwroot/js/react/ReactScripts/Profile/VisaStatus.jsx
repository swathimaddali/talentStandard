
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button, Label, Icon, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        // public string VisaStatus { get; set; }
        // public DateTime? VisaExpiryDate { get; set; } 
     
        // visaStatus
        //visaExpiryDate
        const visaStatus = props.visaStatus ? props.visaStatus:""
        const visaExpiryDate = props.visaExpiryDate ?  props.visaExpiryDate : ""
        const visa = {
            visaStatus: visaStatus,
            visaExpiryDate: visaExpiryDate
        }
        let st = false;
        if ((this.props.visaStatus == "Student Visa") || (this.props.visaStatus == "Work Visa")) {
            st = true;
        } 
        
        this.state = {       
            visa: visa,
            show: st,
            visaStatus: visaStatus,
            visaExpiryDate: visaExpiryDate

        }
        console.log("inside visastatus::constructor" + "expiry" + this.props.visaExpiryDate +"visastatus"+ this.props.visaStatus + "visa status" + visaStatus);
        this.handleChange = this.handleChange.bind(this)
        this.saveVisa = this.saveVisa.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
       
        
    }
    
    saveVisa() {
        const data = Object.assign({}, this.state.visa)
        console.log("data" + JSON.stringify(data));
        this.props.saveProfileData(data)
     
    }
    handleChange(event) {
        console.log("inside handleChange")
        const data = Object.assign({}, this.state.visa)
        data[event.target.name] = event.target.value
        // let data = event.target.name
        let value = event.target.value
        console.log("inside handleChange" + event.target.name + value)
        let st = false
        if ((value == "Student Visa")|| (value =="Work Visa")) {
            st = true;
        } 
          this.setState({
              visa: data,
              show:st
        })
        if(!st)
       // this.props.updateProfileData(data)
        this.props.saveProfileData(data)
    }

    handleChangeDate(date) {
        var data = Object.assign({}, this.state.visa);
        
        console.log("handlechangedate:" + JSON.stringify(data) + "date is" + date);
        data["visaExpiryDate"] = date;
        this.setState({
            visa: data,
        
        })
        this.props.updateProfileData(data) 
    } 
    //render the data on screen
    render() {    
       
        

        return (
            this.renderDisplay()
        )
    }

    

    ///display
    renderDisplay() {
       // console.log("new language" + JSON.stringify(this.state.newLanguage));
        const visaType = {
            "Citizen":"Citizen",
            "Permanent Resident": "Permanent Resident",
            "Work Visa":"Work Visa",
            "Student Visa": "Student Visa"                
            }
        let vType = Object.keys(visaType).map((x) => <option key={x} value={x}>{x}</option>);

        let visaExpiry = ""
        
        //means work or etc
        if (this.state.show) {

            visaExpiry = 
                
                <div className="field">
                    Visa Expiry Date
                                       
                    <DatePicker
                        selected={this.props.visaExpiryDate}
                        onChange={(date) => this.handleChangeDate(date)}
                        minDate={moment()}  />           

                <Button color='black' onClick={this.saveVisa} >Save</Button>
               
                 </div >
            

        }
       // console.log("this.state.visaStatus" + this.state.visaStatus);
        return (

            <div className='ui sixteen wide column'>
                        
                <div className="fields">
                    <div className="field">
                        Visa type:
                                        <br />
                      <select className="ui right labeled dropdown"
                            placeholder="visaStatus"
                        value={this.props.visaStatus}
                        onChange={this.handleChange}
                            name="visaStatus">
                            <option value="">Select</option>
                        {vType}
                       </select>
                    </div>
                    {visaExpiry}
                 </div>
            </div>


        )
    }
}


/*


export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        // public string VisaStatus { get; set; }
        // public DateTime? VisaExpiryDate { get; set; }

        // visaStatus
        //visaExpiryDate
        const visaStatus = props.visaStatus ? props.visaStatus:""
        const visaExpiryDate = props.visaExpiryDate ?  props.visaExpiryDate : ""
        const visa = {
            visaStatus: visaStatus,
            visaExpiryDate: visaExpiryDate
        }
        let st = false;
        if ((this.props.visaStatus == "Student Visa") || (this.props.visaStatus == "Work Visa")) {
            st = true;
        }

        this.state = {
            visa: visa,
            show: st,
            visaStatus: visaStatus,
            visaExpiryDate: visaExpiryDate

        }
        console.log("inside visastatus::constructor" + "expiry" + this.props.visaExpiryDate +"visastatus"+ this.props.visaStatus + "visa status" + visaStatus);
        this.handleChange = this.handleChange.bind(this)
        this.saveVisa = this.saveVisa.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)


    }

    saveVisa() {
        const data = Object.assign({}, this.state.visa)
        console.log("data" + JSON.stringify(data));
        this.props.saveProfileData(data)

    }
    handleChange(event) {
        console.log("inside handleChange")
        const data = Object.assign({}, this.state.visa)
        data[event.target.name] = event.target.value
        // let data = event.target.name
        let value = event.target.value
        console.log("inside handleChange" + event.target.name + value)
        let st = false
        if ((value == "Student Visa")|| (value =="Work Visa")) {
            st = true;
        }
          this.setState({
              visa: data,
              show:st
        })

       // this.props.updateProfileData(data)
        this.props.saveProfileData(data)
    }

    handleChangeDate(date) {
        var data = Object.assign({}, this.state.visa);
        console.log("handlechangedate:" + JSON.stringify(data) + "date is" + date);
        data["visaExpiryDate"] = date;
        this.setState({
            visa: data,

        })
        this.props.updateProfileData(data)
    }
    //render the data on screen
    render() {




        return (
            this.renderDisplay()
        )
    }



    ///display
    renderDisplay() {
       // console.log("new language" + JSON.stringify(this.state.newLanguage));
        const visaType = {
            "Citizen":"Citizen",
            "Permanent Resident": "Permanent Resident",
            "Work Visa":"Work Visa",
            "Student Visa": "Student Visa"
            }
        let vType = Object.keys(visaType).map((x) => <option key={x} value={x}>{x}</option>);

        let visaExpiry = ""

        //means work or etc
        if (this.state.show) {

            visaExpiry =

                <div className="field">
                    Visa Expiry Date

                    <DatePicker
                        selected={this.props.visaExpiryDate}
                        onChange={(date) => this.handleChangeDate(date)}
                        minDate={moment()}  />

                <Button color='black' onClick={this.saveVisa} >Save</Button>

                 </div >


        }
       // console.log("this.state.visaStatus" + this.state.visaStatus);
        return (

            <div className='ui sixteen wide column'>

                <div className="fields">
                    <div className="field">
                        Visa type:
                                        <br />
                      <select className="ui right labeled dropdown"
                            placeholder="visaStatus"
                        value={this.props.visaStatus}
                        onChange={this.handleChange}
                            name="visaStatus">
                            <option value="">Select</option>
                        {vType}
                       </select>
                    </div>
                    {visaExpiry}
                 </div>
            </div>


        )
    }
}




 * 
 * 
 * */
  