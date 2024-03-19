
var $categoryIdEl = $('#input_category_id'),
    $pageEl = $('#input_page'),
    $recordEl = $('#input_record'),
    divProduct = $('#div_main_data');
$typeEl = $('#input_type');
var listProductHtml = [];
var lastIndex = "";
var sorted = false;

$(document).ready(function () {
    setTimeout(function() {
         LoadlistCategory();
    },300)
});


function LoadlistCategory() {
    try {
        ShowOverlay("#div_main_data_list");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListProductCategory',
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_main_data_list");
                if (response.result !== 1) {
                    divProduct.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadlistCategory();">
                            </i>
                        </div>`);
                    return false;
                }
                var listProductCategory = response.data;
                if (!sorted) {
                    listProductCategory.sort((a, b) => a.reOrder - b.reOrder);
                    sorted = true;
                }

                if (listProductCategory != null && listProductCategory.length > 0) {
                    GetListProduct(JSON.stringify(listProductCategory))
                } else {
                    $("#div_main_data_list").html(` 
                        <div class="d-flex align-items-center flex-column mx-auto">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không có dữ liệu!</span>
                        </div>`);
                }
            },
            error: function (error) {
                HideOverlay("#div_main_data_list");
                divProduct.html(`
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
        HideOverlay("#div_main_data_list");
        divProduct.html(`
            <div class="text-center p-2">
                <i type="button" class="fa fa-refresh"
                    style="border-radius:4px;font-size:24px;"
                    onclick="LoadListProductHotAgricultural();">
                </i>
            </div>`);
        console.log("Error when loading hot agricultural products!");
    }
}

function GetListProduct(listCategory) {
    let data = JSON.parse(listCategory)/*.reverse()*/
    data.sort((a, b) => a.reOrder - b.reOrder);
    var obj = {};
    $.each(data, function (key, item) {
        if (item.id == Seafood) {
            var fullListC3 = [];
            if (item.menuChildSecondObjs != null && item.menuChildSecondObjs.length > 0) {
                $.each(item.menuChildSecondObjs, function (key, itemLv2) {
                    if (itemLv2.menuChilThirdObjs != null && itemLv2.menuChilThirdObjs.length > 0) {
                        $.each(itemLv2.menuChilThirdObjs, function (idx, value) {
                            fullListC3.push(value)
                        })
                    };
                });
            };
            obj = {
                idx: key,
                listChild: fullListC3,
                id: item.id,
                name: item.name,
                metaUrl: item.metaUrl,
            };
        }
        else {
            obj = {
                idx: key,
                listChild: item.menuChildSecondObjs,
                id: item.id,
                name: item.name,
                metaUrl: item.metaUrl,
            };
        }

        CallDataAjax(obj)
        if (item.id == data[data.length - 1].id) {
            lastIndex = data[data.length - 1].id
        }
    })
    //for (var i = 0; i < data.length; i++) {

    //}
}

function CallDataAjax(obj) {
    var divKnowledgeSeaFood = ''
    //check category seafood
    //if (obj.id == Seafood) {
    //    return $.ajax({
    //        type: 'GET',
    //        url: '/Product/GetListProductByCategoryIdSecond',
    //        data: {
    //            id: obj?.id,
    //            type: 3,
    //        },
    //        dataType: "json",
    //        success: function (response) {
    //            console.log(response);
    //            if (response.result !== 1) {
    //                divKnowledgeSeaFood.html(`
    //                    <div class="text-center p-2">
    //                        <i type="button" class="fa fa-refresh"
    //                            style="border-radius:4px;font-size:24px;"
    //                            onclick="LoadListKnowledgeSeaFood();">
    //                        </i>
    //                    </div>`);
    //                return false;
    //            }
    //            var listData = response.data;
    //            RawData(listData, obj)
    //        },
    //        error: function (error) {
    //            divProduct.html(`
    //                <div class="text-center p-2">
    //                    <i type="button" class="fa fa-refresh"
    //                        style="border-radius:4px;font-size:24px;"
    //                        onclick="LoadListKnowledgeSeaFood();">
    //                    </i>
    //                </div>`);
    //            console.log("Error when loading hot agricultural products!");
    //        }
    //    });
    //} else {
    return $.ajax({
        type: 'GET',
        url: '/Product/GetListProductByCategoryIdSecond',
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
            divProduct.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListKnowledgeSeaFood();">
                        </i>
                    </div>`);
            console.log("Error when loading hot agricultural products!");
        }
    });
    //}

}

async function RawData(listData, obj) {
    if (listData != null && listData.length > 0) {
        var itemHtml = '';
        $.each(listData, function (key, value) {
            itemHtml += `<div>
                           <div class="p-0 product-box-4 wow fadeInUp text-white card_product_wrapper">
                               <div class="product-image-2 product_res_css">
                                   <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}">
                                       <img style="margin: unset !important" data-src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                       class="img-fluid blur-up lazyload custom_image_all"
                                       alt="${value.name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                   </a>
                               </div>
                               <div class="product-detail div_product_css py-1 px-2" style="margin-top: unset !important">
                              
                               <span class="category_clamp_title product_item_category_css text-uppercase">${value.categoryObj?.name}</span>
                                   <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}" data-toggle="tooltip" data-placement="top" title="${value.name}">
                                       <span class="name_clamp clamp_name_title mt-2 font_item_modifeil" style="max-width: 100%;font-size: 16px">${value.name}</span>
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
    var listCateLV3 = [];
    var typeGetList = 2;
    $.each(obj?.listChild, function (index, value) {
        typeGetList = 2;
        if (value.menuChilThirdObjs != null && value.menuChilThirdObjs.length > 0) {
            $.each(value.menuChilThirdObjs, function (index, itemCategoryLv3) {
                listCateLV3.push(itemCategoryLv3.id)
            })
        }
        if (obj?.id == Seafood) {
            typeGetList = 3
        }
        childHtml += `<li class="nav-item" onclick="OnchangeProduct(${obj?.idx}, ${value.id}, ${obj?.id}, '${obj?.name}','${value?.metaUrl}','${obj?.metaUrl}',${typeGetList})">
                          <button class="nav-link btn text-uppercase" data-bs-toggle="tab" data-bs-target="#cooking"
                                  type="button">
                             ${value.name}
                          </button>
                       </li>`;
    })
    //listCateLV3.toString()
    var metaUrl = "";
    var html = ''

    html = `<div class="product-section-3 slide_news_${obj?.id}">
                <div class="container-fluid-lg py-2 ${obj?.idx % 2 === 0 ? 'div_img' : ''} pt-1">
                     <div class="title">
                             <h2 class="p-2">Danh sách ${obj?.name}</h2>
                        </div>
                    <div class="title title-flex-2">
                        <ul class="slide_btn_tab scroll_nav_css nav nav-tabs tab-style-color-2 tab-style-color" id="myTab">
                            <li class="nav-item">
                                <button class="nav-link btn btn_category_product active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all"
                                        type="button">
                                    TẤT CẢ
                                </button>
                            </li>
                           ${childHtml}
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="div_slide_product img-slider" data-parent-id="${obj?.id}">
                            ${itemHtml}
                             </div>
                                <div class="div_btn_slide_product">
                                    <button class="prev_btn_slide_product_${obj?.id} prev-btn_product">  <i class="fas fa-chevron-left"></i></button>
                                    <button class="next_btn_slide_product_${obj?.id} next-btn_product"> <i class="fas fa-chevron-right"></i></button>
                                </div>
                        </div>
                    </div>
                    <div class="row text-center py-2"><a href="/danh-sach-san-pham/${obj?.metaUrl}">Xem thêm</a></div>
                </div>
             </div>`
    listCateLV3 = [];
    if (obj?.id == lastIndex) {
        setTimeout(function () {
            CheckSuccessAll()
        }, 300)
    }
    return listProductHtml.push(html)
}

function OnchangeProduct(idx, id, parentId, parentName, metaUrl, metaUrlParent, type) {
/*    $('.btn_category_product').removeClass('active');*/
    var listProductCate = []
    if (parentId == Seafood) {
        $.ajax({
            type: 'GET',
            url: '/Product/getListCategoryById',
            dataType: "json",
            data: {
                parentId: parentId
            },

            success: function (response) {
                if (response.result !== 1) {
                    divProduct.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductHotAgricultural();">
                            </i>
                        </div>`);
                    return false;
                }
                var listData = response.data;
                listProductCate = []
                if (listData != null && listData.length > 0) {
                    for (var i = 0; i < listData.length; i++) {
                        listProductCate.push(listData[i])
                    }
                }
            },
            error: function (error) {
                divProduct.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListProductHotAgricultural();">
                        </i>
                    </div>`);
                console.log("Error when loading hot agricultural products!");
            }
        });
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/Product/GetListCategoryBySupplierIdParentId',
            dataType: "json",
            data: {
                parentId: parentId
            },

            success: function (response) {
                if (response.result !== 1) {
                    divProduct.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductHotAgricultural();">
                            </i>
                        </div>`);
                    return false;
                }
                var listData = response.data;
                listProductCate = []
                if (listData != null && listData.length > 0) {
                    for (var i = 0; i < listData.length; i++) {
                        listProductCate.push(listData[i])
                    }

                }
            },
            error: function (error) {
                divProduct.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListProductHotAgricultural();">
                        </i>
                    </div>`);
                console.log("Error when loading hot agricultural products!");
            }
        });
    }

   

    setTimeout(function () {

        ShowOverlay(`.slide_news_${parentId}`)
        $.ajax({
            type: 'GET',
            url: '/Product/GetListProductByCategoryIdSecond',
            data: {
                id: id,
                typeId: type,
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
                                 <div class="product-box-4 wow fadeInUp bg-img_item_css p-0 card_product_wrapper">
                                     <div class="product-image-2 product_res_css">
                                         <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}">
                                             <img style="margin: unset !important" src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                             class="img-fluid blur-up lazyload custom_image_all"
                                             alt="${value.name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                         </a>
                                     </div>
                                     <div class="product-detail div_product_css px-2 py-1" style="margin-top: unset !important">
                                      
                                         <span class="category_clamp_title product_item_category_css text-uppercase">${value.categoryObj?.name}</span>
                                         <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}" data-toggle="tooltip" data-placement="top" title="${value.name}">
                                             <span class="name_clamp clamp_name_title mt-2 font_item_modifeil" style="max-width: 100%;font-size: 16px">${value.name}</span>
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
                var activeHtml = '';
                var typeGetlist = 2;
                if (listProductCate != null && listProductCate.length > 0) {
                   
                    listProductCate = listProductCate.reverse()
                }
                $.each(listProductCate, function (key, item) {
                    typeGetlist = 2;
                    activeHtml = '';
                    if (parentId == Seafood) {
                        typeGetlist = 3
                        if (item.metaUrl == metaUrl) {
                            activeHtml = 'active'
                        }
                    }
                    else {
                        if (item.id == id) {
                            activeHtml = 'active'
                        }
                    }
                    childHtml +=
                        `<li class="nav-item" onclick="OnchangeProduct(${idx}, ${item.id}, ${parentId}, '${parentName}','${item.metaUrl}', '${metaUrlParent}', ${typeGetlist})">
                                         <button class="nav-link text-uppercase btn_category_product btn ${activeHtml}"
                                                 type="button">
                                            ${item.name}
                                         </button>
                                  </li>`;
                })
               
                html =
                    `<div class="product-section-3">
                        <div class="container-fluid-lg py-5 ${idx % 2 === 0 ? 'div_img' : ''}">
                             <div class="title">
                                     <h2 class="">Danh sách ${parentName}</h2>
                                </div>
                            <div class="title title-flex-2">
                               <ul class="slide_btn_tab scroll_nav_css nav nav-tabs tab-style-color-2 tab-style-color" id="myTab">
                                     <li class="nav-item" onclick="OnchangeProduct(${idx},${parentId}, ${parentId}, '${parentName}','${metaUrlParent}','${metaUrlParent}',1)">
                                         <button class="nav-link btn all-category-button  ${id == parentId ? 'active' : ''}"
                                                 type="button">
                                             TẤT CẢ 
                                         </button>
                                     </li>
                                    ${childHtml}
                                 </ul>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="div_slide_product_${parentId} img-slider">
                                    ${itemHtml}
                                     </div>
                                        <div class="div_btn_slide_product">
                                            <button class="prev_btn_slide_product_${parentId} prev-btn_product">  <i class="fas fa-chevron-left"></i></button>
                                            <button class="next_btn_slide_product_${parentId} next-btn_product"> <i class="fas fa-chevron-right"></i></button>
                                        </div>
                                </div>
                            </div>
                            <div class="row text-center p-3"><a href="/danh-sach-san-pham/${metaUrl}">Xem thêm</a></div>
                        </div>
                     </div>`

                childHtml = ''
                //Init
                $(`.slide_news_${parentId}`).html(html)
                $(`.div_slide_product_${parentId}`).slick({
                    arrows: true,
                    infinite: false,
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    autoplay: false,
                    mobile: true,
                    dots: true,
                    prevArrow: $(`.prev_btn_slide_product_${parentId}`),
                    nextArrow: $(`.next_btn_slide_product_${parentId}`),
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
                                dots: true
                            }
                        },
                        {
                            breakpoint: 680,
                            settings: {
                                slidesToShow: 2,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                                dots: true
                            }
                        },
                    ]
                });
            },
            error: function (error) {
                divProduct.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListKnowledgeSeaFood();">
                        </i>
                    </div>`);
                console.log("Error when loading hot agricultural products!");
            }
        });

/*        $(`.btn_category_product[data-bs-target="#all"]`).addClass('active');*/
    }, 300)


}

function CheckSuccessAll() {
    $('#div_main_data_list').html(listProductHtml.reverse().join(''))
    $('#div_main_data_list').slideDown(200);

    $(`.div_slide_product`).each(function () {
        const parentId = $(this).attr('data-parent-id');
        $(this).slick({
            arrows: true,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            autoplay: false,
            mobile: true,
            dots: true,
            prevArrow: $(`.prev_btn_slide_product_${parentId}`),
            nextArrow: $(`.next_btn_slide_product_${parentId}`),
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
                        dots: true,
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        dots: true,
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        dots: true,
                        slidesToShow: 1,
                    }
                },
            ]
        });
    });


}