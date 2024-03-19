/*var laddaAddToCart = Ladda.create(document.querySelector('#btn_agricultural'));*/

$(document).ready(function () {


    LoadLisAboutUs();
    LoadListMainDataTools();
    setTimeout(function () {
        $('.slider_popup').slick({
            infinite: true,
            speed: 2200,
            cssEase: 'linear',
            slidesToShow: 1,
            dots: true,
            autoplay: true, // Tự động trượt qua các ảnh
            autoplaySpeed: 3000, // Thời gian hiển thị mỗi ảnh trước khi chuyển sang ảnh tiếp theo (đơn vị: milliseconds)
            fade: true,
            slidesToScroll: 1,
        });
        $("#myModal").fadeIn();
    }, 800);
    window.addEventListener("click", function (event) {
        //if (event.target == modal) {
        //    //modal.style.display = "none";
        //}
        $("#myModal").fadeOut(100);
    });

    $('#btn_all_agriculture').attr("data-url", Agiricultal);
    $('#btn_seafood').attr("data-url", Seafood);
    $('#btn_all_know_agricultural').attr("data-url", KnowAgricultal);
    $('#btn_all_know_seafood').attr("data-url", KnowSeafood);
    $(".div_slide_support").slick({
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: false,
        mobile: true,
        dots: true,
        slidesToScroll: 5,
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
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
        ]
    });
    //popup

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
    $(".slider_support").slick({
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
    /**Slide Banner start*/

    $('.slider_banner_header_top').slick({
        infinite: true,
        speed: 2200,
        cssEase: 'linear',
        slidesToShow: 1,
        dots: true,
        autoplay: true, // Tự động trượt qua các ảnh
        autoplaySpeed: 3000, // Thời gian hiển thị mỗi ảnh trước khi chuyển sang ảnh tiếp theo (đơn vị: milliseconds)
        fade: true,
        prevArrow: $('.prev-btn'),
        nextArrow: $('.next-btn'),
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    /**Slide Banner end*/
    /**Slide News */
    $('.slide_list_new').slick({
        infinite: true,
        cssEase: 'linear',
        arrows: true,
        autoplay: false, // Tự động trượt qua các ảnh
        autoplaySpeed: 3000,
        slidesToShow: 1,
        dots: false,
        prevArrow: $('.prev-btn_new_right'),
        nextArrow: $('.next-btn_new_right'),
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1300,
            settings: {
                slidesToShow: 1,
                autoplaySpeed: 2000,
            }
        },
        ]
    })
    $('.slide_list_new_product').slick({
        dots: true,
        infinite: true,
        rows: 4,
        cssEase: 'linear',
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        responsive: [{
            breakpoint: 1300,
            settings: {
                slidesToShow: 1,
                autoplaySpeed: 2000,
            }
        },
        ]
    })
    /**Slide end */
    /**Slide Tools start*/
    /**Slide Tools end*/
    /**Slide suppor*/

    $('.slider_user_slide').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        responsive: [{
            breakpoint: 1690,
            settings: {
                slidesToShow: 5,
                autoplay: true,
                autoplaySpeed: 2000,
            }
        },
        {
            breakpoint: 1190,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                fade: true,
            }
        },
        ]
    });
    /**Slide suppor end*/

    $(".btn_category_product.active").trigger("click");
    $(".btn_category_product_seafood.active").trigger("click");
    $(".btn_category_knowledge_agricultural.active").trigger("click");
    $(".btn_category_knowledge_seafood.active").trigger("click");


    $('.slider_popular_top_right').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        rows: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1510,
            settings: {
                slidesToShow: 4,
                rows: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3500,
                vertical: true,
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
                slidesToShow: 1,
                fade: true,
            }
        },
        ]
    });
    $('.slider_banner_mid_heder').slick({
        dots: true,
        infinite: true,
        speed: 1200,
        cssEase: 'linear',
        fade: true,
        slidesToShow: 1,
        autoplay: 5000,
        slidesToScroll: 1,
    });
    // sắp xếp theo thứ tự
    var idxCategorySeafood = 0, idxCategorAgricultural = 1;
    var listCategory = LIST_CATEGORY_ID
    if (listCategory != null && listCategory.length > 0) {
        $.each(listCategory, function (key, item) {
            if (item == Seafood) {
                idxCategorySeafood = key
            } else if (item == Agiricultal) {
                idxCategorAgricultural = key
            }
        })
    }
    if (parseInt(idxCategorySeafood) - parseInt(idxCategorAgricultural) > 0) {
        $('#div_product_agri_js').addClass("order-1")
        $('#div_product_seafood_js').addClass("order-2")
    } else {
        $('#div_product_seafood_js').addClass("order-1")
        $('#div_product_agri_js').addClass("order-2")
    }

    //sắp xếp theo thứ tự kiến thức
    var idxCategoryKnowSeafood = 0, idxCategorKnowAgricultural = 1;
    var listCategoryKnow = LIST_CATEGORY_KNOWLEDGE_ID
    if (listCategoryKnow != null && listCategoryKnow.length > 0) {
        $.each(listCategoryKnow, function (key, item) {
            if (item == Seafood) {
                idxCategoryKnowSeafood = key
            } else if (item == Agiricultal) {
                idxCategorKnowAgricultural = key
            } 
        })
    }
    if (parseInt(idxCategoryKnowSeafood) - parseInt(idxCategorKnowAgricultural) > 0) {
        $('#div_knowledge_js').addClass("order-1")
        $('#div_knowlegde_seafood_js').addClass("order-2")
    } else {
        $('#div_knowlegde_seafood_js').addClass("order-1")
        $('#div_knowledge_js').addClass("order-2")
    }
});
//Sản phẩm nông nghiệp
function removeClickEvents() {
    $(".btn_category_product").off("click");
}
function OnchangeListProdutHotAgricultural(elm, e) {

    /*laddaAddToCart.start();*/
    e.preventDefault()
    e.stopPropagation()
    $('.btn_category_product.active').removeClass("active");
    $(elm).addClass("active");
    $('#btn_all_agriculture').attr("data-url", $(elm).attr("data-url"));
    LoadListProductHotAgricultural();
}
function RedirectToAgricultural(elm) {
    var metaUrl = $(elm).attr("data-url");
    location.href = `/danh-sach-san-pham/${metaUrl}`;

}
function LoadListProductHotAgricultural() {
    let activeCategory = $(".btn_category_product.active");
    let parentId = activeCategory.val();
    let divProductSeaFood = $("#div_product_Agricultural");
    /*laddaAddToCart.start();*/
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListProductHotAgricultural',
            data: {
                parentId: parentId
            },
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
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
                    var starHtml = '';
                    var star = '';
                    var arrayStar = '';
                    const FULL_STAR_HTML = '<span class="star">&#9733;</span>';
                    const HALF_STAR_HTML = `<span class="star half-star">&#9733;</span>`;
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
                            `
                            <div style="height:100% !important">
                                <div style="padding: 0" class="product-box-4 wow fadeInUp div_product_item">
                                    <div class="product-image-2 div_img_product_item p-1 hover_fly">
                                        <a href="/san-pham/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <img style="margin: unset !important" data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/img_dev/error/product.png" : value.imageObj?.mediumUrl}"
                                                class="img-fluid blur-up lazyload p-2 custom_image_all" alt="${value.metaUrl}"
                                                onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                        </a>
                                    </div>

                                    <div style="padding: 0 7px;" class="product-detail div_detail_product_item">
                                        <span class="product_category_item clamp_name_clamp text-uppercase">${value.categoryObj?.name}</span>
                                        <a href="/san-pham/${value.categoryObj?.metaUrl}/${value.metaUrl}" data-bs-toggle="tooltip" data-bs-placement="top" title="${value.name}">
                                            <h1 class="name_clamp mt-2 font_item_modifeil" >${value.name}</h1>
                                        </a>
                                    </div>
                                </div>
                            </div>`;
                    });
                    $("#div_product_Agricultural").html(tmpHtml);
                    $('[data-toggle="tooltip"]').tooltip();
                    $("#div_product_Agricultural").attr('class', '');

                    $("#div_product_Agricultural").slick({
                        arrows: true,
                        infinite: false,
                        slidesToShow: 5,
                        slidesToScroll: 2,
                        rows: 1,
                        autoplay: false,
                        mobile: true,
                        dots: true,
                        prevArrow: $('.prev-btn_agriculture'),
                        nextArrow: $('.next-btn_agriculture'),
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
                                    dots: false
                                }
                            },
                            {
                                breakpoint: 680,
                                settings: {
                                    slidesToShow: 2,
                                    dots: false
                                }
                            },
                            {
                                breakpoint: 400,
                                settings: {
                                    slidesToShow: 2,
                                    dots: false
                                }
                            },
                        ]
                    });
                } else {
                    $("#div_product_Agricultural").html(`
                        <div class="d-flex align-items-center flex-column">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không có dữ liệu!</span>
                        </div>`);
                    /*   document.getElementById("div_product_agri_js").style.display = "none";*/
                }
            },
            error: function (error) {
                /*laddaAddToCart.stop();*/
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

//Slide sản phẩm thủy sản 
function removeClickEventsSeafood() {
    $(".btn_category_product_seafood").off("click");
}
function OnchangeListProdutHotSeaFood(elm, e) {

    e.preventDefault()
    e.stopPropagation()
    $('.btn_category_product_seafood.active').removeClass("active");
    $(elm).addClass("active");
    // Lấy thẻ a và danh sách các button
    $('#btn_seafood').attr("data-url", $(elm).attr("data-url"));
    LoadListProductHotSeaFood();
}
function RedirectToSeafood(elm) {
    var metaUrl = $(elm).attr("data-url");
    location.href = `/danh-sach-san-pham/${metaUrl}`;
}
function LoadListProductHotSeaFood() {
    let activeCategory = $(".btn_category_product_seafood.active");
    let parentId = activeCategory.val();
    let divProductSeaFood = $("#div_product_seafood");

    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListProductHotSeaFood',
            data: {
                parentId: parentId
            },
            dataType: "json",
            success: function (response) {
                if (response.result !== 1) {
                    divProductSeaFood.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductHotSeaFood();">
                            </i>
                        </div>`);
                    return false;
                }

                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
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
                        tmpHtml += `
                            <div>
                                <div style="padding: 0" class="product-box-4 wow fadeInUp bg-white">
                                    <div class="product-image-2 hover_fly">
                                        <a href="/san-pham/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <img style="margin: unset !important"  data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/img_dev/error/product.png" : value.imageObj?.mediumUrl}""
                                                class="img-fluid blur-up lazyload p-3 custom_image_all" alt="${value.metaUrl}"
                                                onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                        </a>
                                    </div>
                                    <div style="padding: 0 7px" class="product-detail div_detail_product_item">
                                       
                                        <span title="${value.categoryObj?.name}" class="clamp_name_clamp product_category_item text-uppercase">${value.categoryObj?.name}</span>
                                        <a href="/san-pham/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <h1 data-bs-toggle="tooltip" data-bs-placement="top" title="${value.categoryObj?.name}" class="name_clamp mt-2 font_item_modifeil">${value.name}</h1>
                                        </a>
                                    </div>
                                </div>
                            </div>`;
                    });
                    $("#div_product_seafood").html(tmpHtml);
                    $('[data-toggle="tooltip"]').tooltip();
                    $("#div_product_seafood").attr('class', '');


                    $("#div_product_seafood").slick({
                        arrows: true,
                        infinite: false,
                        slidesToShow: 5,
                        slidesToScroll: 2,
                        autoplay: false,
                        mobile: true,
                        dots: true,
                        slidesToScroll: 5,
                        prevArrow: $('.prev_btn_seafood'),
                        nextArrow: $('.next_btn_seafood'),
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
                                    slidesToScroll: 3,
                                    dots: false
                                }
                            },
                            {
                                breakpoint: 680,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    dots: false
                                }
                            },
                            {
                                breakpoint: 400,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    dots: false
                                }
                            },
                        ]
                    }).trigger("resize");
                } else {
                    $("#div_product_seafood").html(`
                        <div class="d-flex align-items-center flex-column">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không có dữ liệu!</span>
                        </div>`);
                    /* document.getElementById("div_product_seafood_js").style.display = "none";*/
                }
            },
            error: function (error) {
                divProductSeaFood.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListProductHotSeaFood();">
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
                    onclick="LoadListProductHotSeaFood();">
                </i>
            </div>`);
        console.log("Error when loading hot agricultural products!");
    }
}

