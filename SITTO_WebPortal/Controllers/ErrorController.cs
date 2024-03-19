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
    public class ErrorController : BaseController<ErrorController>
    {
        private static List<int> listStatusCode = new List<int> { 400, 404, 408, 500, 503 };
        public IActionResult Index(int statusCode)
        {
            if (listStatusCode.Contains(statusCode))
            {
                if (statusCode == 408)
                {
                    TempData["Timeout"] = "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.";
                    return Redirect("/account/signout");
                }
                return View($"~/Views/Error/{statusCode}.cshtml");
            }
            return View("~/Views/Error/404.cshtml");
        }
    }
}
