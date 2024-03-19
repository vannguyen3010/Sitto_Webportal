using SITTO_WebPortal.Lib;
using SITTO_WebPortal.Middlewares;
using SITTO_WebPortal.Models;
using SITTO_WebPortal.Services;
/*using SITTO_WebPortal.Mapper;*/
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

void GetDefaultHttpClient(IServiceProvider serviceProvider, HttpClient httpClient, string hostUri)
{
    if (!string.IsNullOrEmpty(hostUri))
        httpClient.BaseAddress = new Uri(hostUri);
    //client.DefaultRequestHeaders.CacheControl = new CacheControlHeaderValue { NoCache = true };
    httpClient.Timeout = TimeSpan.FromMinutes(1);
    httpClient.DefaultRequestHeaders.Clear();
    httpClient.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml+json");
    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
}

HttpClientHandler GetDefaultHttpClientHandler()
{
    return new HttpClientHandler
    {
        AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
        UseCookies = false,
        AllowAutoRedirect = false,
        UseDefaultCredentials = true,
        ClientCertificateOptions = ClientCertificateOption.Manual,
        ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) => true,
    };
}

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.Cookie = new CookieBuilder
    {
        //Domain = "cms.labadalat.com", //Releases in active
        Name = "AuthCMS",
        HttpOnly = true,
        Path = "/",
        SameSite = SameSiteMode.Lax,
        SecurePolicy = CookieSecurePolicy.Always
    };
    options.LoginPath = new PathString("/Account/SignIn");
    options.LogoutPath = new PathString("/Account/SignOut");
    options.AccessDeniedPath = new PathString("/Error/403");
    options.SlidingExpiration = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddSession(options =>
{
    //options.Cookie.Domain = ".koolselling.com"; //Releases in active
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.IsEssential = true;
    options.Cookie.HttpOnly = true;
});

//builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly); //AutoMapperProfile
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddHttpClient("base")
    .ConfigureHttpClient((serviceProvider, httpClient) => GetDefaultHttpClient(serviceProvider, httpClient, builder.Configuration.GetSection("ApiSettings:UrlApi").Value))
    .SetHandlerLifetime(TimeSpan.FromMinutes(5)) //Default is 2 min
    .ConfigurePrimaryHttpMessageHandler(x => GetDefaultHttpClientHandler());

builder.Services.AddHttpClient("custom")
    .ConfigureHttpClient((serviceProvider, httpClient) => GetDefaultHttpClient(serviceProvider, httpClient, string.Empty))
    .SetHandlerLifetime(TimeSpan.FromMinutes(5)) //Default is 2 min
    .ConfigurePrimaryHttpMessageHandler(x => GetDefaultHttpClientHandler());

builder.Services.AddSingleton<IBase_CallApi, Base_CallApi>();
builder.Services.AddSingleton<ICallBaseApi, CallBaseApi>();
builder.Services.AddSingleton<ICallApi, CallApi>();
builder.Services.AddSingleton<IS_News, S_News>();
builder.Services.AddSingleton<IS_Utility, S_Utility>();
builder.Services.AddSingleton<IS_Supplier, S_Supplier>();
builder.Services.AddSingleton<IS_Banner, S_Banner>();
builder.Services.AddSingleton<IS_Product, S_Product>();
builder.Services.AddSingleton<IS_Category, S_Category>();
builder.Services.AddSingleton<IS_NewsCategory, S_NewCategory>();
builder.Services.AddSingleton<IS_Contact, S_Contact>();
builder.Services.AddSingleton<IS_VirtualAssistant, S_VirtualAssistant>();
builder.Services.AddSingleton<IS_VirtualAssistantUrl, S_VirtualAssistantUrl>();
builder.Services.AddSingleton<IS_SchemaJson, S_SchemaJson>();

builder.Services.Configure<Config_ApiSettings>(builder.Configuration.GetSection("ApiSettings"));
builder.Services.Configure<Config_MetaSEO>(builder.Configuration.GetSection("MetaSEO"));
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseStatusCodePagesWithReExecute("/error/{0}");
    app.UseHsts();
}

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        const int durationInSeconds = 7 * 60 * 60 * 24; //7 days
        ctx.Context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.CacheControl] =
            "public,max-age=" + durationInSeconds;
    }
});

