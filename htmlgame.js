//this will change for pallet
ncolor =  ["0,0,0,0"];
degrees = [0,90,180,270];

//original maps
or_map = [];

//link levels (-1 is not way) follow this sequence: up, down, left, right. 
//Any link have two values: link and position of wizard 
or_map.push([ [-1,-1], [-1,-1], [-1,-1], [-1 ,-1] ])
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
currentLevel = 0;
levelElements = new Array();

//game objetcts array
gameElements = new Array();

//canvas and context
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

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
		if(currentLevel ==0)
			loadLevelId([lastlevel,null]);
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
	
	
	cadev('click', function(event) {
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
	});
	
		
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
		if((el.changed != null) && (el.type!="wall")){
				el.clear(el.changed);
				el.print();
				el.changed = null;
		}
	}
	
	for(var i=0; i< gameElements[currentLevel].length; i++)
		gameElements[currentLevel][i].update();		
	
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

//***GAMEOBJECT Class***//
//d is array of animation (animation is array of frames) (frames is array of nambrer color)
//p is paller color
//x and y is position
//w and h is width and height
//c is flag for collider
//z is z position
function GameObject(d,p,x,y,w,h,c,z){
	this.data = d;
	this.pallet = p;
	this.x = x;
	this.y = y;  
	this.w = w;
	this.h = h;
	this.z = z;
	this.timec = currenttime;
	//current frame
	this.currentframe = 0;
	//currrent animation
	this.currentanim = 0;
	//this.rotate = 0;
	this.collider = c; 
	//type gameobject
	this.type = "gameobject";
	//flag for filp vertical
	this.flipv = false;
	//angle rotate
	this.r = 0;
	//flag for repaint
	this.changed = null;
	//id gameobjetc
	this.id =-1;
}
//***GAMEOBJECT PRINT Method***//
GameObject.prototype.print = function(){
	//save context
	ctx.save();
	//is not character?
	if(this.type!="character"){
		//this code rotate the gameobject in any level
		
		r = this.r + currentdir[currentLevel];
		if(r<0)
			r+=360
		else if(r>360)
			r-=360			
			
		if( r == 90){
			ctx.translate(canvas.width,0);
			ctx.rotate(90*Math.PI/180);
		}else if( r == 180){
			ctx.translate(canvas.width,canvas.height);
			ctx.rotate(180*Math.PI/180);
		}else if(r == 270){
			ctx.translate(0,canvas.height);
			ctx.rotate(270*Math.PI/180);
		}
	}
	

	//turn game objetcts for print
	for(var i=0; i< this.data[this.currentanim][parseInt(this.currentframe)].length; i++) {
		//turn any rect for print
		for(var j=0; j<this.data[this.currentanim][parseInt(this.currentframe)][i].length; j++) {
		  //fram not is float	
		  frame = parseInt(this.currentframe);	
		  //get color
		  var color = this.pallet[this.data[this.currentanim][frame][i][j]];
		  //opacity is 0?
		  if(color[3]==0){
			  continue;
		  }
		  //else set color in fillstyle
		  ctx.fillStyle="rgba("+color+")";
		  //is fliped?
		  if(this.flipv)
			ctx.fillRect(this.x+( (this.data[this.currentanim][parseInt(this.currentframe)][i].length-j)*sizepixel),this.y+(i*sizepixel), sizepixel, sizepixel);
		  else
			ctx.fillRect(this.x+(j*sizepixel),this.y+(i*sizepixel), sizepixel, sizepixel);
		}
	}
	
	//this is rect colides [use only for test]
	if( this.collider){
		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.lineWidth = 1;
		ctx.strokeRect(this.x,this.y, this.w*sizepixel, this.h*sizepixel);
	}
	
	//restore context
	ctx.restore();
};

