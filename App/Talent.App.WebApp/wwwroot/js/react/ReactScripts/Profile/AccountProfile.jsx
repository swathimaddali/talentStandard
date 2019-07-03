import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import  Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';
import { isNull } from 'util';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {
                address: {},
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                profilePhoto: '',
             
                linkedAccounts: {
                    linkedIn: "",
                    github: ""
                },
                jobSeekingStatus: {
                    status: "",
                    availableDate: null
                }
            },
            loaderData: loaderData,

        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.updateForComponent = this.updateForComponent.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
    };

    init() {
        console.log("inside init");
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        console.log("inside componentDidMount");
        this.loadData();
    }

    loadData() {
        console.log("inside load data");
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
           url: 'http://localhost:60290/profile/profile/getTalentProfile',
           // url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log("Account profile load data:::res.data " + JSON.stringify(res.data));
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        console.log("newProfile" + JSON.stringify(newProfile));
        this.setState({
            profileData: newProfile
        }
          
        )
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        console.log("updateAndSaveData:::new values " + newValues);
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        console.log("updateAndSaveData:::new profile " + JSON.stringify(newProfile));
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }

    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues)
    }
    
    updateForComponent(componentId, newValues) {
        let data = {};
        data[componentId] = newValues;
        this.updateAndSaveData(data)
    }

    saveProfile() {
        console.log("inside save profile" + JSON.stringify(this.state.profileData));
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateTalentProfile',
          //  url: 'https://talentservicesprofile3.azurewebsites.net/profile/profile/updateTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileData),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone,
            address: this.state.profileData.address,
            linkedAccounts: this.state.profileData.linkedAccounts,
     
        

          


        }
        let lang = this.state.profileData.languages
        console.log("languages::::" + lang + lang.length)
        if (lang.length>0) {
            for (let i=0; i < lang.length; i++) {
                console.log("languages::::" + JSON.stringify(lang[i]));
            }

           
        }
  

        console.log(" render profile is" + JSON.stringify(profile));
        console.log(" render address" + JSON.stringify(this.state.profileData.address));
        this.state.profileData.address
  
 
            return (
                <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                    <section className="page-body">
                        <div className="ui container">
                            <div className="ui container">
                                <div className="profile">
                                    <form className="ui form">
                                        <div className="ui grid">
                                            <FormItemWrapper
                                                title='Linked Accounts'
                                                tooltip='Linking to online social networks adds credibility to your profile'
                                            >
                                                <SocialMediaLinkedAccount
                                                    linkedAccounts={this.state.profileData.linkedAccounts}
                                                    updateProfileData={this.updateForComponentId}
                                                    saveProfileData={this.updateAndSaveData}
                                                    componentId='linkedAccounts'
                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='User Details'
                                                tooltip='Enter your contact details'
                                            >
                                                <IndividualDetailSection
                                                    controlFunc={this.updateForComponentId}
                                                    details={profile}
                                                    componentId='contactDetails'
                                                 
                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Address'
                                                tooltip='Enter your current address'>
                                                <Address
                                                    addressData={this.state.profileData.address}
                                                    updateProfileData={this.updateForComponent}
                                                    saveProfileData={this.updateAndSaveData}
                                                    componentId='address'
                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Nationality'
                                                tooltip='Select your nationality'
                                            >
                                                <Nationality
                                                    nationalityData={this.state.profileData.nationality}
                                                    saveProfileData={this.updateAndSaveData}
                                                />
                                            </FormItemWrapper>

                                            <FormItemWrapper
                                                title='Languages'
                                                tooltip='Select languages that you speak'
                                            >
                                                <Language
                                                    languageData={this.state.profileData.languages}
                                                    updateProfileData={this.updateForComponent}
                                                    componentId='languages'
                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Skills'
                                                tooltip='List your skills'
                                            >
                                                <Skill
                                                    skillData={this.state.profileData.skills}
                                                    updateProfileData={this.updateAndSaveData}
                                                    componentId='skills'
                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Work experience'
                                                tooltip='Add your work experience'
                                              >
                                                <Experience
                                                    experienceData={this.state.profileData.experience}
                                                    updateProfileData={this.updateForComponent}
                                                    componentId='experience'
                                                    
                                            />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Visa Status'
                                                tooltip='What is your current Visa/Citizenship status?'
                                            >
                                                <VisaStatus
                                                    visaStatus={this.state.profileData.visaStatus}
                                                    visaExpiryDate={this.state.profileData.visaExpiryDate}
                                                    updateProfileData={this.updateWithoutSave}
                                                    saveProfileData={this.updateAndSaveData}
                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Status'
                                                tooltip='What is your current status in jobseeking?'
                                            >
                                                <TalentStatus
                                                    status={this.state.profileData.jobSeekingStatus}
                                                    updateProfileData={this.updateWithoutSave}
                                                    saveProfileData={this.updateForComponent}
                                                    componentId='jobSeekingStatus'

                                                />
                                            </FormItemWrapper>
                                            <FormItemWrapper
                                                title='Profile Photo'
                                                tooltip='Please upload your profile photo'
                                                hideSegment={true}
                                            >
                                                <PhotoUpload
                                                    imageId={this.state.profileData.profilePhotoUrl}
                                                    updateProfileData={this.updateWithoutSave}                                                   
                                                    savePhotoUrl='http://localhost:60290/profile/profile/updateProfilePhoto'
                                                />
                                            </FormItemWrapper>
                                        </div>
                                    </form>
                                </div >
                            </div>
                        </div>
                    </section>
                </BodyWrapper>
            )
        
    }
}
