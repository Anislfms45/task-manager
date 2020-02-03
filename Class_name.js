
// Global Scoop becous every element created will Have unique ID
var Tache_id3 = 0;

class Tache{

  
constructor(name ,preiorite , date , tachid){
this.name = name;
this.preiorite = preiorite;
this.date = date;  
this.Tache_Id = tachid;
//Instead of using name of the tach as id the user may call two taches with the same names wiche will causs us problems
this.set_the_tach_in_window();
this.set_up_hours();

}
return_this_id(){
  return this.Tache_Id;
}
modify_time(zdk3){
  this.date = zdk3;
  $("#"+this.Tache_Id+" div label:last").css("background-color","blue");
  $("#"+this.Tache_Id+" div label:last").attr("height" , "50px");
  $("#"+this.Tache_Id+" div label:last").text(zdk3);
  clearInterval(this.Timer);
  this.set_up_hours();


}
modify_only_name_and_option(zdk , zdk2){

this.name = zdk ; 
this.preiorite = zdk2;
$("#"+this.Tache_Id+ " div label:first").text(zdk);
$("#"+this.Tache_Id+ " div label:first + label").text(zdk2);

$("#"+this.Tache_Id+ " div label:first + label").css("background-color" , this.find_Witch_color_to_apply_priorit());
}
set_the_tach_in_window(){

  
    $("ul").append('<li id='+this.Tache_Id+' style="margin-left:-55px;""></li>');
    
    $("ul li:last").append('<div class="container" id="containe" ></div>')
    $("li:last div").append("<label style='font-size: 100% ; width : 10%'>"+this.name+"</labal");
    

    $("li:last div").append("<label class='zdk badge badge-primary'>"+this.preiorite+"</labal");

    
    $("li:last div label:last").css("background-color" , this.find_Witch_color_to_apply_priorit());
    $("li:last div").append("<label class='zdk badge badge-primary' style='background-color:blue;'>"+this.date+"</labal");
    $("li:last div").append("<button class='btn btn-primary smallbtn'  style='background-color : red;'><i class='fa fa-trash'></i></button>");
    $("li:last div").append("<button class='btn btn-primary smallbtn' style='background-color : blue;'><i class='fa fa-check'></i></button>");
    $("li:last div").append("<button class='btn btn-primary smallbtn' style='background-color : yellow;' data-toggle='modal' data-target='#exampleModalCenter'><i class='fa fa-edit'></i></button>");

     
}
//fonction qui va gérer le timing 
set_up_hours(){
var date_handling = new Date("January 1, 2008 " + this.date);
var Name_id = this.Tache_Id;
var bol =0;
this.Timer = setInterval(function(){
if(bol == 0){
   if(date_handling.getHours() == 0 && date_handling.getMinutes() == 0 && date_handling.getSeconds() == 0){
   bol++;
   $("#"+Name_id+" div label:last").css("background-color","red");
   var zdk = parseInt($("#TER").text()) + 1;
   $("#TER").text(zdk);

   }else{
    date_handling.setSeconds(date_handling.getSeconds()-1);
  
   }
  }
  else{
    date_handling.setSeconds(date_handling.getSeconds()+1);
   // we change the height so we can know where are we when we call approvetachfinished fonction;;
    $("#"+Name_id+" div button").css("height" , "50.1px");


   }
   $("#"+Name_id+" div label:last").text(date_handling.getHours() + ":"+date_handling.getMinutes() + ":"+date_handling.getSeconds());

   
 },1000);


}
clear_Timer(){
  clearInterval(this.Timer);
}
//fonction qui va retourner les infos de la tache
return_All_entred_element(){
  var objects = [this.name , this.preiorite , this.date];
  return objects;
}
// function qui va donner la color pour la priorité de la tache
find_Witch_color_to_apply_priorit(){
if(this.preiorite =="Haute" ){
  return "red";
}else{
  if(this.preiorite == "Moyenne")
    return "orange";
    return "aqua";
}

}
}

