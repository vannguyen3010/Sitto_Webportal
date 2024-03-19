namespace SITTO_WebPortal.Models
{
    public class M_SchemaJson
    {
        public int? id { get; set; }
        public int? productId { get; set; }
        public string title { get; set; }
        public string contents { get; set; }
        public int? targetId { get; set; }
        public string targetTable { get; set; }
        public DateTime? createdAt { get; set; }
    }
}
