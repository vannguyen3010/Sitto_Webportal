let searchTimer;
$(document).ready(function () {

    $(".slide_about").slick({
        arrows: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        rows: 1,
        autoplay: false,
        mobile: true,
        dots: true,
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
    $("#div_product_search").slick({
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 2,
        autoplay: false,
        mobile: true,
        dots: true,
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
                    dots: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                }
            },
        ]
    });
    $("#div_new_search").slick({
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 2,
        autoplay: false,
        mobile: true,
        dots: true,
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
                    dots: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                }
            },
        ]
    });
    $('#input_keyword_product').on("keyup", function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            $('#list_product_quick_search').html(" ");
            QuickSearchProduct();
        }, 800);
    });
    $('#input_keyword_product').on("keyup", function (event) {
        if (event.key === "Enter") {
            // Người dùng đã nhấn phím "Enter"
            event.preventDefault(); // Ngăn form gửi đi (nếu có)
            $('#list_product_quick_search').html(" ");
            SubmitSearchProduct();
        }
    });
    //$('#input_keyword_product_mobile').on("keyup", function () {
    //    $('#div_search_mobile').html(" ")
    //    QuickSearchProductMobile();
       
    //})
    $('#input_keyword_product_mobile').on("keyup", function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            $('#div_search_mobile').html(" ");
            QuickSearchProductMobile();
        }, 800);
    });
    $('.slider-search').slick({
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 5,
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1215,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 876,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
            }
        },
        ]
    });
});

function SubmitSearchProduct() {
    let keyword = $('#input_keyword_product').val().trim().replace(/ /g, '+');

    if (keyword) {
        location.href = "/tim-kiem?keyword=" + keyword;
    } else {
        swal.fire('Nhập từ khóa tìm kiếm', '', 'warning')
    }
}

function QuickSearchProduct() {
    let keyword = $('#input_keyword_product').val().trim().replace(/ /g, '+');

    ShowOverlay("#list_product_quick_search");
    try {
        $.ajax({
            type: 'GET',
            url: "/Search/SearchListProductAndNewsByKeyword",
            data: {
                keyword: keyword
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                HideOverlay("#list_product_quick_search");
                if (response.result !== 1) {
                    $('#list_product_quick_search').html(`
                         <a onclick="$('#list_product_quick_search').remove()" class="search_new_product">
                              <i class="fas fa-times text-danger fs-4"></i>
                         </a>
                        <div class="d-flex align-items-center flex-column">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width:80px; height:80px;">
                            <span class="text-muted">Không tìm thấy từ khóa liên quan!</span>
                        </div>
                    `);
                    return;
                }

                let listDataNews = response.data.newsObjs;
                let listDataProduct = response.data.productObjs;
                var htmlNews = '';
                var htmlProduct = '';
                var htmlData = '';

                if (listDataNews != null && listDataProduct != null) {
                    if (listDataNews != null && listDataNews.length > 0) {
                        for (var i = 0; i < listDataNews.length; i++) {
                            htmlNews += `
                            <div class="product-item d-flex" style="align-items: center;padding: 10px;">
                                <img src="${listDataNews[i].imageObj?.smallUrl}" class="img-fluid image_css" style="width: 45px;height: 45px;object-fit: cover;border-radius: 28px" alt="${listDataNews[i].name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                <a href="/kien-thuc/${listDataNews[i].categoryObj?.metaUrl}/${listDataNews[i].metaUrl}" class="list-group-item text_font_item search_clamp_tile" style="flex-grow: 1;border-radius: 15px;font-size: 14px" onclick="onClickProduct(${listDataNews[i].id})">${listDataNews[i].title}</a>
                            </div>
                        `;
                        }
                    }
                    if (listDataProduct != null && listDataProduct.length > 0) {
                        for (var j = 0; j < listDataProduct.length; j++) {
                            htmlProduct += `
                            <div class="product-item d-flex" style="align-items: center;padding: 10px;">
                                <img src="${listDataProduct[j].imageObj?.smallUrl}" class="img-fluid image_css" style="width: 45px;height: 45px;object-fit: cover;border-radius: 28px" alt="${listDataProduct[j].name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                <a href="/san-pham/${listDataProduct[j].categoryObj?.metaUrl}/${listDataProduct[j].metaUrl}" class="list-group-item text_font_item search_clamp_tile" style="flex-grow: 1;border-radius: 15px;font-size: 14px" onclick="onClickProduct(${listDataProduct[j].id})">${listDataProduct[j].name}</a>
                            </div>
                        `;
                        }
                    }
                } else {
                    $('#list_product_quick_search').html(`
                        <a onclick="$('#list_product_quick_search').remove()" class="search_new_product">
                            <i class="fas fa-times text-danger fs-4"></i>
                        </a>
                        <div class="d-flex align-items-center flex-column">
                            <img class="w-auto d-flex m-auto" src="/img_dev/error/datanull.jpg" style="width: 80px; height: 80px;">
                            <span class="text-muted">Không tìm thấy từ khóa liên quan!</span>
                        </div>
                    `);
                }
                var htmlData = htmlNews + htmlProduct
                if (htmlData != null) {
                    $('#list_product_quick_search').html(htmlData);

                } else {
                    $('#list_product_quick_search').html("khong co du lieu");
                }
            },
            error: function (error) {
                document.getElementById("list_product_quick_search").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadProductPopular();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load product popular!");
            }
        });
    } catch (e) {
        HideOverlay("#list_product_quick_search");
        document.getElementById("list_product_quick_search").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadProductPopular();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
        console.log("Error when load product popular!");
    }
  
}

