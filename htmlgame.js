//this will change for pallet
ncolor =  ["0,0,0,0"];
degrees = [0,90,180,270];

//original maps
or_map = [];

//link levels (-1 is not way) follow this sequence: up, down, left, right. 
//Any link have two values: link and position of wizard 
or_map.push([ [1,"down"], [-1,-1], [-1,-1], [-1 ,-1] ])
or_map.push([ [2,"down"], [-1,-1], [-1,-1], [-1 ,-1] ])
or_map.push([ [-1,-1], [1,"up"], [-1,-1], [-1 ,-1] ])

//copy original map for current map  
map = or_map.slice();


localChanged = [];
currentdir = [0,0,0,0];
currenttime = 0;

//variable of inputs
left = false;
right = false;
up= false;
down = false;
space = false;
sizepixel = 3;
lastlevel = 1;
collidermode = true;
currentLevel = -1;
nextLevel = -1;
levelElements = new Array();

//game objetcts array
gameElements = new Array();

//canvas and context
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

//flag for transition os levels
intransition = false;
tran_fadein = true;
tran_opacity = 0;
//levelElements.push(gameElements);

function loadLevel(id){
	left = false;
	right = false;
	up= false;
	down = false;
	space = false;
	currentLevel = id;
}

function startGame(){
	//load level 01
	loadLevelId([0,0]);
	
	//SET GAME LOOPS
	window.requestAnimationFrame(loop)
	//gameloop = setInterval(loop, 1000/60);
	dadev = document.addEventListener;
	cadev = canvas.addEventListener;
	
	//**** FUNCTION INPUTS ***** //
	dadev('keydown', function(e) {
	if(e.keyCode == 27){
		loadLevelId([0,null]);
	}
	if(e.keyCode == 32){
		console.log("ok")
		if(currentLevel == 0)
			loadLevel("up")
			//loadLevelId([lastlevel,null]);
	}	
	if(e.keyCode == 37) left = true;
	if(e.keyCode == 38) up = true;
	if(e.keyCode == 39) right= true;
	if(e.keyCode == 40) down= true;
	});

	dadev('keyup', function(e) {
	//if(event.keyCode == 32) space = false;
	if(e.keyCode == 37) left = false;
	if(e.keyCode == 38) up = false;
	if(e.keyCode == 39) right= false;
	if(e.keyCode == 40) down= false;
	});
	
	
	/*cadev('click', function(event) {
		for(var i=0; i< gameElements[0].length; i++){
			var mousePos = getMousePos(canvas, event);
			
			if((gameElements[0][i].type == "button") 
			&& (mousePos.x >= gameElements[0][i].x) 
			&& (mousePos.x < gameElements[0][i].x + (gameElements[0][i].w*sizepixel))
			&& (mousePos.y >= gameElements[0][i].y)
			&& (mousePos.y < gameElements[0][i].y + (gameElements[0][i].h*sizepixel))
			){
				console.log(gameElements[0][i].x, gameElements[0][i].w, mousePos.x)
				gameElements[0][i].click();
			}
		}
	});*/
	
		
	for(var i=0; i< gameElements[currentLevel].length; i++){	
		gameElements[currentLevel][i].print();
	}
	ctx.save();
}


function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


