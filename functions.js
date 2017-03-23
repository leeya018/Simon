var game={


}
game.intervalId = -1;
game.currLevel =4;
game.endLevel =10;
game.indexLocation =0;

game.colorsButts = new Map();

game.butts = ["game_button_1","game_button_2","game_button_3","game_button_4"];

game.colorsButts.set("game_button_1","#00FFFF");
game.colorsButts.set("game_button_2","#7FFF00");
game.colorsButts.set("game_button_3","#FFD700");
game.colorsButts.set("game_button_4","#DC143C");

game.colrsOrig = new Map();

game.colrsOrig.set("game_button_1","blue");
game.colrsOrig.set("game_button_2","green");
game.colrsOrig.set("game_button_3","yellow");
game.colrsOrig.set("game_button_4","red");

game.timeOut = 2000;

game.voices = new Map();
game.voices.set("game_button_1",new Audio("voices/cartoon001.wav"));
game.voices.set("game_button_2",new Audio("voices/cartoon002.wav"));
game.voices.set("game_button_3",new Audio("voices/cartoon003.wav"));
game.voices.set("game_button_4",new Audio("voices/cartoon004.wav"));



game.looseSound = new Audio("voices/cartoon_fail.wav");

// game.nextLevelSound=;

game.succession=[];

//play the sound and the bright imae of the game for wach button
function makeColorAndVoice(item){
	var id = makeColorByItem(item);
	setTimeout(backToOriginColor,400,id);
	makeVoice(id);
    
}

function makeColorAndVoiceById(id){
	makeColorById(id);
	setTimeout(backToOriginColor,400,id);
	makeVoice(id);
    
}



//back to the origin color of the button 
function backToOriginColor(id){
	 $("#"+id).css("background-color", game.colrsOrig.get(id));


}
//show the color by item (we sends this in the UI)
function makeColorByItem(item){

	var id = $(item).attr("id");
	return makeColorById(id);


}

//show color by id
function makeColorById(id){

	$("#"+id).css("background-color", game.colorsButts.get(id));
	return id;
}

//sounds the voice
function makeVoice(id){
	game.voices.get(id).play();

}

//check if while the user playing the succession if it is failes
function faildAndRestartGame(){
	// var
	alert("you fails");
}

//playing the succession for each level
 function playSuccession(){
 	var rand;
 	var iterations = 0;
	 var intervalId = setInterval(playSuccessionHelper,1000);

//operate each time random button with audio and color
function  playSuccessionHelper(){
		iterations++;
 		rand = ramndomNum();
 		var randId = game.butts[rand];
 		makeColorAndVoiceById(randId);
 		if(iterations >= game.currLevel)
 		{
 			 clearInterval(intervalId);
 		}

}


}





//return random num from 0 to 3
function ramndomNum(){
 	return Math.floor(Math.random()*4);
}

//checking the succession for each level 
//if fail so will call faildAndRestartGame();
//if sibish succesfully will call nextLevel();
 function checkGame(){

}

//will increase the level by one
//and will call playSuccession();
//and after it will call checkGame();  
function nextLevel(){


}

//will show alert on the screen 
function gameFinshSuccessfully(){

}

//will check if currLevel equals to endLevel and will call gameFinshSuccessfully();
//if not so it will call to : nextLevel();
function checkIfGameisFinish(){

}

