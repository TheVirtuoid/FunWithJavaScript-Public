# Virtu-Factory

A game where you mine, process, and build things.

## Goals
1. To mine materials out of the ground.
2. To transport materials and goods around the map via vehicles and conveyor belts.
3. To process materials into goods.
4. To use goods to produce machines and other goods.
5. To sell goods to 'the outside world' for profit.
6. To manage resources efficiently and maximize profits.

## Basic Game Play
1. Player places extractor on the map. This is a Level 1 Extractor.
2. Player moves extracted material to distribution point (middle of the screen), where player can sell it.
3. Player can upgrade extractor to extract more exotic materials.
4. Player can buy conveyor belts to transport goods automatically without using the slow manual transport system.
5. Player can buy Purifiers that purifies the matieral (so it can be sold for more money).
6. Player can by Combinators that combine materials into new goods or alloys
7. Player can upgrade any machine or conveyor belt.
8. Player accumulates money until they end the game.

## Minerals
A current list of minerals. There are 20 possible minerals
1. Aetherite
2. Pyrotite
3. Luminium
4. Obsidianite
5. Zenithium

## Alloys
Alloys are combinations of minerals. The number after each mineral is the parts per alloys
1. Ignisite: Aetherite (3) + Pyrotite (1)
2. Photonic Silver: Aetherite (5) + Limunum (1)
3. Voidglass Steel: Aetherite (7) + Obsidianite (1)
4. Solarium Bronze: Pyrotite (2) + Luminium (1)
5. Magma-Glass Iron: Pyrotite (4) + Obsidiantite (1)
6. Crown-Etherium: Luminium (9) + Zenithium (1)
7. Starforge: Pyrotite (12) + Luminium (7) + Zenithim (1)

## Objects
1. Extractors
   - Can be leveled up to extract more minerals OR better minerals.
   - There are 5 types of extractors - one for each of the minerals
   - "Level" is the speed in which the mineral is extracted.
   - An Extractor has only one output for the minerals.
   - Produces 'ore', which is the unpurified mineral.
   - The extractor footprint is one square.
2. Purifiers
   - Can be leveled up to purify the mineral more effectively.
   - "Level" is represented by a single number that determines the % chance of purifying the mineral.
   - The more "pure" a mineral is, the higher the sale price.
   - Purifiers have only one input and one output. These can be on any of the four sides, just not on the same side.
   - Produces 'ingots,' which is the purified mineral.
   - Footprint is 2 squares. The input and output are on opposite sides along the long width of the purifier.
3. Combinators
   - Combines two or more minerals into a new alloy
   - There is one combinator for each alloy.
   - When combining, there is some loss. This loss can be reduced by leveling up the combinator.
   - There can be two or three inputs and only one output. These can be on any side. 
   - Inputs can only take in one type of mineral.
   - The footprint is 2 sqaures by 2 squares. 
     - Each side can only handle one input or one output, 
     - The entrance and exit squares can be moved from one square to the other.
4. Conveyor Belts
   - Can be leveled up to increase the speed of transport.
   - "Level" is represented by a single number that determines the speed of transport.
   - There are a number of different belts:
     1. Straight
     2. Curve. Curves 90 degrees
     3. Bridge. Goes over another conveyor belt.
     4. T-intersection. Intersects two conveyor bets
     5. X-intersection. Intersects two conveyor bets
     6. The footprint of all conveyor belts is 1 square.
5. Transport Vehicles
   - Can be leveled up to increase the speed of transport.
   - "Level" is represented by a single number that determines the speed of transport.
   - Goes between extractors and distribution center.
   - The footprint of all vehicles is 1 square.
6. Distribution Center
   - Sells good to the outside world for profit.
   - Is always situated in the middle of the map.
   - Has a connection to the outside world in which a "company" truck moves goods from the center to the outside world. This is when the sell is made.
   - Can increase warehouse capacity.
   - The footprint of the distribution center is 2 squares by 2 squares.
7. Company Truck.
   - A truck that continually moves good from the distribution center to the outside world.
   - Can upgrade the carrying capacity of the truck.
   - Can upgrade the speed of the truck.