//Kiến thức Nông Nghiệp
function removeClickEventKnowledgeAgricultural() {
    $(".btn_category_knowledge_agricultural").off("click");
}
function OnchangeListKnowledgeHotAgricultural(elm, e) {
    e.preventDefault()
    e.stopPropagation()

    $('.btn_category_knowledge_agricultural.active').removeClass('active')
    $(elm).addClass('active')
    $('#btn_all_know_agricultural').attr("data-url", $(elm).attr("data-url"));
    LoadListKnowledgeAgricultural()
}
function RedirectToKnowAgricultural(elm) {
    var metaUrl = $(elm).attr("data-url");
    location.href = `/danh-sach-kien-thuc/${metaUrl}`;
}
const dataParam = function myfunction() {
    var data = {
        id: $('.btn_category_knowledge_agricultural.active').val(),
        typeId: $('.btn_category_knowledge_agricultural.active').val() == 11 ? 1 : 2
    }
    return data;
}
function LoadListKnowledgeAgricultural() {
    let divKnowledgeSeafood = $("#div_knowledge_Agricultural");
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListNewsCategoryKnowledgeAgricultural',
            data: dataParam(),
            dataType: "json",
            success: function (response) {
                if (response.result !== 1) {
                    divKnowledgeSeafood.html(`
                        <div class="text-center p-2">
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListKnowledgeAgricultural();">
                            </i>
                        </div>`);
                    return false;
                }

                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
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
                        tmpHtml +=

                            `
                            <div>
                                <div style="padding: 0" class="product-box-4 wow fadeInUp">
                                    <div class="product-image-2 hover_fly">
                                        <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <img style="object-fit: cover;margin: unset !important"  data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/img_dev/error/product.png" : value.imageObj?.mediumUrl}"
                                                class="img-fluid blur-up lazyload p-2 h-100 w-100" alt="${value.metaUrl}"
                                                onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                        </a>
                                    </div>
                                    <div style="padding: 0 7px;" class="product-detail div_detail_knowledge_item">
                                         <div class="blog-label">
                                             <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i></i> <span class="title_font_item">${value.publishedAt ? moment(value.publishedAt).format("DD-MM-YYYY") : moment(value.createdAt).format("DD-MM-YYYY")}</span></span>
                                               
                                             </div>
                                        <span class="clamp_name_clamp product_category_item text-uppercase">${value.categoryObj?.name}</span>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <h1 class="name_clamp mt-2 font_item_modifeil">${value.title}</h1>
                                        </a>
                                    </div>
                                </div>
                            </div>`;
                    });
                    $("#div_knowledge_Agricultural").html(tmpHtml);
                    $('[data-toggle="tooltip"]').tooltip();
                    $("#div_knowledge_Agricultural").attr('class', '');

                    $("#div_knowledge_Agricultural").slick({
                        arrows: true,
                        infinite: false,
                        slidesToShow: 5,
                        slidesToScroll: 2,
                        autoplay: false,
                        mobile: true,
                        dots: true,
                        slidesToScroll: 5,
                        prevArrow: $('.div_btn_slide_product .prev-btn_knowledge'),
                        nextArrow: $('.div_btn_slide_product .next-btn_knowledge'),
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
                                    slidesToScroll: 3
                                }
                            },
                            {
                                breakpoint: 680,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 400,
                                settings: {
                                    slidesToShow: 1,
                                }
                            },
                        ]
                    }).trigger("resize");
                } else {
                    $("#div_knowledge_Agricultural").html(`
                        <div class="d-flex align-items-center flex-column">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không có dữ liệu!</span>
                        </div>`);
                    /* document.getElementById("div_knowledge_js").style.display = "none";*/
                }
            },
            error: function (error) {
                divProductSeaFood.html(`
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListKnowledgeAgricultural();">
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
                    onclick="LoadListKnowledgeAgricultural();">
                </i>
            </div>`);
        console.log("Error when loading hot agricultural products!");
    }
}

