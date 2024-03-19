using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_Contact
    {
        Task<ResponseData<T>> Create<T>(EM_Contact model);
        Task<ResponseData<M_Contact>> CreateVirtualAssistant(EM_ContactVirtualAssistant model);
    }
    public class S_Contact : IS_Contact
    {
        private readonly ICallBaseApi _callApi;
        public S_Contact(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<T>> Create<T>(EM_Contact model)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", model.supplierId},
                {"name", model.name},
                {"email", model.email},
                {"phoneNumber", model.phoneNumber},
                {"title", model.title},
                {"detail", model.detail},
                {"remark", model.remark},
                {"contactTypeId", model.contactTypeId},
            };
            return await _callApi.PostResponseDataAsync<T>("Contact/Create", dictPars);
        }
        public async Task<ResponseData<M_Contact>> CreateVirtualAssistant(EM_ContactVirtualAssistant model)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", model.supplierId},
                {"name", model.name},
                {"phoneNumber", model.phoneNumber},
                {"remark", model.remark},
                {"detail", model.detail},
                {"contactTypeId", model.contactTypeId},
            };
            return await _callApi.PostResponseDataAsync<M_Contact>("Contact/Create", dictPars);
        }
    }
}
