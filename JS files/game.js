'use strict';

function Game(parent){
  var self = this;

  self.character = null;
  self.obstacles = null;
  self.floor = null;

  self.parentElement = parent;
  self.gameElement = null;
  
  self._init();
  self._startLoop();
}

Game.prototype._init = function () {
  var self = this;

  self.gameElement = buildDom(`
    <main class = "game container">
      <header class="game__header">
        <div class="score">
          <span class="label"></span>
        </div>
      </header>
      <div class="game__canvas">
        <canvas class="canvas"></canvas>
      </div>
    </main>
  `)
  self.parentElement.appendChild(self.gameElement);

  self.canvasParentElement = document.querySelector('.game__canvas');
  self.canvasElement = document.querySelector('.canvas');

  self.scoreElement = self.gameElement.querySelector('.score .label');
  

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');

  self.buildScore();
}

//Timer
Game.prototype.buildScore = function (){
  var self = this;

  self.counter = 1;
  var intervalID = setInterval(function () {
    self.counter++; 
  }, 1000);
  intervalID;
}

//Loop
Game.prototype._startLoop = function () {
  var self = this;

  self.character = new Character(self.canvasElement);
  self.obstacles = new Obstacles(self.canvasElement);
  self.floor = new Floor(self.canvasElement);


  self.handleSpaceBarDown = function (e) {
    if(e.keyCode === 32){
      e.preventDefault();
      self.character.setImpulse(-50);  
    } 
  }

  document.addEventListener('keydown', self.handleSpaceBarDown)

  function loop() {
    self._clearAll();
    self._updateAll();
    self._renderAll();

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function () {
  var self = this;

  //self.obstacles.item.update();
  self.character.update();
  //self.floor.update();
  self._updateUI();
}

Game.prototype._updateUI = function () {

  var self = this;
  self.scoreElement.innerText = self.counter;

}

Game.prototype._clearAll = function ()  {
  var self = this;

  self.ctx.clearRect(0, 0, self.width, self.height);
}

Game.prototype._renderAll = function ()  {
  var self = this;

  self.character.render();
  self.obstacles.render();
  self.floor.render();
}