//Kiên thức thủy sản
function removeClickEventKnowSeafood() {
    $(".btn_category_knowledge_seafood").off("click");
}
function OnchangeListKnowledgeHotSeafood(elm, e) {
    e.preventDefault()
    e.stopPropagation()

    $('.btn_category_knowledge_seafood.active').removeClass('active')
    $(elm).addClass('active')
    removeClickEventKnowSeafood();
    $('#btn_all_know_seafood').attr("data-url", $(elm).attr("data-url"));
    LoadListKnowledgeSeaFood();
}
function RedirectToKnowSeafood(elm) {
    var metaUrl = $(elm).attr("data-url");
    location.href = `/danh-sach-kien-thuc/${metaUrl}`;
}
const dataSeafood = function myfunction() {
    var data = {
        id: $('.btn_category_knowledge_seafood.active').val(),
        typeId: $('.btn_category_knowledge_seafood.active').val() == 12 ? 1 : 2
    }
    return data;
}
function LoadListKnowledgeSeaFood() {
    let divKnowledgeSeaFood = $("#div_knowledge_seafood");
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListNewsCategoryKnowledgeSeaFood',
            data: dataSeafood(),
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
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
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
                        tmpHtml +=
                            `
                            <div>
                                <div style="padding: 0" class="product-box-4 wow fadeInUp bg-white">
                                    <div class="product-image-2 hover_fly">
                                        <a href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <img style="object-fit: cover;margin: unset !important"  data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/img_dev/error/product.png" : value.imageObj?.mediumUrl}"
                                                class="img-fluid blur-up lazyload p-2 h-100 w-100" alt="${value.metaUrl}"
                                                onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                        </a>
                                    </div>
                                    <div style="padding: 0 7px;" class="product-detail div_detail_knowledge_item">
                                         <div class="blog-label">
                                             <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i></i> <span class="title_font_item">${value.publishedAt ? moment(value.publishedAt).format("DD-MM-YYYY") : moment(value.createdAt).format("DD-MM-YYYY")}</span></span>
                                               
                                             </div>
                                        <span class="clamp_name_clamp product_category_item text-uppercase">${value.categoryObj?.name}</span>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" href="/kien-thuc/${value.categoryObj?.metaUrl}/${value.metaUrl}">
                                            <h1 class="name_clamp mt-2 font_item_modifeil">${value.title}</h1>
                                        </a>
                                    </div>
                                </div>
                            </div>`
                    });
                    $("#div_knowledge_seafood").html(tmpHtml);
                    $('[data-toggle="tooltip"]').tooltip();
                    $("#div_knowledge_seafood").attr('class', '');

                    $("#div_knowledge_seafood").slick({
                        arrows: true,
                        infinite: false,
                        slidesToShow: 5,
                        slidesToScroll: 2,
                        rows: 1,
                        autoplay: false,
                        mobile: true,
                        dots: true,
                        prevArrow: $('.div_btn_slide_knowledt .prev-btn_agriculture_know'),
                        nextArrow: $('.div_btn_slide_knowledt .next-btn_agriculture_know'),
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
                                    slidesToScroll: 3
                                }
                            },
                            {
                                breakpoint: 680,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 2
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
                } else {
                    $("#div_knowledge_seafood").html(`
                        <div class="d-flex align-items-center flex-column">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không có dữ liệu!</span>
                        </div>`);

                    /* document.getElementById("div_knowlegde_seafood_js").style.display = "none";*/
                }
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
    } catch (e) {
        divProductSeaFood.html(`
            <div class="text-center p-2">
                <i type="button" class="fa fa-refresh"
                    style="border-radius:4px;font-size:24px;"
                    onclick="LoadListKnowledgeSeaFood();">
                </i>
            </div>`);
        console.log("Error when loading hot agricultural products!");
    }
}