//GAME LOOP FUNCTION
function loop(){
	if(!intransition){
		
		if(currentLevel!=0)
			currenttime+=0.00001;
		
		function compare(a,b) {
			if (a.z < b.z)
				return -1;
			if (a.z > b.z)
				return 1;
		
			return 0;
		}

		gameElements[currentLevel].sort(compare);
		len = localChanged.length;
		
		for(var i=0; i< gameElements[currentLevel].length; i++){
			el = gameElements[currentLevel][i];
			if((el.changed.length != 0) && (el.type!="wall")){
					el.clear();
					el.print();
					//el.changed = null;
			}
		}
		
		for(var i=0; i< gameElements[currentLevel].length; i++)
			gameElements[currentLevel][i].update();		
	
	}else{
		//if mode transition fade in
		if(tran_fadein){
			//plus opacity
			tran_opacity +=0.1;
			//limiar
			if(tran_opacity >= 1)
				tran_fadein = false;
		}else{
			//if(!intransition)
			loadLevelId(nextLevel)
			//les opacity
			tran_opacity -=0.1;
			//limiar general
			if(tran_opacity <= 0.4){
				tran_opacity=0;
				tran_fadein = true;
				intransition = false;
			}
			
		}
			
		ctx.clearRect(0,0,canvas.width, canvas.height)
		
		
			for(var i=0; i<gameElements[currentLevel].length; i++){
				gelms = gameElements[currentLevel][i];
				//elements as background of menu initial
				if(gelms.type == "noprint")
				continue;
				//set changed
				gelms.changed.push([gelms.currentanim,gelms.currentframe,gelms.x,gelms.y, gelms.flipv]);
				//print objetcts
				gelms.print();
			}
		
		
		
		ctx.fillStyle="rgba(0,0,0,"+tran_opacity+")";
		ctx.fillRect(0,0,canvas.width, canvas.height);	
	}
	
	window.requestAnimationFrame(loop);
};




var herda = function(mae, filha){
    // Faz uma cópia do prototipo da mãe
    var copiaDaMae = Object.create(mae.prototype); 
    // herda mãe
    filha.prototype = copiaDaMae; 
    //Ajusta construtor da filha    
    filha.prototype.constructor = filha;
}


function insertElement(elem,index){
	elem.id = gameElements[index].length;	
	gameElements[index].push(elem);
	return elem;
} 

function loadLevel(direction){
	cl = -1;
	var mwidth = wizard.w*sizepixel;
	var mheight = wizard.h*sizepixel;
	var arr = [];
	var arrup = [[0,0],[0,0],[0,0],[0,0]];
	var arrdown =[[0,0],[0,0],[0,0],[0,0]];
	var arrleft =[[0,0],[0,0],[0,0],[0,0]];
	var arrright = [[0,0],[0,0],[0,0],[0,0]];
	
	if((direction == "up") && (map[currentLevel][0][0]!=-1)){
		cl = map[currentLevel][0];
		arr = arrup;
	}else if((direction == "down")&& (map[currentLevel][1][0]!=-1)){
		cl = map[currentLevel][1];
		arr = arrdown;
	}else if((direction == "left")&& (map[currentLevel][2][0]!=-1)){
		cl = map[currentLevel][2];
		arr = arrleft;
	}else if((direction == "right")&& (map[currentLevel][3][0]!=-1)){
		cl = map[currentLevel][3];
		arr = arrright;
	}
	
	//console.log(map[currentLevel])
	if(cl!=-1){
		nextLevel = cl;
		intransition = true;
		//loadLevelId(cl);
	}
	
	
	
}

