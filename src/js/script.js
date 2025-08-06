function show(el) {
    $(el).show()
}

function hide(el1, el2) {
    $(el1).hide()
    $(el2).hide();
}

$('.upgrade_btn').click(function (e) { 
    e.preventDefault();
    $('.upgrade').css('display', 'grid');
    hide('.menu_content')
});

$('.btn_close').click(function (e) { 
    e.preventDefault();
    hide('.upgrade')
});

let balance = 0;
let speed = 1;
let click = 1;
let clickCount = 0;
let missionsCount = 0;

let seconds = 0;
let minutes = 0;
let hours = 0;
let hoursCount = hours > 9 ? hours : '0' + hours
let minutesCount = minutes > 9 ? minutes : '0' + minutes
let secondsCount = seconds > 9 ? seconds : '0' + seconds

$('.balance').html(balance + ' JOM');
$('.speed').html('Мощность: ' + speed + ' JOM/c.');
$('.click').html('Сила клика: ' + click);
$('.time').html(hoursCount + '.' + minutesCount + '.' + secondsCount)

setInterval(function(){
    balance += speed
    $('.balance').html(balance + ' JOM');
    seconds++
    hoursCount = hours > 9 ? hours : '0' + hours;
    minutesCount = minutes > 9 ? minutes : '0' + minutes;
    secondsCount = seconds > 9 ? seconds : '0' + seconds;
    if (seconds === 60) {
        seconds = 0
        minutes++
    }
    if (minutes === 60) {
        minutes = 0
        hours++
    }
    $('.time').html(hoursCount + '.' + minutesCount + '.' + secondsCount)
}, 1000)

$('.coin').click(function (e) { 
    e.preventDefault();
    balance += click
    clickCount ++
    $('.click_count').html('Клики: ' + clickCount)
    $('.balance').html(balance + ' JOM');
});

$('.btn_upgrade').click(function (e) {
    e.preventDefault();
    let price = $(this).data('price')
    let upgradeSpeed = $(this).data('upgrade-speed');
    let upgradeClick = $(this).data('upgrade-click');
    if (balance < price) {
        $('.error').fadeIn(500);
        setTimeout(function(){
            $('.error').fadeOut(500)
        }, 3000)
    } else {
        if ($(this).data('upgrade-speed')) {
            speed += upgradeSpeed
            balance -= price
            price = Math.round(price * 1.3)
            $('.speed').html('Мощность ' + speed + ' JOM/c.');
            $(this).html('+' + upgradeSpeed + '/c. <br> Стоимость: ' + price)
            $(this).data('price', price)
        } else {
            click += upgradeClick
            balance -= price
            price = Math.round(price * 1.3)
            $('.click').html('Сила клика: ' + click);
            $(this).html('+' + upgradeClick + ' за клик <br> Стоимость: ' + price)
            $(this).data('price', price)
        }
    }
})

$('#home_btn').click(function (e) { 
    e.preventDefault();
    show('.home')
    hide('.missions', '.menu_content')
    $('.header_title').text('JomCoin')
});

$('#missions_btn').click(function (e) { 
    e.preventDefault();
    hide('.menu_content', '.home')
    show('.missions')
    $('.header_title').text('Миссии')
})

$('.missions_btn').click(function (e) {
    e.preventDefault();
    if (eval($(this).data('mission'))) {
        eval(($(this).data('reward')))
        $('.speed').html('Мощность ' + speed + ' JOM/c.');
        $('.click').html('Сила клика: ' + click);
        $(this).prop('disabled', true).addClass('missions_btn_complete')
        missionsCount += 1
    } else {
        $(this).addClass('missions_btn_error');
        setTimeout(function(){
            $('.missions_btn').removeClass('missions_btn_error');
        }, 3000)
    }
});

$('.menu').click(function (e) { 
    e.preventDefault();
    if ($('.first_window').css('display') == 'none') {
        show('.first_window')
    } else {
        hide('.menu_content')
    }
});

$('.first_window .block_menu_text').click(function (e) { 
    e.preventDefault();
    if ($('.select_cursor').css('display') == 'none') {
        show('.select_cursor')
    } else {
        hide('.select_cursor')
    }
});

$('.select_cursor .block_menu_text').click(function (e) { 
    e.preventDefault();
    if ($(this).data('cursor') == 'default') {
        $('*').css('cursor', $(this).data('cursor', ''))
    }
    $('*').css('cursor', $(this).data('cursor'))
    hide('.menu_content')
});

