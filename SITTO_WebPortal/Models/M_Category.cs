using SITTO_WebPortal.Models;
using System.Collections.Generic;

namespace SITTO_WebPortal.Models
{
    public class M_Category:M_BaseModel.BaseCustom
    {
        public int? id { get; set; }
        public int? parentId { get; set; }
        public int? supplierId { get; set; }
        public int? reOrder { get; set; }
        public int? categoryId { get; set; }
        public M_Category categoryObj { get; set; }
        public string name { get; set; }
        public string metaUrl { get; set; }

        public int? typeId { get; set; }
        public string categoryCode { get; set; }
        public string description { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_MenuChild2> menuChildSecondObjs { get; set; }
        public M_Category parentObj { get; set; }
        public List<M_Category> childMenu { get; set; }
    }
    public class M_MenuChild2
    {
        public string metaUrl { get; set; }
        public int? id { get; set;}
        public int? showUi { get; set;}
        public int? parentId { get; set;}
        public string name { get; set;}
        public List<M_Menuchil3> menuChilThirdObjs { get; set; }
    }
    public class M_Menuchil3:M_BaseModel.BaseCustom
    {
        public int? id { get; set;}
        public int? parentId { get; set;}
        public int? supplierId { get; set;}
        public string metaUrl { get; set; }
        public int? reOrder { get; set;}
        public int? showUi { get; set;}
        public int? categoryTypeId { get; set;}
        public string name { get; set;}
        public string categoryCode { get; set;}
        public string imageList { get; set; }
        public DateTime? createdAt { get; set; }
    }
}
