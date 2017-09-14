
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
	this.changed = [] //null;
	//id gameobjetc
	this.id =-1;
}
//***GAMEOBJECT PRINT Method***//
GameObject.prototype.print = function(){
	//save context
	var currentanim = this.currentanim;
	var currentframe = this.currentframe;
	var x = this.x;
	var y = this.y;
	
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
	for(var i=0; i< this.data[currentanim][parseInt(currentframe)].length; i++) {
		//turn any rect for print
		for(var j=0; j<this.data[currentanim][parseInt(currentframe)][i].length; j++) {
		  //fram not is float	
		  frame = parseInt(currentframe);	
		  //get color
		  var color = this.pallet[this.data[ currentanim][frame][i][j]];
		  //opacity is 0?
		  if(color[3]==0){
			  continue;
		  }
		  //else set color in fillstyle
		  ctx.fillStyle="rgba("+color+")";
		  //is fliped?
		  if(this.flipv)
			ctx.fillRect( x+((this.data[currentanim][parseInt( currentframe)][i].length-j)*sizepixel),y+(i*sizepixel), sizepixel, sizepixel);
		  else
			ctx.fillRect( x+(j*sizepixel), y+(i*sizepixel), sizepixel, sizepixel);
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
GameObject.prototype.clear = function(){
   //console.log(change)
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
	
	for(var i=0; i< this.changed.length; i++){
		////ar i = 0;
		var anim = this.changed[i][0];
		var frame = parseInt(this.changed[i][1]);
		var x = this.changed[i][2];
		var y = this.changed[i][3];
		var oldflipv = this.changed[i][4];
		
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
			 
			  this.changed.shift();
			 
			}
		}
	}
	ctx.restore();
}

GameObject.prototype.update = function(){};

