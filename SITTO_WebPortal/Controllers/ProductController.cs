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
    public class ProductController : BaseController<ProductController>
    {
        private readonly IS_Category _s_Category;
        private readonly IS_Product _s_Product;
        private readonly IS_SchemaJson _s_Schema;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private const int RECORD_NEWS = 10;
        private const int page = 1;

        public ProductController(IS_Category category, IS_Product product, IS_SchemaJson schema, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Category = category;
            _s_Product = product;
            _s_Schema = schema;
            _metaSEO = metaSEO;
        }

        public async Task<ActionResult> Index()
        {
            var breadCrumb = new VM_BreadCrumb();
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Product);
            breadCrumb.currentName = "Sản phẩm";
            ViewBag.BreadCrumb = breadCrumb;
            return View();
        }

        //public async Task<JsonResult> GetListProductCategory()
        //{
        //    var res = await _s_Category.getListCatMenu(int.Parse(_supplierId), "1");
        //    if (res.result == 1 && res.data.Any())
        //    {
        //        var sortedData = res.data.OrderBy(or => or.reOrder).ToList();
        //        return Json(new M_JResult()
        //        {
        //            data = sortedData,
        //            result = res.result,
        //            error = res.error
        //        });
        //    }
        //    return Json(new M_JResult(res));
        //}
        public async Task<JsonResult> GetListProductCategory()
        {
            var res = await _s_Category.getListCatMenu(int.Parse(_supplierId), "1");
            if (res.result == 1 && res.data.Any())
            {
                return Json(new M_JResult()
                {
                    data = res.data.OrderBy(or => or.reOrder).ToList(),
                    result = res.result,
                    error = res.error
                });
            }
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetListProductByCategoryIdSecond(int typeId = 1, int? id = 41)
        {
            //type: 1 //load theo id cấp 1 (parent 0)
            //type: 2 //Load theo id cấp 2 (tức parent khác 0)
            //type: 3 /Load theo cấp 3 đối với  (id parent = 42 thủy sản)
            var res = await _s_Product.getListProductByCategoryIdSecond(typeId, id);
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetListCategoryBySupplierIdParentId(int? parentId = 41)
        {
            var res = await _s_Category.getListCategoryBySupplierIdParentId(int.Parse(_supplierId), parentId);
            return Json(new M_JResult(res));
        }
        #region All Product
        public async Task<ActionResult> IndexAll(string metaUrl)
        {

            string metaTitle = Empty;
            string metaDescription = Empty;
            string metaKeyword = Empty;
            string metaImage = Empty;

            ViewBag.Page = page;
            ViewBag.Record = RECORD_NEWS;


            //Breadcrumb
            string nameLv1 = Empty;
            string idLv1 = Empty;
            string nameLv2 = Empty;
            string idLv2 = Empty;
            string nameLv3 = Empty;
            string idLv3 = Empty;
            var breadCrumb = new VM_BreadCrumb();


            var res = await _s_Category.getCategoryBreadcrumbByMetaUrl(metaUrl);
            if (res.result == 1 && res.data != null)
            {
                if (res.data.id == CommonConstants.PRODUCT_SEAFOOD)
                { //Tahy API get full c
                    var resListCategoryLv3 = await _s_Category.getListCategoryById(int.Parse(_supplierId), res.data?.id);
                    ViewBag.CategoryId = res.data.id;
                    if (resListCategoryLv3.result == 1 && resListCategoryLv3.data.Any())
                    {
                        ViewBag.ListCategory = resListCategoryLv3.data?.OrderBy(or => or.reOrder).ToList();
                    }
                }
                else
                {
                    var resListCategoryLv2 = await _s_Category.getListCategoryBySupplierIdParentId(int.Parse(_supplierId), res.data?.id);
                    ViewBag.CategoryId = res.data.id;
                    if (resListCategoryLv2.result == 1 /*&& resListCategoryLv2.data.Any()*/)
                    {
                        ViewBag.ListCategory = resListCategoryLv2.data?.OrderBy(or => or.reOrder).ToList();
                        //ViewBag.ListCategory = resListCategoryLv2.data;
                    }
                }
            }
            //Cap 3
            if (res.data.parentObj?.parentObj?.id != null && res.data.parentObj?.parentObj?.id > 0)
            {
                breadCrumb.lv1Name = "Sản phẩm";
                breadCrumb.lv1Url = $"/san-pham";
                breadCrumb.lv2Name = res.data.parentObj?.parentObj?.name;
                breadCrumb.lv2Url = $"/danh-sach-san-pham/{res.data.parentObj?.parentObj?.metaUrl}";
                breadCrumb.lv3Name = res.data.parentObj?.name;
                breadCrumb.lv3Url = $"/danh-sach-san-pham/{res.data.parentObj?.metaUrl}";
                breadCrumb.currentName = res.data.name;
            }
            else if (res.data.parentObj?.parentObj?.id == null && res.data.parentObj?.id > 0)
            {
                breadCrumb.lv1Name = "Sản phẩm";
                breadCrumb.lv1Url = $"/san-pham";
                breadCrumb.lv2Name = res.data.parentObj?.name;
                breadCrumb.lv2Url = $"/danh-sach-san-pham/{res.data.parentObj?.metaUrl}";
                breadCrumb.currentName = res.data.name;
            }
            else
            {
                breadCrumb.lv1Name = "Sản phẩm";
                breadCrumb.lv1Url = $"/san-pham";
                breadCrumb.currentName = res.data.name;
            }
            //
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Product);
            breadCrumb.currentName = "Sản phẩm";
            ViewBag.BreadCrumb = breadCrumb;
            return View();
        }

        public async Task<JsonResult> GetListProductByCategoryIdPagination(string sequenceCategoryId, int recordNumber, int page = 1)
        {
            var res = await _s_Product.getListProductByCategoryIdPagination(sequenceCategoryId, recordNumber, page);
            return Json(new M_JResult(res));
        }
        #endregion
        public async Task<IActionResult> ViewDetail(string metaUrl)
        {
            await Task.WhenAll(GetListProductByCategoryIdIshot(), GetListProductByCategoryIdIshots());

            var res = await _s_Product.getProductByMetaUrl(metaUrl);
            if (res.result != 1 || res.data == null)
            {
                return Redirect($"/error/{res.error.code}");
            }
            var categoryLv2 = await _s_Category.getListCategoryBySupplierIdParentId(int.Parse(_supplierId), res.data.categoryObj?.parentId);
            if (res.data2nd != null)
            {
                ViewBag.ListProductRelated = res.data2nd?.productRelatedObjs?.ToObject<List<M_Product>>();
            }
            var listCategory = await _s_Category.getListCategoryBySupplierIdParentId(int.Parse(_supplierId), res.data.categoryTypeId);
            if (listCategory.data != null)
            {
                ViewBag.ListCat = listCategory.data ?? new List<M_Category>();
            }
            var resSchema = await _s_Schema.getListSchemaJsonBySequenceStatusTargetIdTargetTable(res.data?.id, CommonConstants.SCHEMAJSON_PRODUCT);
            if (resSchema.data != null && resSchema.data.Any())
            {
                var stringSchemaHtml = "";
                foreach (var item in resSchema.data)
                {
                    stringSchemaHtml += $" {{\r\n\"@context\": \"https://schema.org\",\r\n\"@type\": \"FAQPage\",\r\n\"mainEntity\": [{{\r\n\"@type\": \"Question\",\r\n                \"name\": \"{item.title}\",\r\n                \"acceptedAnswer\": {{\r\n                    \"@type\":\r\n                        \"Answer\",\r\n\"text\": \"{item.contents}\"\r\n                }}\r\n            }}]\r\n        }}";
                }
                var scriptSchema = $"<script type=\"application/ld+json\">{stringSchemaHtml}</script>";
                ViewBag.Schema = scriptSchema;
            }
            if (res.data != null)
            {
                var stringSchemaStarHtml = $@"{{
                    ""@context"": ""https://schema.org"",
                    ""@type"": ""QAPage"",
                    ""mainEntity"": {{
                        ""@type"": ""Question"",
                        ""starCount"": {res.data?.star},
                        ""upvoteCount"": {res.data?.countFeedback}
                    }}
                }}";

                var scriptSchemaStar = $"<script type=\"application/ld+json\">{stringSchemaStarHtml}</script>";
                ViewBag.SchemaStar = scriptSchemaStar;
            }
            //if (res.data != null)
            //{
            //    var stringSchemaStarHtml = $@"{{
            //        ""@context"": ""https://schema.org"",
            //        ""@type"": ""QAPage"",
            //        ""mainEntity"": {{
            //            ""starCount"": {res.data?.star},
            //            ""upvoteCount"": {res.data?.countFeedback}
            //        }}
            //    }}";

            //    var scriptSchemaStar = $"<script type=\"application/ld+json\">{stringSchemaStarHtml}</script>";
            //    ViewBag.SchemaStar = scriptSchemaStar;
            //}
            //if (res.data != null)
            //{
            //    var stringSchemaStarHtml = "";

            //    stringSchemaStarHtml += $"  {{\r\n            \"@context\": \"https://schema.org\",\r\n                \"@type\": \"QAPage\",\r\n                    \"mainEntity\": {{\r\n                \"@type\": \"Question\",\r\n                            \"starCount\": {res.data?.star},\r\n                                \"upvoteCount\": {res.data?.countFeedback},\r\n            }}\r\n        }}";

            //    var scriptSchemaStar = $"<script type=\"application/ld+json\">{stringSchemaStarHtml}</script>";
            //    ViewBag.SchemaStar = scriptSchemaStar;
            //}


            //Breadcrumb
            string nameLv1 = Empty;
            string idLv1 = Empty;
            string nameLv2 = Empty;
            string idLv2 = Empty;
            string nameLv3 = Empty;
            string idLv3 = Empty;
            var breadCrumb = new VM_BreadCrumb();

            if (res.data.categoryObj?.parentObj?.parentId != null && res.data.categoryObj?.parentObj?.parentId > 0)
            {
                var resSp3 = await _s_Category.getCategoryById(res.data.categoryObj?.parentObj?.parentId);
                if (resSp3.result == 1 && resSp3.data != null)
                {
                    breadCrumb.lv1Name = "Sản phẩm";
                    breadCrumb.lv1Url = $"/san-pham";
                    breadCrumb.lv2Name = resSp3.data.name;
                    breadCrumb.lv2Url = $"/danh-sach-san-pham/{res.data.metaUrl}";
                    breadCrumb.lv3Name = res.data.categoryObj?.parentObj?.name;
                    breadCrumb.lv3Url = $"/danh-sach-san-pham/{res.data.categoryObj?.parentObj?.metaUrl}";
                    breadCrumb.lv4Name = res.data.categoryObj?.name;
                    breadCrumb.lv4Url = $"/danh-sach-san-pham/{res.data.categoryObj?.metaUrl}";
                    breadCrumb.currentName = res.data.name;
                }
            }
            else if (res.data.categoryObj?.parentObj?.parentId == null && res.data.categoryObj?.parentObj?.id > 0)
            {
                var resSp3 = await _s_Category.getCategoryById(res.data.categoryObj?.parentObj?.parentId);
                if (resSp3.result == 1 && resSp3.data != null)
                {
                    breadCrumb.lv1Name = "Sản phẩm";
                    breadCrumb.lv1Url = $"/san-pham";
                    breadCrumb.lv2Name = resSp3.data.name;
                    breadCrumb.lv2Url = $"/danh-sach-san-pham/{res.data.metaUrl}";
                    breadCrumb.lv3Name = res.data.categoryObj?.parentObj?.name;
                    breadCrumb.lv3Url = $"/danh-sach-san-pham/{res.data.categoryObj?.parentObj?.metaUrl}";
                    breadCrumb.currentName = res.data.name;
                }
            }
            else if (res.data.categoryObj?.parentObj?.id == null && res.data.categoryObj?.id > 0)
            {
                var resSp3 = await _s_Category.getCategoryById(res.data.categoryObj?.parentObj?.parentId);
                if (resSp3.result == 1 && resSp3.data != null)
                {
                    breadCrumb.lv1Name = "Sản phẩm";
                    breadCrumb.lv1Url = $"/san-pham";
                    breadCrumb.lv2Name = resSp3.data.name;
                    breadCrumb.lv2Url = $"/danh-sach-san-pham/{res.data.metaUrl}";
                    breadCrumb.currentName = res.data.name;
                }
            }
            else
            {
                breadCrumb.lv1Name = "Sản phẩm";
                breadCrumb.lv1Url = $"/san-pham";
                breadCrumb.currentName = res.data.name;
            }
            ViewBag.BreadCrumb = breadCrumb;

            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
            {
                Keywords = res.data.name,
                Title = res.data.name,
                Image = res.data.imageObj?.mediumUrl,
            });

            ViewBag.categoryLv2 = categoryLv2.data ?? new List<M_Category>();
            ViewBag.SchemaProduct = res.data?.schemaJsonObjs;
            ViewBag.ProductDetail = res.data;
            return PartialView(res.data);
        }
        public async Task<JsonResult> GetListProductByCategoryId(int? categoryId = 3, int isHot = 1)
        {
            var res = await _s_Product.getListProductByCategoryId(categoryId, isHot);
            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> getListCategoryById(int? parentId = 42)
        {
            var res = await _s_Category.getListCategoryById(int.Parse(_supplierId), parentId);
            return Json(new M_JResult(res));
        }
        private async Task<ActionResult> GetListProductByCategoryIdIshot(int? categoryId = 41, int isHot = -2)
        {
            var res = await _s_Product.getListProductByCategoryId(categoryId, isHot);
            ViewBag.ProductIshot = res.data ?? new List<M_Product>();
            return View();
        }
        private async Task<ActionResult> GetListProductByCategoryIdIshots(int? categoryId = 42, int isHot = -2)
        {
            var res = await _s_Product.getListProductByCategoryId(categoryId, isHot);
            ViewBag.ProductIshots = res.data ?? new List<M_Product>();
            return View();
        }
    }
}
