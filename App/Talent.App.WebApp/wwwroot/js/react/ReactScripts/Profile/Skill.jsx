/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button, Label, Icon, Table } from 'semantic-ui-react';


export default class Skill extends React.Component {
    constructor(props) {
        super(props)
       
        const skill = props.skillData ? props.skillData : [{ Name: "", Level: "", Id: "", UserId: ""}]



        this.state = {
            showEditSection: false,
            skillData: skill,
            show: false,
            id: 1,
            addrow: false,
            newSkill: { name: "", level: "", id: "", userId: "" }

        }

        this.addDisplay = this.addDisplay.bind(this)
        this.closeDisplay = this.closeDisplay.bind(this)
        this.addRecord = this.addRecord.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);


    }

    componentDidMount() {

        this.loadData();
    };

    loadData() {
       // console.log("inside load data");
        var link = 'http://localhost:60290/profile/profile/getSkill'
        //var link = 'https://talentservicesprofile3.azurewebsites.net/profile/profile/getSkill'
       
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
                   // console.log("myskills", JSON.stringify(res.data));
                    this.setState({
                        skillData: res.data,
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
      //  console.log("inside close display table");
        this.setState({
            show: false
        })


    }
    handleChange(event) {
       // console.log("inside handleChange")
        const data = Object.assign({}, this.state.newSkill)

        data[event.target.name] = event.target.value
        this.setState({
            newSkill: data
        })

    }
    addRecord() {
        
        if (this.state.newSkill.level == "" || this.state.newSkill.name == "") {
            alert("skill and level cannot be empty");
            return;
        }  
        

        var h = this.state.newSkill;
       // console.log("data to add" + h);       
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addSkill',
             //url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/addSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(h),
            success: function (res) {
              //  console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })  
        
        if (this.loadData())
            this.props.updateProfileData(this.props.componentId, this.state.skillData)
        // this.props.updateProfileData(this.props.componentId, this.state.languageData)
    }


    updateSkill(data) {


        const l = this.state.skillData;

        if (data.level == "" || data.name == "") {
            alert("pls fill update");
            return;
        }
        if (l.findIndex(item => item.name == data.name)) {
            alert("skill is already selected")
            return;
        }

        //const data = Object.assign({}, this.state.newLanguage)
       // console.log("we need to update this" + JSON.stringify(data));
        
       
      //  console.log("before update" + JSON.stringify(l));
        //replace data
        var result = l.findIndex(item => item.id == data.id)
       // console.log("index is" + result + "data" + l[result]);
        l[result] = data;
      //  console.log("after update" + JSON.stringify(l));
       
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateSkill',
          // url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
             //   console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.setState({
                        newSkill: { name: '', level: '' },
                        skillData: l,
                        show: false,
                    })

                } else {
                    TalentUtil.notification.show("Skill id not update successfully", "error", null, null)
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

    deleteSkill(item) {
        var cookies = Cookies.get('talentAuthToken');
        const l = this.state.skillData;
        //retreive the record which has id
        //  console.log("delete *** id" + id + "***l***" + JSON.stringify(l));
        //var result = l.find(item => item.id == id)
      //  console.log("we need to delete this" + JSON.stringify(item));

        var index = l.findIndex(x => x.id == item.id)
       // console.log("index is" + index + "data is" + l[index]);
        //l[result] = data;
        l.splice(index, 1);
      //  console.log("after update" + JSON.stringify(l));


        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteSkill',
          //  url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(item),
            success: function (res) {
              //  console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill deleted  sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill not deleted  successfully", "error", null, null)
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
       // console.log("new skill" + JSON.stringify(this.state.newSkill));
        // let language = this.props.languageData ? this.props.languageData : ""
        //rows array push records 
        var rows = [];    
        let skill = this.state.skillData;
        // let length = this.state.languageData.length;
        //  console.log("no of language records are" + length);
        if (skill != null || skill != undefined) {
            for (var i = 0; i < skill.length; i++) {
             //   console.log(" *** is " + JSON.stringify(skill[i]));
                rows.push(
                    <SkillRow key={skill[i].id} item={skill[i]} openTable={this.openTable} updateSkill={this.updateSkill} deleteSkill={this.deleteSkill} />)
            }
          //  console.log(rows);
        }


        //
        //shows the add+ button
        let isState = this.state.show;
        let options = [];
        if (isState) {

            const levels = {
                "Beginner": "Beginner",
                "Intermediate": "Intermediate",
                "Expert": "Expert"                
            }
            let skillLevel = Object.keys(levels).map((x) => <option key={x} value={x}>{x}</option>);

            //if no records then set id=1 else id will be length
            let i = length > 0 ? length : 1
            //console.log("new record" + i);
            options =

                <div className="fields">
                    <div className="field">
                    <input type="text"
                        value={this.state.newSkill.name}
                            name="name"
                            id="name"
                            placeholder="Add Skill"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <select className="ui right labeled dropdown"
                            placeholder="Skill level"
                        value={this.state.newSkill.level}
                            onChange={this.handleChange}
                            name="level">
                            <option value="">Skill level</option>
                        {skillLevel}
                        </select>
                    </div>
                    <div className="field">
                        <button type="button" className="ui button" onClick={() => this.addRecord(i)}>Add</button>
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
                                <Table.HeaderCell>Skill</Table.HeaderCell>
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

export class SkillRow extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            newSkill: { name: "", level: "", id: "", userId: "" },
            showP: false
        }
        this.updateSkill = this.updateSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.updateOpen = this.updateOpen.bind(this);
        this.updateClose = this.updateClose.bind(this);
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(event) {
        event.preventDefault();
       // console.log("SkillRow::::inside handleChange")
        const data = Object.assign({}, this.state.newSkill)

        data[event.target.name] = event.target.value
       // console.log("data[event.target.name]" + event.target.name + event.target.value);
        this.setState({
            newSkill: data
        })

    }


    updateClose(event) {
        event.preventDefault();
       // console.log("SkillRow::::updateClose");
        this.setState({
            showP: false
        })

    }


    updateOpen(event) {
        event.preventDefault();
      //  console.log("SkillRow::::updateopen");
        this.setState({
            showP: true
        })
    }
    updateSkill(id, e) {
        //event.preventDefault();
       // console.log("SkillRow::::updateSkill");   
        const data = Object.assign({}, this.state.newSkill)
        data.id = id;
        this.setState({
            showP: false,
            newSkill: { name: "", level: "", id: "", userId: "" }
        })
        this.props.updateSkill(data);

    }

    deleteSkill(item) {
        //console.log("id"+id)
     //   console.log("SkillRow::::deleteSkill");
        this.props.deleteSkill(item);
    }
    render() {
      //  console.log("inside row " + JSON.stringify(this.props.item) + "id is " + this.props.item.id);


        return (
            this.state.showP ? this.renderUpdate() : this.renderDisplay()
        )

    }
    renderUpdate() {
        const levels = {
            "Beginner": "Beginner",
            "Intermediate": "Intermediate",
            "Expert": "Expert"
        }
        let skillLevel = Object.keys(levels).map((x) => <option key={x} value={x}>{x}</option>);

          
        const id = this.props.item.id;


        return (

            <Table.Row>
                <Table.Cell>
                    <input type="text"
                        value={this.state.newSkill.name}
                        name="name"
                        id="Name"
                        placeholder="Add Skill"
                        onChange={this.handleChange}
                    />
                </Table.Cell>
                <Table.Cell>
                    <select className="ui right labeled dropdown"
                        placeholder="skill level"
                        value={this.state.newSkill.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="">Skill level</option>
                        {skillLevel}
                    </select>


                </Table.Cell>
                <Table.Cell textAlign='right'>

                    <Button onClick={(e) => this.updateSkill(id,e)}>
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
                <Button onClick={() => this.deleteSkill(item)} >
                    <Icon name='x' />
                </Button>
            </Table.Cell>
        </Table.Row >

        )
    }





}

