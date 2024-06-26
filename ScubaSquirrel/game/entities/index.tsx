import Matter from 'matter-js';
import Squirrel from '../gameObjects/Squirrel';
import Wall from '../gameObjects/Wall';
import Floor from '../gameObjects/Floor';
import PuffaFish from '../gameObjects/PuffaFish';
import { Dimensions } from 'react-native';
import Obstacle from '../gameObjects/Obstacle';
import Acorn from '../gameObjects/Acorn';
import generic from '../utils/generic';
import Kelp from '../gameObjects/Kelp';
import Roof from '../gameObjects/Roof';
import Cave from '../gameObjects/Cave';
import CaveCentre from '../gameObjects/CaveCentre';
import RegularFish from '../gameObjects/RegularFish';
import JellyFish from '../gameObjects/JellyFish';
import Crab from '../gameObjects/Crab';
import Seahorse from '../gameObjects/Seahorse';
import KelpCentre from '../gameObjects/KelpCentre';


export default (level:number, suitAir: number) => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  // engine.gravity.y = (suitAir-10)* -0.1;
  engine.gravity.y = 0;
  // console.log(`gravity & suitAir: ${engine.gravity.y}, ${suitAir}`)

  const screenWidth: number = Dimensions.get("window").width;
  const screenHeight: number = Dimensions.get("window").height;
  const flexParts: number = 8;
  const gameTop: number = (screenHeight * (1/flexParts));
  const gameHeight: number = ((screenHeight)*((flexParts-2)/flexParts));
  const gameBottom: number = gameHeight + gameTop;
  const gameMiddleY: number = gameHeight/2;
  const squirrelWidth: number = screenWidth/12;
  const squirrelHeight: number = squirrelWidth * 1.45;
  const DK2StartPos: number = generic.getRandomValue(- (screenWidth/2)+15, (screenWidth/2)-75 );

  // console.log(`SH, SH*1/8, SH*6/8, SH/2: ${screenHeight}, ${screenHeight*1/8}, ${screenHeight*6/8}, ${screenHeight/2}`)
  // console.log(`GT, GB, GH, GMY: ${gameTop}, ${gameBottom}, ${gameHeight}, ${gameMiddleY}`)

  const randomPuffaFish = () => {
    const numberOfPuffaFish: number = generic.getRandomValue(1, level);
    const puffaFishEntities = [];
    for (let i = 1; i <= numberOfPuffaFish; i++) {
      puffaFishEntities.push(PuffaFish(world, 'blue', 
      {x: generic.getRandomValue(30, screenWidth - 30), 
        y: generic.getRandomValue( 50, screenHeight*(flexParts-2)/flexParts - 50)},
      {radius:10},
      ));
    }
    return puffaFishEntities;
  }

  const randomKelp = () => {
    // const numberOfRandomKelp: number = 40
    const numberOfRandomKelp: number = generic.getRandomValue(2,(level + 2))
    const kelpEntities = [];
    for(let i = 1; i <= numberOfRandomKelp; i++){
      const kelpCentreX: number = generic.getRandomValue(30, screenWidth - 30);
      const kelpCentreY: number = generic.getRandomValue( 50, screenHeight*(flexParts-2)/flexParts - 50);
      kelpEntities.push(Kelp(world, 'pink', 
          {x: kelpCentreX, 
            y: kelpCentreY},
          {height:generic.getRandomValue(80, 100), width: generic.getRandomValue(40,50)}, generic.getRandomValue(0,8)
          ))
        kelpEntities.push(KelpCentre(world,'black',{x:kelpCentreX, y:kelpCentreY}, 
          {height:10, width: 5}
        ))
    }
    return kelpEntities
  }

  const randomRegularFish = () => {
    // const numberOfRandomNiceFish: number = 40;
    const numberOfRandomNiceFish: number = generic.getRandomValue(10,2*(level + 1))
    const niceFishEntities = [];
    for(let i = 1; i <= numberOfRandomNiceFish; i++){

      niceFishEntities.push(RegularFish(world, 'pink', 
            {x:generic.getRandomValue(20,screenWidth), 
              y: generic.getRandomValue(50, screenHeight*(flexParts-2)/flexParts - 50)},
              {height:generic.getRandomValue(30, 40), width: generic.getRandomValue(35,55)}, 
              generic.getRandomValue(0,8),generic.getRandomDirection()))
        
      }
      const chanceOfSeahorse: number = generic.getRandomValue(1,10);
      if (chanceOfSeahorse == 1){
        niceFishEntities.push(Seahorse(world, 'pink', 
            {x:generic.getRandomValue(20,screenWidth-20), 
              y: generic.getRandomValue(50, screenHeight*(flexParts-2)/flexParts - 50)},
              {height:generic.getRandomValue(35, 55), width: generic.getRandomValue(30,40)}
        ))
      }
    return niceFishEntities
  }

  const randomAcorn = () => {
    const numberOfRandomAcorn: number = generic.getRandomValue(1,(level + 1))
    const AcornEntities = [];
    for(let i = 1; i <= numberOfRandomAcorn; i++){
      AcornEntities.push(Acorn(world, 'orange', 
            {x:generic.getRandomValue(20,screenWidth-20), 
              y: generic.getRandomValue(screenHeight*2/flexParts + 50, screenHeight*(flexParts-2)/flexParts - 50)},
            { radius: 20 }
        ))
    }
    return AcornEntities
  }

  const randomJellyFish = () => {
    const numberOfRandomJellyFish: number = generic.getRandomValue(1,(level + 1))
    const JellyFishEntities = [];
    for(let i = 1; i <= numberOfRandomJellyFish; i++){
      JellyFishEntities.push(JellyFish(world, 'yellow', 
      {x:generic.getRandomValue(10,screenWidth - 30), y:generic.getRandomValue(gameTop+200,gameHeight - 50)}, 
      {radius:generic.getRandomValue(15,30)},generic.getRandomValue(0,1), generic.getRandomDirection())
    )}
    return JellyFishEntities
  }

  const totalObstacle = [...randomKelp(), ...randomPuffaFish(), ...randomRegularFish(),...randomAcorn(),...randomJellyFish()]

  return {
    physics: { engine, world },
    Roof: Roof(world,'white',{x:screenWidth/2, y:-1},{height:2,width: screenWidth}),
    Floor: Roof(world,'white',{x:screenWidth/2, y:gameHeight - 2},{height:4,width: screenWidth}),
    WallLeft: Wall(world, 'brown', { x: -5, y: gameMiddleY }, { height: gameHeight, width: 40 },0),
    WallRight: Wall(world, 'brown', { x: screenWidth+5, y: gameMiddleY }, { height: gameHeight, width: 40 },1),
    FloorBottom: Floor(world, 'yellow', { x: screenWidth / 2, y: gameHeight - 40}, { height: 80, width: screenWidth }),
    DK1: Obstacle(world, 'brown', 
      { x: generic.getRandomValue(-screenWidth/2+squirrelWidth*1.5,screenWidth/2-squirrelWidth*1.5), y: gameBottom *0.2 }, 
      { height: 40, width: screenWidth }),
    DK2L: Obstacle(world, 'brown', 
      { x: DK2StartPos, y: gameBottom *0.4 }, 
      { height: 40, width: screenWidth }),
    DK2R: Obstacle(world, 'brown', 
      { x: screenWidth + DK2StartPos + generic.getRandomValue(1.5*squirrelWidth,2.5*squirrelWidth), y: gameBottom * 0.4 }, 
      { height: 40, width: screenWidth }),
    DK3: Obstacle(world, 'brown', 
      { x: generic.getRandomValue((screenWidth/2)+squirrelWidth*1.5,screenWidth+squirrelWidth*1.5), y: gameBottom * .6 }, 
      { height: 40, width: screenWidth }),

    Acorn1: Acorn(world, 'green', { x: screenWidth / 8, y: gameHeight - 20 }, { radius: 20 }),
    CaveCentre: CaveCentre(world, 'white', { x: screenWidth-60, y:(gameHeight-40)}, {radius: 5}),
    Cave: Cave(world, 'pink', { x: screenWidth-60, y:(gameHeight-40)}, { height: 80, width: 110 },generic.getRandomValue(0,1)),
    Squirrel: Squirrel(world, 'orange', { x: screenWidth / 2, y: 30 }, { height: squirrelHeight, width: squirrelWidth }),
    ...totalObstacle,
    Crab: Crab(world, 'red', {x: screenWidth/3, y:gameHeight-30}, {radius: 30})
  }
}  