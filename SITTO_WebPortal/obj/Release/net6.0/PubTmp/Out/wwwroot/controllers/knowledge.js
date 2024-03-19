var $categoryIdEl = $('#input_category_id'),
    $pageEl = $('#input_page'),
    $recordEl = $('#input_record');
$typeEl = $('#input_type');
var listNewsHtml = [];
var lastIndex = "";
var sorted = false;
$(document).ready(function () {

    /**Slide News */
    $('.slide_list_new').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        dots: false,
        slidesToScroll: 1,
        prevArrow: $('.prev-btn_new_right'),
        nextArrow: $('.next-btn_new_right'),
        responsive: [{
            breakpoint: 1450,
            settings: {
                slidesToShow: 1,
                dots: false
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                fade: true,
                dots: false
            }
        },
        ]
    })
    /**Slide end */
    $('#slider_div_highlight_products').slick({
        arrows: false,
        infinite: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        rows: 4,
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

    setTimeout(function() {
        LoadlistNewsCategory();
    },300)
});

function LoadlistNewsCategory() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Knowledge/GetListNewsCategoryKnowledgeCategory',
            dataType: "json",
            success: function (response) {
                if (response.result !== 1) {
                    divProductSeaFood.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductHotAgricultural();">
                            </i>
                        </div>`);
                    return false;
                }
                var listData = response.data;
                if (!sorted) {
                    listData.sort((a, b) => a.reOrder - b.reOrder);
                    sorted = true;
                }
                //var listNewsCategory = listData.filter(x => x.id)
                var listNewsCategory = listData.filter(x => x.reOrder)
                if (listNewsCategory != null && listNewsCategory.length > 0) {
                    GetListNews(JSON.stringify(listNewsCategory))
                    //listNewsCategory = listNewsCategory.reverse()
                } else {
                    $("#div_main_data_list").html(` 
                        <div class="d-flex align-items-center flex-column mx-auto">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không có dữ liệu!</span>
                        </div>`);
                }
            },
            error: function (error) {
                divProductSeaFood.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListProductHotAgricultural();">
                        </i>
                    </div>`);
                console.log("Error when loading hot agricultural products!");
            }
        });
    } catch (e) {
        divProductSeaFood.html(`
            <div class="text-center p-2">
                <i type="button" class="fa fa-refresh"
                    style="border-radius:4px;font-size:24px;"
                    onclick="LoadListProductHotAgricultural();">
                </i>
            </div>`);
        console.log("Error when loading hot agricultural products!");
    }
}

function GetListNews(listNewCategory) {
    let data = JSON.parse(listNewCategory);
    data.sort((a, b) => a.reOrder - b.reOrder);
    var obj = {};
    for (var i = 0; i < data.length; i++) {
        /*CallDataAjax(data[i].childObj, data[i].id, data[i].name)*/
        obj = {
            idx: i,
            listChild: data[i].childObj,
            id: data[i].id,
            name: data[i].name,
            metaUrl: data[i].metaUrl,
        };
        CallDataAjax(obj)
        if (data[i].id == data[data.length - 1].id) {
            lastIndex = data[data.length - 1].id
        }
    }
}

function CallDataAjax(obj) {
    return $.ajax({
        type: 'GET',
        url: '/Knowledge/GetListNewsByNewsCategoryIdType',
        data: {
            id: obj?.id,
            type: 1,
        },
        dataType: "json",
        success: function (response) {
            if (response.result !== 1) {
                divKnowledgeSeaFood.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListKnowledgeSeaFood();">
                            </i>
                        </div>`);
                return false;
            }
            var listData = response.data;
            RawData(listData, obj)
        },
        error: function (error) {
            divProductSeaFood.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListKnowledgeSeaFood();">
                        </i>
                    </div>`);
            console.log("Error when loading hot agricultural products!");
        }
    });
}

