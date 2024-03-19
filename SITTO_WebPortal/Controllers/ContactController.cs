using SITTO_WebPortal.ExtensionMethods;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using SITTO_WebPortal.ViewModels;

namespace SITTO_WebPortal.Controllers
{
   
    public class ContactController : BaseController<ContactController>
    {
        private readonly IS_Contact _s_Contact;
        private readonly IConfiguration _configuration;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public ContactController(IS_Contact contact, IConfiguration configuration, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Contact = contact;
            _configuration = configuration;
            _metaSEO = metaSEO;
        }

        public IActionResult Index()
        {
            var breadCrumb = new VM_BreadCrumb();
            breadCrumb.currentName = "Hỗ trợ khách hàng ";
            ViewBag.BreadCrumb = breadCrumb;
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Contact);
            ViewData["KeyGoogleMap"] = _configuration.GetValue<string>("KeyGoogleMap");
            return View();
        }
        [HttpPost, ValidateAntiForgeryToken]
        public async Task<JsonResult> SubmitContact(EM_Contact model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            model.contactTypeId = CommonConstants.CONTACT_TYPE_ID;
            model.supplierId = int.Parse(_supplierId);
            var res = await _s_Contact.Create<M_Contact>(model);
            return Json(jResult.MapData(res));
        }

        [HttpPost]
        public async Task<JsonResult> SubmitChatBot(EM_ContactVirtualAssistant model)
        {
            model.contactTypeId = CommonConstants.CHATBOT_TYPE_ID;
            model.supplierId = int.Parse(_supplierId);
            var res = await _s_Contact.CreateVirtualAssistant(model);
            return Json(res);
        }
    }
}
