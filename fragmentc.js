
fragc01 = [ 
 
[5,5,5,5,0,0,0,5,5,5,5],
[5,5,0,0,2,2,2,0,0,5,5],
[5,0,2,2,2,1,2,2,2,0,5],
[5,0,2,2,2,1,2,2,2,0,5,5],
[0,2,2,2,1,1,1,2,2,2,0],
[0,2,2,2,1,2,1,2,2,2,0],
[0,2,2,1,1,1,1,1,2,3,0],
[5,0,2,2,1,1,1,2,2,0,5],
[5,0,2,2,2,2,2,2,3,0,5],
[5,5,0,0,3,3,3,0,0,5,5],
[5,5,5,5,0,0,0,5,5,5,5]
]

fragc02 = [ 
 
[5,5,5,5,0,0,0,5,5,5,5],
[5,5,0,0,4,4,4,0,0,5,5],
[5,0,4,4,4,1,4,4,4,0,5],
[5,0,4,4,4,1,4,4,4,0,5,5],
[0,4,4,4,1,1,1,4,4,4,0],
[0,4,4,4,1,2,1,4,4,2,0],
[0,2,4,1,1,1,1,1,4,3,0],
[5,0,4,4,1,1,1,4,2,0,5],
[5,0,2,4,4,4,4,2,3,0,5],
[5,5,0,0,3,3,3,0,0,5,5],
[5,5,5,5,0,0,0,5,5,5,5]
]

fragc03 = [ 
 
[5,5,5,5,0,0,0,5,5,5,5],
[5,5,0,0,1,1,1,0,0,5,5],
[5,0,1,1,1,0,1,1,1,0,5],
[5,0,1,1,1,0,1,1,1,0,5,5],
[0,1,1,1,0,0,0,1,1,1,0],
[0,1,1,1,0,1,0,1,1,2,0],
[0,1,1,0,0,0,0,0,1,3,0],
[5,0,1,1,0,0,0,1,2,0,5],
[5,0,2,1,1,1,1,2,3,0,5],
[5,5,0,0,3,3,3,0,0,5,5],
[5,5,5,5,0,0,0,5,5,5,5]
]

fragc_a01 = [fragc01,fragc01,fragc02, fragc03,fragc02,fragc01,fragc01];
p_fragc = [[0,0,0,1],[255,255,255,1],[0,149,233,1],[18,78,137,1],[44,232,245,1],[0,0,0,0]];
fragc = new GameObject( [fragc_a01], p_fragc, 10, 10, 11, 11,false, 10);

fragc.update= function(){
	this.changed = [this.currentanim, this.currentframe, this.x, this.y, this.flipv];
	this.currentframe += 0.2;
	if(this.currentframe > this.data[this.currentanim].length-1){
		this.currentframe = 0;
	}
}

fragc.fncollider = function(){
	console.log("OKOK")
}
