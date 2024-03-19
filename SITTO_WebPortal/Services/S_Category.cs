using SITTO_WebPortal.Lib;
using System.Collections.Generic;
using System.Threading.Tasks;
using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Services
{
    public interface IS_Category
    {
        Task<ResponseData<List<M_Category>>> getListCatMenu(int? supplierId, string sequenceStatus);
        Task<ResponseData<List<M_Category>>> getListCategoryBySupplierIdParentId(int? supplierId, int? parentId);
        Task<ResponseData<List<M_Category>>> getListCategoryById(int? supplierId, int? categoryId);
        Task<ResponseData<M_Category>> getCategoryById(int? id);
        Task<ResponseData<M_Category>> getCategoryBreadcrumbByMetaUrl(string metaUrl);
        Task<ResponseData<M_Category>> getCategoryByMetaUrl(string metaUrl);
    }
    public class S_Category : IS_Category
    {
        private readonly ICallBaseApi _callApi;
        public S_Category(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_Category>>> getListCatMenu(int? supplierId, string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Category>>("Category/getListCategoryMenu", dictPars);
        }
        public async Task<ResponseData<List<M_Category>>> getListCategoryBySupplierIdParentId(int? supplierId, int? parentId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"parentId", parentId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Category>>("Category/getListCategoryBySupplierIdParentId", dictPars);
        }
        public async Task<ResponseData<List<M_Category>>> getListCategoryById(int? supplierId, int? categoryId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"supplierId", supplierId},
                  {"categoryId", categoryId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Category>>("Category/getListCategoryById", dictPars);
        }
        public async Task<ResponseData<M_Category>> getCategoryById(int? id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_Category>("Category/getCategoryById", dictPars);
        }
        public async Task<ResponseData<M_Category>> getCategoryBreadcrumbByMetaUrl(string metaUrl)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"metaUrl", metaUrl},
            };
            return await _callApi.GetResponseDataAsync<M_Category>("Category/getCategoryBreadcrumbByMetaUrl", dictPars);
        }
        public async Task<ResponseData<M_Category>> getCategoryByMetaUrl(string metaUrl)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"metaUrl", metaUrl},
            };
            return await _callApi.GetResponseDataAsync<M_Category>("Category/getCategoryByMetaUrl", dictPars);
        }
    }
}
