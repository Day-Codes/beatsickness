(()=>{scene("start",()=>{play("gong"),add([text(`EAT
ALL
BOMB
EAT
ONLY
BOMB`,40)]),wait(1.5,()=>{go("game")})});scene("game",()=>{let t=80,n=480,s=add([sprite("mouth"),pos(40,20),scale(.5),area(.5),origin("center")]);s.action(()=>{s.pos=mousePos()}),s.collides("fruit",()=>{go("gameover",o),play("bye")}),action("food",e=>{e.move(-e.speed,0),e.pos.x<-120&&destroy(e)}),action("bomb",e=>{e.pos.x<=0&&(go("gameover",o),play("bye"))});let o=0,c=add([text(o,32),pos(12,12)]);s.collides("bomb",e=>{o+=1,destroy(e),c.text=o,burp(),shake(4)}),loop(.3,()=>{let e=width()+24,r=rand(0,height()),i=rand(t,n),a=chance(.5),p=a?"bomb":choose(["peach","banana","watermelon"]);add([sprite(p),pos(e,r),scale(.5),area(.5),origin("center"),"food",a?"bomb":"fruit",{speed:i}])})});scene("gameover",t=>{add([text(t,120),pos(center()),origin("center")]),keyPress("space",()=>{go("start")})});go("start");})();
//# sourceMappingURL=main.js.map
