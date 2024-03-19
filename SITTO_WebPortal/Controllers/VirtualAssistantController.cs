using SITTO_WebPortal.ExtensionMethods;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace SITTO_WebPortal.Controllers 
{
    public class VirtualAssistantController : BaseController<VirtualAssistantController>
    {
        private readonly IS_VirtualAssistant _s_VirtualAssistant;
        private readonly IS_VirtualAssistantUrl _s_VirtualAssistantUrl;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public VirtualAssistantController(IS_VirtualAssistant virtualAssistant, IS_VirtualAssistantUrl virtualAssistantUrl, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_VirtualAssistant = virtualAssistant;
            _s_VirtualAssistantUrl = virtualAssistantUrl;
            _metaSEO = metaSEO;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> GetListVirtualAssistantByParentIdStatus(int? parentId = 0)
        {
            var res = await _s_VirtualAssistant.getListVirtualAssistantByParentIdStatus(parentId);
            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetListVirtualAssistantUrlByStatusVirtualAssistantId(int? virtualAssistantId)
        {
            var res = await _s_VirtualAssistantUrl.getListVirtualAssistantUrlByStatusVirtualAssistantId(virtualAssistantId);
            return Json(new M_JResult(res));
        }
    }
}
