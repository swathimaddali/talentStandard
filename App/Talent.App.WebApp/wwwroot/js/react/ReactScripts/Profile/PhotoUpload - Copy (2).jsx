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
        const imageId = props.imageId ? props.imageId : ""
        console.log("imageId" + imageId.name); 
        this.state = { newFile: imageId, show: false }
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.loadData = this.loadData.bind(this)

    };
     
    componentDidMount() {

        //if any pic exists setstate    else set null
        // const newFile = this.props.imageId ? this.props.imageId : "";
       //this.loadData();
        // const src = "/images/kelly-sikkema-487603-unsplash.jpg"
      // this.downloadFile();

    };


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
            responseType: 'blob',
            //responseType : "arraybuffer",
            success: function (res,status,xhr) {
                if (res) {
                    console.log("res" + res);
                  // const base64 = btoa(new Uint8Array(res.filename).reduce((data, byte) => data + string.fromCharCode(byte), ''));
                  //  this.setState({ newFile: "data:;base64," + base64 });
                    
                  
                    //res.profilePath.split()
                    //const newFile = this.props.imageId ? this.props.imageId : "";
                    //  this.setState({ newFile: res });
                    var blob = new Blob([res], { type: "image/jpeg" });
                    var cd = xhr.getResponseHeader('Content-Disposition'); //if you have the fileName header available
                    //var cd1 = res.getResponseHeader("Content-Disposition");
                    console.log("cd" + cd);
                  ////  var strt = cd.indexOf("filename=");
                  //  var end = cd.length - 1;
                  //  var filenm = cd.substring(strt, end);

                    var link = document.createElement('a');
                    link.href = "/images"+blob;
                    link.download = "/images/ii.jpeg";
                     link.click();
                   // this.setState({ newFile: blob });
                    //$("#my").append('<iframe src= "' + res +  '" style="display: none;"></iframe>');

                  //  window.location="download.action?"
                  
                  //  var raw = res;
                 //   var b64res = btoa(raw);
                 //   var img = document.getElementById("#my");
                  //  img.src = 'data:image/jpeg;base64,' + b64res;
             
                   /* var arrayBufferView = new Uint8Array(res);
                    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    var img = document.querySelector("#my");
                    img.src = imageUrl;
                    */
                   // this.setState({ newFile: imageUrl });


                }
            }
        })

    }

    downloadFile() {
        var urlToSend = 'http://localhost:60290/profile/profile/getProfileImage';
        var cookies = Cookies.get('talentAuthToken');
        var req = new XMLHttpRequest();
        req.setRequestHeaderheaders = {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'image/jpeg'
        };
    req.open("GET", urlToSend, true);
    req.responseType = "blob";
    req.onload = function (event) {
        var blob = req.response;
        var fileName = req.getResponseHeader("fileName") //if you have the fileName header available

        var link = document.createElement('a');
        link.href = "/images"+ window.URL.createObjectURL(blob);
        this.setState({ newFile: fileName});
       // $("#my").append('<img src="'+blob+'">')
        link.download = fileName;
        link.click();
    };

    req.send();
}
   

    fileUpload() {
        var url = URL.createObjectURL(this.state.newFile)
        var link = document.createElement("a")
        document.body.appendChild(link)
                link.style = "display:none"
        link.download = this.state.newFile.name;
        link.href=url;
        console.log("link"+link.href+ link.download);
        link.click();
        URL.revokeObjectURL(url);

        //document.getElementById('selectFile').click();
      //  var iframe = document.getElementById('inv');
       // iframe.src = this.state.newFile;

        this.setState({

            show: true
        })
        const file = this.state.newFile;
        if (!file == "") {

            console.log("uploaded file is " + file.name)

            const form = new FormData();//empty
            form.append('file', file);
            var url= this.props.savePhotoUrl;
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
                       // this.loadImages(Id);
                        console.log("success");
                        //this.props.updateProfileData(this.state.newFile)
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

        const selectedFile = event.target.files[0];
 
        
        if (acceptedExt.includes(selectedFile.type)) {
            this.setState({
                // uploadButton: "",
                newFile: selectedFile,
                //src: URL.createObjectURL(event.target.files[0]),
                show: true

            })
        }
        console.log("inside file change::this.state.newFile.name" + this.state.newFile.name);
        console.log("the selected file is" + (event.target.files[0]).name + "type is" + (event.target.files[0]).type);
        //  console.log("URL.createObjectURL(event.target.files[0])" + URL.createObjectURL(event.target.files[0]))

    }

    selectFileToUpload() {
        console.log("selectFileToUpload")
        document.getElementById('selectFile').click();
    }



    render() {
        console.log("this.props.newFile" + this.props.imageId); 
        let upload = ""
        let file = this.props.imageId
        const show = this.state.show
        let path = "../images/" + file
        console.log(path);

        if (show)
            upload = <div> <Button color="black" onClick={this.fileUpload}>Upload <Icon name='upload' /></Button></div>
        let showProfileImg = [];
        if (file == "") {
            showProfileImg.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);

        }
        else
            showProfileImg.push(<span><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui small" src={path} alt="Image Not Found" /><i className="remove sign icon" onClick={this.removeFile} ></i></span>)
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