function loadLevelId(level){
	//console.log(level)
	id= level[0];
	
	//console.log(currentdir[id], "graus -> ",or_map[id]);
	//console.log(arr);
	if(id == 0){
		canvas.style.backgroundImage = null;
		canvas.style.backgroundColor = "#000";
	}else{
		canvas.style.backgroundImage = "url(tileset-min.png)";
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	/*var currentanim = null;
	var currentframe =  null;
	var x =  null;
	var y = null;
	var flip = null;*/
				
	if((id!=0) && (currentLevel != 0)){
		currentdir[id] += degrees[0];
		if(currentdir[id] >= 360)
			currentdir[id] -= 360;
		//console.log("change "+currentLevel)//Math.floor((Math.random() * 4))];
		
		//pode mudar pela ref global
		for(var i=0; i < gameElements[id].length; i++){
			if(gameElements[id][i].type == "character"){
				/*currentanim = gameElements[id][i].currentanim;
				currentframe = gameElements[id][i].currentframe;
				x = gameElements[id][i].x;
				y = gameElements[id][i].y;
				flip = gameElements[id][i].flipv;
				console.log(level[1]);
				gelms = gameElements[id][i];*/
				
				if(level[1] == "up"){
					if(currentdir[id] == 90){
						gameElements[id][i].x = canvas.width  - wizard.w*sizepixel
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}else if(currentdir[id] == 180){
						//d
						gameElements[id][i].x = canvas.width/2  - wizard.w*sizepixel;
						gameElements[id][i].y = canvas.height  - wizard.h*sizepixel;
					}else if(currentdir[id] == 270){
						//r
						gameElements[id][i].x = 0;
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}else{	
						//u
						gameElements[id][i].x = 267;
						gameElements[id][i].y = 58;
					}
					
				}else if(level[1] == "down"){
					
					if(currentdir[id] == 90){
						//r
						gameElements[id][i].x = 300;
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}else if(currentdir[id] == 180){
						//u
						gameElements[id][i].x = canvas.width/2  - wizard.w*sizepixel;
						gameElements[id][i].y = 0;
					}else if(currentdir[id] == 270){
						//l
						gameElements[id][i].x = canvas.width  - wizard.w*sizepixel
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}else{
						//d
						gameElements[id][i].x = 267;
						gameElements[id][i].y = 495;
					}
				}else if(level[1] == "left"){
					//d
					if(currentdir[id] == 90){
						gameElements[id][i].x = canvas.width/2  - wizard.w*sizepixel;
						gameElements[id][i].y = canvas.height  - wizard.h*sizepixel;
					}else if(currentdir[id] == 180){
						//r
						gameElements[id][i].x = 0;
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}else if(currentdir[id] == 270){
						//u
						gameElements[id][i].x = canvas.width/2  - wizard.w*sizepixel;
						gameElements[id][i].y = 0;
					}else{
						//l						
						gameElements[id][i].x = canvas.width  - wizard.w*sizepixel
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}
					
					
					
				}else if(level[1] == "right"){
					//u
					if(currentdir[id] == 90){
						gameElements[id][i].x = canvas.width/2  - wizard.w*sizepixel;
						gameElements[id][i].y = 0;
					}else if(currentdir[id] == 180){
						//l
						gameElements[id][i].x = canvas.width  - wizard.w*sizepixel
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}else if(currentdir[id] == 270){
						//d
						gameElements[id][i].x = canvas.width/2  - wizard.w*sizepixel;
						gameElements[id][i].y = canvas.height  - wizard.h*sizepixel;
					}else{	
						gameElements[id][i].x = 0;
						gameElements[id][i].y = canvas.height/2  - wizard.h*sizepixel;
					}
				}

			
				break;
			}
				
			
		}
		map[id] = rotateMap(id);
		//console.log(map[id]);
	}
	//try fix bug
	/*if(currentanim != null){
		console.log(wizard.changed)
		wizard.changed.push([currentanim,currentframe,x,y,flip]);
	}*/
	if(currentLevel!=-1)
		for(var i=0; i<gameElements[currentLevel].length; i++)
			gameElements[currentLevel][i].clear();
	
	currentLevel = id;
	//nextLevel = id;
	
	
	
	
}



function rotateElem(elem,id){
	elem.r = currentdir[id];
	if(elem.r >= 360)
		elem.r = 0;
	
	return elem;
}

function rotateMap(id){
	var map = null;
	amap = or_map[id].slice();

	if(currentdir[id] == 90){
		map = [amap[3],amap[2],amap[0],amap[1]];
	}else if(currentdir[id] == 180){
		map = [amap[1],amap[0],amap[3],amap[2]];
	}else if(currentdir[id] == 270){
		map = [amap[2],amap[3],amap[1],amap[0]];
	}else{
		map = or_map[id];
	}
	
	return map;
}