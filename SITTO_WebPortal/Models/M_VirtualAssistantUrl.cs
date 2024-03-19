using System.Collections.Generic;
using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Models
{
    public class M_VirtualAssistantUrl
    {
        public int? id { get; set; }
        public int? virtualAssistantId { get; set; }
        public int? productId { get; set; }
        public string url { get; set; }
        public int? isContact { get; set; }
        public int? status { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Product productObj { get; set; }
    }
}
