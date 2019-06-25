/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Button, Label, Icon, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


export default class Experience extends React.Component {

    constructor(props) {
        super(props)
        const exp = props.experienceData ? props.experienceData : []
        const exp1 = props.experienceData ? Object.assign({}, props.experienceData):""
        
        
        this.state = {

            experienceData: exp,
            show: false,
            newExp: {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }

        }
        
        this.addDisplay = this.addDisplay.bind(this)
        this.closeDisplay = this.closeDisplay.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.addRecord = this.addRecord.bind(this)
        this.updateExperience = this.updateExperience.bind(this);        
        this.deleteExperience = this.deleteExperience.bind(this); 
        this.formatDate = this.formatDate.bind(this); 
        
    }

    updateExperience(data,name) {
        
        console.log("we need to update this" + JSON.stringify(data));
        console.log("before update comp is" + name);
        const l = this.state.experienceData;
        console.log("before update" + JSON.stringify(l));
        //replace data
        var result = l.findIndex(item => item.company == name)
        console.log("index is" + result + "data" + l[result]);
        l[result] = data;
        console.log("after update" + JSON.stringify(l));   
      //  this.props.updateProfileData(this.props.componentId, l)

         
    }

    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps" );
        if (props.experienceData !== state.experienceData) {
            console.log("getDerivedStateFromProps not same" + JSON.stringify(props.experienceData) + JSON.stringify(state.experienceData));
            return {

                experienceData: props.experienceData
            }
        }

    }
    componentDidMount() {

        const exp = this.props.experienceData ? this.props.experienceData : []
        const exp1 = this.props.experienceData ? Object.assign({}, this.props.experienceData) : ""
        console.log("componentDidMount exp" + JSON.stringify(exp));
        console.log("componentDidMount props.experienceData" + JSON.stringify(this.props.experienceData));
        console.log("componentDidMount " + JSON.stringify(exp1));
        console.log("componentDidMount inside close display table");


    }
    
    addDisplay(e) {
        e.preventDefault();
        this.setState({ show: true });
    }
    closeDisplay(e) {

        e.preventDefault();
        console.log("inside close display table");
        this.setState({
            show: false
        })


    }

    deleteExperience(item) {
        var cookies = Cookies.get('talentAuthToken');
        const l = this.state.experienceData;
        //retreive the record which has id
        //  console.log("delete *** id" + id + "***l***" + JSON.stringify(l));
        //var result = l.find(item => item.id == id)
        console.log("we need to delete this" + JSON.stringify(item));

        var index = l.findIndex(x => x.id == item.id)
        console.log("index is" + index + "data is" + l[index]);
        //l[result] = data;
        l.splice(index, 1);
        console.log("after update" + JSON.stringify(l));        
        this.props.updateProfileData(this.props.componentId, l)

    }

    formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("string" + string + "new" + new Date(string).toLocaleDateString([], options));
        return new Date(string).toLocaleDateString([], options);
    }



    handleChange(event) {
        console.log("inside handleChange")
        const data = Object.assign({}, this.state.newExp)
        data[event.target.name] = event.target.value
        // let data = event.target.name
        let value = event.target.value
        console.log("inside handleChange" + event.target.name + value)
        
        this.setState({
            newExp: data,
            
        })

         this.props.updateProfileData(data)
       // this.props.saveProfileData(data)
    }

    handleChangeDate(date, name) {
        var data = Object.assign({}, this.state.newExp);
        console.log("handlechangedate: date is" + date);
        data[name] = date;
        this.setState({
            newExp: data,
        })
      //  this.props.updateProfileData(data)
    } 

    addRecord()
    {
        console.log("experience data from props is" + JSON.stringify(this.props.experienceData) + JSON.stringify(this.state.experienceData));
        if (this.state.newExp.company == "" || this.state.newExp.position == "") {
            alert("pls fill");
            return;        
          }        
     
        var h = this.state.newExp;
        console.log("data to add" + JSON.stringify(h));
        const temp = this.state.experienceData;
        temp.push(h);
        this.setState({ show: false , experienceData:temp});
        //this.props.updateProfileData(temp);
        this.props.updateProfileData(this.props.componentId,temp)
        //save data to profile
        //this.loadData();  
    }

    render() {
        return (
           this.renderDisplay()
        )
    }

     formatDate(string) {
         var options = { year: 'numeric', month: 'long', day: 'numeric' };
         console.log("string" + string + "new" + new Date(string).toLocaleDateString([], options));
         return new Date(string).toLocaleDateString([], options);
     }


    renderDisplay() {

        // const { expDetails } = this.props;
        const expDetails = this.state.newExp;
        console.log("state.exp" + JSON.stringify(this.state.experienceData) + "exp startDate" + expDetails.start);
        //start
        var rows = [];
        let exp = this.props.experienceData;
        // let length = this.state.languageData.length;
        //  console.log("no of language records are" + length);
        if (exp != null || exp != undefined) {
            for (var i = 0; i < exp.length; i++) {
                console.log(" *** is " + JSON.stringify(exp[i]) + "strt date" + exp[i].start + " endd" + exp[i].end);
                //date
                //
                //
              // let updatedSDate moment().format("Do, MMMM  YYYY"); // "Sunday, February 14th 2010, 3:25:50 pm"



                //var option = {  year: 'numeric', month: 'long', day: 'numeric' };
               // var today = new Date();

                //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
               // console.log(today.toLocaleDateString("en-US", option));

                let updatedSDate = this.formatDate(exp[i].start)
                let updatedEDate = this.formatDate(exp[i].end);
                console.log(" *** strt n end date is " + updatedSDate + updatedEDate );
                rows.push(
                    <ExperienceRow key={exp[i].company} item={exp[i]} openTable={this.openTable} updateExperience={this.updateExperience} deleteExperience={this.deleteExperience} />)
            }
            console.log("no of rows" + rows.length);
        }
        //end



        let isState = this.state.show;
        let options = [];

         if (isState) {
                      
           /**
            *  
        Company 
        Position
        Responsibilities
        Start 
        End
         DateTime 
            * */
     
            //if no records then set id=1 else id will be length
            let i = length > 0 ? length : 1
            console.log("length of records" + i);
            options =
                <div>
                <div className="fields">
                    <div className="ui eight wide field">
                        Company
                        <input type="text"
                            value={expDetails.company}
                            name="company"
                            id="company"
                            placeholder="Company"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="ui eight wide field">
                        Position
                    <input type="text"
                            value={expDetails.position}
                        name="position"
                        id="position"
                        placeholder="Position"
                        onChange={this.handleChange}
                    />
                   </div>
                 </div>


            <div className="fields">
                    <div className="ui eight wide field">
                        Start Date                    
                        <DatePicker
                            selected={expDetails.start}
                            onChange={(date) => this.handleChangeDate(date, "start")}
                           /> 
                </div>
                    <div className="ui eight wide field">
                        End Date
                    
                        <DatePicker
                            selected={expDetails.end}
                            onChange={(date) => this.handleChangeDate(date,"end")}
                             />          

                </div>
                </div>
                <div className="fields">
                <div className="ui sixteen wide field">
                    Responsibilities
                    <input type="text"
                            value={expDetails.responsibilities}
                            name="responsibilities"
                        id="enddate"
                            placeholder="Responsibilities"
                        onChange={this.handleChange}
                    />
                    </div>
                </div>
                
                <div className="fields">
                 <br />
                    <div className="field">                        
                            <Button color="black" onClick={() => this.addRecord(i)}>Add</Button>
                        </div>
                    <div className="field">                      
                            <Button color="grey" onClick={this.closeDisplay}>Cancel</Button>
                        </div>
                </div>
            </div>

        }

            //end
        return (
            <div className='ui sixteen wide column'>
                {options}
                
                <div className="fields">
                    <Table unstackable fullWidth>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell textAlign='right'>
                                    <Button color="black" onClick={this.addDisplay}>
                                        <Icon name='plus' />
                                        Add New </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {rows}
                        </Table.Body>
                    </Table>
                </div>
            </div>


        )
       // let e = this.props.experienceData ? this.props.experienceData : ""


       
    }

    
}//LanguageRow class

