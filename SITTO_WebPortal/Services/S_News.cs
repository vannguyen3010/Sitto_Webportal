using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Hosting;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Services
{
    public interface IS_News
    {
        Task<ResponseData<M_NewAndProduct>> getListNewAndProduct();
        Task<ResponseData<List<M_News>>> getListNewsDropdownByTypeId(int typeId, int recordNumber, int page);
        Task<ResponseData<M_News>> getNewsById(int id);
        Task<ResponseData<List<M_News>>> getListNewsByNewsCategoryIdType(int type, int? newscategoryId , int isHot);
        Task<ResponseData<List<M_News>>> getListNewsByCategoryId(int? supplierId, int? categoryId, int? page, int? recordNumber);
        Task<ResponseData<List<M_News>>> getListNewsByCategoryIdPagination(int? categoryId, int? page = 1, int? recordNumber = 10, string orderBy = "createAt", bool desc = true);
        Task<ResponseData<M_News>> getNewsByMetaUrl(string metaUrl);
        Task<ResponseData<M_News>> getListNewsKnowledgeIsHot(int supplierId, int isHot = 1, int status = 1);

    }
    public class S_News : IS_News
    {
        private readonly ICallBaseApi _callApi;
        public S_News(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_NewAndProduct>> getListNewAndProduct()
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
            
            };
            return await _callApi.GetResponseDataAsync<M_NewAndProduct>("News/getListNewsProduct", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListNewsDropdownByTypeId(int typeId, int recordNumber = 20, int page = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                { "typeId", typeId},
                { "page", page},
                { "recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListNewsDropdownByTypeId", dictPars);
        }
        public async Task<ResponseData<M_News>> getNewsById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_News>("News/getNewsById", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListNewsByNewsCategoryIdType(int type, int? newscategoryId, int isHot)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"type", type},
                {"newscategoryId", newscategoryId},
                {"isHot", isHot},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListNewsByNewsCategoryIdType", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListNewsByCategoryId(int? supplierId, int? categoryId, int? page, int? recordNumber)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"categoryId", categoryId},
                {"page", page},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListNewsByCategoryId", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListNewsByCategoryIdPagination(int? categoryId, int? page = 1, int? recordNumber = 10, string orderBy = "createAt", bool desc = true)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"categoryId", categoryId},
                {"page", page},
                {"recordNumber", recordNumber},
                {"orderBy", orderBy},
                {"desc", desc},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListNewsByCategoryIdPagination", dictPars);
        }
        public async Task<ResponseData<M_News>> getNewsByMetaUrl(string metaUrl)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"metaUrl", metaUrl},
            };
            return await _callApi.GetResponseDataAsync<M_News>("News/getNewsByMetaUrl", dictPars);
        }
        public async Task<ResponseData<M_News>> getListNewsKnowledgeIsHot(int supplierId, int isHot = 1, int status = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"isHot", isHot},
                {"status", status},
            };
            return await _callApi.GetResponseDataAsync<M_News>("News/getListNewsKnowledgeIsHot", dictPars);
        }
    }
}
