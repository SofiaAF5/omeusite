function light(value) {
let pic;
if(value==0)
{
  pic=" https://i.postimg.cc/KjK1wL3c/bulb-off.png";

}
else {
    pic="  https://i.postimg.cc/6QyTynzr/bulb-on.png"
}
  
document.getElementById("lampada").src=pic;
}

