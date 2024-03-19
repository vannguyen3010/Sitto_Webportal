namespace SITTO_WebPortal.Models
{
    public class M_Supplier : M_BaseModel.BaseCustom
    {
        public int id { get; set; }
        public string qrIdentityCode { get; set; }
        public string supplierType { get; set; }
        public int? supplierModelId { get; set; }
        public string name { get; set; }
        public string metaUrl { get; set; }
        public string nameEn { get; set; }
        public string nameEnSlug { get; set; }
        public string description { get; set; }
        public string contactName { get; set; }
        public bool isTrademark { get; set; }
        public string taxNumber { get; set; }
        public string accountNumber { get; set; }
        public string imageLogoCom { get; set; }
        public string imageFaviconCom { get; set; }
        public int imageId { get; set; }
        public string imageLogo { get; set; }
        public string smallUrl { get; set; }
        public string imageFavicon { get; set; }
        public string imageList { get; set; }
        public string themeColorSecond { get; set; }
        public string themeColorFirst { get; set; }
        public string telephoneId { get; set; }
        public string hotlineNumber { get; set; }
        public string telephoneNumber { get; set; }
        public string businessNumber { get; set; }
        public string email { get; set; }
        public string fax { get; set; }
        public string faceBook { get; set; }
        public string twitter { get; set; }
        public string instagram { get; set; }
        public string zalo { get; set; }
        public string youtube { get; set; }
        public string tiktokUrl { get; set; }
        public string appUrl { get; set; }
        public M_Address addressObj { get; set; }
        public VM_Supplier supplierOfficeObj { get; set; }
        public M_Image imageObj { get; set; }
        /*   public string instagram { get; set; }
           public string zalo { get; set; }
           public int siteUrl { get; set; }
           public int youtube { get; set; }
           public int tiktokUrl { get; set; }
           public int qrSiteUrl { get; set; }
           public string ministryUrl { get; set; }
           public string roleFileUrl { get; set; }
           public string securityFileUrl { get; set; }
           public string operatingRegulationUrl { get; set; }
           public int supplierModel { get; set; }
           public int bankSuppliers { get; set; }
           public int groups { get; set; }
           public int personDepartmentSuppliers { get; set; }*/
        /*     public int supplierConfigures { get; set; }*/
        /*  public int telephoneObj { get; set; }*/

        // public M_Contact contacterObj { get; set; }
        /*    public M_Image imageObj { get; set; }*/
        /*  public int bankSupplierObj { get; set; }
          public int supplierConfigureObj { get; set; }*/
    }
    public class VM_Supplier
    {
        public int? id { get; set; }
        public int? countryId { get; set; }
        public int? provinceId { get; set; }
        public int? districtId { get; set; }
        public int? wardId { get; set; }
        public string title { get; set; }
        public string addressText { get; set; }
        public string telephoneNumber { get; set; }
    }

}
