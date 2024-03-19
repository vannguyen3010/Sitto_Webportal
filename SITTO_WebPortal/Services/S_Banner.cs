using Microsoft.AspNetCore.Mvc.RazorPages;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_Banner
    {
        Task<ResponseData<List<M_Banner>>> GetListBanners(string supplierId, string sequenceStatus);
        Task<ResponseData<List<M_Banner>>> getListBannerByStatusSupplierIdLocationIdPageName(int? supplierId, int? locationId, string pageName, int status = 1);
    }
    public class S_Banner : IS_Banner
    {
        private readonly ICallBaseApi _callApi;
        public S_Banner(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Banner>>> GetListBanners(string supplierId, string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Banner>>("Banner/getListBannerBySupplierIdSequenceStatus", dictPars);
        }
        public async Task<ResponseData<List<M_Banner>>> getListBannerByStatusSupplierIdLocationIdPageName(int? supplierId, int? locationId, string pageName, int status = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"status", status},
                {"locationId", locationId},
                {"pageName", pageName},
            };
            return await _callApi.GetResponseDataAsync<List<M_Banner>>("Banner/getListBannerByStatusSupplierIdLocationIdPageName", dictPars);
        }

    }

}
