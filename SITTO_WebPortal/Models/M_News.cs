using System.Collections.Generic;
using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Models
{
    public class M_News
    {
        public int? id { get; set; }
        public string title { get; set; }
        public string metaUrl { get; set; }
        public string titleSlug { get; set; }
        public int? categoryId { get; set; }
        public int? supplierId { get; set; }
        public string description { get; set; }
        public string detail { get; set; }
        public double? star { get; set; }
        public int? countFeedback { get; set; }
        public int? reOrder { get; set; }
        public int? isHot { get; set; }
        public M_NewCategory newcategoryObj { get; set; }
        public DateTime? publishedAt { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Category categoryObj { get; set; }
        public M_Image imageObj { get; set; }
        public M_NewCategory parentObj { get; set; }
    }
    public class M_NewAndProduct
    {
        public List<M_News> introduceObjs { get; set; }
        public List<M_News> knowledgeObjs { get; set; }
        public List<M_Product> productAgricultureObjs { get; set; }
        public List<M_Product> productSeafoodObjs { get; set; }
    }

 
}
