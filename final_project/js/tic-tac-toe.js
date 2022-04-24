$(document).ready(function () {
    var x = "x";
    var o = "o";
    var turns = 0;

    //mat
    var piece1 = $('#piece1');
    var piece2 = $('#piece2');
    var piece3 = $('#piece3');
    var piece4 = $('#piece4');
    var piece5 = $('#piece5');
    var piece6 = $('#piece6');
    var piece7 = $('#piece7');
    var piece8 = $('#piece8');
    var piece9 = $('#piece9');


$('#mat li').on('click', function () {
    if (piece1.hasClass('o') && piece2.hasClass('o') && piece3.hasClass('o') || //horizontal win
        piece4.hasClass('o') && piece5.hasClass('o') && piece6.hasClass('o') ||//horizontal win
        piece7.hasClass('o') && piece8.hasClass('o') && piece9.hasClass('o') ||//horizontal win
        piece1.hasClass('o') && piece4.hasClass('o') && piece7.hasClass('o') || //vertical win
        piece2.hasClass('o') && piece5.hasClass('o') && piece8.hasClass('o') ||//vertical win
        piece3.hasClass('o') && piece6.hasClass('o') && piece9.hasClass('o') ||//vertical win
        piece1.hasClass('o') && piece5.hasClass('o') && piece9.hasClass('o') || //diagonal win
        piece3.hasClass('o') && piece5.hasClass('o') && piece7.hasClass('o')//diagonal win
    ) { 
//won
alert('Winner: O');
            $('#mat li').text('');
            $('#mat li').removeClass('disable');
            $('#mat li').removeClass('o');
            $('#mat li').removeClass('x');
        }
//winning positions
else if (piece1.hasClass('x') && piece2.hasClass('x') && piece3.hasClass('x') || //horizontal win
            piece4.hasClass('x') && piece5.hasClass('x') && piece6.hasClass('x') ||//horizontal win
            piece7.hasClass('x') && piece8.hasClass('x') && piece9.hasClass('x') ||//horizontal win
            piece1.hasClass('x') && piece4.hasClass('x') && piece7.hasClass('x') || //vertical win
            piece2.hasClass('x') && piece5.hasClass('x') && piece8.hasClass('x') ||//vertical win
            piece3.hasClass('x') && piece6.hasClass('x') && piece9.hasClass('x') ||//vertical win
            piece1.hasClass('x') && piece5.hasClass('x') && piece9.hasClass('x') || //diagonal win
            piece3.hasClass('x') && piece5.hasClass('x') && piece7.hasClass('x') //diagonal win
        ) {
//x won
alert('Winner: X');
            $('#mat li').text('');
            $('#mat li').removeClass('disable');
            $('#mat li').removeClass('o');
            $('#mat li').removeClass('x');
        }
//tie
else if (turns == 9) {
    alert('Tie Game');
    $('#mat li').text('');
    $('#mat li').removeClass('disable');
    $('#mat li').removeClass('o');
    $('#mat li').removeClass('x');
    turns = 0;
}
//filled
else if ($(this).hasClass('disable')) {
    alert('This spot is already filled');
}
//other player turn
else if (turns % 2 == 0) {
    turns++;
    $(this).text(o);
    $(this).addClass('disable o');
    if (piece1.hasClass('o') && piece2.hasClass('o') && piece3.hasClass('o') || //horizontal win
        piece4.hasClass('o') && piece5.hasClass('o') && piece6.hasClass('o') ||//horizontal win
        piece7.hasClass('o') && piece8.hasClass('o') && piece9.hasClass('o') ||//horizontal win
        piece1.hasClass('o') && piece4.hasClass('o') && piece7.hasClass('o') || //vertical win
        piece2.hasClass('o') && piece5.hasClass('o') && piece8.hasClass('o') ||//vertical win
        piece3.hasClass('o') && piece6.hasClass('o') && piece9.hasClass('o') ||//vertical win
        piece1.hasClass('o') && piece5.hasClass('o') && piece9.hasClass('o') || //diagonal win
        piece3.hasClass('o') && piece5.hasClass('o') && piece7.hasClass('o')//diagonal win
    ) {
        alert('Winner: O');
        turns = 0;
    }
}
else {
    turns++;
    $(this).text(x);
    $(this).addClass('disable x');
    if (piece1.hasClass('x') && piece2.hasClass('x') && piece3.hasClass('x') || //horizontal win
        piece4.hasClass('x') && piece5.hasClass('x') && piece6.hasClass('x') ||//horizontal win
        piece7.hasClass('x') && piece8.hasClass('x') && piece9.hasClass('x') ||//horizontal win
        piece1.hasClass('x') && piece4.hasClass('x') && piece7.hasClass('x') || //vertical win
        piece2.hasClass('x') && piece5.hasClass('x') && piece8.hasClass('x') ||//vertical win
        piece3.hasClass('x') && piece6.hasClass('x') && piece9.hasClass('x') ||//vertical win
        piece1.hasClass('x') && piece5.hasClass('x') && piece9.hasClass('x') || //diagxnal win
        piece3.hasClass('x') && piece5.hasClass('x') && piece7.hasClass('x')//diagonal win
    ) {
        alert('Winner: X');
        turns = 0;
    }
}
});
// reset 
$('#reset').on('click', function () {
    $('#mat li').text(' ');
    $('#mat li').removeClass('disable');
    $('#mat li').removeClass('o');
    $('#mat li').removeClass('x');
    turns = 0;
});
})