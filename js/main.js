$(function () {
    var canvasin = '', rowP = '<tr>';
    var pals = ['img/0.png', 'img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png'];
    var cwidth = 30, pwidth = 7; //cw:canvasの一辺のセル pw:パレットのセル
    var pushed = false, rflag = false;
    var dice = '';
    //var savepict = new Array(30);
    var savepict = new Array (cwidth*cwidth);


    //2次元配列的ななにか
    for(var i=0;i<cwidth;i++) save[i] = new Array(30);

    /*---------- キャンバスの作成 ----------*/
    for (i=0;i<cwidth;i++) {
	canvasin += '<tr id="ctr' + i + '">';
	for (j=0;j<cwidth;j++) {
	    canvasin += '<td class="ctd' + j + '">&nbsp;</td>';
	}
	canvasin += '</tr>';
    }
    //for (i=0;i<30;i++) rowC += '<td id="ctd' + i + '">&nbsp;</td>';
    //rowC += '</tr>';
    //for (i=0;i<30;i++) $('#canvas').append(rowC);
    $('#canvas').append(canvasin);
    for (i=0;i<900;i++) $('#canvas td').eq(i).css('background-image', 'url(' + pals[0] + ')'); //背景を塗りつぶし

    /*---------- パレットの作成 -----------*/
    for (i=0;i<pwidth;i++) rowP += '<td>&nbsp;</td>';
    rowP += '<tr>';
    $('#palette').html(rowP);
    for (i=0;i<pwidth;i++) $('#palette td').eq(i).css('background-image', 'url(' + pals[i] + ')');

    /*---------- サイコロの目を選択 ----------*/
    $('#palette').click(function (event) {
	$(event.target).css({ borderColor: 'red' }).siblings().css({ borderColor: 'gray' });
	dice = $(event.target).css('background-image');
    }).eq(0).click();

    /*---------- キャンバスに描写 ---------*/
    $('#canvas').mousedown(function (event) {
	pushed = true;
	$(event.target).css('background-image', dice);
	console.log(event.target.parentElement);
	return false;
    }).mousemove(function (event) {
	if (pushed) $(event.target).css('background-image', dice);
	//console.log(event);
	return false;
    });
    $(document).mouseup(function (event) {
	pushed = false;
    });

    /*----------- クリア ------------*/
    $('#clear').click(function () {
	for (i=0;i<cwidth*cwidth;i++) $('#canvas td').eq(i).css('background-image', 'url(' + pals[0] + ')');
    });

    /*----------- 保存 -------------*/
    var saveflag = 1;

    //canvasの中がすべて0.pngかどうか調べる
    for(i=0;i<cwidth*cwidth;i++) {
	if($('#canvas td').eq(i).css('background0image') != 'img/0.png') {
	    saveflag = 0;
	    break;
	}
    }

    //saveflagが立っていたら配列にデータを保存、立っていなければエラーを返す
    var search;
    if(saveflag == 1) {
	$('#save').click(function () {
	    for (i=0;i<cwidth*cwidth;i++) {
		for(j=0;j<pwidth;j++) {
		    search = $('#canvas td').eq(i).css('background-image').indexOf(pals[j]);
		    if(search > 0) savepict[i] = j;
		}
		console.log(savepict[i]);
	    }
	});
    }

});