app.UseMiddleware<SecurityHeadersMiddleware>(); //App config security header

app.UseCookiePolicy(); ;

app.UseSession();

app.UseRouting();

/*app.UseAuthorization();*/

app.UseEndpoints(endpoints =>
{ 

    #region Home
    endpoints.MapControllerRoute(
      name: "default",
      pattern: "{controller=Home}/{action=Index}/{id?}");
    #endregion

    #region knowledge
    endpoints.MapControllerRoute(
       name: "knowledge",
       pattern: "kien-thuc",
       defaults: new { controller = "Knowledge", action = "Index" });
    //endpoints.MapControllerRoute(
    //   name: "product",
    //   pattern: "kien-thuc/{metaUrl}",
    //   defaults: new { controller = "Knowledge", action = "ViewDetail" });
    endpoints.MapControllerRoute(
      name: "knowledge",
      pattern: "kien-thuc/{metaCategoryUrl}/{metaUrl}",
      defaults: new { controller = "Knowledge", action = "ViewDetail" });
    endpoints.MapControllerRoute(
      name: "knowledge",
      pattern: "danh-sach-kien-thuc",
      defaults: new { controller = "Knowledge", action = "IndexAll" });
    endpoints.MapControllerRoute(
      name: "knowledge",
      pattern: "danh-sach-kien-thuc/{metaUrl}",
      defaults: new { controller = "Knowledge", action = "IndexAll" });
    #endregion

    #region product
    endpoints.MapControllerRoute(
       name: "product",
       pattern: "san-pham",
       defaults: new { controller = "Product", action = "Index" });
    endpoints.MapControllerRoute(
      name: "product",
      pattern: "san-pham/{metaCategoryUrl}/{metaUrl}",
      defaults: new { controller = "Product", action = "ViewDetail" });
    //endpoints.MapControllerRoute(
    // name: "product",
    // pattern: "danh-sach-san-pham",
    // defaults: new { controller = "Product", action = "IndexAll" });
    endpoints.MapControllerRoute(
     name: "product",
     pattern: "danh-sach-san-pham/{metaUrl}",
     defaults: new { controller = "Product", action = "IndexAll" });
    //endpoints.MapControllerRoute(
    // name: "product",
    // pattern: "danh-sach-san-pham/{metaCategoryUrl}/{metaUrl}",
    // defaults: new { controller = "Product", action = "IndexAll" });
    #endregion

    #region AboutUs
    endpoints.MapControllerRoute(
       name: "AboutUs",
       pattern: "ve-chung-toi/{metaCategoryUrl}",
       defaults: new { controller = "AboutUs", action = "Index" });
    endpoints.MapControllerRoute(
       name: "DetailNews",
       pattern: "ve-chung-toi",
       defaults: new { controller = "AboutUs", action = "Index" });
    endpoints.MapControllerRoute(
      name: "DetailNews",
      pattern: "ve-chung-toi/{metaCategoryUrl}/{metaUrl}",
      defaults: new { controller = "AboutUs", action = "ViewDetail" });
    #endregion

    #region info
    endpoints.MapControllerRoute(
        name: "info",
        pattern: "thong-tin-cong-ty",
        defaults: new { controller = "Info", action = "Index" });
    #endregion

    #region contact
    endpoints.MapControllerRoute(
        name: "contact",
        pattern: "lien-he",
        defaults: new { controller = "Contact", action = "Index" });
    #endregion

    #region Search
    endpoints.MapControllerRoute(
        name: "search",
        pattern: "tim-kiem",
        defaults: new { controller = "Search", action = "Index" });
    #endregion
    endpoints.MapControllerRoute(
        name: "Error expired",
        pattern: "expired-domain",
        defaults: new { controller = "Error", action = "ExpiredDomain" });
    endpoints.MapControllerRoute(
        name: "Error status code",
        pattern: "error/{statusCode}",
        defaults: new { controller = "Error", action = "Index" });
});

app.Run();
