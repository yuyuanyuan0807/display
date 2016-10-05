var tileData;
var indexOrder=[];

$(document).ready(function() {
	$("#page2").show();
    $("#page1").hide();

 	$("#done").click(function() {
 		 

 		 update(tileData);
 		// alert(tileData.Tiles[0].TileProperties.HomeTileStatus);
        $("#page2").fadeOut(1500);
        $("#page1").fadeIn();
       
    });

    $("#gear").click(function() {
        $("#page2").fadeIn(1500);
        $("#page1").fadeOut();
    });

	});

function choose(id){

	var selector= "#t"+id+" td:first-child";
	//alert($(selector));
	var className = $(selector).attr('class');
  if(className=="check"){
		$(selector).switchClass( "check", "empty");
		///*
		$.each(tileData.Tiles,function(i, item){
	
			if(item.DisplayOrder==id){
				item.TileProperties.HomeTileStatus=false;
				}

				});

				//*/
	}else if (className=="empty"){

		$(selector).switchClass( "empty", "check");

		$.each(tileData.Tiles,function(i, item){
	
			if(item.DisplayOrder==id){
				item.TileProperties.HomeTileStatus=true;
				}

				});
	}

}





function update(data) {

  indexOrder=[];
	$("#imagelist").empty();
  $("#tileList").empty();
	tileData=data;
   	


   $.each(data.Tiles,function(i, item){
	
	var order=item.DisplayOrder;
	var caption=item.Caption;
	var status=item.TileProperties.HomeTileStatus;
	var url=item.TileProperties.HomeURL;
	if (url.substring(url.lastIndexOf(".")+1)!=="html"){

        indexOrder.push(i); 

		if(status!== false){

		$("#imagelist").append("<li class='tiles' style='background-image:url(" + url + ")'><p>"+ caption + "</p></li>");


		$("#tileList").append("<tr class='list' id='t"+order+"' title='"+i+"'><td class='check' onClick='choose("+order+")'></td><td>" + caption + "</td><td class='drag'></td></tr>");
		}

		else{

		$("#tileList").append("<tr class='list' id='t"+order+"' title='"+i+"'><td class='empty' onClick='choose("+order+")'></td><td>" + caption + "</td><td class='drag'></td></tr>");

		}

	}
   });
   
  }
	
  function gear_h(){

      $("#gear").attr("src", "images/icons/gear_h.png"); 

  }

  function gear(){

      $("#gear").attr("src", "images/icons/gear.png"); 

  }


$.ajax({
  url: "json/tiles.json",
  type: "GET",
  dataType: "json",
  success: update,
  error: function() {
    alert("ERROR!!!");
  }
});


$(function(){
    $("#tileList").sortable({
    //placeholder:"ui-state-highlight",
    cursor:"move",
    items :".list", 
     handle: ".drag",                       
    opacity:0.6,                      
    revert:true,   
    update :function(){

		var new_order = []; 
    	//alert("success");
    	$("#tileList .list").each(function(){
    		
    		  var t=this.title;
    		  new_order.push(t);    		
		       });


    	for(i=0; i<new_order.length-1; i++){
          var index=indexOrder[i];        
          var now=new_order[i];

          if(index!=now){
              while (index<now){
             var origin=tileData.Tiles[index];
    			   tileData.Tiles[index]=tileData.Tiles[now];
    			   tileData.Tiles[now]=origin;
              index++;
             }
             while(index>now){
             var origin=tileData.Tiles[index];
             tileData.Tiles[index]=tileData.Tiles[now];
             tileData.Tiles[now]=origin;
              index--;

             }
          break;
             }
    		}
    }
   
   });
});