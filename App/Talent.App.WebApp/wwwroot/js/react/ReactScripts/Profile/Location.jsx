import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        console.log("this.props.addressData" + JSON.stringify(props.addressData));
        const address = props.addressData ?
            Object.assign({}, props.addressData)
            : {                
                Number : "",
                Street : "",
                Suburb : "",
                PostCode : 0,
                City : "",
                Country : ""
            }
        this.state = {
            showEditSection: false,
            address: address,

        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }

   
    render() {
        console.log("render address state" + JSON.stringify
            (this.state.address));
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            address: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.address)
        data[event.target.name] = event.target.value
        this.setState({
            address: data
        })
        console.log(" changeddata" + JSON.stringify(data));
    }

    
    saveAddress() {
        const data = Object.assign({}, this.state.address)
       // this.props.controlFunc(this.props.componentId, data)
        this.props.updateProfileData(this.props.componentId,data)
        this.closeEdit()
    }
    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
       //  let selectedCountry = this.props.addressData.Country;
        let selectedCountry = this.state.address.country;
        let selectedCity = this.state.address.city;
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        console.log("this.state.address.Country" + this.state.address.Country + "" + this.state.address.country);
        if (selectedCountry != "" && selectedCountry != null ) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select city</option>
                {popCities}
            </select>
        }
       

        return (
            <div className='ui sixteen wide column'>
                
                <div className="fields">
               
                    <div className="field">
                        <input type="text"                         
                            value={this.state.address.number}
                            name="number"
                            id="number"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <input type="text"                           
                            value={this.state.address.street}
                            name="street"
                            id="street"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <input type="text"
                            value={this.state.address.suburb}
                            name="suburb"
                            id="suburb"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>


                <div className="fields">

                    <div className="field">
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">
                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>
                    
                <div className="field">   
                    <div style={{ marginBottom: "5px", marginTop: "5px" }}></div>
                    {citiesOptions}
                </div>
                    
                    <div className="field">
                        <input type="text"
                            value={this.state.address.postCode}
                            name="postCode"
                            id="PostCode"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>


        
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    renderDisplay() {

       
        let number = this.props.addressData ? this.props.addressData.number : ""
        let street = this.props.addressData ? this.props.addressData.street : ""
        let suburb = this.props.addressData ? this.props.addressData.suburb : ""
        let postCode = this.props.addressData ? this.props.addressData.postCode : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number} ,{street} ,{suburb} ,{postCode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }



}


//

//
export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        const nationality = props.nationalityData ?  props.nationalityData: ""

        console.log("constructor nationality" + nationality);

        this.state = {          
            nationalityData: nationality
        }
       
        this.handleChange = this.handleChange.bind(this)        
        this.renderDisplay = this.renderDisplay.bind(this)
        
    }
   
    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps");
        if (props.nationalityData !== state.nationalityData) {
            console.log("getDerivedStateFromProps not same" + JSON.stringify(props.experienceData) + JSON.stringify(state.experienceData));
            return {

                nationalityData: props.nationalityData
            }
        }

    }
    handleChange(event) {
      
        const data = {}
        data[event.target.name] = event.target.value
        this.setState({
            nationalityData: data
        })
        console.log("changeddata data" + JSON.stringify(data));        
        this.props.saveProfileData(data)
    }
   
    
    renderDisplay() {

        let nationalityOptions = [];
        let selectedCountry = this.state.nationalityData;
        nationalityOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        console.log("this.state.nationalityData" + this.state.nationalityData );
        return (
            <div className='ui sixteen wide column'>
                <div className="field">
                    <select className="ui right labeled dropdown"
                        placeholder="Nationality"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="nationality">
                        <option value="">Select a Nationality</option>
                        {nationalityOptions}
                    </select>
                </div>                
            </div>
        )
    }
    render() {
        return (
            this.renderDisplay()
        )
    }



   
    


}

/**
 * import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        console.log("this.props.addressData" + JSON.stringify(props.addressData));
        const address = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                Number : "",
                Street : "",
                Suburb : "",
                PostCode : 0,
                City : "",
                Country : ""
            }
        this.state = {
            showEditSection: false,
            address: address,

        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }


    render() {
        console.log("render address state" + JSON.stringify
            (this.state.address));
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            address: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.address)
        data[event.target.name] = event.target.value
        this.setState({
            address: data
        })
        console.log(" changeddata" + JSON.stringify(data));
    }


    saveAddress() {
        const data = Object.assign({}, this.state.address)
       // this.props.controlFunc(this.props.componentId, data)
        this.props.updateProfileData(this.props.componentId,data)
        this.closeEdit()
    }
    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
       //  let selectedCountry = this.props.addressData.Country;
        let selectedCountry = this.state.address.country;
        let selectedCity = this.state.address.city;
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        console.log("this.state.address.Country" + this.state.address.Country + "" + this.state.address.country);
        if (selectedCountry != "" && selectedCountry != null ) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select city</option>
                {popCities}
            </select>
        }


        return (
            <div className='ui sixteen wide column'>

                <div className="fields">

                    <div className="field">
                        <input type="text"
                            value={this.state.address.number}
                            name="number"
                            id="number"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <input type="text"
                            value={this.state.address.street}
                            name="street"
                            id="street"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <input type="text"
                            value={this.state.address.suburb}
                            name="suburb"
                            id="suburb"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>


                <div className="fields">

                    <div className="field">
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">
                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>

                <div className="field">
                    <div style={{ marginBottom: "5px", marginTop: "5px" }}></div>
                    {citiesOptions}
                </div>

                    <div className="field">
                        <input type="text"
                            value={this.state.address.postCode}
                            name="postCode"
                            id="PostCode"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>



                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    renderDisplay() {


        let number = this.props.addressData ? this.props.addressData.number : ""
        let street = this.props.addressData ? this.props.addressData.street : ""
        let suburb = this.props.addressData ? this.props.addressData.suburb : ""
        let postCode = this.props.addressData ? this.props.addressData.postCode : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number} ,{street} ,{suburb} ,{postCode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
    */





//

//
/*
export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        const nationality = props.nationalityData ?
            props.nationalityData: ""

        console.log("constructor nationality" + nationality);

        this.state = {
            showEditSection: false,
            nationalityData: nationality,

        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveNationality = this.saveNationality.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }
    openEdit() {
        const details = this.props.nationalityData
        this.setState({
            showEditSection: true,
            nationalityData: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
       // const data = Object.assign({}, this.state.nationalityData)
       //const  data = event.target.value
        const data = {}
        data[event.target.name] = event.target.value
        this.setState({
            nationalityData: data
        })
        console.log(" changeddata" + data);
    }


    saveNationality() {

        //const data = this.state.nationalityData
        const data = Object.assign({}, this.state.nationalityData)
        console.log("save nationaity" + data);
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    renderEdit() {

        let nationalityOptions = [];
        let selectedCountry = this.state.nationalityData;
        nationalityOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        console.log("this.state.nationalityData" + this.state.nationalityData );
        return (
            <div className='ui sixteen wide column'>
                <div className="field">
                    <select className="ui right labeled dropdown"
                        placeholder="Nationality"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="nationality">
                        <option value="">Select a Nationality</option>
                        {nationalityOptions}
                    </select>
                </div>

                <button type="button" className="ui teal button" onClick={this.saveNationality}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }



    renderDisplay() {


        let nationality = this.props.nationalityData ? this.props.nationalityData : ""


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p> Nationality: {nationality} </p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }


}

*/
 