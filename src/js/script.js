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
let click = 0;

$('.balance').html(balance + ' JOM');
$('.speed').html('Мощность: ' + speed + ' JOM/c.');

setInterval(function(){
    balance += speed
    $('.balance').html(balance + ' JOM');
}, 1000)

$('.coin').click(function (e) { 
    e.preventDefault();
    balance ++
    click ++
    $('.click').html('Клики: ' + click)
    $('.balance').html(balance + ' JOM');
});

$('.btn_speed').click(function (e) { 
    e.preventDefault();
    let price = $(this).data('price')
    let upgradeSpeed = $(this).data('upgrade-speed');
    if (balance < price) {
        $('.error').fadeIn(500);
        setTimeout(function(){
            $('.error').fadeOut(500)
        }, 3000)
     } else {
        speed += upgradeSpeed
        balance -= price
        price = Math.round(price * 1.3)
        $('.speed').html('Мощность ' + speed + ' JOM/c.');
        $(this).html('+' + upgradeSpeed + '/c. <br> Стоимость: ' + price)
        $(this).data('price', price)
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

$.get("../db.json", function (data) {
        data = data.missions
        $.each(data, function (index, value) { 
             $('.missions_list').append(`
                <li class="mission">
                    <pre class="mission_text">${value.id}.</pre>
                    <pre class="mission_text">${value.missionText}</pre>
                    <pre class="mission_text">${value.rewardText}</pre>
                    <button data-id="${value.id}" class="btn missions_btn">Получить</button>
                </li>
             `)
        });

        $('.missions_btn').click(function (e) {
            e.preventDefault();
            let mission = data[$(this).data('id') - 1]
            if (eval(mission.mission)) {
                eval(mission.reward)
                $('.speed').html('Мощность ' + speed + ' JOM/c.');
                $(this).prop('disabled', true).addClass('missions_btn_complete')
            } else {
                $(this).addClass('missions_btn_error');
                setTimeout(function(){
                    $('.missions_btn').removeClass('missions_btn_error');
                }, 3000)
            }
        });
    }
);

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

