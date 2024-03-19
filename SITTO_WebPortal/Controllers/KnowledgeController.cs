using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using SITTO_WebPortal.ExtensionMethods;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
using SITTO_WebPortal.ViewModels;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using static System.String;

namespace SITTO_WebPortal.Controllers
{
    public class KnowledgeController : BaseController<KnowledgeController>
    {
        private readonly IS_News _s_News;
        private readonly IS_NewsCategory _s_NewsCategory;
        private readonly IS_SchemaJson _s_Schema;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private const int RECORD_NEWS = 8;
        private const int page = 1;

        public KnowledgeController(IS_News news, IS_NewsCategory newsCategory, IS_SchemaJson schema, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_News = news;
            _s_NewsCategory = newsCategory;
            _s_Schema = schema;
            _metaSEO = metaSEO;
        }

        public async Task<ActionResult> Index()
        {
            var breadCrumb = new VM_BreadCrumb();
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Knowledge);
            breadCrumb.currentName = "Trung tâm kiến thức";
            ViewBag.BreadCrumb = breadCrumb;

            await Task.WhenAll(GetListNewsKnowledgeIsHot(), GetListNewAndProduct()) ;
            return View();
        }

        public async Task<ActionResult> GetListNewsKnowledgeIsHot()
        {
            var res = await _s_News.getListNewsKnowledgeIsHot(CommonConstants.TYPE_KNOWLEDGE_CATEGORY);
            ViewBag.KnowledgeIshot = res.data ?? new M_News();
            return View();
        }
        public async Task<ActionResult> GetListNewAndProduct()
        {
            var res = await _s_News.getListNewAndProduct();
            if(res.result != null && res.data != null)
            {
                if(res.data.knowledgeObjs.Any())
                {
                    res.data.knowledgeObjs = res.data.knowledgeObjs.OrderByDescending(x => x.createdAt)
                        //.Take(4)
                        .ToList();
                }
            }
            ViewBag.NewAndProduct = res.data ?? new M_NewAndProduct();
            return View();
        }
        public async Task<JsonResult> GetListNewsCategoryKnowledgeCategory(int typeId = 4)
        {
            var res = await _s_NewsCategory.getListKnowledgeCategory(typeId);
            if (res.data != null && res.result == 1)
            {
                return Json(new M_JResult()
                {
                    data = res.data?.OrderBy(or => or.reOrder).ToList(),
                    result = res.result,
                    error = res.error
                });
            }
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetListNewsCategoryBySupplierIdSequenceStatusParentId(int parentId = 11)
        {
            var res = await _s_NewsCategory.getListNewsCategoryBySupplierIdSequenceStatusParentId(int.Parse(_supplierId), "1", parentId);
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetListNewsByNewsCategoryIdType(int typeId = 1, int? id = 12, int isHot = 1)
        {
            var res = await _s_News.getListNewsByNewsCategoryIdType(typeId, id, isHot);
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetListNewsIsHotByNewsCategoryIdType(int typeId = 1, int? id = 0, int isHot = 1)
        {
            var res = await _s_News.getListNewsByNewsCategoryIdType(typeId, id, isHot);
            return Json(new M_JResult(res));
        }

        #region All
        public async Task<ActionResult> IndexAll(string metaUrl)
        {

            //ViewBag.Lv1 = c1;
            //ViewBag.Lv2 = c2;
            ViewBag.Page = page;
            ViewBag.Record = RECORD_NEWS;

            string metaTitle = Empty;
            string metaDescription = Empty;
            string metaKeyword = Empty;
            string metaImage = Empty;

            //Breadcrumb
            string nameLv1 = Empty;
            string idLv1 = Empty;
            string nameLv2 = Empty;
            string idLv2 = Empty;
            var breadCrumb = new VM_BreadCrumb();

            var res = await _s_NewsCategory.getNewsCategoryByMetaUrl(metaUrl);
            if (res.result == 1 && res.data != null)
            {
                var resListCategoryLv2 = await _s_NewsCategory.getListNewsCategoryBySupplierIdParentId(int.Parse(_supplierId), res.data?.id);
                ViewBag.CategoryId = res.data.id;
                if (resListCategoryLv2.result == 1)
                {
                    ViewBag.ListCategory = resListCategoryLv2.data;
                }
            }
            if(res.data.parentObj?.id != null && res.data.parentObj?.id > 0 ) 
            {
                breadCrumb.lv1Name = "Trung tâm kiến thức";
                breadCrumb.lv1Url = $"/kien-thuc";
                breadCrumb.lv2Name = res.data.parentObj?.name;
                breadCrumb.lv2Url = $"/danh-sach-kien-thuc/{res.data.parentObj?.metaUrl}";
                breadCrumb.currentName = res.data.name;
            }
            else if (res.data.parentObj?.id == null && res.data.id > 0)
            {
                breadCrumb.lv1Name = "Trung tâm kiến thức";
                breadCrumb.lv1Url = $"/kien-thuc";
                breadCrumb.currentName = res.data.name;
            }
            //Cap 2
            //if (c2.HasValue)
            //{
            //    var res = await _s_NewsCategory.getNewsCategoryById(c2 ?? 0);
            //    if (res.result == 1 && res.data != null)
            //    {
            //        var resData = await _s_NewsCategory.getListNewsCategoryBySupplierIdParentId(int.Parse(_supplierId), c2);
            //        if (resData.result == 1 && res.data != null)
            //        {
            //            ViewBag.ListCategory = resData.data;

            //        }
            //        breadCrumb.lv1Name = "Trung tâm kiến thức";
            //        breadCrumb.lv1Url = $"kien-thuc";
            //        var resLv1 = await _s_NewsCategory.getNewsCategoryById(c1);
            //        if (resLv1.result == 1 && resLv1.data != null)
            //        {
            //            var resLv2 = await _s_NewsCategory.getNewsCategoryById(c2 ?? 0);
            //            if (resLv2.result == 1 && resLv2.data != null)
            //            {
            //                breadCrumb.lv2Name = resLv1.data.name;
            //                breadCrumb.lv2Url = $"danh-sach-kien-thuc?c1={c1}";
            //                breadCrumb.currentName = resLv2.data.name;
            //            }

            //        }
            //        ViewBag.CategoryName = res.data.name;
            //        metaTitle = res.data.name;
            //        metaDescription = res.data.name;
            //        metaKeyword = res.data.name;
            //        metaImage = res.data.imageObj?.mediumUrl;
            //    }
            //}
            //else
            //{
            //    var res = await _s_NewsCategory.getNewsCategoryById(c1);
            //    if (res.result == 1 && res.data != null)
            //    {
            //        var resData = await _s_NewsCategory.getListNewsCategoryBySupplierIdParentId(int.Parse(_supplierId), c1);
            //        if (resData.result == 1 && res.data != null)
            //        {
            //            ViewBag.ListCategory = resData.data;

            //        }
            //        breadCrumb.lv1Name = "Trung tâm kiến thức";
            //        breadCrumb.lv1Url = $"kien-thuc";
            //        breadCrumb.currentName = res.data.name;
            //        ViewBag.CategoryName = res.data.name;
            //        metaTitle = res.data.name;
            //        metaDescription = res.data.name;
            //        metaKeyword = res.data.name;
            //        metaImage = res.data.imageObj?.mediumUrl;
            //    }
            //}
            ViewBag.BreadCrumb = breadCrumb;
            /* ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Introduce);*/
            return View();
        }

        public async Task<JsonResult> GetListNewsByCategoryId(int? c1, int? c2, int record = 12, int page = 1)
        {
            int? c = 0;

            if (c2 > 0)
            {
                c = c2;
            }
            else
            {
                c = c1;
            }

            var res = await _s_News.getListNewsByCategoryId(int.Parse(_supplierId), c, page, record);

            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetListNewsByCategoryIdCate(int? c, int record = 12, int page = 1)
        {
            var res = await _s_News.getListNewsByCategoryId(int.Parse(_supplierId), c, page, record);
            return Json(new M_JResult(res));
        }

        public async Task<IActionResult> ViewDetail(string metaUrl)
        {
          
            var res = await _s_News.getNewsByMetaUrl(metaUrl);
            if(res.result != 1 || res.data == null)
                return Redirect($"/error/{res.error.code}");
            //Breadcrumb
            string nameLv1 = Empty;
            string idLv1 = Empty;
            string nameLv2 = Empty;
            string idLv2 = Empty;
            var breadCrumb = new VM_BreadCrumb();
            if (res.data?.categoryObj?.parentObj?.id != null && res.data?.categoryObj?.parentObj?.id > 0)
            {
                breadCrumb.lv1Name = "Trung tâm kiến thức";
                breadCrumb.lv1Url = $"/kien-thuc";
                breadCrumb.lv2Name = res.data.categoryObj?.parentObj?.name;
                breadCrumb.lv2Url = $"/danh-sach-kien-thuc/{res.data.categoryObj?.parentObj?.metaUrl}";
                breadCrumb.lv3Name = res.data.categoryObj?.name;
                breadCrumb.lv3Url = $"/danh-sach-kien-thuc/{res.data.categoryObj?.metaUrl}";
                breadCrumb.currentName = res.data.title;
            }
            else if (res.data?.categoryObj?.parentObj?.id == null && res.data?.categoryObj?.id > 0)
            {
                breadCrumb.lv1Name = "Trung tâm kiến thức";
                breadCrumb.lv1Url = $"/kien-thuc";
                breadCrumb.lv2Name = res.data.categoryObj?.name;
                breadCrumb.lv2Url = $"/danh-sach-kien-thuc/{res.data.categoryObj?.metaUrl}";
                breadCrumb.currentName = res.data.title;
            }
            else
            {
                breadCrumb.lv1Name = "Trung tâm kiến thức";
                breadCrumb.lv1Url = $"/kien-thuc";
                breadCrumb.currentName = res.data.title;
            }
            if (res.data != null)
            {
                var stringSchemaStarHtml = "";

                stringSchemaStarHtml += $"  {{\r\n            \"@context\": \"https://schema.org\",\r\n                \"@type\": \"QAPage\",\r\n                    \"mainEntity\": {{\r\n                \"@type\": \"Question\",\r\n                            \"starCount\": {res.data?.star},\r\n                                \"upvoteCount\": {res.data?.countFeedback},\r\n            }}\r\n        }}";

                var scriptSchemaStar = $"<script type=\"application/ld+json\">{stringSchemaStarHtml}</script>";
                ViewBag.SchemaKnowStar = scriptSchemaStar;
            }
            //var resSchema = await _s_Schema.getListSchemaJsonBySequenceStatusTargetIdTargetTable(res.data?.id, CommonConstants.SCHEMAJSON_PRODUCT);
            //if (resSchema.data != null && resSchema.data.Any())
            //{
            //    var stringSchemaHtml = "";
            //    foreach (var item in resSchema.data)
            //    {
            //        stringSchemaHtml += $" {{\r\n\"@context\": \"https://schema.org\",\r\n\"@type\": \"FAQPage\",\r\n\"mainEntity\": [{{\r\n\"@type\": \"Question\",\r\n                \"name\": \"{item.title}\",\r\n                \"acceptedAnswer\": {{\r\n                    \"@type\":\r\n                        \"Answer\",\r\n\"text\": \"{item.contents}\"\r\n                }}\r\n            }}]\r\n        }}";
            //    }
            //    var scriptSchema = $"<script type=\"application/ld+json\">{stringSchemaHtml}</script>";
            //    ViewBag.Schema = scriptSchema;
            //}
            //if (res.data.categoryObj.parentId.HasValue)
            //{
            //    var resdata = await _s_NewsCategory.getNewsCategoryById(res.data?.categoryObj?.id ?? 0);
            //    if (resdata.result == 1 && resdata.data != null)
            //    {
            //        var resData = await _s_NewsCategory.getListNewsCategoryBySupplierIdParentId(int.Parse(_supplierId), res.data.categoryObj?.parentObj?.id);
            //        if (resData.result == 1 && resData.data != null)
            //        {
            //            ViewBag.ListCategory = resData.data;

            //        }
            //        breadCrumb.lv1Name = "Trung tâm kiến thức";
            //        breadCrumb.lv1Url = $"kien-thuc";
            //        var resLv1 = await _s_NewsCategory.getNewsCategoryById(res.data.categoryObj?.parentObj?.id ?? 0);
            //        if (resLv1.result == 1 && resLv1.data != null)
            //        {
            //            var resLv2 = await _s_NewsCategory.getNewsCategoryById(res.data?.categoryObj?.id ?? 0);
            //            if (resLv2.result == 1 && resLv2.data != null)
            //            {
            //                breadCrumb.lv1Name = resLv1.data.name;
            //                breadCrumb.lv1Url = $"danh-sach-kien-thuc?c1={res.data.categoryObj?.parentObj?.id}";
            //                breadCrumb.lv2Name = resLv2.data.name;
            //                breadCrumb.lv2Url = $"danh-sach-kien-thuc?c1={res.data.categoryObj?.parentObj?.id}&c2={res.data?.categoryObj?.id}";
            //                breadCrumb.currentName = res.data?.title;
            //            }

            //        }
            //    }
            //}

            ViewBag.BreadCrumb = breadCrumb;
            if (res.data2nd !=null)
            {
                ViewBag.ListNewsRelates = res.data2nd?.ToObject<List<M_News>>();
            }

            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
            {
                Keywords = res.data.title,
                Title = res.data.title,
                Description = res.data.description,
                Image = res.data.imageObj?.mediumUrl,
            });
            

            return PartialView(res.data);
        }
        #endregion
    }
}