using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_Utility
    {
        Task<ResponseData<M_Utility>> getListUtilityById(int id);
        Task<ResponseData<List<M_Utility>>> getListUtility(string sequenceStatus);
    }
    public class S_Utility : IS_Utility
    {
        private readonly ICallBaseApi _callApi;
        public S_Utility(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_Utility>>> getListUtility(string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Utility>>("UtilityList/getListUtilityListSequenceStatus", dictPars);
        }
        public async Task<ResponseData<M_Utility>> getListUtilityById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                { "id", id}
            };
            return await _callApi.GetResponseDataAsync<M_Utility>("UtilityList/getUtilityListById", dictPars);
        }
    }
}
