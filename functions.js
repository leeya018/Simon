var game={

}

game.failMsg = "you fail";
game.currCheck =0;

game.currLevel =1;
game.endLevel =100;

game.memory=[];

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

game.succession=[];

$("#levelId").text(game.currLevel);

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
	massage(game.failMsg);
	game.memory=[];
	game.currCheck = 0;
	game.currLevel = 1;
	$("#levelId").text(game.currLevel);
	$("#start_butt").css("visibility","visible");
	enableBtnsGame(true);
}

function enableBtnsGame(flag){
	enableBtnGame("game_button_1",flag);
	enableBtnGame("game_button_2",flag);
	enableBtnGame("game_button_3",flag);
	enableBtnGame("game_button_4",flag);
}

function enableBtnGame(btnName,flag){
	var name = "#"+btnName;
	$(name).attr("disabled", flag);
}

function hiddenStartOverBtn(){
	$("#start_butt").css("visibility","hidden");
}

//playing the succession for each level
function playSuccession(){
	hiddenStartOverBtn();
	enableBtnsGame(false);
	makeMsgHidden();
	if(game.memory.length == 0)
	{
		initMemory();
	}
 	// var rand;
 	var iterations = 0;
 	var intervalId = setInterval(playSuccessionHelper,1000);

//operate each time random button with audio and color
function  playSuccessionHelper(){
	iterations++;
	makeColorAndVoiceById(game.memory[iterations-1]);
	if(iterations >= game.currLevel)
	{
		clearInterval(intervalId);
	}
}
}

function initMemory(){
	var rand;
	for (var i = 0; i < game.endLevel ; i++) {
		rand = ramndomNum();
		game.memory.push(game.butts[rand]);		
	}
}

//return random num from 0 to 3
function ramndomNum(){
	return Math.floor(Math.random()*4);
}

//checking the succession for each level 
//if fail so will call faildAndRestartGame();
//if sibish succesfully will call nextLevel();
function checkGame(item){
	makeColorAndVoice(item);
	var id = $(item).attr("id");
	if(id == game.memory[game.currCheck])
	{
		game.currCheck++;
		console.log("++");
		if(game.currCheck == game.currLevel )
		{
			setTimeout(nextLevel,1000);

		}
	}
	else
	{
		setTimeout(faildAndRestartGame,1000);

	}
}

//will increase the level by one
//and will call playSuccession();
//and after it will call checkGame();  
function nextLevel(){
	if(!checkIfGameisFinish()){
		// massage("next level");
		game.currLevel++;
		game.currCheck = 0;
		// game.memory=[];
		$("#levelId").text(game.currLevel);
		playSuccession();
	}
	else{
		massage("you won the game");
	}
}

function massage(msg){

	$("#massage").text(msg);
	makeMsgVisable();
}

// var intervalGreen=0;

function  makeMsgVisable(){
	$("#massage").css("visibility","visible");
	// clearInterval(intervalGreen);

}

function makeMsgHidden(){
	$("#massage").css("visibility","hidden");
}

//will check if currLevel equals to endLevel and will call gameFinshSuccessfully();
//if not so it will call to : nextLevel();
function checkIfGameisFinish(){

	return game.currLevel == game.endLevel;
}
