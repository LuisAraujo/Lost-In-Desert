
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
		this.changed.push([oldanim, oldframe, oldx, oldy, oldflipv]);
		this.isstop=false;
		console.log("play")	
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
			if  (! (((this.x > elens[i].x) && (this.x < elens[i].x+elens[i].w*sizepixel) &&
			(this.y > elens[i].y) && (this.y < elens[i].y+elens[i].h*sizepixel)) ||
			((elens[i].x > this.x) && (elens[i].x < this.x+this.w*sizepixel) &&
			(elens[i].y > this.y) && (elens[i].y < this.y+elens[i].h*sizepixel)))) {
				elens[i].changed.push([elens[i].currentanim,elens[i].currentframe,elens[i].x,elens[i].y,,elens[i].flipv]);
				this.changed.push([this.currentanim, this.currentframe, this.x, this.y, this.flipv]);
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
	
	if((!this.isstop) && (!left) && (!right) && (!up) && (!down) ){
		this.changed.push([this.currentanim, this.currentframe, this.x, this.y, this.flipv]);
		this.currentframe = 0;
		this.isstop = true;
		console.log("stop")	
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
	pegada.changed.push([0,0,pegada.x,pegada.y,false])
	
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