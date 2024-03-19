$(document).ready(function () {
    $('.slider_product_relate').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: false,
        mobile: true,
        dots: true,
        prevArrow: $('.prev-btn_product'),
        nextArrow: $('.next-btn_product'),
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1648,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });
    $('#btn_copy_link').on('click', function () {
        navigator.clipboard.writeText(window.location.href);
        ShowToastNoti('success', '', 'Đã sao chép liên kết đến bài viết này.');
    })
    // Sự kiện khi nhấn vào nút chia sẻ facbook
    $("#facebook_share").click(function (event) {
        event.preventDefault();
        var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href);
        window.open(url, '_blank', 'width=600,height=400');
    });
    // Sự kiện khi nhấn vào nút chia sẻ Zalo
    $("#zalo_share").click(function (event) {
        event.preventDefault();
        var url = "https://zalo.me/gd?url=" + encodeURIComponent(window.location.href);
        window.open(url, '_blank', 'width=600,height=400');
    });
    $(`.div_slide_knowledge`).slick({
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: false,
        mobile: true,
        dots: true,
        prevArrow: $('.prev-btn'),
        nextArrow: $('.next-btn'),
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1648,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });
   
    $('.div_image_product_slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.div_slider_nav'
    });
    $('.div_slider_nav').slick({
        vertical: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.div_image_product_slick',
        arrows: false,
        dots: false,
        focusOnSelect: true
    });
    SchemaList();
 /*   LoadListIsHotNews();*/
    $('#div_isHot_data').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        rows: 5,
        dots: true,
        mobile: true,
        autoplaySpeed: 3500,
        responsive: [{
            breakpoint: 1648,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 770,
            settings: {
                slidesToShow: 1,
            }
        },
        ]
    })



});
function SchemaList() {
    var schemaJson = '';
    var htmlWrapper = '';
    if (LIST_SCHEMA != null) {
        var listSchema = JSON.parse(LIST_SCHEMA);
        if (listSchema.length > 0) {
            $.each(listSchema, function (key, item) {
                schemaJson += ` {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [{
                        "@type": "Question",
                        "name": "${item.title}",
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "${item.contents}"
                          }
                          }]
                      }
                    ` })
            htmlWrapper = ` <script type="application/ld+json">
                            ${schemaJson}
                    </script>  
            `
        }
    }


};
function LoadListIsHotNews() {
    try {
        ShowOverlayLoadingButton("#div_isHot_data");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListProductByCategoryId',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_isHot_data");
                if (response.result !== 1) {
                    document.getElementById("div_isHot_data").innerHTML = ` 
                    <div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListLatestNews();$(this).remove();">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml +=
                            `<div>
                               <div class="recent-box">
                                   <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}" class="recent-image">
                                       <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                            class="img-fluid blur-up lazyload" alt="${value.name}"
                                              onerror="this.onerror=null;this.src='/img_dev/error/product.png';">
                                   </a>

                                   <div class="recent-detail">
                                       <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.name}" href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}">
                                           <h5 class="recent-name name_item">${value.name}</h5>
                                       </a>
                                   </div>
                               </div>
                            </div>
                            `

                    });
                    document.getElementById("div_isHot_data").innerHTML = tmpHtml;
                    $('#div_isHot_data').slick({
                        arrows: true,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        rows: 5,
                        dots: true,
                        mobile: true,
                        autoplaySpeed: 3500,
                        responsive: [{
                            breakpoint: 1648,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 1300,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 770,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        ]
                    })
                }
                else {
                    document.getElementById("div_isHot_data").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_isHot_data");
                document.getElementById("div_isHot_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListLatestNews();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_isHot_data");
        document.getElementById("div_isHot_data").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListLatestNews();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load latest news!");
    }
}
function LoadListCategoryLv2() {
    try {
        ShowOverlayLoadingButton("#div_list_category");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListCategoryBySupplierIdParentId',
            data: {
                parentId: parentId
            },
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_list_category");
                if (response.result !== 1) {
                    document.getElementById("div_list_category").innerHTML = ` 
                    <div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListCategoryLv2();$(this).remove();">
                        </i>
                    </div>`;
                    return; 
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml +=
                            `
                               <div class="recent-box">
                                   <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}" class="recent-image">
                                       <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                            class="img-fluid blur-up lazyload" alt="${value.name}"
                                              onerror="this.onerror=null;this.src='/img_dev/error/product.png';">
                                   </a>

                                   <div class="recent-detail">
                                       <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}">
                                           <h5 class="recent-name">${value.name}</h5>
                                       </a>
                                   </div>
                               </div>
                            `

                    });
                    document.getElementById("div_list_category").innerHTML = tmpHtml;
                    $('.div_list_category').slick({
                        arrows: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        rows: 3,
                        mobile: true,
                        autoplaySpeed: 3500,
                        responsive: [{
                            breakpoint: 1648,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        ]
                    })
                }
                else {
                    document.getElementById("div_list_category").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_list_category");
                document.getElementById("div_list_category").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCategoryLv2();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_list_category");
        document.getElementById("div_list_category").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCategoryLv2();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load latest news!");
    }
}