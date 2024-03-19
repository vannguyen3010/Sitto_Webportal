using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;

namespace SITTO_WebPortal.Controllers
{
    public class HomeController : BaseController<HomeController>
    {
        //private const int MAX_RECORDS = 10;
        private readonly IS_Utility _s_Utility;
        private readonly IS_Product _s_Product;
        private readonly IS_News _s_News;
        private readonly IS_Banner _s_Banner;
        private readonly IS_Category _s_Category;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public HomeController(IS_Utility utility, IS_Product product, IS_News news, IS_Banner banner, IS_Category category, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Utility = utility;
            _s_Product = product;
            _s_News = news;
            _s_Banner = banner;
            _s_Category = category;
            _metaSEO = metaSEO;
        }
        public async Task<ActionResult> Index()
        {
            await Task.WhenAll(GetListNewAndProduct(), GetBannerTop(), GetPopup(), GetListKnowledgeAgricultural(), GetListKnowledgeSeafood(), GetListCategoryAgricultural(), GetListCategoryById());
            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Home);
            return View();
        }
        public async Task<ActionResult> GetListNewAndProduct()
        {
            var res = await _s_News.getListNewAndProduct();
            if (res.result != null && res.data != null)
            {
                if (res.data.knowledgeObjs.Any())
                {
                    res.data.knowledgeObjs = res.data.knowledgeObjs
                        .OrderByDescending(x => x.createdAt)
                        //.Take(4)
                        .ToList();
                }
                if (res.data.productSeafoodObjs.Any())
                {
                    res.data.productSeafoodObjs = res.data.productSeafoodObjs
                        .OrderByDescending(x => x.createdAt)
                        //.Take(4)
                        .ToList();
                }
                if (res.data.productAgricultureObjs.Any())
                {
                    res.data.productAgricultureObjs = res.data.productAgricultureObjs
                        .OrderByDescending(x => x.createdAt)
                        //.Take(4)
                        .ToList();
                }
                if (res.data.introduceObjs.Any())
                {
                    res.data.introduceObjs = res.data.introduceObjs
                        .OrderByDescending(x => x.createdAt)
                        //.Take(4)
                        .ToList();
                }
            }
            ViewBag.NewAndProduct = res.data ?? new M_NewAndProduct();
            return View();
        }

        //public async Task<ActionResult> GetListNewAndProduct()
        //{
        //    var res = await _s_News.getListNewAndProduct();
        //    if (res.result != null && res.data != null)
        //    {
        //        if (res.data.knowledgeObjs.Any())
        //        {
        //            res.data.knowledgeObjs.OrderBy(x => x.createdAt).ToList();
        //        }
        //        if (res.data.productSeafoodObjs.Any())
        //        {
        //            res.data.productSeafoodObjs.OrderBy(x => x.createdAt).ToList();
        //        }
        //        if (res.data.productAgricultureObjs.Any())
        //        {
        //            res.data.productAgricultureObjs.OrderBy(x => x.createdAt).ToList();
        //        }
        //        if (res.data.introduceObjs.Any())
        //        {
        //            res.data.introduceObjs.OrderBy(x => x.createdAt).ToList();
        //        }
        //    }
        //    ViewBag.NewAndProduct = res.data ?? new M_NewAndProduct();
        //    return View();
        //}
        private async Task<ActionResult> GetBannerTop()
        {
            var res = await _s_Banner.getListBannerByStatusSupplierIdLocationIdPageName(int.Parse(_supplierId), 1, "home dot com");
            ViewBag.BannerTop = res.data ?? new List<M_Banner>();
            return View();
        }
        private async Task<ActionResult> GetPopup()
        {
            var res = await _s_Banner.getListBannerByStatusSupplierIdLocationIdPageName(int.Parse(_supplierId), 1, "popup");
            ViewBag.Popup = res.data ?? new List<M_Banner>();
            return View();
        }
        public async Task<JsonResult> GetListUtility(string sequenceStatus = "1")
        {
            var res = await _s_Utility.getListUtility(sequenceStatus);
            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetListProductByCategoryId(int? categoryId = 0, int recordNumber = 10, int page = 1)
        {
            var res = await _s_Product.getListProductByCatId(categoryId, recordNumber, page);
            return Json(new M_JResult(res));
        }
        public async Task<ActionResult> GetListKnowledgeAgricultural(int typeId = 4, int recordNumber = 20, int page = 1)
        {
            var res = await _s_News.getListNewsDropdownByTypeId(typeId, recordNumber, page);
            ViewBag.KnowledgeAgricultural = res.data ?? new List<M_News>();
            return View();
        }
        public async Task<ActionResult> GetListKnowledgeSeafood(int typeId = 4, int recordNumber = 20, int page = 1)
        {
            var res = await _s_News.getListNewsDropdownByTypeId(typeId, recordNumber, page);
            ViewBag.KnowSeafood = res.data ?? new List<M_News>();
            return View();
        }
        public async Task<ActionResult> GetListCategoryAgricultural()
        {
            var res = await _s_Category.getListCatMenu(CommonConstants.OWNER_SUPPLIER_ID, "1");
            ViewBag.CategoryAgricultural = res.data ?? new List<M_Category>();
            return View();
        }
        public async Task<ActionResult> GetListCategoryById(int? categoryId = 42)
        {
            var res = await _s_Category.getListCategoryById(int.Parse(_supplierId), categoryId); // lấy id category THỦY SẢN cấp 1 load category cấp 3
            if(res.data != null && res.result == 1)
            {
                ViewBag.CategorySeafood = res.data.OrderBy(or => or.reOrder).ToList() ?? new List<M_Category>();
            }
            return View();
        }
        public async Task<JsonResult> GetListProductHotAgricultural(string parentId = "")
        {
            //type 0 là nông nghiệp
            var typeId = 0;
            parentId = !string.IsNullOrEmpty(parentId) ? parentId : " ";
            var res = await _s_Product.getListProductSequenceStatusByTypeId("1", typeId, parentId);

            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetListProductHotSeaFood(string parentId = "")
        {
            //type 1 là thủy sản
            var typeId = 1;
            parentId = !string.IsNullOrEmpty(parentId) ? parentId : " ";
            var res = await _s_Product.getListProductSequenceStatusByTypeId("1", typeId, parentId);
            return Json(new M_JResult(res));
        }
        //type = 1 là load th cha 
        public async Task<JsonResult> GetListNewsCategoryKnowledgeAgricultural(int typeId = 1, int? id = 11, int isHot = 1)
        {
            var res = await _s_News.getListNewsByNewsCategoryIdType(typeId, id, isHot);
            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetListNewsCategoryKnowledgeSeaFood(int typeId = 1, int? id = 12, int isHot = 1)
        {
            var res = await _s_News.getListNewsByNewsCategoryIdType(typeId, id, isHot);
            return Json(new M_JResult(res));
        }
       
    }
}
