var $categoryIdEl = $('#input_category_id'),
    $pageEl = $('#input_page'),
    $recordEl = $('#input_record');
const dataParms = function () {
    return {
        c: IsNullOrEmty($categoryIdEl.val()) ? null : parseInt($categoryIdEl.val()),
        page: parseInt($pageEl.val()),
        record: parseInt($recordEl.val())
    }
}

$(document).ready(function () {
    LoadListIsHotNews();
    $('.slide_related_product').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        rows: 1,
        autoplay: false,
        mobile: true,
        dots: true,
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1648,
                settings: {
                    slidesToShow: 4,
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
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
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
});
//Load list related news
function LoadListIsHotNews() {
    try {
        ShowOverlayLoadingButton("#div_isHot_data");
        $.ajax({
            type: 'GET',
            url: '/Knowledge/GetListNewsIsHotByNewsCategoryIdType',
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
                                   <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}" class="recent-image knowledge_detail_item_modifiel">
                                       <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                            class="img-fluid blur-up lazyload h-100 w-100" alt="${value.title}"
                                              onerror="this.onerror=null;this.src='/img_dev/error/product.png';">
                                   </a>

                                   <div class="recent-detail">
                                       <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                           <h5 class="recent-name name_item">${value.title}</h5>
                                       </a>
                                   </div>
                               </div>
                            </div>`
                            
                    });
                    document.getElementById("div_isHot_data").innerHTML = tmpHtml;
                    $('#div_isHot_data').slick({
                        arrows: true,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        rows: 6,
                        dots: true,
                        /*nextArrow: $('.next-prow-detail'),*/
                        //prevArrow: $('.accordion .next-prow-detail'),
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

function LoadListRelatedProduct() {
    try {
        ShowOverlayLoadingButton("#div_list_related_product");
        $.ajax({
            type: 'GET',
            url: '/Knowledge/GetListNewsByCategoryId',
            data: {
                productId: $('#input_news_id').val(),
                c: $('#input_category_id').val()
            },
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_list_related_product");
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_list_related_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListRelatedProduct();$(this).remove();">
                            </i>
                        </div >`;
                    return;
                }
                var listData = response.data;

                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml += 
                          `
                            <div>
                                 <div class="product-slider wow fadeInUp">
                                     <a href="/kien-thuc/${value.metaUrl}" class="product-slider-image">
                                         <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" class="w-100 blur-up lazyload rounded-3 h-100 w-100"
                                              alt="${value.title}"
                                              onerror="this.onerror=null;this.src='/img_dev/error/product.png';">
                                     </a>

                                     <div class="product-slider-detail">
                                         <div>
                                             <a href="/kien-thuc/${value.metaUrl}" class="d-block">
                                                 <h3 class="text-title">${value.title}</h3>
                                             </a>
                                             <h5>${IsNullOrEmty(value.createdAt) ? "" : moment(value.createdAt).format('DD-MM-YYYY')}</h5>
                                         </div>
                                       
                                     </div>
                                 </div>
                             </div> 
                          `
                    });
                    document.getElementById("div_list_related_product").innerHTML = tmpHtml;
                    $('[data-toggle="tooltip"]').tooltip()
                    $('#div_list_related_product').slick({
                        arrows: false,
                        infinite: true,
                        slidesToShow: 4,
                        dots: true,
                        slidesToScroll: 1,
                        responsive: [{
                            breakpoint: 1510,
                            settings: {
                                slidesToShow: 3,
                                autoplay: true,
                                autoplaySpeed: 3500,
                                dots: true,
                            }
                        },
                        {
                            breakpoint: 1092,
                            settings: {
                                slidesToShow: 2,
                                dots: true,
                            }
                        },
                        ]
                    });
                }
                else {
                    document.getElementById("div_list_related_product").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_list_related_product");
                document.getElementById("div_list_related_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListRelatedProduct();$(this).remove();">
                            </i>
                        </div >`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_list_related_product");
        document.getElementById("div_list_related_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListRelatedProduct();$(this).remove();">
                            </i>
                        </div >`;
        console.log("Error when load related product!");
    }
}