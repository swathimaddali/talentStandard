using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            // throw new NotImplementedException();
            // var env = _environment;
            //var temp = _tempFolder;
            //var aws = _awsService;
            //Console.WriteLine("Listing objects stored in a bucket");
            // var details = env.ApplicationName + env.ContentRootFileProvider + env.ContentRootPath + env.EnvironmentName;
            // var list=await aws.GetAllObjectFromS3(id);

            // string pathValue = pathWeb + _tempFolder;
            //return details;

            //60f721eb - 546c - 4d15 - 8822 - 895d297e53f0Profile2 C:\Users\phani\source\repos\swathimaddali\talentcompetition\Talent.Services.Profile\images
       
            var photoUrl= _environment.WebRootPath + _tempFolder + id;
            //   return photoUrl;


              // File.Exists(photoUrl);
                return photoUrl;
            


        }
        
        public async Task<string> SaveFile(IFormFile file, FileType type)
        {


            // unique file name
            /*
              var myUniqueFileName = "";
              string pathWeb = "";
              pathWeb = _environment.WebRootPath;

              if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
              {
                  string pathValue = pathWeb + _tempFolder;
                  myUniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                  var path = pathValue + myUniqueFileName;
                  using (var fileStream = new FileStream(path, FileMode.Create))
                  {
                      await file.CopyToAsync(fileStream);
                  }
                  Console.WriteLine(path);
              }

              return myUniqueFileName;

            */
          
            
                // unique file name
                var myUniqueFileName = "";
                string pathWeb = "";
                pathWeb = _environment.WebRootPath;

                if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
                {
                    string pathValue = pathWeb + _tempFolder;
                    myUniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;

                    var path = pathValue + myUniqueFileName;
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    Console.WriteLine(path);
                }

                return myUniqueFileName;


            


        }

        //
        /* var oldPhoto = existingUser.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldPhoto))
                {
                    await _fileService.DeleteFile(oldPhoto, FileType.ProfilePhoto);
                }

                existingUser.ProfilePhoto = newPhoto;
                existingUser.ProfilePhotoUrl = await _fileService.GetFileURL(newPhoto, FileType.ProfilePhoto);
         * 
         * 
         * */

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            //Your code here;
            //  throw new NotImplementedException();
            // _awsService.RemoveFileFromS3(id,);
            /*var env = _environment;
            var temp = _tempFolder;
            var photoUrl = env.ContentRootPath + temp + id;
            //URL.revokeObjectURL(photoUrl);
             await System.IO.File.Delete(photoUrl);

            
           
    */
            //check if pic name is present in given location.
            var fileUrl = await GetFileURL( id, type);
            if (fileUrl != null)
            {
                File.Delete(fileUrl);
                return true;
            }
            else return false;

        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