async function RawData(listData, obj) {
    if (listData != null && listData.length > 0) {
        var itemHtml = '';
        var starHtml = '';
        var star = '';
        var arrayStar = '';
        const FULL_STAR_HTML = '<span class="star">&#9733;</span>';
        const HALF_STAR_HTML = `<span class="star half-star">&#9733;</span>`;
        $.each(listData, function (key, value) {
            if (value.star > 0) {
                star = '', starHtml = '', arrayStar = '';
                star = value.star + "";
                if (star.includes(".")) {
                    arrayStar = star.split(".")
                    if (arrayStar.length > 1) {
                        //TH: Haft star
                        var starsFullHtml = '', startHalfHtml = '';
                        for (var i = 0; i < parseInt(arrayStar[0]); i++) {
                            starsFullHtml += FULL_STAR_HTML;
                        }
                        if (arrayStar[arrayStar.length - 1] > 0) {
                            startHalfHtml = HALF_STAR_HTML
                        }
                        starHtml = starsFullHtml + startHalfHtml
                    }
                    //TH: Haft star
                    else {
                        for (var i = 0; i < parseInt(arrayStar[0]); i++) {
                            starHtml += FULL_STAR_HTML;
                        }
                    }
                }
                //TH: Full star
                else {
                    for (var i = 0; i < parseInt(star.split(".")[0]); i++) {
                        starHtml += FULL_STAR_HTML;
                    }
                }
            }
            itemHtml += 
                    //`<div>
                    //       <div class="product-slider  product-box-4 wow fadeInUp div_css_item item_remove_class">
                    //           <div class="product-image-2 knowledge_new_modifile item_add_class">
                    //               <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                    //                   <img style="margin: unset !important;" style="margin: unset !important;" src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" class="img-fluid blur-up lazyload div_css_item_img p-2"
                    //                   alt="${value.title}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                    //               </a>
                    //           </div>
                    //             <div class="product-slider-detail category_namne_obj">
                    //                <div>
                    //                    <div class="blog-label">
                    //                       <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i></i> <span class="title_font_item">${value.publishedAt ? moment(value.publishedAt).format("DD-MM-YYYY") : moment(value.createdAt).format("DD-MM-YYYY")}</span></span>
                                           

                    //                    </div>
                    //                        <span data-toggle="tooltip" data-placement="top" title="${value.categoryObj?.name}" class="knowledge_category_item category_clamp_title text-uppercase">${value.categoryObj?.name}</span>
                    //                    <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}" data-bs-toggle="tooltip" data-bs-placement="right" title="" class="d-block">
                    //                        <span class="mt-1 text-title name_clamp knowledge_detail_titile_item">${value.title}</span>
                    //                    </a>
                    //                </div>
                    //              </div>
                    //       </div>
                    //   </div>`
                    `<div>
                           <div class="product-box-4 wow fadeInUp div_css_item">
                               <div class="product-image-2 knowledge_new_modifile">
                                   <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                       <img style="margin: unset !important;" style="margin: unset !important;" data-src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" class="img-fluid p-2 blur-up lazyload div_css_item_img"
                                       alt="${value.title}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                   </a>
                               </div>
                               <div class="product-detail div_css_item_name">
                                   <div class="blog-label">
                                         <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i> <span class="knowledge_title_item_custom">${value.publishedAt ? moment(value.publishedAt).format("DD-MM-YYYY") : moment(value.createdAt).format("DD-MM-YYYY")}</span></span>
                                     
                                   </div>
                                   <span data-toggle="tooltip" data-placement="top" title="${value.categoryObj?.name}" class="knowledge_category_item category_clamp_title text-uppercase">${value.categoryObj?.name}</span>
                                   <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}" data-toggle="tooltip" data-placement="top" title="${value.title}">
                                       <h1 class="name_clamp knowledge_title_item_custom font_item_modifeil mt-2">${value.title}</h1>
                                   </a> 
                               </div>
                           </div>
                       </div>`
        });
    } else {
        itemHtml = `<div class="d-flex align-items-center flex-column mx-auto">
                       <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                       <span class="text-muted">Không có dữ liệu!</span>
                     </div>`
    }

    var childHtml = '';

    $.each(obj?.listChild, function (index, value) {
        childHtml += `<li class="nav-item" onclick="OnchangeSlideNews(${obj?.idx}, ${value.id}, ${obj?.id}, '${obj?.name}', '${value?.metaUrl}', '${obj?.metaUrl}',2)">
                          <button class="nav-link btn text-uppercase" id="cooking-tab" data-bs-toggle="tab" data-bs-target="#cooking"
                                  type="button">
                             ${value.name}
                          </button>
                       </li>`;
    })
    /*var categoryIdC2 = ""*/
    var metaUrl = "";
    var html = ''
    html = `<div class="product-section-3 slide_news_${obj?.id}">
                <div class="container-fluid-lg py-2 ${obj?.idx % 2 === 0 ? 'bg_class' : ''}">
                  <div class="title">
                                <h2>${obj?.name}</h2>
                            </div>
                    <div class="title title-flex-2">
                           
                        <ul class="slide_btn_tab scroll_nav_css nav nav-tabs tab-style-color-2 tab-style-color" id="myTab">
                            <li class="nav-item">
                                <button class="nav-link btn active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all"
                                        type="button">
                                    TẤT CẢ
                                </button>
                            </li>
                           ${childHtml}
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="div_slide_knowledge img-slider" data-parent-id="${obj?.id}">
                            ${itemHtml}
                             </div>
                               <div class="div_btn_slide_knowledge">
                                    <button class="prev-btn_knowledge_${obj?.id} btn_prev">  <i class="fas fa-chevron-left"></i></button>
                                    <button class="next-btn_knowledge_${obj?.id} btn_next"> <i class="fas fa-chevron-right"></i></button>
                                </div>
                        </div>
                    </div>
                    <div class="row text-center p-3"><a href="/danh-sach-kien-thuc/${obj?.metaUrl}">Xem thêm</a></div>
                </div>
             </div>`
    if (obj?.id == lastIndex) {
        setTimeout(function () {
            CheckSuccessAll()
        }, 300)
    }
    return listNewsHtml.push(html)
}