//***GAMEOBJECT CLEAR Method***//
//change is the state animation and frame for repaint
GameObject.prototype.clear = function(change){
   //save context
   ctx.save();
   //is not character?
   if(this.type!="character"){
		r = this.r + currentdir[currentLevel];
		if(r<0)
			r+=360
		else if(r>360)
			r-=360	
		
		if( r == 90){
			ctx.translate(500,0);
			ctx.rotate(90*Math.PI/180);
		}else if( r == 180){
			ctx.translate(500,500);
			ctx.rotate(180*Math.PI/180);
		}else if(r == 270){
			ctx.translate(0,500);
			ctx.rotate(270*Math.PI/180);
		}
	}
	
	
	var anim =  change[0];
	var frame = parseInt(change[1]);
	var x = change[2];
	var y = change[3];
	var oldflipv = change[4];
	
	for(var i=0; i< this.data[anim][frame].length; i++) {
		for(var j=0; j<this.data[anim][frame][i].length; j++) {
		  //frame = parseInt(this.currentframe);	
		  var color = this.pallet[this.data[anim][frame][i][j]];
		  
		  if(color[3]==0){
			  continue;
		  }
		 
		  if(oldflipv)
			ctx.clearRect( x+( (this.data[anim][frame][i].length-j)*sizepixel),  y+(i*sizepixel), sizepixel, sizepixel);
		  else
			 ctx.clearRect( x+(j*sizepixel), y+(i*sizepixel), sizepixel, sizepixel);
		 
		 
		}
	}
	
	ctx.restore();
}

GameObject.prototype.update = function(){};


//***CHARACTER Class***//
//footprint is array for footprint gameobjects
//lastfootprint is the time of creatation the last footprint
var Character = function(d, p, x,y, w,h,c,z){
	GameObject.call(this,d,p,x,y,w,h,c,z);
	this.type = "character";
	this.footprint = null;
	this.lastfootprint = 0;
}

//This functions is for create enranche 
herda(GameObject, Character);

//***CHARACTER MOVE Method***//
//dir is the direction of movement
Character.prototype.move = function (dir){
	this.footprinter();

	//pass level
	oldy = this.y;
	oldx = this.x;
	oldflipv = this.flipv;
	oldframe = this.currentframe;
	oldanim = this.currentanim;
	
	if(this.x > 515)
		loadLevel("left");
	else if( this.x+ (this.w*sizepixel) < 0)
		loadLevel("right");
	else if(this.y > 515)
		loadLevel("down");
	else if(this.y < 40)
		loadLevel("up");
	
	if((dir == "up") || (dir == "upleft") || (dir == "upright")){
	    if((this.y < 100) && ( (this.x < 260) || (this.x > 290) ) )
			return;
	}
	
	if((dir == "left") || (dir == "upleft") || (dir == "downleft")){
	    if((this.x < 90) || (this.y > 468))
			return;	
	}
	
	if((dir == "right") || (dir == "upright") || (dir == "downright")){
	    if( ( (this.x > canvas.width-150) && ( (this.y < 275) || (this.y > 295) ) ) || (this.y < 90) || (this.y > 468))
			return;
	}
	
	if((dir == "down") || (dir == "downleft") || (dir == "downright")){
	    if((this.y > canvas.height-160) && ( (this.x < 260) || (this.x > 327) )){
			return;
		}
	}
	
    if(dir =="left"){
		this.x-=3;
		this.flipv = true;
	}
	else if(dir =="upleft"){
		this.x-=2;
		this.y-=2;
		this.flipv = true;
	}
	else if(dir =="downleft"){
		this.x-=2;
		this.y+=2;
		this.flipv = true;
	}
	
	if(dir=="right"){
		this.x+=3;
		this.flipv = false;
	
	}else if(dir=="upright"){
		this.x+=2;
		this.y-=2;
		this.flipv = false;
	}else if(dir=="downright"){
		this.x+=2;
		this.y+=2;
		this.flipv = false;
	}
	
	if((dir=="up")){
		this.y-=3;
	}else if(dir=="down"){
		this.y+=3;
	}
	
	if( (left) || (right) || (up) || (down) ){
		this.changed = [oldanim, oldframe, oldx, oldy, oldflipv];
		this.isstop=true;
		this.currentframe += 0.2;
	}
		
	if(this.currentframe > this.data[this.currentanim].length-1){
	   this.currentframe = 0;
	}

}

