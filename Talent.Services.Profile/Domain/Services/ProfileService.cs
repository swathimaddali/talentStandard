using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    [MongoDB.Bson.Serialization.Attributes.BsonIgnoreExtraElements]
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }
        
        public bool AddNewLanguage(AddLanguageViewModel language)
        {
                        //if language is not same return true
            
            //Your code here;
           throw new NotImplementedException();
        }
        
        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                Level = language.LanguageLevel,
                Name = language.Language
            };


        }
        //swati
        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage original)
        {
            original.LanguageLevel = model.Level;
            original.Language = model.Name;
        }

        //swati
        
      

       protected void UpdateCertificateFromView(AddCertificationViewModel model, UserCertification original)
        {            
            original.CertificationName = model.CertificationName;
            original.CertificationYear = model.CertificationYear;
            original.CertificationFrom = model.CertificationFrom;
        }

        //GET TALENT PROFILE
        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //Your code here;
            //swati 
            User profile = null;
            profile = (await _userRepository.GetByIdAsync(Id));
 

            if (profile != null)
            {
                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                var languages = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                var certificates= profile.Certifications.Select(x => ViewModelFromCertificate(x)).ToList();
                var experience = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();

                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    FirstName = profile.FirstName,
                    MiddleName = profile.MiddleName,
                    Address = profile.Address,
                    Nationality = profile.Nationality,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    Description = profile.Description,
                    Languages = languages,
                    Skills = skills,
                    Certifications = certificates,
                    LinkedAccounts = profile.LinkedAccounts,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    JobSeekingStatus = profile.JobSeekingStatus,
                    Summary = profile.Summary,
                    VisaExpiryDate = profile.VisaExpiryDate,
                    VisaStatus = profile.VisaStatus,
                    //Education = profile.Education,
                    Experience=experience
                };
                return result;
            }

            return null;
            
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {

            //swati start

            try
            {
                if (model.Id != null) {

                    User existingUser = (await _userRepository.GetByIdAsync(model.Id));
                    existingUser.Email = model.Email;
                    existingUser.LastName = model.LastName;
                    existingUser.FirstName = model.FirstName;
                    existingUser.Phone = model.Phone;
                    existingUser.Address = model.Address;
                    existingUser.Nationality = model.Nationality;
                    existingUser.LinkedAccounts = model.LinkedAccounts;
                    existingUser.Description = model.Description;                 
                    existingUser.UpdatedBy = updaterId;
                    existingUser.UpdatedOn = DateTime.Now;
                   // existingUser.ProfilePhoto = model.ProfilePhoto;
                   // existingUser.ProfilePhotoUrl = model.ProfilePhotoUrl;
                    existingUser.JobSeekingStatus = model.JobSeekingStatus;
                    existingUser.Summary = model.Summary;
                    existingUser.VisaStatus = model.VisaStatus;
                    existingUser.VisaExpiryDate = model.VisaExpiryDate;
                 
                    if (model.Languages != null) {
                 
                        var newLanguage = new List<UserLanguage>();
                        foreach (var item in model.Languages)
                        {
                            //var lang = existingUser.Languages.SingleOrDefault(x => x.Id == item.Id);
                            //if (lang == null)                            
                            var lang = new UserLanguage
                            {  
                                //  Id = ObjectId.GenerateNewId().ToString(),
                                Id = item.Id,
                                UserId = existingUser.Id,
                                LanguageLevel = item.Level,
                                Language = item.Name
                        };                            
                            UpdateLanguageFromView(item, lang);
                            newLanguage.Add(lang);
                        }

                        existingUser.Languages = newLanguage;

                    }

                    if (model.Skills != null)
                    {
                        var newSkills = new List<UserSkill>();
                        foreach (var item in model.Skills)
                        {

                            var skill = new UserSkill
                            {
                                Id = item.Id,
                                UserId = existingUser.Id,
                                ExperienceLevel = item.Level,
                                Skill = item.Name
                        };
                            UpdateSkillFromView(item, skill);
                            newSkills.Add(skill);
                        }
                        existingUser.Skills = newSkills;
                    }

                    if (model.Certifications != null)
                    {

                        var newCert = new List<UserCertification>();
                        foreach (var item in model.Certifications)
                        {
                                               
                            var cert = new UserCertification
                            {
                              
                                Id = item.Id,
                                UserId = existingUser.Id
                            };
                            UpdateCertificateFromView(item, cert);
                            newCert.Add(cert);
                        }

                        existingUser.Certifications = newCert;

                    }
                    if (model.Experience != null)
                    {
                        var newExp = new List<UserExperience>();
                        foreach (var item in model.Experience)
                        {
                            var exp = new UserExperience();
                            UpdateExperienceFromView(item, exp);
                            newExp.Add(exp);
                            
                        }
                        existingUser.Experience = newExp;
                    }
                  
                    await _userRepository.Update(existingUser);

                    return true;
                }
                return false;

            }
            catch (MongoException e)
            {
                return false;
            }
        }
        //swati end

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                            
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateEmployerVideo(string employerId, IFormFile file)
       
        {
            //Your code here;
            throw new NotImplementedException();
        }


        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)

        {
            //Your code here;
            throw new NotImplementedException();
        }
        //swati
        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
        
             var newPhoto = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newPhoto))
            {
                User existingUser = (await _userRepository.GetByIdAsync(talentId));
                var oldPhoto = existingUser.ProfilePhoto;
                
                if (!string.IsNullOrWhiteSpace(oldPhoto))
                {
                    await _fileService.DeleteFile(oldPhoto, FileType.ProfilePhoto);
                }
                
                
                existingUser.ProfilePhoto = newPhoto;
                existingUser.ProfilePhotoUrl = await _fileService.GetFileURL(newPhoto, FileType.ProfilePhoto);

                await _userRepository.Update(existingUser);
                return true;
            }

            return false;

        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }




        protected TalentSnapshotViewModel getTalentSnapshot(User user)
        {


            String name = String.Format("{0} {1}", user.FirstName, user.LastName);
            List<string> skills = user.Skills.Select(x => x.Skill).ToList();
           /// string photo = await _documentService.GetFileURL(user.ProfilePhoto, FileType.ProfilePhoto);

            UserExperience latest = user.Experience.OrderByDescending(x => x.End).FirstOrDefault();
            String level, employment;
            if (latest != null)
            {
                level = latest.Position;
                employment = latest.Company;
            }
            else
            {
                level = "Unknown";
                employment = "Unknown";
            }

            var result = new TalentSnapshotViewModel
            {
                CurrentEmployment = employment,
                Id = user.Id,
                Level = level,
                Name = name,
                PhotoId = user.ProfilePhotoUrl,
                Skills = skills,
                Summary = user.Summary,
                Visa = user.VisaStatus
            };

            return result;
        }



        //start
     
        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //IEnumerable<Employer>   existingEmployer = (await _employerRepository.Get(x => !x.IsDeleted));
           // var users = (await _userRepository.Get(x => true)).Skip(position).Take(increment);
            IEnumerable<User> users1 = (await _userRepository.Get(x => !x.IsDeleted)).Skip(position).Take(increment);

            List<TalentSnapshotViewModel> result = new List<TalentSnapshotViewModel>();

            foreach (var user in users1)
            {
                result.Add(getTalentSnapshot(user));
            }
            return result;
        }


        /*
         * 
         *  try { 
                var profile = await _employerRepository.GetByIdAsync(employerOrJobId);
                var talentList = _userRepository.Collection.Skip(position).Take(increment).AsEnumerable();
                if (profile != null)
                {
                    var result = new List<TalentSnapshotViewModel>();                      
                    
          //line 527          foreach (var item in talenList)
                    {
                        var newItem = new TalentSnapshotViewModel();
                        newItem.Id = item.Id;
                        // more lines assigning data
                        result.Add(newItem);
                    }
                    return result;
                }
         * */


        //end
        /*
        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {

            //get users from position and increment into array
            //from that retrieve only selected info and plae into TalentSnapshotViewModel

        

            List<User> userList = users.GetRange(position, increment);
            List<TalentSnapshotViewModel> result = null;
            if (userList.Count > 0)
            {
                foreach (var item in userList)
                {
                    var talent = new TalentSnapshotViewModel
                    {

                        Name = item.LastName,
                        PhotoId = item.ProfilePhoto,
                        VideoUrl = item.VideoName,
                        CVUrl = item.CvName,
                        Summary = item.Summary,
                        Visa = item.VisaStatus,
                        CurrentEmployment = "",
                        Level = "",
                        Skills = null


                    };
                    result.Add(talent);
                }
            }
            else {

                result.Add(
                    new Models.TalentSnapshotViewModel
                    {
                        CurrentEmployment = "Software Developer at XYZ",
                        Level = "Junior",
                        Name = "Dummy User...",
                        PhotoId = "",
                        Skills = new List<string> { "C#", ".Net Core", "Javascript", "ReactJS", "PreactJS" },
                        Summary = "Veronika Ossi is a set designer living in New York who enjoys kittens, music, and partying.",
                        Visa = "Citizen"
                    }
                );



            }

            return result;

        }
        */

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }
        //swati
        protected AddCertificationViewModel ViewModelFromCertificate(UserCertification cert)
        {
            return new AddCertificationViewModel
            {         
                Id = cert.Id,
                CertificationName = cert.CertificationName,
                CertificationFrom = cert.CertificationFrom,
                CertificationYear = cert.CertificationYear
            };
        }
        //swati
        protected void UpdateExperienceFromView(ExperienceViewModel model, UserExperience original)
        {
            original.Id = model.Id;
            original.Company = model.Company;
            original.Position = model.Position;
            original.Responsibilities = model.Responsibilities;
            original.Start = model.Start;
            original.End = model.End;

             
        }
        


      protected ExperienceViewModel ViewModelFromExperience(UserExperience exp)
        {
            return new ExperienceViewModel
            {
                Id = exp.Id,
                Company=exp.Company,
                Position=exp.Position,
                Responsibilities=exp.Responsibilities,
                Start=exp.Start,
                End=exp.End
         
            };
        }

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
