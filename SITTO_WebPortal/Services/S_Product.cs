using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Hosting;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace SITTO_WebPortal.Services
{
    public interface IS_Product
    {
        Task<ResponseData<List<M_Product>>> getListProducts(string sequenceStatus);
        Task<ResponseData<List<M_Product>>> getListProductByCatId(int? categoryId, int recordNumber = 10, int page = 1);
        Task<ResponseData<List<M_Product>>> getListProductSequenceStatusByTypeId(string sequenceStatus, int? typeId, string parentId);
        Task<ResponseData<List<M_Product>>> getListProductByCategoryIdSecond(int? type, int? categoryId);
        Task<ResponseData<List<M_Product>>> getListProductByCategoryId(int? categoryId, int isHot, int recordNumber = 10, int page = 1);
        Task<ResponseData<M_Product>> getProductById(int? id);
        Task<ResponseData<M_SearchNewAndProduct>> searchListProductAndNewsByKeyword(string keyword);
        Task<ResponseData<List<M_Product>>> getListProductByCategoryIdPagination(string categoryId, int recordNumber, int page);
        Task<ResponseData<M_Product>> getProductByMetaUrl(string metaUrl);

    }
    public class S_Product : IS_Product
    {
        private readonly ICallBaseApi _callApi;
        public S_Product(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_Product>>> getListProducts(string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductSequenceStatus", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListProductByCatId(int? categoryId, int recordNumber = 10, int page = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"categoryId", categoryId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductSequenceStatus", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListProductSequenceStatusByTypeId(string sequenceStatus, int? typeId, string parentId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"typeId", typeId},
                {"parentId", parentId},
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductSequenceStatusByTypeId", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListProductByCategoryIdSecond(int? type, int? categoryId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"type", type},
                {"isHot", "-2"}, //bỏ qua điều kiện nổi bật
                {"orderBy", "createdat"}, //bỏ qua điều kiện nổi bật
                {"desc", "true"},
                {"categoryId", categoryId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductByCategoryIdSecond", dictPars);
        }
        public async Task<ResponseData<M_Product>> getProductById(int? id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_Product>("Product/getProductById", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListProductByCategoryId(int? categoryId, int isHot, int recordNumber = 10, int page = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"categoryId", categoryId},
                {"page", page},
                {"recordNumber", recordNumber},
                {"isHot", isHot},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductByCategoryId", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListProductByCategoryIdPagination(string categoryId, int recordNumber, int page)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"categoryId", categoryId},
                {"page", page},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductByCategoryIdPagination", dictPars);
        }
        public async Task<ResponseData<M_SearchNewAndProduct>> searchListProductAndNewsByKeyword(string keyword)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"keyword", keyword},
            };
            return await _callApi.GetResponseDataAsync<M_SearchNewAndProduct>("Product/SearchListProductAndNewsByKeyword", dictPars);
        }
        public async Task<ResponseData<M_Product>> getProductByMetaUrl(string metaUrl)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"metaUrl", metaUrl},
            };
            return await _callApi.GetResponseDataAsync<M_Product>("Product/getProductByMetaUrl", dictPars);
        }
       
    }
}