export class ExperienceRow extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            /*newExp: {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }*/
            newExp:props.item,
            showP: false
            //2019-06-10T14:00:00Z
        }

        

        this.updateExperience = this.updateExperience.bind(this);
        this.deleteExperience = this.deleteExperience.bind(this);
        this.updateOpen = this.updateOpen.bind(this);
        this.updateClose = this.updateClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.formatDate = this.formatDate.bind(this);
        this.formatDateU = this.formatDateU.bind(this);
        

    }

    formatDateU(string) {
        
        return new Date(string).toLocaleDateString("en-GB");
    }
   

    formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("string" + string + "new" + new Date(string).toLocaleDateString([], options));
        return new Date(string).toLocaleDateString([], options);
    }

    handleChangeDate(date, name) {
        var data = Object.assign({}, this.state.newExp);
        console.log("handlechangedate: date is" + date);
        data[name] = date;
        this.setState({
            newExp: data,

        })
    }
    handleChange(event) {
        event.preventDefault();
        console.log("ExperienceRow::::inside handleChange")
        const data = Object.assign({}, this.state.newExp)

        data[event.target.name] = event.target.value
        console.log("data[event.target.name]" + event.target.name + event.target.value);
        this.setState({
            newExp: data
        })

    }


    
    updateExperience(name) {
        //event.preventDefault();
        console.log("ExperienceRow::::updateExp old" + name + "new " + this.state.newExp.company);
        console.log();
        const data = Object.assign({}, this.state.newExp)
     
        this.setState({
            showP: false,
            //newLanguage: { name: "", level: "", id: "", userId: "", isDeleted: "" }
        })
        this.props.updateExperience(data,name);

    }
    

    updateClose(event) {
        event.preventDefault();
        console.log("LanguageRow::::updateClose");
        this.setState({
            showP: false
        })

    }


    updateOpen(event) {
        event.preventDefault();
        console.log("Exp row::::updateopen");
        this.setState({
            showP: true
        })
    }
    deleteExperience(item) {
        //console.log("id"+id)
        console.log("LanguageRow::::deleteExperience");
        this.props.deleteExperience(item);
    }
    
    render() {
        let status = this.state.showP
        console.log("inside row " + JSON.stringify(this.props.item) );       
        return (
               
                status ? this.renderUpdate() : this.renderDisplay()
               
             )

    }
    renderUpdate() {

        const name = this.props.item.company;

        //const expDetails = this.props.item;
        const expDetails = this.state.newExp;
       
        return (            
               <div>
                <div className="fields">
                    <div className="ui eight wide field">
                        Company
                        <input type="text"
                            value={expDetails.company}
                            name="company"
                            id="company"
                            placeholder="Company"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="ui eight wide field">
                        Position
                    <input type="text"
                            value={expDetails.position}
                            name="position"
                            id="position"
                            placeholder="Position"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>


                <div className="fields">
                    <div className="ui eight wide field">
                        Start Date
                        <DatePicker
                            value={this.formatDateU(expDetails.start)}
                            onChange={(date) => this.handleChangeDate(date, "start")}
                          />
                    </div>
                    <div className="ui eight wide field">
                        End Date

                        <DatePicker
                            value={this.formatDateU(expDetails.end)}
                               onChange={(date) => this.handleChangeDate(date, "end")}
                            />

                    </div>
                </div>
                <div className="fields">
                    <div className="ui sixteen wide field">
                        Responsibilities
                    <input type="text"
                            value={expDetails.responsibilities}
                            name="responsibilities"
                            id="enddate"
                            placeholder="Responsibilities"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="fields">
                    <br />
                    <div className="field">
                        <Button color="black" onClick={() => this.updateExperience(name)}>Update</Button>                        
                    </div>
                    <div className="field">
                        <Button color="grey" onClick={this.updateClose}>Cancel</Button>
                    </div>
                </div>
                </div>
            )
             
            
            
    }
    
      
      
    
    renderDisplay() {
        const item = this.props.item;

        return (<Table.Row>
            <Table.Cell>{item.company}</Table.Cell>
            <Table.Cell>{item.position}</Table.Cell>
            <Table.Cell>{item.responsibilities}</Table.Cell>
            <Table.Cell>{ this.formatDate(item.start)}</Table.Cell>
            <Table.Cell>{this.formatDate(item.end)}</Table.Cell>

            <Table.Cell textAlign='right'>
                <Button onClick={this.updateOpen} >
                    <Icon name='pencil' />
                </Button>
                <Button onClick={() => this.deleteExperience(item)} >
                    <Icon name='x' />
                </Button>
            </Table.Cell>
        </Table.Row >

        )
    }





}



