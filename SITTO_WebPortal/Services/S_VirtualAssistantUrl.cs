using Microsoft.AspNetCore.Mvc.RazorPages;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_VirtualAssistantUrl
    {
        Task<ResponseData<List<M_VirtualAssistantUrl>>> getListVirtualAssistantUrlByStatusVirtualAssistantId(int? virtualAssistantId, int? status = 1);
    }
    public class S_VirtualAssistantUrl : IS_VirtualAssistantUrl
    {
        private readonly ICallBaseApi _callApi;
        public S_VirtualAssistantUrl(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_VirtualAssistantUrl>>> getListVirtualAssistantUrlByStatusVirtualAssistantId(int? virtualAssistantId, int? status = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"virtualAssistantId", virtualAssistantId},
                {"status", status},
            };
            return await _callApi.GetResponseDataAsync<List<M_VirtualAssistantUrl>>("VirtualAssistantUrl/getListVirtualAssistantUrlByStatusVirtualAssistantId", dictPars);
        }
    }
}
