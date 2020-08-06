var elements = []
var guis = []
function mouseObject(x,y) {
  this.x = x
  this.y = y
  this.width = 1
  this.height = 1
}

function run(w, h, gravity, devmode) {
    devmode === undefined ? devmode = false : devmode = devmode
    Area.start(w, h, gravity, devmode)

    if(devmode === true) {
      DevModeOn()
    }
}


var Area = {
    canvas : document.createElement("canvas"),
    start : function(width, height, gravity, dm) {
        this.canvas.width = width
        this.canvas.height = height
        this.gravity = gravity
        this.devmode = dm
        this.mouse = mouseObject(0,0)
        this.ctx = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(newFrame, 20);        
        window.addEventListener('keydown', function (e) {
          Area.key = e.keyCode;
      })
      window.addEventListener('keyup', function (e) {
          Area.key = false;
      })

    },
    stop : function() {
      clearInterval(this.interval);
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }


}
function object(width, height, src, x, y,spX, spY, type) {
    this.type = type
    this.src = src

    if (type == "image") {
        this.image = new Image();
        this.image.src = this.src;
      }
    this.name = undefined
    this.id = elements.length+1
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.spX = spX
    this.spY = spY
    this.display = true
    this.AreaGravity = true
    this.gravitySpeed = 0;
    this.ishover = false

    this.crashWith = true
    this.crashed = false
    this.anchored = false
    this.transparency = 1


      //Events
      this.onTouch = undefined
      this.onMouseHover = undefined
      this.onMouseHoverEnd = undefined
      this.onMouseClick = undefined

    if(this.AreaGravity === true) {
      this.gravity = 0
    }
    elements.push(this)
    this.update = function(){
      ctx = Area.ctx;

      if(this.crashWith === true) {
      this.crashed = this.crash()
      } else {this.crashed = false}
      if(this.AreaGravity === true ) {
      this.gravity = Area.gravity}
      this.gravitySpeed += this.gravity;
      if(this.crashed == true || this.anchored == true) {
        this.gravitySpeed = 0
        this.spX = 0
        this.spY = 0
      }

      this.x += this.spX
      this.spY += this.gravitySpeed 
      this.y += this.spY
      if(this.display === true ) {
      if (type == "image") {
        
        ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
      } else {
        ctx.fillStyle = this.src;
        ctx.globalAlpha = this.transparency
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      if(this.crashed === true && this.onTouch != undefined) {
        this.onTouch()
      }
    }}
    this.crash = function() {
        var i;
        crash = true
        var us = this
        for (i = 0; i < elements.length; i++) {
            if(elements[i] == us) {
              i += 1
          }
            if(elements[i] === undefined) {
              if(elements[i-1] == us) {
                crash = false
              }
                return crash
            }

            otherobj = elements[i]
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
              crash = false
              
            }
            if(this.y > otherobj.y) {crash = false}
                    return crash;
      }
    }
  this.changeImage = function(src) {
    this.image.src = src;
  }

  this.unpush = function() {
    const index = elements.indexOf(this);
    if (index > -1) {
      elements.splice(index, 1);
    }


  }
  this.destroy = function() {
    this.unpush()
    delete this
  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
}
function gui(width, height, src, x, y, type) {
  this.type = type
  this.src = src

  if (type == "image") {
    this.image = new Image();
    this.image.src = this.src;
  }
  if(type == "text") {
    this.text = "text"
    this.textcolor = "black"
  }
  if(type == "contain-text") {
    this.text = "text"
    this.style = "30px Georgia"
    this.textcolor = "black"
  }
  this.name = undefined
  this.id = guis.length+1
  this.width = width
  this.height = height
  this.transparency = 1
  this.x = x
  this.y = y
  this.align = "start"


  //Events
  this.onMouseHover = undefined
  this.onMouseHoverEnd = undefined
  this.onMouseClick = undefined


  guis.push(this)
  this.update = function() {
    ctx = Area.ctx
    if (type == "image") {
        
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    
    }else if(type == "text"){
      ctx.font = this.src
      ctx.fillStyle = this.textcolor
      ctx.textAlign = this.align
      ctx.fillText(this.text, this.x, this.y)
      }
      else if(type == "contain-text") {
        ctx.fillStyle = this.src;
        ctx.globalAlpha = this.transparency
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = this.style
        ctx.fillStyle = this.textcolor
        ctx.textAlign = "center"
        ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2)


      }
      else {
      ctx.fillStyle = this.src;
      ctx.globalAlpha = this.transparency
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.changeImage = function(src) {
    this.image.src = src;
  }
  this.unpush = function() {
    const index = guis.indexOf(this);
    if (index > -1) {
      guis.splice(index, 1);
    }

  }
  this.destroy = function() {
    this.unpush()
    delete this
  }

}

function locationObject(x,y) {
  this.x = x
  this.y = y
  this.width = 1
  this.height = 1
}
/*
function moveTo(that, there, spX, spY) {
  if(that.x != there.x && that.y != there.y) {
    if(that.x < there.x) {
      that.x -= spX
    }
    else {
      that.x += spX
    }
    if(that.y < there.y) {
      that.y -= spY
    }
    else {
      that.y += spY
    }
  }
}
*/
function getObjectByName(name) {
  var i = 0;
  for (i = 0; i < elements.length; i++) {
    if(elements[i].name === name) {
      return elements[i]
    }

  }
  return false
}

function getObjectById(id) {
  var i = 0;
  for (i = 0; i < elements.length; i++) {
    if(elements[i].id === id) {
      return elements[i]
    }

  }
  return false
}
  function SetObjectSpeed(object, x, y) {
    object.spX = x
    object.spY = y
  }
  function MoveAllBy(x, y) {
    var i;
    for(i=0;i < elements.length; i++) {
      elements[i].x += x
      elements[i].y += y
    }
  }
  function MoveAllByExceptName(x, y, name) {
    var i;
    for(i=0;i < elements.length; i++) {
      if(elements[i].name === name) {
        i++
      }
      if(elements[i] === undefined) {
        return;
      }
      elements[i].x += x
      elements[i].y += y
    }
  }
  function MoveAllByExceptId(x, y, id) {
    var i;
    for(i=0;i < elements.length; i++) {
      if(elements[i].id === id) {
        i++
      }
      if(elements[i] === undefined) {
        return;
      }
      elements[i].x += x
      elements[i].y += y
    }
  }
  function isTouch(object1, object2) {
      crash = true
      var us = object1
          otherobj = object2
          var myleft = this.x;
          var myright = this.x + (this.width);
          var mytop = this.y;
          var mybottom = this.y + (this.height);
          var otherleft = otherobj.x;
          var otherright = otherobj.x + (otherobj.width);
          var othertop = otherobj.y;
          var otherbottom = otherobj.y + (otherobj.height);
          var crash = true;
          if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false
            
          }
                  return crash;
    }

function newFrame() {
  var i;

Area.canvas.onmousemove = function(e) {
  var rect = this.getBoundingClientRect()
  x = e.clientX - rect.left,
  y = e.clientY - rect.top,
  i = 0;
  if(Area.mouse == undefined) {
    Area.mouse = new mouseObject(0,0)
  }
  var mouse = Area.mouse
  mouse.x = x
  mouse.y = y
  var i;
  for(i=0;i < elements.length;i++) {
    another = elements[i]
    if(isTouch(mouse, another)) {
      if(another.onMouseHover != undefined) {
      another.onMouseHover()
      another.ishover = true
      }
    }
    else {
      if(another.ishover == true && isTouch(another, Area.mouse) == true) {

        another.ishover = false
        if(another.onMouseHoverEnd != undefined) {
          another.onMouseHoverEnd()
      }
    }
    }
  }
  for(i=0;i < guis.length;i++) {
    another = guis[i]
    if(isTouch(mouse, another)) {
      if(another.onMouseHover != undefined) {
      another.onMouseHover()
      another.ishover = true
      }
    }
    else {
      if(another.ishover == true && isTouch(another, Area.mouse) == true) {

        another.ishover = false
        if(another.onMouseHoverEnd != undefined) {
          another.onMouseHoverEnd()
      }
    }
    }
  }
}
if(Area.inUpdate != undefined) {
  Area.inUpdate()
}
Area.clear()
for (i = 0; i < elements.length; i++) {
  elements[i].update()
}
for(i = 0; i < guis.length; i++) {
  guis[i].update()
}
if(Area.devmode === true) {
  str = JSON.stringify(elements, null, 4);
  document.querySelector("pre").innerHTML = str
}
}
Area.canvas.onclick = function(e) {
  var rect = this.getBoundingClientRect()

  x = e.clientX - rect.left,
  y = e.clientY - rect.top,
  i = 0;
  if(Area.mouse == undefined) {
    Area.mouse = new mouseObject(0,0)
  }
  var mouse = Area.mouse
  mouse.x = x
  mouse.y = y
  var i;
  for(i=0;i < elements.length;i++) {
    another = elements[i]
    if(isTouch(mouse, another)) {
      if(another.onMouseClick != undefined) {
      another.onMouseClick()
      }
    }
  }
  for(i=0;i < guis.length;i++) {
    another = guis[i]
    if(isTouch(mouse, another)) {
      if(another.onMouseClick != undefined) {
      another.onMouseClick()
      }
    }
  }
}

function DevModeOn() {
  var creater = document.createElement("section")
  creater.innerHTML = "Nothing"
  document.body.appendChild(creater)

  var devstuff = document.createElement("pre")
  str = JSON.stringify(elements, null, 4);
  var node = document.createTextNode(str);
  devstuff.appendChild(node);
  document.body.appendChild(devstuff)
}