//using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;

namespace SITTO_WebPortal.Controllers
{
    public abstract class BaseController<T> : Controller where T : BaseController<T>
    {
        private IMemoryCache memoryCache;
        private IS_Supplier s_Supplier;
        private IS_Category s_Category;
        private IS_NewsCategory s_AboutCategory;
        private IS_NewsCategory s_ListKnowledge;
        private IS_Utility s_Utility;

        protected IMemoryCache _memoryCache => memoryCache ?? (memoryCache = HttpContext?.RequestServices.GetService<IMemoryCache>());

        protected IS_Supplier _s_Supplier => s_Supplier ?? (s_Supplier = HttpContext?.RequestServices.GetService<IS_Supplier>());

        protected string _supplierId => CommonConstants.OWNER_SUPPLIER_ID.ToString();

        protected IS_Category _s_Category => s_Category ?? (s_Category = HttpContext?.RequestServices.GetService<IS_Category>());

        protected IS_NewsCategory _s_AboutCategory => s_AboutCategory ?? (s_AboutCategory = HttpContext?.RequestServices.GetService<IS_NewsCategory>());


        protected IS_NewsCategory _s_ListKnowledge => s_ListKnowledge ?? (s_ListKnowledge = HttpContext?.RequestServices.GetService<IS_NewsCategory>());

        protected IS_Utility _s_Utility => s_Utility ?? (s_Utility = HttpContext?.RequestServices.GetService<IS_Utility>());

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!_memoryCache.TryGetValue(CommonConstants.CACHE_KEY_SUPPLIER, out ResponseData<M_Supplier> supplier))
            {
                supplier = _s_Supplier.getSupplierById<M_Supplier>(CommonConstants.OWNER_SUPPLIER_ID).Result;
                if (supplier.result == 1 && supplier.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(0.1),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_SUPPLIER, supplier, cacheExpiryOptions);
                }
            }
            if (!_memoryCache.TryGetValue(CommonConstants.CACHE_KEY_CATEGORY, out ResponseData<List<M_Category>> category))
            {
                category = _s_Category.getListCatMenu(CommonConstants.OWNER_SUPPLIER_ID, "1").Result;
                if (category.result == 1 && category.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_CATEGORY, category, cacheExpiryOptions);
                }
            }
            if (!_memoryCache.TryGetValue(CommonConstants.TYPE_ABOUT_CATEGORY, out ResponseData<List<M_NewCategory>> aboutCategory))
            {
                aboutCategory = _s_AboutCategory.getListAboutCategory(CommonConstants.TYPE_ABOUT_CATEGORY).Result;
                if (aboutCategory.result == 1 && aboutCategory.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_CATEGORY, aboutCategory, cacheExpiryOptions);
                }
            }
            if (!_memoryCache.TryGetValue(CommonConstants.TYPE_KNOWLEDGE_CATEGORY, out ResponseData<List<M_NewCategory>> listKnowledgeCategory))
            {
                listKnowledgeCategory = _s_ListKnowledge.getListKnowledgeCategory(CommonConstants.TYPE_KNOWLEDGE_CATEGORY).Result;
                if (listKnowledgeCategory.result == 1 && listKnowledgeCategory.data != null)
                {  
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_CATEGORY, listKnowledgeCategory, cacheExpiryOptions);
                }
            }
            if (!_memoryCache.TryGetValue("0", out ResponseData<List<M_Utility>> tools))
            {
                tools = _s_Utility.getListUtility("0").Result;
                if (tools.result == 1 && tools.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set("1", tools, cacheExpiryOptions);
                }
            }

            ViewBag.ToolsListCategory = tools.data ?? new List<M_Utility>();
            ViewBag.KnowledgeCategory = listKnowledgeCategory.data ?? new List<M_NewCategory>();
            ViewBag.AboutCategory = aboutCategory.data ?? new List<M_NewCategory>();
            ViewBag.Category = category.data ?? new List<M_Category>();
            ViewBag.CategoryList = category.data?.Select(x => x.id).ToList();
            ViewBag.KnowledgeCategoryList = listKnowledgeCategory.data?.Select(x => x.id).ToList();
            ViewBag.SupplierInfo = supplier.data ?? new M_Supplier();
            base.OnActionExecuting(context);
        }
    }
}
