# KGame Motor
A KGame egy 2D-s motor.
### Jelenlegi verzió
2020.08
### Használat
Szükséges a használhathoz a **core.js** fájl. Electron-nal ajánlott engine használata
# Dokumentáció
Használati útmutató a KGame-hez
**Olyanok vannak megemlítve amit játék fejlesztés közben valószínüleg használva lesznek**
### Area objektum
Tartalmazza:
```
start: elindítja frame-eket
stop: megállítja
clear: kitisztitja a képernyőt
```
#### inUpdate
Az inUpdate-ban megadott function minden új frame-ben lefutt
### object
Egy alap objektum. Lehet vele képeket megjeleníteni, színeket. Érvényes rá a gravítáció és egyéb elemek. Ha GUI után kutatsz keresd a **gui** objectumot
Létrehozás: 
> new object(width, height, src, x,y,spX,spY,type)
#### Ezek mik?
width, height nyilványvaló. A src szín, ha kép típusú akkor kép forrása.x,y elhelyezkedés. spX, spY pedig a sebesség x és y irányban. type pedig a típus. Ez lehet:
- none(nem adsz meg semmit)
- image(kép)
### Benne lévő értékek:
```
display: default-ban igaz. Ha hamis nem jelenik meg az objektum
name: objektum neve. default-ban undefined.
id: objemtum id-e
AreaGravity: default-ban true. Át vegye-e az Area gravitációs értékeit
crashWith: konyha nyelven szilárd-e az objektum. Ha igen többi objektum megakad rajta. Default-ban igaz.
anchored: Ha igaz nem hat az objektumra a gravitáció. Default-ban hamis.
transparency: Átlászoság. Minél kissebb annál átlászobb. Legkisseb érték 0, maximum érték 1. Default az 1.
```
### Események(Events):
```
onTouch: Ha egy másik objektum megérinti, akkor megadod function lefutt benne.
onMouseHover: Ha rá megy az egér lefutt a benne lévő function.
onMouseHoverEnd: Ha elhagya az egér lefutt a benne lévő function.
onMouseClick: Ha rá kattintanak lefutt a benne lévő function.
```
