/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Button, Label, Icon, Table, Image } from 'semantic-ui-react';


//
/*
imageId = { this.state.profileData.profilePhotoUrl }
updateProfileData = { this.updateWithoutSave }
savePhotoUrl = 
*/



export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        const imageId = props.imageId ? props.imageId : ""
        this.state = { newFile: imageId, show: false }
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.fileUpload = this.fileUpload.bind(this)

    };
    /*
    loadData() {
        console.log("inside load data");
        var link = 'http://localhost:60290/profile/profile/getProfileImage'
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
                    console.log("res" + res);
                    //res.profilePath.split()
                    //const newFile = this.props.imageId ? this.props.imageId : "";
                    this.setState({ newFile: res.profileUrl });

                }
            }.bind(this),
        })

    }
    
    componentDidMount() {

        //if any pic exists setstate    else set null
        // const newFile = this.props.imageId ? this.props.imageId : "";
        this.loadData();
        // const src = "/images/kelly-sikkema-487603-unsplash.jpg"

    };
    */
    /*downloadPhoto() {
       
        var cookies = Cookies.get('talentAuthToken');
        var file = this.state.file;
        var fileName = file.name
        var fd = new FormData();
        fd.append('file', file);
        $.ajax({

            url:
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },

            processData: false,
            contentType: false,
            type: "GET",         
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res) {
                console.log("error", res)
            }
        })

    }
    */




    fileUpload() {


        this.setState({

            show: true
        })
        const file = this.state.newFile;
        if (!file == "") {

            console.log("uploaded file is " + file.name)

            const form = new FormData();//empty
            form.append('file', file);
            var url = this.props.savePhotoUrl;
            for (var key in form) {
                //console.log("formdetails"+key + form[key])
            }
            var cookies = Cookies.get('talentAuthToken');
            console.log("cookies" + JSON.stringify(cookies))
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + cookies
                },

                type: "POST",
                data: form,
                cache: false,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.success) {
                        this.loadImages(Id);
                    } else {
                        TalentUtil.notification.show(res.message, "error", null, null);
                    }
                }.bind(this),
                error: function (res, status, error) {
                    //Display error
                    TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
                }
            });

        }

    }


    /* uploadPhoto() {
         console.log(this.state.file)
         var cookies = Cookies.get('talentAuthToken');
         var file = this.state.file;
         var fileName = file.name
         var fd = new FormData();
         fd.append('file', file);
         $.ajax({
 
             url: this.props.savePhotoUrl,
             headers: {
                 'Authorization': 'Bearer ' + cookies,
             },
 
             processData: false,
             contentType: false,
             type: "POST",
             data: fd,
             success: function (res) {
                 console.log(res)
                 if (res.success == true) {
                     TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                 } else {
                     TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                 }
 
             }.bind(this),
             error: function (res) {
                 console.log("error", res)
             }
         })
 
     }
 
 
 
         fileSelectedChange() {
 
             let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
 
             let selectedFile = event.target.files[0];
             console.log(event.target.files[0]);
             if (this.state.newFile) {
                 URL.revokeObjectURL(newFile);
             }
             if (acceptedExt.includes(selectedFile.type)) {
                 this.setState({
                     uploadButton: "",
                     newFileUrl: URL.createObjectURL(event.target.files[0]),
                     newFile: event.target.files[0]
                 })
             }
     }
     */



    fileChangedHandler(event) {



        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

        const selectedFile = event.target.files[0];
 
        //remove old file
        // if (this.state.newFile) {
        //   URL.revokeObjectURL(this.state.newFile);
        //}
        if (acceptedExt.includes(selectedFile.type)) {
            this.setState({
                // uploadButton: "",

                newFile: selectedFile,
                //src: URL.createObjectURL(event.target.files[0]),
                show: true

            })
        }
        console.log("inside file change" + this.state.newFile.name);
        console.log("the selected file is" + (event.target.files[0]).name + "type is" + (event.target.files[0]).type);
        //  console.log("URL.createObjectURL(event.target.files[0])" + URL.createObjectURL(event.target.files[0]))

    }

    selectFileToUpload() {
        console.log("selectFileToUpload")
        document.getElementById('selectFile').click();
    }



    render() {
        console.log("this.state.newFile" + this.state.newFile); 
        let upload = ""
       
        const show = this.state.show
        
        if (show)
            upload = <div> <Button color="black" onClick={this.fileUpload}>Upload <Icon name='upload' /></Button></div>
        let showProfileImg = [];
        if (this.state.newFile == "") {
            showProfileImg.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);

        }
        else
            showProfileImg.push(<span><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui medium" src={this.state.newFile} alt="Image Not Found"  onClick={this.selectFileToUpload} /></span>);
        return (


            <div className="row">
                <div className="four wide column">
                    <h4>Profile Photo</h4>


                    <div className="tooltip">Upload profile image here</div>
                </div>
                <div className="twelve wide column" >
                    <section floated="right">
                        <div>
                            <label htmlFor="work_sample_uploader" className="profile-photo">
                                {showProfileImg}
                            </label>
                            <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileChangedHandler} accept="image/*" multiple />

                        </div>
                        {upload}
                    </section>
                </div>
            </div>

        )
    }

}

