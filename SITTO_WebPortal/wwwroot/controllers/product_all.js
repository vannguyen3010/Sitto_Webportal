var $pageEl = $('#input_page'),
    $recordEl = $('#input_record'),
    $typeEl = $('#input_type'),
    $listCategoryIdEl = $('#input_categoryId')

$(document).ready(function () {
    LoadListMainData();


    $('.slide_btn_tab').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

const dataParms = function () {

    let parentId = $(".btn_tab.active").val();
    return {
        sequenceCategoryId: parentId,
        page: parseInt($pageEl.val()),
        recordNumber: parseInt($recordEl.val()),
    }
}

function OnchangeListProdutHotAgricultural(elm, e) {
    e.preventDefault()
    e.stopPropagation()
    $('.btn_tab.active').removeClass("active");
    setTimeout(function myfunction() {
        $(elm).addClass("active");
        LoadListMainData();
    }, 300)
}

//Load list main data
function LoadListMainData() {
    var data = dataParms()
    try {
        ShowOverlay("#div_main_data");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListProductByCategoryIdPagination',
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
                var starHtml = '';
                var star = '';
                var arrayStar = '';
                const FULL_STAR_HTML = '<span class="star">&#9733;</span>';
                const HALF_STAR_HTML = `<span class="star half-star">&#9733;</span>`;
                if (listData != null && listData.length > 0) {

                    $.each(listData, function (key, value) {
                        //TH: Haft star
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
                        tmpHtml +=
                            `  <div>
                                    <div class="product-box-3 h-100 wow fadeInUp product_div_box_css">
                                        <div class="">
                                            <div class="product-image product_set_height_css bg-white hover_fly">
                                                <a href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}">
                                                    <img data-src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                                         class="img-fluid p-1 blur-up lazyload custom_image_all_product" alt="${value.name}"
                                                         onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                                </a>
                                            </div>
                                        </div>
                                        <div class="product-footer product_footer_item bg-white border_all_radius">
                                            <div class="product-detail p-2 div_item_know_css">
                                               
                                                <span class="category_clamp_title product_item_category_css">${value.categoryObj?.name}</span>

                                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.name}" href="/san-pham/${value.categoryObj.metaUrl}/${value.metaUrl}">
                                                    <h5 class="name mt-2 font_item_modifeil product_all_name_item">${value.name}</h5>
                                                </a>
                                               
                                            </div>
                                        </div>  
                                    </div>
                                </div>`
                    });
                    document.getElementById("div_main_data").innerHTML = tmpHtml;
                }
                else {
                    document.getElementById("div_main_data").innerHTML = _imgNotFoundHtml;
                }
                var totalRecord = parseInt(response.data2nd);
                var currentPage = parseInt(data.page);
                var pageSize = parseInt(data.recordNumber);
                var pagination = LoadPagination(totalRecord, pageSize, currentPage);
                $('#ul_main_pagination').html(pagination);
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

//When click pagination 
function ChangePage(page, e, elm) {
    e.preventDefault();
    ScrollToTop('.shop-section', 70, 500);
    $pageEl.val(page);

    //Change Link
    var newHref = $(elm).attr("href");
    ChangeURLWithOut("", newHref);

    //Get List
    LoadListMainData();
}

//Load Pagination Page
function LoadPagination(totalRecords, pageSize = 12, currentPage) {
    var pageDisplay = 5;
    var totalPage = Math.ceil(totalRecords / pageSize);
    //Check currentPage error
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    var startPage = parseInt(Math.max(1, Math.ceil(currentPage - pageDisplay / 2)));
    var endPage = parseInt(Math.min(totalPage, currentPage + pageDisplay / 2));

    if (totalPage > 1) {
        var html = '';
        let link = GetLink();
        if (currentPage > 1) {
            html += `
                <li class="page-item">
                    <a class="page-link" href="${link}record=${pageSize}&page=${currentPage - 1}" title="Trang trước" onclick="ChangePage(${currentPage - 1},event,this)"
                    aria-label="Previous">
                        <span aria-hidden="true">
                            <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        </span> 
                        <span class="sr-only">Previous</span>
                    </a>
                </li>`;
        }
        for (var i = startPage; i <= endPage; i++) {
            if (currentPage == i) {
                html += `<li class="page-item active">
                            <a class="page-link">${currentPage}</a>
                        </li>`;
            }
            else {
                html += `<li class="page-item">
                            <a class="page-link" href="${link}record=${pageSize}&page=${i}" onclick="ChangePage(${i},event,this)" title="Trang ${i}">${i}</a>
                        </li>`;
            }
        }
        if (currentPage < totalPage) {
            html += `<li class="page-item">
                        <a class="page-link"  href="${link}record=${pageSize}&page=${currentPage + 1}" title="Trang kế tiếp"  onclick="ChangePage(${currentPage + 1},event,this)"
                            aria-label="Next">
                            <span aria-hidden="true">
                                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            </span> 
                            <span class="sr-only">Next</span>
                        </a>
                    </li>`;
        }
        return html;
    }

    else {
        //NoData
        return "";
    }
}

//Get Url Link
function GetLink() {
    var str = window.location.search.substring(1);
    var res = str.split("&");
    var test = res.splice(-2, 2);
    var link = "";
    if (test[0].indexOf("record") > -1 && test[1].indexOf("page") > -1) {
        res.forEach(function (item, index) {
            link += item + "&";
        });
    }
    else {
        if (str == "") {
            link = str;
        }
        else {
            link = str + "&";
        }
    }
    return window.location.pathname + "?" + link;
}