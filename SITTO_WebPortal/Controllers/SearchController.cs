using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SITTO_WebPortal.ExtensionMethods;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
using SITTO_WebPortal.ViewModels;

namespace SITTO_WebPortal.Controllers
{
    public class SearchController : BaseController<SearchController>
    {
        private readonly IS_Product _s_Product;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public SearchController(IS_Product product, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Product = product;
            _metaSEO = metaSEO;
        }

        public async Task<IActionResult> Index(string keyword)
        {
            var breadCrumb = new VM_BreadCrumb();
            breadCrumb.currentName = "Tìm kiếm";
            var res = await _s_Product.searchListProductAndNewsByKeyword(keyword);
            ViewBag.BreadCrumb = breadCrumb;
            ViewBag.Keywork = keyword;
            ViewBag.DataProducts = res.data.productObjs;
            ViewBag.DataNews = res.data.newsObjs;
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Search);
            return View();
        }
        public async Task<JsonResult> SearchListProductAndNewsByKeyword(string keyword)
        {
            var res = await _s_Product.searchListProductAndNewsByKeyword(keyword);
            return Json(res);
        }
    }
}
