using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Services
{
    public interface IS_SchemaJson
    {
        Task<ResponseData<List<M_SchemaJson>>> getListSchemaJsonBySequenceStatusTargetIdTargetTable(int? targetId, string targetTable, string sequenceStatus = "1");
    }
    public class S_SchemaJson : IS_SchemaJson
    {
        private readonly ICallBaseApi _callApi;
        public S_SchemaJson(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_SchemaJson>>> getListSchemaJsonBySequenceStatusTargetIdTargetTable(int? targetId, string targetTable, string sequenceStatus = "1")
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"targetId", targetId},
                {"targetTable", targetTable},
            };
            return await _callApi.GetResponseDataAsync<List<M_SchemaJson>>("SchemaJson/getListSchemaJsonBySequenceStatusTargetIdTargetTable", dictPars);
        }
    }
}
