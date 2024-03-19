using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Models
{
    public class M_Product
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public int? categoryTypeId { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public string metaUrl { get; set; }
        public string productCode { get; set; }
        public string qrCode { get; set; }
        public int? categoryId { get; set; }
        public int? countFeedback { get; set; }
        public string summaryInfo { get; set; }
        public List<M_SchemaJson> schemaJsonObjs { get; set; }
        public DateTime? createdAt { get; set; }
        public string detail { get; set; }
        public int? imageId { get; set; }
        public int? tradeMarkId { get; set; }
        public double? star { get; set; }
        public int? viewNumber { get; set; }
        public List<M_ProductPropertyFilter> propertyFilterObjs { get; set; }
        public M_Category categoryObj { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Image> imageListObj { get; set; }
    }

    public class VM_ProductDetail
    {
        public int id { get; set; }
        public int supplierId { get; set; }
        public string title { get; set; }
        public string metaUrl { get; set; }
        public string description { get; set; }
        public int? isHot { get; set; }
        public string qrCode { get; set; }
        public string name { get; set; }
        public string titleSlug { get; set; }
        public int? categoryId { get; set; } = 0;
        public int? categoryParentId { get; set; } = 0;
        public string categoryName { get; set; } = "";
        public string categoryParentName { get; set; } = "";
        public int price { get; set; } = 0;
        public int discount { get; set; } = 0;
        public string summaryInfo { get; set; }
        public string detail { get; set; }
        public int? tradeMarkId { get; set; }
        public int? unitId { get; set; }
        public string tradeMarkName { get; set; }
        public string unitName { get; set; }
        public double? viewNumber { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Image> imageListObj { get; set; }
    }
    public class VM_CheckoutCreateOrder
    {
        public string id { get; set; }
        public string supplierId { get; set; }
    }
    public class M_SearchNewAndProduct
    {
        public List<M_News> newsObjs { get; set; }
        public List<M_Product> productObjs { get; set; }
    }
}
