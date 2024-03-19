var $categoryIdEl = $('#input_category_id'),
    $pageEl = $('#input_page'),
    $recordEl = $('#input_record');
    $typeEl = $('#input_type');
const dataParms = function () {
    return {
        c: IsNullOrEmty($categoryIdEl.val()) ? null : parseInt($categoryIdEl.val()),
        page: parseInt($pageEl.val()),
        record: parseInt($recordEl.val()),
        type: parseInt($typeEl.val())
    }
}
$(document).ready(function () {
    LoadListMainData();
    LoadListLatestNews();
});
//Load list main data
function LoadListMainData() {
    var data = dataParms();
    try {
        ShowOverlay("#div_main_data");
        $.ajax({
            type: 'GET',
            url: '/AboutUs/GetListNewsByCategoryIdType',
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
                                 <div class="col-xxl-4 col-sm-6">
                                      <div class="product-slider wow fadeInUp about_height_item_">
                                          <a href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}" class="product-slider-image knoewledge__item_css">
                                              <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" : item.imageObj?.smallUrl)" class="w-100 h-100 blur-up lazyload rounded-3"
                                                   onerror="this.onerror=null;this.src='/img_dev/error/product.png';" alt="${value.title}">
                                          </a>

                                          <div class="product-slider-detail">
                                              <div>
                                                  <div class="blog-label">
                                                          <span class="time"><i style="color: var(--theme-color)" class="far fa-calendar"></i> <span>${IsNullOrEmty(value.createdAt) ? "" : moment(value.createdAt).format('DD-MM-YYYY')}</span></span>
                                                      
                                                  </div>
                                                  <a href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}" data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" class="d-block">
                                                      <span class="mt-3 text-title name_clamp knowledge_detail_titile_item font_item_modifeil">${value.title}</span>
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  </div>
                            `
                            //`<div class="col-xxl-4 col-sm-6">
                            //    <div class="blog-box wow fadeInUp">
                            //        <div class="blog-image">
                            //            <a href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}">
                            //                      <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}" : item.imageObj?.smallUrl)"
                            //                     class="bg-img blur-up lazyload h-100 w-100"
                            //                     onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';" alt="${value.title}">
                            //            </a>
                            //        </div>

                            //        <div class="blog-contain about_div_contain">
                            //            <div class="blog-label">
                            //                <span class="time">
                            //                    <i style="color: var(--theme-color)" class="far fa-calendar"></i> &nbsp
                            //                    <span class="about_title_item">${IsNullOrEmty(value.createdAt) ? "" : moment(value.createdAt).format('DD-MM-YYYY')}</span>
                            //                </span>

                            //            </div>
                            //            <a data-bs-toggle="tooltip" data-bs-placement="top" title="${value.title}" href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}">
                            //                <span class="about_clamp_title_item about_name_item">${value.title}</span>
                            //            </a>
                            //            <a href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}" class="blog-button mt-3">
                            //                Xem thêm
                            //                <i class="fa-solid fa-right-long"></i>
                            //            </a>
                            //        </div>
                            //    </div>
                            //</div>`
                    });
                    document.getElementById("div_main_data").innerHTML = tmpHtml;

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
                var totalRecord = parseInt(response.data2nd);
                var currentPage = parseInt(data.page);
                var pageSize = parseInt(data.record);
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

//Load list related news
function LoadListLatestNews() {
    try {
        ShowOverlayLoadingButton("#ul_latest_news");
        $.ajax({
            type: 'GET',
            url: '/AboutUs/GetListAbout',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#ul_latest_news");
                if (response.result !== 1) {
                    document.getElementById("ul_latest_news").innerHTML = ` 
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
                            ` <div class="recent-post-box"> 
                                        <div class="recent-box" style="padding: 0 0 2px">
                                            <a href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}" class="recent-image about_modefiel">
                                                <img src="${IsNullOrEmty(value.imageObj?.smallUrl) ? "/img_dev/error/product.png" : value.imageObj?.smallUrl}"
                                                     class="img-fluid blur-up lazyload" alt="${value.title}"
                                                     onerror="this.onerror=null;this.src='/img_dev/error/product.png';">
                                            </a>

                                            <div class="recent-detail">
                                                <a href="/ve-chung-toi/${value?.categoryObj?.metaUrl}/${value.metaUrl}">
                                                    <h5 class="recent-name">${value.title}</h5>
                                                </a>
                                                <h6>${moment(value.createdAt).format("DD-MM-YYYY") }</h6>
                                            </div>
                                        </div>
                                    </div>`;
                    });
                    document.getElementById("ul_latest_news").innerHTML = tmpHtml;
                }
                else {
                    document.getElementById("ul_latest_news").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#ul_latest_news");
                document.getElementById("ul_latest_news").innerHTML = ` 
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
        HideOverlayLoadingButton("#ul_latest_news");
        document.getElementById("ul_latest_news").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListLatestNews();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load latest news!");
    }
}
//When click pagination 
function ChangePageNews(page, e, elm) {
    e.preventDefault();
    ScrollToTop('.header-news', 70, 500);  
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
                    <a class="page-link" href="${link}record=${pageSize}&page=${currentPage - 1}" title="Trang trước" onclick="ChangePageNews(${currentPage - 1},event,this)"
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
                            <a class="page-link" href="${link}record=${pageSize}&page=${i}" onclick="ChangePageNews(${i},event,this)" title="Trang ${i}">${i}</a>
                        </li>`;
            }
        }
        if (currentPage < totalPage) {
            html += `<li class="page-item">
                        <a class="page-link"  href="${link}record=${pageSize}&page=${currentPage + 1}" title="Trang kế tiếp"  onclick="ChangePageNews(${currentPage + 1},event,this)"
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
