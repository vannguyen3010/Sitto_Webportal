var listDataVirtual = [];

$(document).ready(function () {



    $("#clear_chat").click(function () {
        // Xóa nội dung được thêm bởi GetListVirtualAssistant(), nhưng không xóa câu hỏi ban đầu từ LoadListMain()
        $("#div_question_js").empty();
        // Thêm lại câu hỏi từ LoadListMain() bằng cách gọi lại LoadListMain()
        LoadListMain();
    });

    LoadListMain();
    $('#div_question_js').click(function () {
        $(".chat_bot_text").fadeIn();
    })
})

function LoadListMain() {
    listDataVirtual = [];
    try {
        ShowOverlayLoadingButton("#div_question_js");
        $.ajax({
            type: 'GET',
            url: '/VirtualAssistant/GetListVirtualAssistantByParentIdStatus',

            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_question_js");
                if (response.result !== 1) {
                    document.getElementById("div_question_js").innerHTML = ` 
                    <div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListMain();$(this).remove();">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                var divWrapper = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        listDataVirtual.push(value)
                        divWrapper = ''
                        tmpHtml += `<button onclick="GetListVirtualAssistant(${value.id},${value.parentId},'${value.description?.trim()}',${value.isQuestion},'${value.contents}','${value.url}')" class="chat_bot_btn_item btn_box_chat" id="btn_show">
                                      <span>${value.contents}</span>
                                  </button>`
                    });
                    divWrapper = `<div class="chat_bot_text"> 
                                     ${tmpHtml}
                                 </div>`
                    $("#div_question_js").append(divWrapper)

                }
                else {
                    document.getElementById("div_question_js").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_question_js");
                document.getElementById("div_question_js").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMain();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_question_js");
        document.getElementById("div_question_js").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMain();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load latest news!");
    }
}

function GetListVirtualAssistant(id, virtualParentId, desc, isQuestion, buttonName, url) {
    $('.div_form_submit_wrapper').remove();
    var text = ''
    var isQuestion = isQuestion;
    var id = id;
    var currentId = $('#input_id_current').val()
    if (currentId == id) {
        ShowToastNoti("info", "", "Vui lòng không thao tác lại")
        return;
    }
    text = DivAnswerCustomer(buttonName);
    $('#input_id_current').val(id)
    $('#input_id_current_1').val(isQuestion)

    switch (parseInt(isQuestion)) {
        //1: Question, 0: Product, 2: link, 3 other
        case 1:
            $.ajax({
                type: 'GET',
                url: '/VirtualAssistant/GetListVirtualAssistantByParentIdStatus',
                data: {
                    parentId: id
                },
                dataType: "json",
                success: function (response) {
                    if (!CheckResponseIsSuccess(response)) return false;
                    var listData = response.data;
                    var tmpHtml = '';
                    var divWrapper = '';
                    $("#div_question_js").append(text);

                    if (listData != null && listData.length > 0) {
                        divWrapper = '';
                        $.each(listData, function (key, value) {
                            listDataVirtual.push(value)
                            tmpHtml +=
                                ` <button onclick="GetListVirtualAssistant(${value.id},${value.parentId},'${value.description}',${value.isQuestion},'${value.contents}','${value.url}')" class="chat_bot_btn_item btn_box_chat">
                                    <span>${value.contents}</span>
                                </button>`
                        });
                        divWrapper = `<div class="chat_bot_text"> 
                                     ${tmpHtml}
                                 </div>`

                        setTimeout(function () {
                            if (virtualParentId == 0) {
                                var desHtml = `
                                          <div class="icon_chat_bot_sitto_append">
                                              <img class="w-100 h-100" src="/img_dev/logo_chatbot_sitto.png" alt=""/>
                                          </div>
                                          <div class="chat_bot_text chat_bot_custom_css">
                                             <span class="chat_bot_text_custom_item">${desc}</span>
                                          </div>`
                                $("#div_question_js").append(desHtml)
                            }
                            $("#div_question_js").append(divWrapper);
                            setTimeout(function myfunction() {
                                $(".chat_msg_css").scrollTop($(".chat_msg_css")[0].scrollHeight);
                            }, 600)
                        }, 300)

                    }
                    else {
                        $("#div_question_js").append(ToggleFormContact(`'Cần tư vấn về' + ' ' + '${buttonName}'`))
                        $('#textarea_detail').val(buttonName)
                    }
                },
                error: function (error) {
                    console.log("Error when loading answer!");
                }
            });
            break;
        case 0:
            GetListProduct(id, `${buttonName}`);
            setTimeout(function myfunction() {
                $(".chat_msg_css").scrollTop($(".chat_msg_css")[0].scrollHeight);
            }, 600)
            break;
        case 2:
            $("#div_question_js").append(text)
            window.open(url);
            break;
        case 3:
            $("#div_question_js").append(text)
            setTimeout(function myfunction() {
                ScrollToBottom('.chat_msg_css', 70, 500);
                $("#div_question_js").append(ToggleFormContact(`'Cần tư vấn về' + ' ' + '${buttonName}'`))
                $('#textarea_detail').val(buttonName)
                setTimeout(function myfunction() {
                    $(".chat_msg_css").scrollTop($(".chat_msg_css")[0].scrollHeight);
                }, 600)
            }, 300)
            break;
        default: break;
    }

}

//function ToggleDivAnswer(virtualAssistantId) {
//    if (!IsNullOrEmty(virtualAssistantId)) {
//        var dataObj = listDataVirtual.find(x => x.id == virtualAssistantId);
//        var currentId = $('#input_id_current_1').val()

//        $(`.div_wrapper_product_virtual_${currentId}`).remove()
//        $('.div_wrapper_product_virtual').slick('unslick');
//        $.ajax({
//            type: 'GET',
//            url: 'VirtualAssistant/GetListVirtualAssistantUrlByStatusVirtualAssistantId',
//            data: {
//                virtualAssistantId: virtualAssistantId
//            },
//            dataType: "json",
//            success: function (response) {
//                if (!CheckResponseIsSuccess(response)) return false;
//                var listData = response.data;
//            }
//        })
//        if (dataObj != null) {
//            dataHref = `
//            <a target="_blank" href="${dataObj.url}">Xem thêm</a>
//        `;
//        }
//    }
//    $('#div_form_submit').slideDown(200);
//    InitValidation()
//    InitSubmitContact();
//}

function InitSubmitContact(elm, e) {
    e.preventDefault();
    /* var laddaSubmitForm = Ladda.create($(elm)[0]);*/
    let $formElm = $('#form_data_chat_box');
    let name = $('#input_name').val();
    let phoneNumber = $('#input_phoneNumber').val();
    let address = $('#input_addressText').val();
    /* let remark = $('#textarea_detail').val();*/
    let detail = $('#textarea_detail').val();
    if (IsNullOrEmty(name) || IsNullOrEmty(phoneNumber) || IsNullOrEmty(address) || IsNullOrEmty(detail)) {
        ShowToastNoti('warning', '', 'Vui lòng nhập đầy đủ thông tin'); return false;

    }
    let formData = new FormData($formElm[0]);
    formData.append("name", name)
    formData.append("phoneNumber", phoneNumber)
    formData.append("addressText", address)
    /* formData.append("remark", remark)*/
    formData.append("detail", detail)
    /*  laddaSubmitForm.start();*/
    $.ajax({
        url: '/Contact/SubmitChatBot',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            /* laddaSubmitForm.stop();*/
            if (!CheckResponseIsSuccess(response)) return false;
            ResetForm("#form_data_chat_box")
            swal.fire('Gửi thành công!', '', 'success')
            $('#div_form_submit').remove()
            $('#form_data_chat_box').remove()
            let html =
                `  
                 <div class="icon_chat_bot_sitto_append">
                       <img class="w-100 h-100" src="/img_dev/logo_chatbot_sitto.png" alt=""/>
                   </div>
                <div class="chat_bot_text">
                    <span class="chat_bot_text_custom_item">Bạn cần chúng tôi hỗ trợ thêm về vấn đề gì nữa không ?</span>
                </div>`
            setTimeout(function () {
                $("#div_question_js").append(html)
                LoadListMain()
            }, 800)
        }, error: function (err) {
            laddaSubmitForm.stop();
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function InitValidation() {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}

function ResetForm(formElm) {
    $(formElm).trigger('reset');
    RemoveClassValidate(formElm);
}

function DivAnswerCustomer(name) {
    var html = `
       <div>
         <div class="chat_bot_text_asnwer_item mt-3">
            <span>${name}</span>
         </div>
       </div>
    `
    return `${html}`
}

function ToggleFormContact(remark) {
    $('.div_form_submit_wrapper').remove();
    var html = ``;
    html = `
     <div class="icon_chat_bot_sitto_append">
                       <img class="w-100 h-100" src="/img_dev/logo_chatbot_sitto.png" alt=""/>
                   </div>
                <div class="chat_bot_text chat_bot_custom_css div_answer_to_scroll">
                    <span class="chat_bot_text_custom_item">Để lại thông tin chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất !</span>
                </div>
         <div class="container div_form_submit_wrapper div_answer_to_scroll">
                
                 <form id="form_data_chat_box" asp-antiforgery="true" class="row">
                
                     <div class="col-6 custom-form" style="line-height: 2.2em">
                         <label class="fw-bolder chat_bot_text_custom_item">Họ và tên<span class="text-danger">*</span></label>
                         <input maxlength="50" id="input_name" type="text" placeholder="Nhập họ và tên" class="form-control form__input" maxlength="100"/>
                         <span asp-validation-for="name" class="invalid-feedback"></span>
                     </div>

                     <div class="col-6" style="line-height: 2.2em">
                         <labe class="fw-bolder chat_bot_text_custom_item"l>Số điện thoại<span class="text-danger">*</span></label>
                         <input id="input_phoneNumber" max-length="250" type="text" placeholder="Nhập số điện thoại" class="form-control form__input" />
                         <span asp-validation-for="phoneNumber" class="invalid-feedback"></span>
                     </div>

                     <div class="col-12" style="line-height: 2.2em">
                         <label class="fw-bolder chat_bot_text_custom_item">Địa chỉ<span class="text-danger">*</span></label>
                           <input id="input_addressText" maxlength="150" type="text" placeholder="Nhập địa chỉ" class="form-control form__input" />
                         
                     </div>
                     <div class="col-12" style="line-height: 2.2em">
                         <label class="fw-bolder chat_bot_text_custom_item">Nội dung<span class="text-danger">*</span></label>
                         <textarea style="height: 86px;" id="textarea_detail" maxlength="150" rows="6" class="form-control form__input" placeholder="Nhập nội dung">

                         </textarea>
                     </div>
                     <button onclick="InitSubmitContact(this,event)" type="button" class="btn btn-animation mt-2 col-3 btn-md fw-bold ms-auto ladda-button btn_submit_contact" data-style="expand-right">
                         <span class="ladda-label">
                             <i class="fa fa-paper-plane" aria-hidden="true"></i> Gửi
                         </span><span class="ladda-spinner"></span>
                     </button>
                 </form>
             </div>`
    return `${html}`
}

function GetListProduct(id, contents) {
    $.ajax({
        type: 'GET',
        url: 'VirtualAssistant/GetListVirtualAssistantUrlByStatusVirtualAssistantId',
        data: {
            virtualAssistantId: id
        },
        dataType: "json",
        success: function (response) {
            if (!CheckResponseIsSuccess(response)) return false;
            var listData = response.data;
            var urlProduct;
            if (listData != null && listData.length > 0) {
                var buttonHtml = '', productHtml = '', text = '', urlProduct = "";
                $.each(listData, function (key, item) {
                    buttonHtml = '', urlProduct = "";
                    urlProduct = `/san-pham/${item.productObj?.categoryObj?.metaUrl}/${item.productObj?.metaUrl}`;
                    switch (parseInt(item.isContact)) {
                        case 0:
                            if (!IsNullOrEmty(item.url)) {
                                //Gắn link url
                                buttonHtml = `<a href="${item.url}" target="_blank" rel="noreferrer" style="background: #007bff;width: 65%;" class="text-white btn mb-1 mx-auto button_chat_bot_item">Xem thêm</a>`
                            } else {
                                //san-pham/${metaUrl}
                                buttonHtml = `<a href="${urlProduct}" target="_blank" rel="noreferrer" style="background: #17a2b8;" class="btn mb-1 text-white mx-auto button_chat_bot_item">Chi tiết</a>`
                            }
                            break;
                        case 1:
                            //Bật form
                            buttonHtml = `<button onclick="HandleClickFormContactProduct('Cần tư vấn về sản phẩm' +' '+'${item.productObj?.name}' +' '+'thuộc danh mục' + ' '+ '${contents}','${item.productObj?.name}')" type="button" style="background: #ffc107;"  class="btn text-white mb-1 mx-auto button_chat_bot_item">Cần tư vấn</button>`
                            break;
                        default: break;
                    }

                    productHtml += `
                    <div class="mx-2 bg-white">
                        <div style="padding: unset !important;" class="product-box-4 product_image_chat_bot">
                            <div style="height: 200px;" class="product-image product-image-2">
                                <a target="_blank" href="${urlProduct}">
                                    <img style="margin: unset !important;object-fit: cover;" src="${IsNullOrEmty(item.productObj?.imageObj?.smallUrl) ? "/img_dev/error/product.png" : item.productObj?.imageObj?.smallUrl}"
                                         class="img-fluid blur-up chat_product_img_item lazyload w-100 h-100" alt="${item.productObj?.name}"
                                         onerror="this.onerror=null;this.src='/img_dev/error/avatar.png';">
                                </a>
                            </div>
                            <div style="height: 50px" class="p-2 product-detail mt-1">
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="${item.productObj?.name}" href="${urlProduct}">
                                    <h5 class="text-title m-0 name_clamp_chat_bot">${item.productObj?.name}</h5>
                                </a>
                            </div>
                            <div class="w-100">
                                 ${buttonHtml}
                            </div>
                        </div>
                    </div>`
                });
                var wrapperHtml = ` <div class="icon_chat_bot_sitto_append">
                                             <img class="w-100 h-100" src="/img_dev/logo_chatbot_sitto.png" alt=""/>
                                         </div>
                                      <div class="chat_bot_text chat_bot_custom_css">
                                          <span class="chat_bot_text_custom_item">Dòng sản phẩm liên quan</span>
                                      </div>
                                <div class="div_wrapper_product_virtual pt-3 d-flex w-100">
                                  ${productHtml}
                                 </div>`
                text = DivAnswerCustomer(contents);
                $("#div_question_js").append(text)
                setTimeout(function () {
                    ScrollToBottom('.chat_msg_css', 70, 500);
                    $("#div_question_js").append(wrapperHtml);
                }, 300)
            }

        }
    })
}

function HandleClickFormContactProduct(remark, contents) {
    var html = ToggleFormContact(remark)
    text = DivAnswerCustomer("Để lại thông tin liên hệ cho sản phẩm" + " " + contents);
    $("#div_question_js").append(text)
    setTimeout(function () {
        ScrollToBottom('.chat_msg_css', 70, 500);
        $("#div_question_js").append(html)
        $('#textarea_detail').val(remark)
    }, 300)

}


