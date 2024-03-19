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
    /*LoadListRelatedNews();*/
    $('.slider_product_relate').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
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
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
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
                    slidesToShow: 1,
                }
            },
        ]
    });
    $('.slide_related_about').slick({
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
    LoadListMainData();
    $('.div_slide_relate').slick({
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 4,
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 1510,
            settings: {
                slidesToShow: 4,
                autoplay: true,
                autoplaySpeed: 3500,
            }
        },
        {
            breakpoint: 1092,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 665,
            settings: {
                slidesToShow: 2,
                fade: true,
            }
        },
        ]
    });
});

//Load list related news

function LoadListRelatedNews() {
    try {
        ShowOverlayLoadingButton("#div_news_related");
        $.ajax({
            type: 'GET',
            url: '/News/GetListRelatedNews',
            data: dataParms(),
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_news_related");
                if (response.result !== 1) {
                    document.getElementById("div_news_related").innerHTML = ` 
                    <div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListRelatedNews();$(this).remove();">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        var date = moment(value.createdAt).format('DD-MM-YYYY');
                        tmpHtml +=
                            `<div class="news_wrapper news_wrapper_detail">
                                <a href="/tin-tuc/${value.metaUrl}-${value.id}">
                                    <div class="classic-effect">
                                        <div style="max-height:265px;min-height:265px;">
                                            <img data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/img_dev/error/product.png" : value.imageObj?.mediumUrl}"
                                                 class="img-fluid blur-up lazyload bg-img" alt="${value.title}"
                                                    onerror="this.onerror=null;this.src='/img_dev/error/product.png';" 
                                                    style="width: 100%; height: 264px; object-fit: cover;">
                                        </div>
                                        <span></span>
                                    </div>
                                </a>
                                <div class="blog-details">
                                 
                                    <a href="/tin-tuc/${value.metaUrl}-${value.id}">
                                        <p class="sp-line-2" title="${IsNullOrEmty(value.title) ? "" : value.title}">${IsNullOrEmty(value.title) ? "" : value.title}</p>
                                    </a>
                                    <hr class="style1">
                                    <h6 class="sp-line-2" title="${IsNullOrEmty(value.description) ? "" : value.description}">${IsNullOrEmty(value.description) ? "" : value.description}</h6>
                                   <h4>${date}</h4>
                                </div>
                            </div>`;
                    });
                    document.getElementById("div_news_related").innerHTML = tmpHtml;
                    //Init Slick Js
                    $('#div_news_related').slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                        ]
                    });
                }
                else {
                    document.getElementById("div_news_related").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_news_related");
                document.getElementById("div_news_related").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListRelatedNews();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load related news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_news_related");
        document.getElementById("div_news_related").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListRelatedNews();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load related news!");
    }
}

function LoadListMainData() {
    var data = dataParms();
    try {
        ShowOverlay("#div_main_data");
        $.ajax({
            type: 'GET',
            url: '/AboutUs/GetListAbout',
            data: data,
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_main_data");
                if (response.result !== 1) {
                    document.getElementById("div_main_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml +=
                            `
                          <li>
                             <div class="offer-product">
                                 <a href="/ve-chung-toi/${value.categoryObj?.metaUrl}/${value.metaUrl}" class="offer-image p-1 about_detail_css">
                                     <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" : item.imageObj?.smallUrl)"
                                          class="img-fluid blur-up lazyload w-100 h-100" alt="${value.title}"
                                          onerror="this.onerror=null;this.src='/img_dev/error/product.png';">
                                 </a>
                             
                                 <div class="offer-detail">
                                     <div>
                                         <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" href="/ve-chung-toi/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                             <h5 title="${value.title}" class="about_title_item">${value.title}</h5>
                                         </a>
                                           <div style="height: 20px" class="blog-label">
                                                   <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i> <span>${IsNullOrEmty(value.createdAt) ? "" : moment(value.createdAt).format('DD-MM-YYYY')}</span></span>
                                           </div>
                                     </div>
                                 </div>
                             </div>
                          </li>`
                    });
                    document.getElementById("div_main_data").innerHTML = tmpHtml;
                    $('#div_main_data').slick({
                        arrows: true,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        rows: 5,
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
                    //Style js
                    $(".bg-top").parent().addClass('b-top');
                    $(".bg-bottom").parent().addClass('b-bottom');
                    $(".bg-center").parent().addClass('b-center');
                    $(".bg_size_content").parent().addClass('b_size_content');
                    $(".bg-img").parent().addClass('bg-size');
                    $(".bg-img.blur-up").parent().addClass('blur-up lazyload');
                    jQuery('.bg-img').each(function () {
                        var el = $(this),
                            src = el.attr('src'),
                            parent = el.parent();
                        parent.css({
                            'background-image': 'url(' + src + ')',
                            'background-size': 'cover',
                            'background-position': 'center',
                            'display': 'block'
                        });
                        el.hide();
                    });
                }
                else {
                    document.getElementById("div_main_data").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_main_data");
                document.getElementById("div_main_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load list!");
            }
        });
    } catch (e) {
        HideOverlay("#div_main_data");
        document.getElementById("div_main_data").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load list!");
    }
}
