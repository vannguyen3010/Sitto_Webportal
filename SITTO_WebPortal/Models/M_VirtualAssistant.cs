using System.Collections.Generic;
using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Models
{
    public class M_VirtualAssistant
    {
        public int? id { get; set; }
        public int? parentId { get; set; }
        public int? status { get; set; }
        public int? isQuestion { get; set; }
        public int? createdBy { get; set; }
        public string contents { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public List<M_Product> productObjs { get; set; }
        public DateTime? createdAt { get; set; }
    }
}
