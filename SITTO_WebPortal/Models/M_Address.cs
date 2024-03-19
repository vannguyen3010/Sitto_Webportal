namespace SITTO_WebPortal.Models
{
    public class M_Address
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public string addressText { get; set; }
        public int? countryId { get; set; }
        public int? provinceId { get; set; }
        public int? districtId { get; set; }
        public int? wardId { get; set; }
        public int? townId { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
        public M_Country countryObj { get; set; }
        public M_Province provinceObj { get; set; }
        public M_District districtObj { get; set; }
    }
    public class M_Country
    {
        public int? id { get; set; }
        public string name { get; set; }
    }
    public class M_Province
    {
        public int? id { get; set; }
        public string name { get; set; }
    }
    public class M_District
    {
        public int? id { get; set; }
        public string name { get; set; }
    }
}