var Table = [];
// fonction qui va gerer la création d'une tache
function Form_elements(){
    var Tieming = $("#Time_stemp").val();
    var Name = $("#Titre_Tach").val();
    var Priorit = $("option:selected").val();
    Tache_id3++;
    Table.push(new Tache(Name , Priorit , Tieming , Tache_id3));
    Add_enevt_to_our_buttons(Tache_id3);
    $("#Ajouter").attr('disabled',true);
    $("#Titre-de-la-tache").val('');
  
    var tecv = parseInt($("#TECV").text()) + 1;
    $("#TECV").text(tecv);

  }
  // function qui va rajouter des event aux 3 buttons dans la tache
  function Add_enevt_to_our_buttons(zz){
    var First_li = document.getElementById(zz);
    
    var first_div = First_li.querySelector('div');
    var list_of_buttons = first_div.getElementsByTagName("button");
    list_of_buttons[1].addEventListener('click' ,ApproveTachFinished );
    list_of_buttons[0].addEventListener('click',delet);
    list_of_buttons[2].addEventListener('click' , Modification);
  }
  function ApproveTachFinished (){

    if($(this).css("height") == "50.1px"){

      var zdk = parseInt($("#TTAR").text()) + 1;
      $("#TTAR").text(zdk);
       zdk = parseInt($("#TER").text()) - 1;
      $("#TER").text(zdk);
    }
    else{
      
      
      var zdk = parseInt($("#TAAT").text()) + 1;
      $("#TAAT").text(zdk);
    }
   var zdk = parseInt($("#TA").text()) + 1;
      $("#TA").text(zdk);
      zdk = parseInt($("#TECV").text()) - 1;
      $("#TECV").text(zdk);
      
      
    $(this).attr("disabled" , true);

    var Id_ = $(this).parent().parent().attr('id');
    $("#"+Id_+" div button").css("height","50.2px");
    $("#"+Id_+" div button:last").attr("disabled" , true);
      for(var cpt = 0 ; cpt < Table.length; cpt++) {
      if(Table[cpt].return_this_id() == Id_){
        Table[cpt].clear_Timer();
        
      }
      }
  }
  //fonction qui gerer la supprision d'une tache And Some ANIMATION
  function delet(){

    $(this).parent().parent().animate({
    opacity : 0.0,
    paddingLeft : "+=200"

    } , "slow","linear",function(){
      $(this).remove();
    })


     if($(this).css("height") != "50.2px"){
    var tecv = parseInt($("#TECV").text()) - 1;
    $("#TECV").text(tecv);
     }
  
      if($(this).css("height") == "50.1px"){
         var ter = parseInt($("#TER").text()) - 1;
        $("#TER").text(ter);
        
      }
  }
  var Id_special;
  // fonction qui va gerer la modification
  function Modification(){
   Id_special = $(this).parent().parent().attr("id");
    $('#Ajout_tache').attr("onclick","chang_modify()");
     for(var cpt = 0 ; cpt < Table.length; cpt++) {
     if(Table[cpt].return_this_id() == Id_special){
       var elem = Table[cpt].return_All_entred_element();
      $("#Time_stemp").val(elem[2]);
      $("#Titre_Tach").val(elem[0]);
     $("option:selected").val(elem[1]);

    }
    }
  }
  function chang_modify(){

    // when modifiying we replace our originale object with the modified one
    for(var cpt = 0 ; cpt < Table.length; cpt++) {
      if(Table[cpt].return_this_id() == Id_special){
        //Special case when changing time becous we need to handl the bilan if the tache is in red;
       
        if($("#Time_stemp").val() == Table[cpt].return_All_entred_element()[2].toString()){
         Table[cpt].modify_only_name_and_option($("#Titre_Tach").val() , $("option:selected").val() )



        }else{
          if($("#"+Id_special + " div button").css("height") == "50.1px"){
            var zdk = parseInt($("#TER").text()) - 1;
            $("#TER").text(zdk);

          }
                    Table[cpt].modify_only_name_and_option($("#Titre_Tach").val() , $("option:selected").val() )
                    Table[cpt].modify_time($("#Time_stemp").val());

        }
     }
    }

  }


  // fonction qui va transmettre le titre tach de premiere page a le modal
function Move_value_to_modal(){
    $("#Titre_Tach").val($("#Titre-de-la-tache").val());
    $('#Ajout_tache').attr("onclick","Form_elements()");
   }
   //function qui va donner la color approprier dans le modal
   $("select").change(function(){  
      $(this).css("background-color",$("option:selected").css("background-color"));
   })
   // fonction qui va permetre de disable le button Ajouter
   $("#Titre-de-la-tache").on('input',function(){
    $("#Ajouter").removeAttr("disabled");
   });

   //Bilan button Handling
   $('#Bilan').on('click',function(){

   $('#TOT1').text(parseInt($('#TA').text()) + parseInt($('#TECV').text())); 

   $('#tecv').text(parseFloat(parseFloat($('#TECV').text()) * 100 / parseFloat($('#TOT1').text())));
   $('#ta').text(parseFloat(parseFloat($('#TA').text()) * 100 / parseFloat($('#TOT1').text())))

   var ke = parseInt($('#TER').text()) + parseInt($('#TTAR').text()) + parseInt($('#TAAT').text());
if(ke == 0){
  ke = 1;
}

   $("#ter").text(parseFloat($('#TER').text()) * 100/ke);
   $("#ttar").text(parseFloat($('#TTAR').text()) * 100/ke);
   $("#taat").text(parseFloat($('#TAAT').text()) * 100/ke);

   });