function SubmitSearchProductMobile() {
    let keyword = $('#input_keyword_product_mobile').val().trim().replace(/ /g, '+');

    if (keyword) {
        location.href = "/tim-kiem?keyword=" + keyword;
    } else {
        swal.fire('Nhập từ khóa tìm kiếm', '', 'warning')
    }
}

function QuickSearchProductMobile() {
    let keyword = $('#input_keyword_product_mobile').val().trim().replace(/ /g, '+');

    ShowOverlay("#div_search_mobile");
    try {
        $.ajax({
            type: 'GET',
            url: "/Search/SearchListProductAndNewsByKeyword",
            data: {
                keyword: keyword
            },
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_search_mobile");
                if (response.result !== 1) {
                    $('#div_search_mobile').html(`<p class="text-danger mx-auto pt-2">Không tìm thấy sản phẩm hoặc tin tức phù hợp!</p>`);
                    return;
                }

                let listDataNews = response.data.newsObjs;
                let listDataProduct = response.data.productObjs;
                var htmlNews = '';
                var htmlProduct = '';
                var htmlData = '';

                if (listDataNews != null && listDataNews.length > 0) {
                    for (var i = 0; i < listDataNews.length; i++) {
                        htmlNews += `
                            <div class="product-item d-flex" style="align-items: center;padding: 10px;">
                                <img src="${listDataNews[i].imageObj?.smallUrl}" class="img-fluid image_css" style="width: 45px;height: 45px;object-fit: cover;border-radius: 28px" alt="${listDataNews[i].title}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                <a href="/kien-thuc/${listDataNews[i].categoryObj?.metaUrl}/${listDataNews[i].metaUrl}" class="list-group-item text_font_item search_clamp_tile" style="flex-grow: 1;border-radius: 15px;font-size: 14px" onclick="onClickProduct(${listDataNews[i].id})">${listDataNews[i].title}</a>
                            </div>
                        `;
                    }
                }
                if (listDataProduct != null && listDataProduct.length > 0) {
                    for (var j = 0; j < listDataProduct.length; j++) {
                        htmlProduct += `
                            <div class="product-item d-flex" style="align-items: center;padding: 10px;">
                                <img src="${listDataProduct[j].imageObj?.smallUrl}" class="img-fluid image_css" style="width: 45px;height: 45px;object-fit: cover;border-radius: 28px" alt="${listDataProduct[j].name}" onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                <a href="/san-pham/${listDataProduct[j].categoryObj?.metaUrl}/${listDataProduct[j].metaUrl}" class="list-group-item text_font_item search_clamp_tile" style="flex-grow: 1;border-radius: 15px;font-size: 14px" onclick="onClickProduct(${listDataProduct[j].id})">${listDataProduct[j].name}</a>
                            </div>
                        `;
                    }
                }
                var htmlData = htmlNews + htmlProduct
                if (htmlData != null) {
                    $('#div_search_mobile').html(htmlData);
                } else {
                    $('#div_search_mobile').html("Không có dữ liệu");
                }
            },
            error: function (error) {
                document.getElementById("div_search_mobile").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="QuickSearchProductMobile();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load product popular!");
            }
        });
    } catch (e) {
        HideOverlay("#div_search_mobile");
        document.getElementById("div_search_mobile").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="QuickSearchProductMobile();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
        console.log("Error when load product popular!");
    }
}


