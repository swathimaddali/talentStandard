/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button, Label ,Icon,Table} from 'semantic-ui-react';


export default class Language extends React.Component {
    constructor(props) {
        super(props)
       
        const language = props.languageData ? props.languageData    : [{Name:"",Level:"",Id:"",UserId:"",IsDeleted:""}]
        
               

        this.state = {
            showEditSection: false,
            languageData: language,
            show: false,
            id: 1,
            addrow: false,
            newLanguage: { name: "", level: "", id: "", userId: "", isDeleted: "" }

        }
      
        this.addDisplay = this.addDisplay.bind(this)
        this.closeDisplay = this.closeDisplay.bind(this)
        this.addRecord = this.addRecord.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this); 
        this.updateLanguage = this.updateLanguage.bind(this); 
        this.deleteLanguage = this.deleteLanguage.bind(this); 
              

    }

    componentDidMount() {
       
        this.loadData();
    };

    loadData() {
        console.log("inside load data");
        var link = 'http://localhost:60290/profile/profile/getLanguage'
        //var link = 'https://talentservicesprofile3.azurewebsites.net/profile/profile//getLanguage'
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
                if (res.success == true) {
                    console.log("myLanguages", JSON.stringify(res.data));
                    this.setState({
                        languageData: res.data,
                         show: false
                    })
                }
            }.bind(this),
        })

    }



    //Add New Input above the table
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
    handleChange(event) {
        console.log("inside handleChange")
        const data = Object.assign({}, this.state.newLanguage)
       
        data[event.target.name] = event.target.value
        this.setState({
            newLanguage: data
        })
       
    }
    addRecord() {
        //create a new row beneath with detils
        //console.log("inside add record i" + i);
        //check if langagedata is empty

        if (this.state.newLanguage.level == "" || this.state.newLanguage.name == "") {
            alert("Language and level cannot be empty");
            return;
        }
        //const data = Object.assign({}, this.state.newLanguage)

        //const l = this.state.languageData;
        //l.push(data);
        //console.log("l" + JSON.stringify(l));
       // data["id"] = ++i;       
         var h = this.state.newLanguage;
        console.log("data to add"+h);
        //add this to the list
       // this.props.updateProfileData(l);
        //ajax call to add
        //console.log("" + JSON.stringify(this.state.profileData));
        var cookies = Cookies.get('talentAuthToken');
       $.ajax({
            url: 'http://localhost:60290/profile/profile/addLanguage',
         // url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/addLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(h),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Language added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language id not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        
        
        //when to send data to profile? this doesn hav id
        if (this.loadData())
            this.props.updateProfileData(this.props.componentId, this.state.languageData)
        //updated with id data
     
    }


    updateLanguage(data) {
        const l = this.state.languageData;

        if (data.level == "" || data.name == "") {
            alert("pls fill update");
            return;
        }
        if (l.findIndex(item => item.name == data.name)) {
            alert("language is already selected")
            return;
        }
        
        //const data = Object.assign({}, this.state.newLanguage)
        console.log("we need to update this" + JSON.stringify(data));
    
        console.log("before update" + JSON.stringify(l));
        //replace data
        var result = l.findIndex(item => item.id == data.id)
        console.log("index is" + result + "dara" + l[result]);
        l[result] = data;        
        console.log("after update" + JSON.stringify(l));
        //
        //
        //l.
       // l.push(data);       

       // var h = this.state.newLanguage;
        
        //if exists alert language is already present
        

     
        
        var cookies = Cookies.get('talentAuthToken');
       $.ajax({
           url: 'http://localhost:60290/profile/profile/updateLanguage',
          // url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    this.setState({                    
                        newLanguage: { name: '', level: '' },
                        languageData: l,
                        show: false,                       
                    })


                } else {
                    TalentUtil.notification.show("Language id not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        

      this.props.updateProfileData(this.props.componentId, l)
      
    }

    deleteLanguage(item) {
        var cookies = Cookies.get('talentAuthToken');
        const l = this.state.languageData;
        //retreive the record which has id
        //  console.log("delete *** id" + id + "***l***" + JSON.stringify(l));
        //var result = l.find(item => item.id == id)
        console.log("we need to delete this" + JSON.stringify(item));

        var index = l.findIndex(x => x.id == item.id)
        console.log("index is" + index + "data is" + l[index]);
        //l[result] = data;
        l.splice(index, 1);
        console.log("after update" + JSON.stringify(l));

        
        $.ajax({
           url: 'http://localhost:60290/profile/profile/deleteLanguage',
            //url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(item),
            success: function (res) {
               // console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Language deleted  sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language not deleted  successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

        this.props.updateProfileData(this.props.componentId, l)


    }
        


    //render the data on screen
    render() {

        

        return (
           this.renderDisplay()
        )
    }

    ///edit 
    
   ///display
    renderDisplay() {
       // console.log("new language" + JSON.stringify(this.state.newLanguage));
        // let language = this.props.languageData ? this.props.languageData : ""
        //rows array push records 
        var rows = [];
        
        let lang = this.state.languageData;
       // let length = this.state.languageData.length;
        //  console.log("no of language records are" + length);
        if (lang != null || lang != undefined) {
            for (var i = 0; i < lang.length; i++) {
             //   console.log(" *** is " + JSON.stringify(lang[i]));
                rows.push(
                    <LanguageRow key={lang[i].id} item={lang[i]} openTable={this.openTable} updateLanguage={this.updateLanguage} deleteLanguage={this.deleteLanguage} />)
            }
          //  console.log(rows);
        }

        
        //
        //shows the add+ button
        let isState = this.state.show;
        let options = [];
        if (isState) {

            const levels = {
                "Basic": "Basic",
                "Conversational": "Conversational",
                "Fluent": "Fluent",
                "Native / Bilingual": "Native / Bilingual"
            }
            let languageLevel = Object.keys(levels).map((x) => <option key={x} value={x}>{x}</option>);

            //if no records then set id=1 else id will be length
            let i = length > 0 ? length : 1
           // console.log("new record" + i);
            options =

                <div className="fields">
                    <div className="field">
                        <input type="text"
                        value={this.state.newLanguage.name}
                        name="name"
                        id="name"
                        placeholder="Add Language"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <select className="ui right labeled dropdown"
                            placeholder="langauge level"
                        value={this.state.newLanguage.level}
                            onChange={this.handleChange}
                            name="level">
                            <option value="">language level</option>
                            {languageLevel}
                        </select>
                    </div>
                    <div className="field">
                    <button type="button" className="ui button" onClick={()=>this.addRecord(i)}>Add</button>
                    </div>
                    <div className="field">
                    <button type="button" className="ui button" onClick={this.closeDisplay}>Cancel</button>
                    </div>
                </div>


        }



        return (
           

            <div className='ui sixteen wide column'>
                <div>{options}
                </div>
                <div className="fields">
                    <Table unstackable fullWidth>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
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
    }
}

//**********************************************************//

//LanguageRow class

export class LanguageRow extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            newLanguage: { name: "", level: "", id: "", userId: "", isDeleted: "" },
            showP: false
        }
        this.updateLanguage = this.updateLanguage.bind(this);
        this.deleteLanguage = this.deleteLanguage.bind(this); 
        this.updateOpen = this.updateOpen.bind(this); 
        this.updateClose = this.updateClose.bind(this); 
        this.handleChange = this.handleChange.bind(this)
        
    }
    handleChange(event) {
        event.preventDefault();
        //console.log("LanguageRow::::inside handleChange")
        const data = Object.assign({}, this.state.newLanguage)

        data[event.target.name] = event.target.value
       // console.log("data[event.target.name]" + event.target.name +event.target.value);
        this.setState({
            newLanguage: data
        })

    }


    updateClose(event) {      
        event.preventDefault();
       // console.log("LanguageRow::::updateClose");
        this.setState({
            showP: false
        })

    }
    
    
    updateOpen(event) {
        event.preventDefault();
       // console.log("LanguageRow::::updateopen");
        this.setState({
            showP: true
        })
    }
    updateLanguage(id, e) {
        e.preventDefault();
      //  console.log("LanguageRow::::updatelanguage");
        const data = Object.assign({}, this.state.newLanguage)
        data.id = id;
        
       
        

        this.setState({
            showP: false,
            newLanguage: { name: "", level: "", id: "", userId: "", isDeleted: "" }
        })
        this.props.updateLanguage(data);
    }

    deleteLanguage(item) {      
      //console.log("id"+id)
      //  console.log("LanguageRow::::deletelanguage");
        this.props.deleteLanguage(item);
    }
    render() {
       // console.log("inside row " + JSON.stringify(this.props.item) + "id is " + this.props.item.id);
       
              
       return(
            this.state.showP ? this.renderUpdate() : this.renderDisplay()
           )

    }
    renderUpdate(){
        const levels = {
            "Basic": "Basic",
            "Conversational": "Conversational",
            "Fluent": "Fluent",
            "Native / Bilingual": "Native / Bilingual"
        }
        let languageLevel = Object.keys(levels).map((x) => <option key={x} value={x}>{x}</option>);
        const id = this.props.item.id;


            return (               
                
                <Table.Row>
                    <Table.Cell>
                        <input type="text"
                            value={this.state.newLanguage.name}
                            name="name"
                            id="Name"
                            placeholder="Add Language"
                            onChange={this.handleChange}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <select className="ui right labeled dropdown"
                            placeholder="langauge level"
                            value={this.state.newLanguage.level}
                            onChange={this.handleChange}
                            name="level">
                            <option value="">language level</option>
                            {languageLevel}
                        </select>


                    </Table.Cell>
                    <Table.Cell textAlign='right'>

                        <Button onClick={(e) => this.updateLanguage(id,e)}>
                            Update
                    </Button>
                        <Button onClick={this.updateClose}>
                            cancel
                   </Button>
                    </Table.Cell>
                </Table.Row>              
                
                
                )

        }
    renderDisplay() {
        const item = this.props.item;

        return (<Table.Row>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.level}</Table.Cell>
            <Table.Cell textAlign='right'>
                <Button onClick={this.updateOpen} >
                    <Icon name='pencil' />
                </Button>
                <Button onClick={() => this.deleteLanguage(item)} >
                    <Icon name='x' />
                </Button>
            </Table.Cell>
        </Table.Row >

        )
    }
             


    
    
}

