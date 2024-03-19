using Microsoft.AspNetCore.Mvc.RazorPages;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_VirtualAssistant
    {
        Task<ResponseData<List<M_VirtualAssistant>>> getListVirtualAssistantByParentIdStatus(int? parentId, int? status = 1);
    }
    public class S_VirtualAssistant : IS_VirtualAssistant
    {
        private readonly ICallBaseApi _callApi;
        public S_VirtualAssistant(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_VirtualAssistant>>> getListVirtualAssistantByParentIdStatus(int? parentId, int? status = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"status", status},
            };
            return await _callApi.GetResponseDataAsync<List<M_VirtualAssistant>>("VirtualAssistant/getListVirtualAssistantByParentIdStatus", dictPars);
        }
    }
}