function OnchangeSlideNews(idx, id, parentId, parentName, metaUrl, metaUrlParent, type) {
    var listNewsCate = []
    $.ajax({
        type: 'GET',
        url: '/Knowledge/GetListNewsCategoryBySupplierIdSequenceStatusParentId',
        dataType: "json",
        data: {
            parentId: parentId
        },
        success: function (response) {
            if (response.result !== 1) {
                divProductSeaFood.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductHotAgricultural();">
                            </i>
                        </div>`);
                return false;
            }
            var listData = response.data;
            if (listData != null && listData.length > 0) {
                for (var i = 0; i < listData.length; i++) {
                    listNewsCate.push(listData[i])
                }
            }
        },
        error: function (error) {
            divProductSeaFood.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListProductHotAgricultural();">
                        </i>
                    </div>`);
            console.log("Error when loading hot agricultural products!");
        }
    });

    setTimeout(function () {
        ShowOverlay(`.slide_news_${parentId}`)
        $.ajax({
            type: 'GET',
            url: '/Knowledge/GetListNewsByNewsCategoryIdType',
            data: {
                id: id,
                typeId: type == 2 ? 2 : 1,
            },
            dataType: "json",
            success: function (response) {
                HideOverlay(`.slide_news_${parentId}`)
                if (response.result !== 1) {
                    divKnowledgeSeaFood.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListKnowledgeSeaFood();">
                            </i>
                        </div>`);
                    return false;
                }
                var listDataNews = response.data;
                var itemHtml = '';
                var starHtml = '';
                var star = '';
                var arrayStar = '';
                const FULL_STAR_HTML = '<span class="star">&#9733;</span>';
                const HALF_STAR_HTML = `<span class="star half-star">&#9733;</span>`;
                //Item Product
                if (listDataNews != null && listDataNews.length > 0) {
                   
                    $.each(listDataNews, function (key, value) {
                        if (value.star > 0) {
                            star = '', starHtml = '', arrayStar = '';
                            star = value.star + "";
                            if (star.includes(".")) {
                                arrayStar = star.split(".")
                                if (arrayStar.length > 1) {
                                    //TH: Haft star
                                    var starsFullHtml = '', startHalfHtml = '';
                                    for (var i = 0; i < parseInt(arrayStar[0]); i++) {
                                        starsFullHtml += FULL_STAR_HTML;
                                    }
                                    if (arrayStar[arrayStar.length - 1] > 0) {
                                        startHalfHtml = HALF_STAR_HTML
                                    }
                                    starHtml = starsFullHtml + startHalfHtml
                                }
                                //TH: Haft star
                                else {
                                    for (var i = 0; i < parseInt(arrayStar[0]); i++) {
                                        starHtml += FULL_STAR_HTML;
                                    }
                                }
                            }
                            //TH: Full star
                            else {
                                for (var i = 0; i < parseInt(star.split(".")[0]); i++) {
                                    starHtml += FULL_STAR_HTML;
                                }
                            }
                        }
                        itemHtml += 
                       
                                `<div>
                                     <div class="product-box-4 wow fadeInUp div_css_item">
                                         <div class="product-image-2 knowledge_new_modifile">
                                             <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                                 <img style="margin: unset !important;" data-src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" class="img-fluid p-2 blur-up lazyload div_css_item_img"
                                                 alt="${value.name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                             </a>
                                         </div>
                                         <div class="product-detail div_css_item_name">
                                           <div class="blog-label">
                                                 <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i> <span class="knowledge_title_item_custom">${value.publishedAt ? moment(value.publishedAt).format("DD-MM-YYYY") : moment(value.createdAt).format("DD-MM-YYYY")}</span></span>
                                            
                                            </div>
                                          
                                             <span data-bs-toggle="tooltip" data-bs-placement="top" title="${value.categoryObj?.name}" class="knowledge_category_item category_clamp_title text-uppercase">${value.categoryObj?.name}</span>
                                             <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}" data-toggle="tooltip" data-placement="top" title="${value.title}">
                                                 <h1 class="name_clamp knowledge_title_item_custom mt-2">${value.title}</h1>
                                             </a>
                                         </div>
                                     </div>
                                  </div>`
                    });
                } else {
                    itemHtml = `<div class="d-flex align-items-center flex-column mx-auto">
                                 <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                                 <span class="text-muted">Không có dữ liệu!</span>
                               </div>`
                }

                var html = '';
                var childHtml = '';
                $.each(listNewsCate, function (key, item) {
                    childHtml += `<li class="nav-item" onclick="OnchangeSlideNews(${idx},${item.id}, ${parentId}, '${parentName}','${item.metaUrl}','${metaUrlParent}', 2)">
                                         <button class="nav-link btn text-uppercase ${item.id == id ? 'active' : ''}" id="cooking-tab" data-bs-toggle="tab" data-bs-target="#cooking"
                                                 type="button">
                                            ${item.name}
                                         </button>
                                  </li>`;
                })
                html = `<div class="container-fluid-lg ${idx % 2 === 0 ? 'div_img' : ''}">
                             <div class="title">
                                <h2>${parentName}</h2>
                            </div>
                              <div class="title title-flex-2">
                                  <ul class="slide_btn_tab scroll_nav_css nav nav-tabs tab-style-color-2 tab-style-color" id="myTab">
                                      <li class="nav-item" onclick="OnchangeSlideNews(${idx},${parentId}, ${parentId}, '${parentName}','${metaUrlParent}','${metaUrlParent}',1)">
                                          <button class="nav-link btn ${id == parentId ? 'active' : ''}" id="all-tab" data-bs-toggle="tab" data-bs-target="#all"
                                                  type="button">
                                              TẤT CẢ
                                          </button>
                                      </li>
                                     ${childHtml}
                                  </ul>
                              </div>
                              <div class="row">
                                  <div class="col-12">
                                      <div class="div_slide_knowledge_${parentId} img-slider">
                                             ${itemHtml}
                                       </div>
                                          <div class="div_btn_slide_knowledge">
                                                <button class="prev-btn_knowledge_${parentId} btn_prev">  <i class="fas fa-chevron-left"></i></button>
                                                <button class="next-btn_knowledge_${parentId} btn_next"> <i class="fas fa-chevron-right"></i></button>
                                            </div>
                                  </div>
                              </div>
                              <div class="row text-center p-3"><a href="/danh-sach-kien-thuc/${metaUrl}">Xem thêm</a></div>
                        </div`
                childHtml = ''
                //Init
                $(`.slide_news_${parentId}`).html(html)
                $(`.div_slide_knowledge_${parentId}`).slick({
                    arrows: true,
                    infinite: false,
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    autoplay: false,
                    mobile: true,
                    dots: true,
                    prevArrow: $(`.prev-btn_knowledge_${parentId}`),
                    nextArrow: $(`.next-btn_knowledge_${parentId}`),
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
                                slidesToShow: 1,
                            }
                        },
                    ]
                });
            },
            error: function (error) {
                divProductSeaFood.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListKnowledgeSeaFood();">
                        </i>
                    </div>`);
                console.log("Error when loading hot agricultural products!");
            }
        });
    }, 300)
}

function CheckSuccessAll() {
    $('#div_main_data_list').html(listNewsHtml.reverse().join(''))
    $('#div_main_data_list').slideDown(300);
    $(`.div_slide_knowledge`).each(function () {
        const parentId = $(this).attr('data-parent-id');
        $(this).slick({
            arrows: true,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            autoplay: false,
            mobile: true,
            dots: true,
            prevArrow: $(`.prev-btn_knowledge_${parentId}`),
            nextArrow: $(`.next-btn_knowledge_${parentId}`),
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
                    breakpoint: 430,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    });

}