//Về chúng tôi

function LoadLisAboutUs() {
    try {
        ShowOverlayLoadingButton("#div_main_data_about");
        $.ajax({
            type: 'GET',
            url: '/AboutUs/GetListAbout',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_main_data_about");
                if (response.result !== 1) {
                    document.getElementById("div_main_data_about").innerHTML = ` 
                    <div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadLisAboutUs();$(this).remove();">
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
                                <div>
                                     <div class="product-slider about_height wow fadeInUp ">
                                         <a href="/ve-chung-toi/${value.categoryObj?.metaUrl}/${value.metaUrl}" class="product-slider-image">
                                             <img src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/img_dev/error/product.png" : value.imageObj?.mediumUrl}" class="w-100 blur-up lazyload h-100 w-100 rounded-3"
                                                  alt="${value.title}" style="object-fit: cover">
                                         </a>

                                         <div class="product-slider-detail">
                                             <div>
                                                    <div class="blog-label">
                                                        <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i> <span>${IsNullOrEmty(value.createdAt) ? "" : moment(value.createdAt).format('DD-MM-YYYY')}</span></span>
                                                      
                                                  </div>
                                                 <a href="/ve-chung-toi/${value.categoryObj?.metaUrl}/${value.metaUrl}" class="d-block">
                                                     <h3 class="text-title name_clamp font_item_modifeil">${value.title}</h3>
                                                 </a>
                                                
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                            `

                    });
                    document.getElementById("div_main_data_about").innerHTML = tmpHtml;
                    $("#div_main_data_about").slick({
                        arrows: true,
                        infinite: false,
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        rows: 1,
                        autoplay: false,
                        mobile: true,
                        dots: true,
                        prevArrow: $('.prev-btn_about'),
                        nextArrow: $('.div_btn_slide_about .next-btn_about'),
                        autoplaySpeed: 3500,
                        responsive: [{
                            breakpoint: 1510,
                            settings: {
                                slidesToShow: 3,
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
                                slidesToShow: 1,
                                fade: true,
                            }
                        },
                        ]
                    });
                }
                else {
                    /* document.getElementById("div_main_data_about").innerHTML = _imgNotFoundHtml;*/
                    $('#div_about_js').hide();
                }
            },
            error: function (error) {
                HideOverlay("#div_main_data_about");
                document.getElementById("div_main_data_about").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadLisAboutUs();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_main_data_about");
        document.getElementById("div_main_data_about").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadLisAboutUs();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load latest news!");
    }
}

