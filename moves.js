var MOVE_DIST = 10;
var movesCoeffs = [[0, -1], [-1, 0], [0, 1], [1, 0]];
var arrayWall = [ new Wall('60', '60'), new Wall('60', '70'), new Wall('60', '80'), new Wall('70', '60'), new Wall('70', '80'), new Wall('80', '60'), new Wall('80', '70'), new Wall('80', '80')];
var CPT_TOTAL = 0;
var CPT = 0;

function Wall(top, left) {
    this._top = top;
    this._left = left;
}

function init () {
    $("#dialog").hide();
    $("#defeat").hide();

    var map = document.getElementById("map");
    var player = document.getElementById("player");
    var moves = document.getElementsByClassName("move");
    var blocs = document.getElementById("bloc");

    CPT = $("#map").attr("compteur");

    player.style.left = $("#player").css("left");
    player.style.top = $("#player").css("top");

    $("#cpt").html("</br>Coups restants : " + CPT + " / " + $("#map").attr("compteur"));
    moves[0].onclick = function () { movePlayer(player, movesCoeffs[0], 1); };
    moves[1].onclick = function () { movePlayer(player, movesCoeffs[1], 2); };
    moves[2].onclick = function () { movePlayer(player, movesCoeffs[2], 1); };
    moves[3].onclick = function () { movePlayer(player, movesCoeffs[3], 2); };
}

function movePlayer (player, coeff, check) {
    var playerLeft;
    var playerTop;
    var mapLeft;
    var mapTop;

    playerLeft = parseInt(player.style.left) + (coeff[0] * MOVE_DIST);
    playerTop = parseInt(player.style.top) + (coeff[1] * MOVE_DIST);
    
    mapLeft = parseInt($("#map").css("width")) - 10;
    mapTop = parseInt($("#map").css("height")) - 10;

    if (CPT <= 0)
    {
	$("#defeat").show();
	return (1);
    }
    if ((((playerLeft >= 00) && (playerLeft <= mapLeft)) || (player.style.left == "")) && check == 2) {
	if (checkObstacles(playerTop, playerLeft, parseInt(player.style.top), parseInt(player.style.left)) == 0)
	{
	    player.style.left = "" + ((parseInt(player.style.left) || 0) + (coeff[0] * MOVE_DIST)) + "px";
	    CPT--;
	    $("#cpt").html("</br>Coups restants : " + CPT + " / " + $("#map").attr("compteur"));
	}
    }
    if ((((playerTop >= 00) && (playerTop <= mapTop)) || (player.style.top == "")) && check == 1) {
	if (checkObstacles(playerTop, playerLeft, parseInt(player.style.top), parseInt(player.style.left)) == 0)
	{
	    player.style.top = "" + ((parseInt(player.style.top) || 0) + (coeff[1] * MOVE_DIST)) + "px";
	    CPT--;
	    $("#cpt").html("<br/>Coups restants : " + CPT + " / " + $("#map").attr("compteur"));
	}
    }
}

function checkObstacles(coordT, coordL, posT, posL) {
    if (checkWalls(coordT, coordL) != 0)
	return (1);
    if (checkEnd(posT, posL) != 0)
    {
	var tot = $("#map").attr("compteur") - CPT;
	
	$("#dialog").html("</br>Bien jou&eacute; ! Vous avez r&eacute;ussi ce niveau en " + tot + " coups ! </br> Prochain niveau ici.");
	$("#dialog").show();
	return (1);
    }
    return (0);
}

function checkWalls(coordT, coordL) {
    for (var i = 0; i < arrayWall.length; i++) {
	if ((coordT == arrayWall[i]._top) && (coordL == arrayWall[i]._left)) {
	    return (1);
	}
    }
    return (0);
}

function checkEnd(coordT, coordL) {
    var endT;
    var endL;
    
    endT = $("#end").css("top");
    endL = $("#end").css("left");
    if (coordT == parseInt(endT) && coordL == parseInt(endL))
	return (1);
    return (0);
}