Character.prototype.update = function(){
	//collider
	colup = false;
	coldown = false;
	colleft = false;
	colright = false;
	inner = false;
	
	elens = gameElements[currentLevel];
	for(var i=0; i< elens .length; i++){
		inner = false;
		if(this != elens[i]) {
			if( ((this.x > elens[i].x) && (this.x < elens[i].x+elens[i].w*sizepixel) &&
			(this.y > elens[i].y) && (this.y < elens[i].y+elens[i].h*sizepixel)) ||
			((elens[i].x > this.x) && (elens[i].x < this.x+this.w*sizepixel) &&
			(elens[i].y > this.y) && (elens[i].y < this.y+elens[i].h*sizepixel))){
				elens[i].changed=null;
			}else if(elens[i].changed==null){
				elens[i].changed=[elens[i].currentanim,elens[i].currentframe,elens[i].x,elens[i].y];
			}
		//end if
		}
	//end for
	}
	  
	if(left && !colleft){
	    if(up && !colup){
			this.move("upleft");
		}else if(down && !colup){
			this.move("downleft");
		}else{
			this.move("left");
		}
		//this.currentanim = 1;
	}else if(right && !colright){
	    if(up && !colup){
			this.move("upright");
	 
		}else if(down && !colup){
			this.move("downright");
		 
		}else{ 
			this.move("right");
		}
	}else if(down && !coldown){
		this.move("down");
		 
		//this.currentanim = 0;
	}else if(up && !colup){
		this.move("up");
		 
	}
   
    if(up){
		this.currentanim = 1;
	}else if(down){
		this.currentanim = 0; 
	}
	if( (!this.isstop) && (!left) && (!right) && (!up) && (!down) ){
		this.changed = [this.currentanim, this.currentframe, this.x, this.y, this.flipv];
		this.currentframe = 0;
		this.isstop = true;
	}

	
	//this.print();
};
//***CHARACTER FOOTPRINTER Method***//
Character.prototype.footprinter = function(){
	if(currenttime - this.lastfootprint < 0.0001)
		return;
	var f = [ [0,1,1,0],[1,0,0,1],[1,0,2,1],[0,1,1,0]]
	var a = [f];
	var pegada = new GameObject([a], [[0,0,0,0], [241,153,66,1],[251,131,57,1] ], 10, 10, 5, 5, false, 0);
    //pegada.r = currentdir;
	pegada.x = this.x + 25;
	pegada.y = this.y + 50;
	pegada.z = 1;
	pegada.type = "pegada";
	pegada.changed = [0,0,pegada.x,pegada.y];
	
	//pegada.isnew = false; //true;
	pegada.r = -currentdir[currentLevel];
	pegada.update = function(){
		//console.log(currenttime - this.timec);
		if(currenttime - this.timec > 0.1) {
			//console.log("removing");
			for(var i=0; i< gameElements[currentLevel].length; i++){
				if(gameElements[currentLevel][i].id == this.id){
					gameElements[currentLevel].splice(i,1)
					break;
				}
			}
		}
	}
	this.lastfootprint = currenttime;
	insertElement(pegada,currentLevel); 
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
		loadLevelId(cl);
	}
	
	
	
}

function loadLevelId(level){
	//console.log(level)
	id= level[0];
	
	console.log(currentdir[id], "graus -> ",or_map[id]);
	//console.log(arr);
	if(id == 0){
		canvas.style.backgroundImage = null;
		canvas.style.backgroundColor = "#000";
	}else{
		canvas.style.backgroundImage = "url(tileset-min.png)";
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if((id!=0) && (currentLevel != 0)){
		currentdir[id] += degrees[0];
		if(currentdir[id] >= 360)
			currentdir[id] -= 360;
		//console.log("change "+currentLevel)//Math.floor((Math.random() * 4))];
		
		for(var i=0; i < gameElements[id].length; i++){
			if(gameElements[id][i].type == "character"){
				console.log(level[1]);
				if(level[1] == "up"){
					
					//l
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

				continue;
			}
				
			//gameElements[id][i]=rotateElem(gameElements[id][i],id);
			
		}
		map[id] = rotateMap(id);
		console.log(map[id]);
	}
	
	/*set anglee for footprints
	gameElements[currentLevel].forEach(function(elem){
		if( elem.type == "pegada" && elem.isnew){
			elem.r = 0;//gameElements[currentLevel][gameElements[currentLevel].length-2].r;
			elem.isnew = false;
			console.log("pegada false");
		}
		
	});*/
	
	currentLevel = id;
	
	for(var i=0; i<gameElements[currentLevel].length; i++)
		gameElements[currentLevel][i].print();
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