//Công cụ tiện ích
function LoadListMainDataTools() {
    /* var data = dataParms();*/
    try {
        ShowOverlay("#div_tools_main");
        $.ajax({
            type: 'GET',
            url: '/Home/GetListUtility',
            /*data: data,*/
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_tools_main");
                if (response.result !== 1) {
                    document.getElementById("div_tools_main").innerHTML = ` 
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
                                   <div>
                                    <div class="offer-banner hover-effect">
                                        <img src="${IsNullOrEmty(value.urlImage) ? "/img_dev/error/product.png" : value.urlImage}" class="img-fluid bg-img blur-up lazyload"
                                             alt="${value.name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                        <div class="banner-detail">
                                            <h5 data-bs-toggle="tooltip" data-bs-placement="top" title="${value.name}" class="theme-color name_clamp">${value.name}</h5>
                                        </div>
                                        <div class="offer-box">
                                            <a href="${value.url}" target="_blank"
                                                    class="btn-category btn theme-bg-color text-white">
                                                Xem thêm
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            `
                    });
                    document.getElementById("div_tools_main").innerHTML = tmpHtml;
                    $('#div_tools_main').slick({
                        arrows: true,
                        infinite: false,
                        slidesToShow: 3,
                        autoplay: false,
                        mobile: true,
                        dots: true,
                        prevArrow: $('.div_btn_slide_product .btn_left_tool'),
                        nextArrow: $('.div_btn_slide_product .btn_right_tool'),
                        slidesToScroll: 1,
                        responsive: [{
                            breakpoint: 1300,
                            settings: {
                                slidesToShow: 2,
                                autoplaySpeed: 2000,
                            }
                        },
                        {
                            breakpoint: 757,
                            settings: {
                                slidesToShow: 1,
                                fade: true,
                                autoplaySpeed: 2000,
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
                    /*document.getElementById("div_tools_main").innerHTML = _imgNotFoundHtml;*/
                    document.getElementById("div_tool_section").style.display = "none";
                }
                //var totalRecord = parseInt(response.data2nd);
                //var currentPage = parseInt(data.page);
                //var pageSize = parseInt(data.record);
                //var pagination = LoadPagination(totalRecord, pageSize, currentPage);
                //$('#ul_main_pagination').html(pagination);
            },
            error: function (error) {
                HideOverlay("#div_tools_main");
                document.getElementById("div_tools_main").innerHTML = ` 
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
        HideOverlay("#div_tools_main");
        document.getElementById("div_tools_main").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load list!");
    }
}

