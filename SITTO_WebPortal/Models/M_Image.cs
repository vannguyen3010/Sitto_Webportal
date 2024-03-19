using SITTO_WebPortal.Models;

namespace SITTO_WebPortal.Models
{
    public class M_Image:M_BaseModel.ImageCustom
    {
        public int? id { get; set; }
        public string relativeUrl { get; set; }
        public string smallUrl { get; set; }
        public string mediumUrl { get; set; }

    }
}
