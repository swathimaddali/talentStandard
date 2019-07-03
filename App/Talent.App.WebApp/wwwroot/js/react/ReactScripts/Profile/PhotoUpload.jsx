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
        //this.loadData = this.loadData.bind(this);
        //////const imageId = props.imageId ? props.imageId : ""
       // console.log("imageId" + imageId); 
        this.state = {
            newFile: "",
            show: false,
            src:"",
            imageSrc: [],
   
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
       // this.loadData = this.loadData.bind(this)

    };
     
    componentDidMount() {

        //if any pic exists setstate    else set null
        const newFile = this.props.imageId ? this.props.imageId : "";
        this.setState({ newFile: newFile });
        // this.loadData();       

    };

    static getDerivedStateFromProps(props, state) {
       // console.log("getDerivedStateFromProps");
        if (props.imageId !== state.newFile) {
          //  console.log("getDerivedStateFromProps not same" );
            return {
                newFile: props.imageId
            }
        }
    }
    /*
    loadData() {
        console.log("inside load data");
        var link = 'http://localhost:60290/profile/profile/getProfileImage'
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'image/jpeg'
            },
            type: "GET",
            contentType: "image/jpeg",
           // responseType: 'blob',
            //responseType : "arraybuffer",
            success: function (res,status,xhr) {
                if (res) {
                    console.log("res" + res);
                  // const base64 = btoa(new Uint8Array(res.filename).reduce((data, byte) => data + string.fromCharCode(byte), ''));
                  //  this.setState({ newFile: "data:;base64," + base64 });
                    let imageSrcArr = [];
                    imageSrcArr.push(res);
                    this.setState({ imageSrc: imageSrcArr })
                    //res.profilePath.split()
                    //const newFile = this.props.imageId ? this.props.imageId : "";
                    //  this.setState({ newFile: res });
                    //var blob = new Blob([res], { type: "image/jpeg" });
                   // var cd = xhr.getResponseHeader('Content-Disposition'); //if you have the fileName header available
                    //var cd1 = res.getResponseHeader("Content-Disposition");
                   // console.log("cd" + cd);
                  ////  var strt = cd.indexOf("filename=");
                  //  var end = cd.length - 1;
                  //  var filenm = cd.substring(strt, end);

                    //var link = document.createElement('a');
                   // link.href = "/images"+blob;
                   // link.download = "/images/ii.jpeg";
                   //  link.click();
              
                    
                    //$("#my").append('<iframe src= "' + res +  '" style="display: none;"></iframe>');

                  //  window.location="download.action?"
                  
                  //  var raw = res;
                 //   var b64res = btoa(raw);
                 //   var img = document.getElementById("#my");
                  //  img.src = 'data:image/jpeg;base64,' + b64res;
             
                    var arrayBufferView = new Uint8Array(res);
                    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    var img = document.querySelector("#my");
                    img.src = imageUrl;
                    
                   // this.setState({ newFile: imageUrl });


                }
            }.bind(this)
        })

    }
*/
    
   

    fileUpload() {
      
        this.setState({

            show: true
        })
        const file = this.state.src;
        if (!file == "") {
            console.log("uploaded file is " + file.name)
            const form = new FormData();//empty
            form.append('file', file);
            var url= this.props.savePhotoUrl;
            
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
                       // this.loadImages(Id);
                        console.log("success");
                        //this.props.updateProfileData(this.state.newFile)
                        TalentUtil.notification.show(res.message, "success", null, null);
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
    
         


    fileChangedHandler(event) {

        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        let selectedFile = event.target.files[0]; 
     
        if (acceptedExt.includes(selectedFile.type)) {
            this.setState({               
                newFile: selectedFile.name,
                src: selectedFile,
                show: true,            

            })
        }
        
    }

    selectFileToUpload() {
        console.log("selectFileToUpload")
        document.getElementById('selectFile').click();
    }



    render() {
      
        let upload = ""
        let file = this.state.newFile ? this.state.newFile :""
        const show = this.state.show       
        let src = "/images/" + file
       
        if (show)
            upload = <div> <Button color="black" onClick={this.fileUpload}>Upload <Icon name='upload' /></Button></div>
        let showProfileImg = [];
       // if (this.props.imageId == "")
        if (file == "")
        {
            showProfileImg.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
        }
        else
            showProfileImg.push(<span><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui small" src={src} alt="Image Not Found" onClick={this.selectFileToUpload} /></span>)
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

