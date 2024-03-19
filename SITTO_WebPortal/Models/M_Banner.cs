using System.Collections.Generic;

namespace SITTO_WebPortal.Models
{
    public class M_Banner
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public string title { get; set; }
        public string descShort { get; set; }
        public int? status { get; set; }
        public string url { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Image imageObj { get; set; }
    }
   
}