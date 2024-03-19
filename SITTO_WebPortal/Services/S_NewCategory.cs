using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_NewsCategory
    {
        Task<ResponseData<List<M_NewCategory>>> getListKnowledgeCategory(int typeId);
        Task<ResponseData<List<M_NewCategory>>> getListAboutCategory(int typeId);
        Task<ResponseData<M_NewCategory>> getNewsCategoryById(int id);
        Task<ResponseData<List<M_NewCategory>>> getListNewsCategoryBySupplierIdSequenceStatusParentId(int? supplierId, string sequenceStatus, int? parentId);
        Task<ResponseData<List<M_NewCategory>>> getListNewsCategoryBySupplierIdParentId(int? supplierId, int? parentId);
        Task<ResponseData<M_NewCategory>> getNewsCategoryByMetaUrl(string metaUrl);
    }
    public class S_NewCategory : IS_NewsCategory
    {
        private readonly ICallBaseApi _callApi;
        public S_NewCategory(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_NewCategory>>> getListKnowledgeCategory(int typeId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"typeId", typeId},
            };
            return await _callApi.GetResponseDataAsync<List<M_NewCategory>>("NewsCategory/getListNewsCategoryByTypeId", dictPars);
        }
        public async Task<ResponseData<List<M_NewCategory>>> getListAboutCategory(int typeId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"typeId", typeId},
            };
            return await _callApi.GetResponseDataAsync<List<M_NewCategory>>("NewsCategory/getListNewsCategoryByTypeId", dictPars);
        }
        public async Task<ResponseData<M_NewCategory>> getNewsCategoryById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_NewCategory>("NewsCategory/getNewsCategoryById", dictPars);
        }
        public async Task<ResponseData<List<M_NewCategory>>> getListNewsCategoryBySupplierIdParentId(int? supplierId, int? parentId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"supplierId", supplierId},
                  {"parentId", parentId},
            };
            return await _callApi.GetResponseDataAsync<List<M_NewCategory>>("NewsCategory/getListNewsCategoryBySupplierIdParentId", dictPars);
        }
        public async Task<ResponseData<List<M_NewCategory>>> getListNewsCategoryBySupplierIdSequenceStatusParentId(int? supplierId, string sequenceStatus, int? parentId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                  {"supplierId", supplierId},
                  {"sequenceStatus", sequenceStatus},
                  {"parentId", parentId},
            };
            return await _callApi.GetResponseDataAsync<List<M_NewCategory>>("NewsCategory/getListNewsCategoryBySupplierIdSequenceStatusParentId", dictPars);
        }
        public async Task<ResponseData<M_NewCategory>> getNewsCategoryBreadcrumbByMetaUrl(string metaUrl)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"metaUrl", metaUrl},
            };
            return await _callApi.GetResponseDataAsync<M_NewCategory>("NewsCategory/getNewsCategoryBreadcrumbByMetaUrl", dictPars);
        }
        public async Task<ResponseData<M_NewCategory>> getNewsCategoryByMetaUrl(string metaUrl)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"metaUrl", metaUrl},
            };
            return await _callApi.GetResponseDataAsync<M_NewCategory>("NewsCategory/getNewsCategoryByMetaUrl", dictPars);
        }
    }
}
