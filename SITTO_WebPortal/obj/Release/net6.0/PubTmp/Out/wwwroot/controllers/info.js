$(document).ready(function () {
 
    $('.slider_banner_header_info').slick({
        infinite: true,
        speed: 2200,
        cssEase: 'linear',
        slidesToShow: 1,
        dots: true,
        autoplay: true, // Tự động trượt qua các ảnh
        autoplaySpeed: 3000, // Thời gian hiển thị mỗi ảnh trước khi chuyển sang ảnh tiếp theo (đơn vị: milliseconds)
        fade: true,
        prevArrow: $('.prev-btn_info'),
        nextArrow: $('.next-btn_info'),
        slidesToScroll: 1,
    });
    $('#slider_banner_about_top').slick({
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
                    dots: false
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
})