$(document).ready(function () {
    $("#showButtons").on("click", function () {
        $(".modals").fadeIn();
        $(".modal_close").fadeOut();
    });
    $("#close_back_chat").on("click", function () {
        $(".modals").fadeOut();
        $(".modal_close").fadeIn();
    });
    $("#btn_search_mobile").on("click", function () {
        $(".modal_show_search").fadeIn();
    });
  
})
