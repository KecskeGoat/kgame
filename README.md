# KGame Motor
A KGame egy 2D-s motor, ami HTML Canvas-t használ.
### Jelenlegi verzió
2020.08
### Használat
Szükséges a használhathoz a **core.js** fájl. Electron-nal ajánlott engine használata
# Dokumentáció
Használati útmutató a KGame-hez
**Olyanok vannak megemlítve amit játék fejlesztés közben valószínüleg használva lesznek**
### run function
A játék indító eleme. Ezzel indítod el magát a futást. A body-ban az onload-on belül van.
Pontosabban a function:
> run(width, height, gravity, devmode)
#### Ez mit is jelent?
- width, height = Canvas mérete
- gravity = Gravitáció mértéke canvas-ban
- devmode = fejlesztő üzemmód. Nem kötelező bele írni, default az false. 
### Area objektum
Tartalmazza:
```
start: elindítja frame-eket
stop: megállítja
clear: kitisztitja a képernyőt
```
#### inUpdate
Az inUpdate-ban megadott function minden új frame-ben lefutt
#### onKeyDown
Ha valamelyik billentyű le érintődik, akkor lefut a benne lévő function 
### object
Egy alap objektum. Lehet vele képeket megjeleníteni, színeket. Érvényes rá a gravítáció és egyéb elemek. Ha GUI után kutatsz keresd a **gui** objectumot
Létrehozás: 
> new object(width, height, src, x,y,spX,spY,type)
#### Ezek mik?
width, height nyilványvaló. A src szín, ha kép típusú akkor kép forrása.x,y elhelyezkedés. spX, spY pedig a sebesség x és y irányban. type pedig a típus. Ez lehet:
- none(nem adsz meg semmit)
- image(kép)
#### Benne lévő értékek:
```
display: default-ban igaz. Ha hamis nem jelenik meg az objektum
name: objektum neve. default-ban undefined.
id: objemtum id-e
AreaGravity: default-ban true. Át vegye-e az Area gravitációs értékeit
crashWith: konyha nyelven szilárd-e az objektum. Ha igen többi objektum megakad rajta, és Ő is a többiben. Default-ban igaz.
anchored: Ha igaz nem hat az objektumra a gravitáció. Default-ban hamis.
transparency: Átlászoság. Minél kissebb annál átlászobb. Legkisseb érték 0, maximum érték 1. Default az 1.
crash: Éppen be van-e akadva valamelyik objektumban. Ha igen true, ha nem false.
```
#### Események(Events):
```
onTouch: Ha egy másik objektum megérinti, akkor megadod function lefutt benne.
onMouseHover: Ha rámegy az egér lefut a benne lévő function.
onMouseHoverEnd: Ha elhagyja az egér lefut a benne lévő function.
onMouseClick: Ha rá kattintanak lefut a benne lévő function.
```
#### Benne lévő function-ok:
```
destroy(): elpusztítja az objektumot
changeImage(src): Megváltoztatja képet a src-ra, ha image típusú objektumról van szó.
```
### GUI objektum
A GUI *Grafical User Interface* rövidítése. A GUI-ban hasonló módon megtudunk kockákat, képeket jelentiteni, mint egy sima object-ben, csakhogy GUI-k külön vannak kezelve, nem hat rájük a fizika, nem tárgyak, nem lépnek kapcsolatba a rendes object-ekkel.
Létrehozzása:
> new gui(width, height, src, x,y, type)
#### Típusai
- none
- image
- text(szöveg)
- contain-text(Egy színes kocka, amit közepén szöveg van)
A none ls image ugyan olyan mondom mükődik, mint a rendes object-nél. **Ajánlott elkerülni a text és contain-text használatát, ajánlott image-t használni helyette**
#### text esetében:
akkor a src a HTML Canvas-nál használt font-nak kell lennie(x mennyiségű pixel és font family)
Default:
> src = "30px Georgia"
align segítségével(gui.align) betudod állítani hol legyen a text(default az "start")
text-el a szöveget
textcolor-al a színt
#### contain-text esetében:
Itt a src a alap kocka színe
Ugyan azok-at lehet beállítani, csak align-t nem lehet + font-ot textstyle-al lehet beállítani
#### Események:
```
onMouseHover: Ha rámegy az egér lefut a benne lévő function.
onMouseHoverEnd: Ha elhagyja az egér lefut a benne lévő function.
onMouseClick: Ha rá kattintanak lefut a benne lévő function.
```
A benne lévő function-ok ugyan azok, mint az sima object-eknél
