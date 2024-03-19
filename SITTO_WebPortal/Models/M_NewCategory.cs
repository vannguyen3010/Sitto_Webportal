namespace SITTO_WebPortal.Models
{
    public class M_NewCategory
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string metaUrl { get; set; }
        public int? reOrder { get; set; }
        public M_Category parentObj { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Category> childObj { get; set; }
    }
}
