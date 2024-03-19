using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SITTO_WebPortal.ExtensionMethods;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
using SITTO_WebPortal.ViewModels;


namespace SITTO_WebPortal.Controllers
{
    public class InfoController : BaseController<InfoController>
    {
        private readonly IS_Banner _s_Banner;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public InfoController(IS_Banner banner, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Banner = banner;
            _metaSEO = metaSEO;
        }

        public async Task<ActionResult> Index()
        {
            var breadCrumb = new VM_BreadCrumb();
            breadCrumb.lv1Name = "Về chúng tôi";
            breadCrumb.lv1Url = $"/ve-chung-toi";
            breadCrumb.currentName = "Thông tin công ty";
            ViewBag.BreadCrumb = breadCrumb;
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Info);
            await Task.WhenAll(GetBannerAboutTop(), GetBannerAboutMid(), GetBannerAboutBottom());
            return View();
        }
        private async Task<ActionResult> GetBannerAboutTop()
        {
            var res = await _s_Banner.getListBannerByStatusSupplierIdLocationIdPageName(int.Parse(_supplierId), 1, "about");
            ViewBag.AboutBannerTop = res.data ?? new List<M_Banner>();
            return View();
        }
        private async Task<ActionResult> GetBannerAboutMid()
        {
            var res = await _s_Banner.getListBannerByStatusSupplierIdLocationIdPageName(int.Parse(_supplierId), 2, "about");
            ViewBag.AboutBannerMid = res.data ?? new List<M_Banner>();
            return View();
        }
        private async Task<ActionResult> GetBannerAboutBottom()
        {
            var res = await _s_Banner.getListBannerByStatusSupplierIdLocationIdPageName(int.Parse(_supplierId), 3, "about");
            ViewBag.AboutBannerBottom = res.data ?? new List<M_Banner>();
            return View();
        }
    }
}
