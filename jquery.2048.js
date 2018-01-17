(function($){

  $.fn.MyPlugIn = function(){

    return this.each(function(){



/////////////////////////////////Objets tab cell////////////////////////////////////
      class Cell {    
        constructor(x,y){
         this.x = x;
         this.y = y;
         var value = 0;
         var merge = 0;
        
         this.value = value;
         this.merge = merge;
         
       }

       setValue(value){this.value = value;}
       getValue(){return this.value;}
       getColor(){
        var color;
         switch(this.getValue()){
          case 2:
            this.color = "deux";
            break;
          case 4:
            this.color = "quatre";
            break;
          case 8:
            this.color = "huit";
            break;
          case 16:
            this.color = "seize";
            break;
          case 32:
            this.color = "trente-deux";
            break;
          case 64:
            this.color = "soixante-quatre";
            break;
          case 128:
            this.color = "cent-vingt-huit";
            break;
          case 256:
            this.color = "deux-cent-cinquante-six";
            break;
          case 512:
            this.color = "cinq-cent-douze";
            break;
          case 1024:
            this.color = "mille-vingt-quatre";
            break;
          case 2048:
            this.color = "deux-mille-quarante-huit";
            break;
        }
        return this.color;
      }

      setMerge(merge){this.merge = merge;}
      getMerge(merge){return this.merge;}

    }

      class Tab {
       constructor(size){
        var score = 0;
        this.score = score;

         this.size = size;
         var tab = new Array();
         for (var i = 0; i < this.size; i++)
          tab[i] = new Array();

        for (var x = 0; x < this.size; x++){
          for (var y = 0; y < this.size; y++)
           tab[x][y] = new Cell(x,y);
       }
       return tab;
      }
    }

    class Score{
      constructor(){
      var score = 0;
        this.score = score;
      }
      setScore(score){this.score = score;}
      getScore(){return this.score;}
    }

//////////////////////////New game/////////////////////////////////////////////////////////
      
      $("header").append("<h1 id='title'>2048</h1>");
      $("header").append("<div class='best'>BEST</div>");
      $(".best").append("<div class='scoreNb'>"+document.cookie+"</div>");
      $("header").append("<div class='score'>SCORE</div>");
      $(".score").append("<div class='scoreNb'>0</div>");
      $("header").append("<div class='newGame'>NEW GAME</div><br><br>");

      var size = 4;
      var newgame = new Tab(size);
      var score = new Score();

      $(this).append("<div id='grid'></div>");
      for (var j = 0; j < size; j++){
       $("#grid").append("<div class='row'></div>");

       for (var i = 0; i < size; i++){
         $(".row:last").append("<div class='cell cell_"+j+''+i+"'></div>");
       }
      }

       /////****** Générer les 2 1ères cases******///////////

       var x;
       var y;
      getRandom(newgame, x, y);
      getRandom(newgame, x, y);

      ////////////////**** move ***//////////////////////////


        move();
        
        
//test you win
  /*newgame[0][0].setValue(1024);
        $(".cell_00").addClass("mille-vingt-quatre").text("1024");
        newgame[0][1].setValue(1024);
        $(".cell_01").addClass("mille-vingt-quatre").text("1024");*/

//test you lose

//////////////////algo principale de mvt////////////////////////////////////

      var movement = 0;

      function moveRight(){
        var b = 0;
        for (var y = 0; y < size; y++){
          for (var x = size-2; x >= 0; x--){
            for (var n = x; n < size-1; n++){
              if (newgame[y][n].getValue() != 0){

                if (newgame[y][n+1].getValue() == 0){
                  $(".cell_"+y+(n+1)).removeClass(newgame[y][n+1].getColor());
                  $(".cell_"+y+n).removeClass(newgame[y][n].getColor());

                  newgame[y][n+1].setValue(newgame[y][n].getValue());
                  $(".cell_"+y+(n+1)).text(newgame[y][n+1].getValue());
                  newgame[y][n].setValue(0);
                  $(".cell_"+y+n).text("");

                  $(".cell_"+y+(n+1)).addClass(newgame[y][n+1].getColor());
                  movement = 1;
                }

                else if (newgame[y][n].getValue() == newgame[y][n+1].getValue() 
                  && newgame[y][n+1].getMerge() == 0 
                  && newgame[y][n].getMerge() == 0) {

                  $(".cell_"+y+(n+1)).removeClass(newgame[y][n+1].getColor());
                  $(".cell_"+y+n).removeClass(newgame[y][n].getColor());

                  newgame[y][n+1].setValue(newgame[y][n+1].getValue()*2);
                  $(".cell_"+y+(n+1)).text(newgame[y][n+1].getValue());
                  newgame[y][n+1].setMerge(1);
                  newgame[y][n].setValue(0);
                  $(".cell_"+y+n).text("");

                  $(".cell_"+y+(n+1)).addClass(newgame[y][n+1].getColor());
                  movement = 1;
                  score.setScore(score.getScore()+newgame[y][n+1].getValue());
                  $(".scoreNb").text(score.getScore());
                }

              }
            }
          }
        }
        setAllMerge();  
      }
    

      function moveLeft(){

        for (var y = 0; y < size; y++){
          for (var x = 1; x < size; x++){
            for (var n = x; n > 0; n--){
              if (newgame[y][n].getValue() != 0){

                if (newgame[y][n-1].getValue() == 0){

                  $(".cell_"+y+(n-1)).removeClass(newgame[y][n-1].getColor());
                  $(".cell_"+y+n).removeClass(newgame[y][n].getColor());

                  newgame[y][n-1].setValue(newgame[y][n].getValue());
                  $(".cell_"+y+(n-1)).text(newgame[y][n-1].getValue());

                  newgame[y][n].setValue(0);
                  $(".cell_"+y+n).text("");

                  $(".cell_"+y+(n-1)).addClass(newgame[y][n-1].getColor());

                  movement = 1;
                }
                else if (newgame[y][n].getValue() == newgame[y][n-1].getValue()
                  && newgame[y][n-1].getMerge() == 0 
                  && newgame[y][n].getMerge() == 0) {

                  $(".cell_"+y+(n-1)).removeClass(newgame[y][n-1].getColor());
                  $(".cell_"+y+n).removeClass(newgame[y][n].getColor());

                  newgame[y][n-1].setValue(newgame[y][n].getValue()*2);
                  newgame[y][n-1].setMerge(1);
                  $(".cell_"+y+(n-1)).text(newgame[y][n-1].getValue());
                  newgame[y][n].setValue(0);
                  $(".cell_"+y+n).text("");

                  $(".cell_"+y+(n-1)).addClass(newgame[y][n-1].getColor());

                  movement = 1;
                  score.setScore(score.getScore()+newgame[y][n-1].getValue());
                  $(".scoreNb").text(score.getScore());
                }
              }
            }
          }
        }
        setAllMerge(); 

      }


      function moveUp(){

        for (var x = 0; x < size; x++){
          for (var y = 1; y < size; y++){
            for (var n = y; n > 0; n--){
              if (newgame[n][x].getValue() != 0){

                if (newgame[n-1][x].getValue() == 0){

                  $(".cell_"+(n-1)+x).removeClass(newgame[n-1][x].getColor());
                  $(".cell_"+n+x).removeClass(newgame[n][x].getColor());
            
                  newgame[n-1][x].setValue(newgame[n][x].getValue());
                  $(".cell_"+(n-1)+x).text(newgame[n-1][x].getValue());

                  newgame[n][x].setValue(0);
                  $(".cell_"+n+x).text("");

                  $(".cell_"+(n-1)+x).addClass(newgame[n-1][x].getColor());

                  movement = 1;
                }
                else if (newgame[n][x].getValue() == newgame[n-1][x].getValue()
                  && newgame[n][x].getMerge() == 0 
                  && newgame[n-1][x].getMerge() == 0) {

                  $(".cell_"+(n-1)+x).removeClass(newgame[n-1][x].getColor());
                  $(".cell_"+n+x).removeClass(newgame[n][x].getColor());

                  newgame[n-1][x].setValue(newgame[n][x].getValue()*2);
                  newgame[n-1][x].setMerge(1);
                  $(".cell_"+(n-1)+x).text(newgame[n-1][x].getValue());
                  newgame[n][x].setValue(0);
                  $(".cell_"+n+x).text("");

                  $(".cell_"+(n-1)+x).addClass(newgame[n-1][x].getColor());

                  movement = 1;
                  score.setScore(score.getScore()+newgame[n-1][x].getValue());
                  $(".scoreNb").text(score.getScore());
                }
              }
            }
          }
        }
        setAllMerge(); 
      }


      function moveDown(){
        for (var x = 0; x < size; x++){
          for (var y = size-2; y >= 0; y--){
            for (var n = y; n < size-1; n++){
              if (newgame[n][x].getValue() != 0){

                if (newgame[n+1][x].getValue() == 0){

                  $(".cell_"+(n+1)+x).removeClass(newgame[n+1][x].getColor());
                  $(".cell_"+n+x).removeClass(newgame[n][x].getColor());

                  newgame[n+1][x].setValue(newgame[n][x].getValue());
                  $(".cell_"+(n+1)+x).text(newgame[n+1][x].getValue());

                  newgame[n][x].setValue(0);
                  $(".cell_"+n+x).text("");

                  $(".cell_"+(n+1)+x).addClass(newgame[n+1][x].getColor());

                  movement = 1;
                }

                else if (newgame[n][x].getValue() == newgame[n+1][x].getValue()
                  && newgame[n][x].getMerge() == 0 
                  && newgame[n+1][x].getMerge() == 0) {

                  $(".cell_"+(n+1)+x).removeClass(newgame[n+1][x].getColor());
                  $(".cell_"+n+x).removeClass(newgame[n][x].getColor());

                  newgame[n+1][x].setValue(newgame[n+1][x].getValue()*2);
                  newgame[n+1][x].setMerge(1);
                  $(".cell_"+(n+1)+x).text(newgame[n+1][x].getValue());
                  newgame[n][x].setValue(0);
                  $(".cell_"+n+x).text("");

                  $(".cell_"+(n+1)+x).addClass(newgame[n+1][x].getColor());

                  movement = 1;
                  score.setScore(score.getScore()+newgame[n+1][x].getValue());
                  $(".scoreNb").text(score.getScore());
                }
              }
            }
          }
        } 
        setAllMerge();   
      }


///////////////////////////////////Random///////////////////////////////////////////
      function randomPosition(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      function randomNb(){
        min = Math.ceil(0);
        max = Math.floor(6);
        var nb = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

        if(nb == 0 || nb == 1 || nb == 2 || nb == 3 ||nb == 4 || nb == 5)
          return 2;
        else
          return 4;
      };

      function getRandom(tab, x, y){
          var x = randomPosition(0, 3);
          var y = randomPosition(0, 3);
        while (verifCell(tab,x,y) == false){
          x = randomPosition(0, 3);
          y = randomPosition(0, 3);
      }
        tab[x][y].setValue(randomNb());
        $(".cell_"+x+y).addClass(tab[x][y].getColor()).text(tab[x][y].getValue());
      }

////////////////////////////vérifier les emplacements libres///////////////////////
      function verifCell(tab,x,y){
        if (tab[x][y].getValue() == 0)
         return true;
       else
         return false;
      }

      function verifiMovement(){
        if (movement == 1){
          getRandom(newgame, x, y);
          movement = 0;
        }
      }
      

      function gameOver(){
        for (var j = 0; j < size; j++){
         for (var i = 0; i < size; i++){
           if(newgame[j][i].getValue() == 0)
            return false; 
        }
      }

        for (var j = 0; j < size; j++){
         for (var i = 0; i < size-1; i++){ 
          if (newgame[j][i].getValue() == newgame[j][i+1].getValue())
            return false;
         }
       }
       
        for (var i = 0; i < size; i++){
         for (var j = 0; j < size-1; j++){
          if (newgame[j][i].getValue() == newgame[j+1][i].getValue())
            return false;
         }
       }
       if (newgame[size-1][size-1] != 0)
           return true;
      }

      function displayGameOver(){
        if (gameOver() == true){
          document.cookie = 'scoreCookie=test';
          $(".game-container").append("<div class='endOfGame'>GAME OVER!</div");
          $("body").click(function(){$(".endOfGame").hide()});
        }
      }

      function win(){
        for (var j = 0; j < size; j++){
         for (var i = 0; i < size; i++){
           if(newgame[j][i].getValue() == 2048)
            return true;
         }
       }
       if (newgame[size-1][size-1].getValue() != 2048)
        return false;
      }

      function displayYouWin(){
        if (win() == true){
          document.cookie = 'scoreCookie=test';
          $(".game-container").append("<div class='endOfGame'>YOU WIN!</div");
          $("body").click(function(){$(".endOfGame").hide()});
        }
      }
      


////////////////////déplacement////////////////////////////////////////////////////            

      function move(){
          document.onkeydown = function(e){
            switch(e.keyCode){
              case 37:   //left
                moveLeft();
                verifiMovement();
                break;
              case 38:   //up
                moveUp();
               verifiMovement();
               break;
              case 39:   //right
                moveRight();
               verifiMovement();
                break;
              case 40:   //down
                moveDown();
               verifiMovement();
                break;   
            }
            displayGameOver();
            displayYouWin();
        }
      }
 

///////////////////////set all the merge at 0////////////////////////////////////
      
      function setAllMerge(tab){
        for (var j = 0; j < size; j++){
         for (var i = 0; i < size; i++){
           newgame[j][i].setMerge(0);
         }
        }
      }
///////////////////cookies and game starter/////////////////////////////////////////

      $(".newGame").click(function(){
        window.location="2048.html";
      });


    });
  };
}(jQuery));
