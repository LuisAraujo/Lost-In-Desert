
makeMapUp = function(lv){
	insertElement(gerate_wall2(0,0,false,0,1),lv)
	insertElement(gerate_wall(83,0,1,0),lv)
	insertElement(gerate_wall(141,0,1,0),lv)
	insertElement(gerate_wall(201,0,1,0),lv)
	insertElement(gerate_wall(261,0,1,0),lv)
	insertElement(gerate_wall(301,0,1,0),lv)
	insertElement(gerate_wall(361,0,1,0),lv)
	insertElement(gerate_wall(411,0,1,0),lv)
	insertElement(gerate_wall(471,0,1,0),lv)
}


makeMapUp2 = function(lv){
	insertElement(gerate_wall2(0,0,false,0,1),lv)
	insertElement(gerate_wall(83,0,1,0),lv)
	insertElement(gerate_wall(141,0,1,0),lv)
	insertElement(gerate_door(201,0,false,1,0),lv)
	insertElement(gerate_door2(267,0,false,0),lv)
	insertElement(gerate_door2(303,0, true, 0),lv)
	insertElement(gerate_door(345,0,false,1,0),lv)
	insertElement(gerate_wall(411,0,1,0),lv)
	insertElement(gerate_wall(471,0,1,0),lv)
}

makeMapLeft = function(lv){
	insertElement(gerate_wall2(528,0, true,1,0),lv)
	insertElement(gerate_wall(83,0,1,90),lv)
	insertElement(gerate_wall(143,0,1,90),lv)
	insertElement(gerate_wall(201,0,1,90),lv)
	insertElement(gerate_wall(261,0,1,90),lv)
	insertElement(gerate_wall(301,0,1,90),lv)
	insertElement(gerate_wall(361,0,1,90),lv)
	insertElement(gerate_wall(413,0,1,90),lv)
	insertElement(gerate_wall(473,0,1,90),lv)
}

makeMapLeft2 = function(lv){
	insertElement(gerate_wall2(528,0, true,1,0),lv)
	insertElement(gerate_wall(83,0,1,90),lv)
	insertElement(gerate_wall(143,0,1,90),lv)
	insertElement(gerate_door(203,0,false,1,90),lv)
	insertElement(gerate_door2(269,0,false,90),lv)
	insertElement(gerate_door2(305,0, true, 90),lv)
	insertElement(gerate_door(347,0,false,1,90),lv)
	insertElement(gerate_wall(413,0,1,90),lv)
	insertElement(gerate_wall(473,0,1,90),lv)
}

makeMapRight = function(lv){
	insertElement(gerate_wall2(0,0,false,1,270),1)
	insertElement(gerate_wall(85, 0,1,270),1)
	insertElement(gerate_wall(145,0,1,270),1)
	insertElement(gerate_wall(201,0,1,270),1)
	insertElement(gerate_wall(261,0,1,270),1)
	insertElement(gerate_wall(301,0,1,270),1)
	insertElement(gerate_wall(361,0,1,270),1)
	insertElement(gerate_wall(413,0,1,270),1)
	insertElement(gerate_wall(473,0,1,270),1)
}

makeMapRight2 = function(lv){
	insertElement(gerate_wall2(0,0,false,1,270),1)
	insertElement(gerate_wall(85, 0,1,270),1)
	insertElement(gerate_wall(145,0,1,270),1)
	insertElement(gerate_door(203,0,false,1, 270),1)
	insertElement(gerate_door2(269,0,false,270),1)
	insertElement(gerate_door2(305,0,true,270),1)
	insertElement(gerate_door(347,0,false,1, 270),1)
	insertElement(gerate_wall(413,0,1,270),1)
	insertElement(gerate_wall(473,0,1,270),1)
}


makeMapDown = function(lv){
	insertElement(gerate_wall2(527,0,true,1,90),1)
	insertElement(gerate_wall(84,0,1,180),1)
	insertElement(gerate_wall(144,0,1,180),1)
	insertElement(gerate_door(204,0,false,1,180),1)
	insertElement(gerate_door2(270,0,false, 180),1)
	insertElement(gerate_door2(306,0,true, 180),1)
	insertElement(gerate_door(348,0,false,1,180),1)
	insertElement(gerate_wall(414,0,1,180),1)
	insertElement(gerate_wall(474,0,1,180),1)
}
//gameElements[1].push();





