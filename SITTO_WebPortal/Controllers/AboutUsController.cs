using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SITTO_WebPortal.ExtensionMethods;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
using SITTO_WebPortal.ViewModels;
using static System.String;

namespace SITTO_WebPortal.Controllers
{
    public class AboutUsController : BaseController<AboutUsController>
    {
        private readonly IS_News _s_News;
        private readonly IS_NewsCategory _s_NewsCategory;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public AboutUsController(IS_News news, IS_NewsCategory newsCategory, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_News = news;
            _s_NewsCategory = newsCategory;
            _metaSEO = metaSEO;
        }

        public async Task<ActionResult> Index(string metaCategoryUrl, int typeId = 1, int page = 1, int record = 6)
        {

            ViewBag.record = record;
            ViewBag.page = page;
            ViewBag.type = typeId;
            string categoryTitle = Empty;
            if (!IsNullOrEmpty(metaCategoryUrl))
            {
                var res = await _s_NewsCategory.getNewsCategoryByMetaUrl(metaCategoryUrl);
                if (res.result == 1 && res.data != null)
                {
                    ViewBag.categoryId = res.data.id;
                    ViewBag.categoryTitle = res.data.name;
                    categoryTitle = res.data.name;

                    ViewBag.categoryId = res.data.id;

                }
            }
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.AboutUs);
            //ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new ViewModels.VM_ViewDataSEO
            //{
            //    Keywords = IsNullOrEmpty(categoryTitle) ? "Về chúng tôi" : categoryTitle,
            //    Title = IsNullOrEmpty(categoryTitle) ? "Về chúng tôi" : categoryTitle,
            //    Description = IsNullOrEmpty(categoryTitle) ? "Về chúng tôi" : categoryTitle,
            //});
            await Task.WhenAll(getAboutCategory());
            return View();
        }
        public async Task<JsonResult> GetListAbout(int typeId = 1, int recordNumber = 20, int page = 1)
        {
            var res = await _s_News.getListNewsDropdownByTypeId(typeId, recordNumber, page);
            return Json(new M_JResult(res));
        }
        public async Task<ActionResult> getAboutCategory()
        {
            var typeId = 1;
            var res = await _s_AboutCategory.getListAboutCategory(typeId);
            ViewBag.ListAboutCate = res.data ?? new List<M_NewCategory>();
            return View();
        }
        public async Task<ActionResult> getListNewsByCategoryId(int? id, int record = 12, int page = 1)
        {
            var res = await _s_News.getListNewsByCategoryId(int.Parse(_supplierId), id, page, record);
            ViewBag.ListAbout = res.data ?? new List<M_News>();
            return View();
        }

        public async Task<ActionResult> ViewDetail(string metaUrl)
        {
            //Breadcrumb
            string nameLv1 = Empty;
            string idLv1 = Empty;
            string nameLv2 = Empty;
            string idLv2 = Empty;
            var breadCrumb = new VM_BreadCrumb();
            var res = await _s_News.getNewsByMetaUrl(metaUrl);
            if(res.data != null)
            {
                ViewBag.Data = res.data;
            }
            if(res.data?.categoryObj?.id != null && res.data.categoryObj?.id > 0 )
            {
                breadCrumb.lv1Name = "Về chúng tôi";
                breadCrumb.lv1Url = $"/ve-chung-toi";
                breadCrumb.lv2Name = res.data.categoryObj?.name;
                breadCrumb.lv2Url = $"/ve-chung-toi/{res.data.categoryObj?.metaUrl}";
                breadCrumb.currentName = res.data.title;
            }
            if (res.data != null)
            {
                var stringSchemaStarHtml = "";

                stringSchemaStarHtml += $"  {{\r\n            \"@context\": \"https://schema.org\",\r\n                \"@type\": \"QAPage\",\r\n                    \"mainEntity\": {{\r\n                \"@type\": \"Question\",\r\n                            \"starCount\": {res.data?.star},\r\n                                \"upvoteCount\": {res.data?.countFeedback},\r\n            }}\r\n        }}";

                var scriptSchemaStar = $"<script type=\"application/ld+json\">{stringSchemaStarHtml}</script>";
                ViewBag.SchemaKnowStar = scriptSchemaStar;
            }
            if (res.result != 1 || res.data == null)
                return Redirect($"/error/{res.error.code}");
            await Task.WhenAll(getListNewsByCategoryId(res.data.categoryObj?.id));
            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
            {
                Keywords = res.data.title,
                Title = res.data.title,
                Description = res.data.description,
                Image = res.data.imageObj?.mediumUrl,
            });
            ViewBag.BreadCrumb = breadCrumb;
            return View();
        }
      
        public async Task<JsonResult> GetListNewsByCategoryIdType(int? c, int typeId = 1, int record = 12, int page = 1)
        {
            ResponseData<List<M_News>> res = new ResponseData<List<M_News>>();

            if (!string.IsNullOrEmpty(c?.ToString()))
            {
                res = await _s_News.getListNewsByCategoryId(int.Parse(_supplierId), c, page, record);
            }
            else if (!c.HasValue)
            {
                res = await _s_News.getListNewsDropdownByTypeId(typeId, record, page);
               
            }

            return Json(new M_JResult(res));
        }


    }
}
