const DEFAULT_LANGUAGE = 'vi';


$(document).ready(function () {

    AutoTranslate();//run first

    setTimeout(function () {
        setTimeout(function () {
            MapValueFlag(); //run second
        }, 300)

        let lang = GetCookies('lang');
        lang = lang == '' || lang == null ? 'vi' : lang;
        $(`#translate_select div[data-id="${lang}"]`).addClass('active_flag');
    }, 800)

    //When click li to translate in desktop
    $('#translate_select div').on('click', function () {
        var value = $(this).attr('data-id');
        TranslatePage(value);
        $('#translate_select div').removeClass('active_flag');
        $(this).addClass('active_flag');
    });

    //toggle_div_change_language
    $('#toggle_div_change_language').on('click', function () {
        $('.translate_select').removeClass("display_is_none")
    })
    $('#close_change_language').on('click', function () {
        $('.translate_select').addClass("display_is_none")
    })
});


function AutoTranslate() {
    let lang = GetCookies('lang');
    lang = lang == '' || lang == null ? DEFAULT_LANGUAGE : lang;
    if (lang == DEFAULT_LANGUAGE) {
        $('html').attr('translate', 'no');
    } else {
        setTimeout(function () {
            $('html').removeAttr('translate');
            TranslatePage(lang);
        }, 500);
    }
}

function TriggerHtmlEvent(element, eventName) {
    var event;
    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
        if (event != 'null') {
            element.dispatchEvent(event);
        }
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
        element.fireEvent('on' + event.eventType, event);
    }
}

function TranslatePage(value) {
    if (value == DEFAULT_LANGUAGE) {
        $('html').attr('translate', 'no');
    } else {
        $('html').removeAttr('translate');
    }
    $('.goog-te-combo').val(value);
    var select = document.querySelector('.goog-te-combo');
    TriggerHtmlEvent(select, 'change');
    DeleteCookie('lang');
    SetCookies('lang', value, 365);
}

function SetCookies(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function GetCookies(cname) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cname) {
            return unescape(y);
        }
    }
}

//function onchange to set text
function SetTextLanguage() {
    const collection = document.getElementsByTagName("html")[0];
    const typeLang = collection.getAttribute("lang");
    if (typeLang == "vi") {
        text = `<img src="/img_dev/icon_language/vi.png" style="width:20px;margin-right:2px"/> Tiếng Việt`
    }
    else {
        text = `<img src="/img_dev/icon_language/us.png" style="width:20px;margin-right:2px"/> English`
    }
    document.getElementById("text_language").innerHTML = text
}

function MapValueFlag() {
    let lang = GetCookies('lang');
    if (lang == "en") {
        setTimeout(function () {
            $(`#translate_select div[data-id="vi"]`).removeClass('active_flag');
            $(`#translate_select div[data-id="${lang}"]`).addClass('active_flag');
        }, 200)
    } else {
        setTimeout(function () {
            $(`#translate_select div[data-id="en"]`).removeClass('active_flag');
            $(`#translate_select div[data-id="${lang}"]`).addClass('active_flag');
        }, 100)
    }
}
function DeleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}