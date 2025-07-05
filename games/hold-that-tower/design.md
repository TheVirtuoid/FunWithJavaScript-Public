``# Hold That Tower!

A game where a player defends a tower from waves of enemies by upgrading their offensive and defensive capabilities.

## Game Play

1. The player clicks upon New Game
   - Playing field is displayed
   - Statistics table is displayed
   - Set all the defaults.
2. The player clicks Start Round
   - A wave of enemies is generated.
   - The player can shoot the enemies with a gun mounted on top of the tower.
   - The player can upgrade their tower, runners, and guns during the round.
   - When an enemy is defeated, a prize is dropped (maybe)
   - A runner is sent from the tower to collect the prize and bring it back to the tower.
   - If the runner is destroyed, it drops the prize.
   - If the runner makes it to the tower, the prize is added to the player's score.
   - If an enemy reaches the tower, it deals damage to the tower. The enemy is destroyed, but does not drop a prize
3. The round ends
    - If the When all enemies are defeated, or
    - When the tower is destroyed. At this point, the game is over.
4. The player can choose to use points to upgrade tower, guns, or runners.
5. Repeat steps 2 to 4 until the player chooses to end the game or the tower is destroyed.


## The Playing Field

1. The field is a circular area with a tower in the center.
2. To the left of the field are the stats for the game
3. To the right of the field is an undetermined area, possibly an upgrade tree or other gameplay information.
4. In the middle of the field is the tower. The tower should not take up more than 15% of the field.
5. Enemies approach the tower from all directions.

## The Tower
1. The tower is a circular structure with a gun on top.
2. Guns can be added to the tower.
3. Guns can be upgraded by adding damage and speed.
4. Guns can never take damage, nor can they be removed.
5. The tower can take damage, and the game is over when the tower reaches 0 health / hit points.
6. The tower takes damage when an enemy touches it.
7. The tower takes damage when a missile hits it.
8. The tower's maximum health can be upgraded.
9. The tower's current health can be upgraded.
10. The tower will have a defensive wall that can absorb damage from enemies before damage is inflicted on the tower.
11. The defensive wall can be upgraded to increase its damage absorption.
12. The tower begins with a single gun and no defensive wall.

## The Runners
1. Runners are small characters that run from the tower to collect prizes dropped by defeated enemies.
2. Runners can be upgraded to increase their speed and hit points
3. Enemies can destroy runners with missiles. When that happens, they drop whatever they were carrying.
4. A player can increase the number of runners.
5. Runners are replenished to their maximum number after each round.
6. A player begins with one runner.

## The Enemies
1. Enemies come in waves, with each wave being more challenging than the last.
2. Each wave can increase the number of enemies, their speed, and their hit points.
3. Enemies always start at the edge of the field and move towards the tower in a straight line.
4. All enemies will have a set hit point value. 
5. All enemies will have a set destructive value applied to the tower when they reach it.
6. All enemies will drop prizes when defeated.
7. Some enemies can shoot at the tower, damaging it directly.
8. The shooting enemies can also shoot runners.
9. Shooting enemies generally will be slower than non-shooting enemies.
10. The prizes represent points earned by the player that can be used to upgrade the tower, runners, or guns.

## The Cards
1. At the end of each round, the player is presented with three cards.
2. The player can choose only one card to apply.
3. Each card may represent an upgrade to the tower, runners, or guns.

## The Gun
1. The gun is mounted on top of the tower.
2. The gun's damage can be upgraded.
3. The gun's firing speed can be upgraded.
4. The gun can spin around the tower to shoot in any direction.
5. The gun's spin speed can be upgraded.
6. Multiple guns can be added to the tower. Maximum of twelve guns, each pointed in the direction akin to a clock face.
7. When a gun is added, player gets to choose its position on the tower. That position cannot be changed.
8. If another is added, the total firing rate is shared amongst all the guns.
9. All guns are upgraded at the same time.
10. When a gun is added, it inherits the damage value of the other guns.

## At the End of the Round
1. The player is presented with three cards. The player can only choose one to apply.
2. The player can choose to upgrade the tower, runners, or guns.
3. The player will then click the 'Next Round' button to start the next round.
4. Upgrades become more expensive after each upgrade.
5. Any prizes left on the field are lost.

## Class Definitions

All properties are read-only unless otherwise specified.

### DefensiveWall
1. Properties:
   - armor: (float) Damage absorption. Percentage. Range: 0 to 1
2. Methods:
   - takeDamage(amount: int): Reduces the wall's armor by the given amount.
     Returns the amount of damage to be applied to the tower.
   - upgradeArmor(amount: float): Increases the wall's armor.
3. Notes:
    - Armor starting value is always 0.
    - When damage is taken, two numbers are computed: towerDamage and armorDamage.
    - towerDamage = totalDamage - armor * totalDamage. Fractions are rounded down.
    - armorDamage = Always 1% for missiles and 5% for enemies (this may change in the future)
    - towerDamage is returned to the calling function.
    - armor can never go below 0

### Ammo
1. Properties:
   - damage: int (damage dealt by the ammo)
   - type: AmmoType (enum, e.g., 'bullet', 'missile', 'enemy')
   - speed: int (speed of the ammo)

### Gun
1. Properties:
   - ammoDamage: Derived from ammo.damage
   - ammoSpeed: Derived from ammo.speed
   - ammoType: Derived from ammo.type
   - firingRate: float (milliSeconds between shots)
   - position: ClockOrdinal (position on the tower). Values from 1 to 12, representing the clock face.
2. Methods:
   - adjustFiringRate(value: int): Adjusts the firing rate of the gun (in ms).
   - replaceAmmo(ammo: Ammo): Replaces the current ammo with the new ammo.
   - adjustAmmoDamage(value: int): Adjusts the damage of the gun's ammo.
   - adjustAmmoSpeed(value: int): Adjusts the speed of the gun's ammo.
   - setPosition(position: ClockOrdinal): Sets the position of the gun on the tower. Can only be set once, invalid if already set.

### EnemyGun extends Gun
1. Properties:
   - targetPriority: float (a percentage chance to target the tower. If not targeting the tower, it targets the closest runner)
2. Methods:
    - determineTarget(tower: Tower, runners: List[Runner]): Determines the target based on targetPriority.
    - adjustTargetPriority(value: float): Adjusts the target priority of the gun. 0 - 100
 

### Tower 
1. Properties:
   - health: int. Starting value is 100
   - maxHealth: int. Starting value is 100
   - guns: List[Gun]. Starts with 1 gun at position 12.
   - runners: List[Runner]. Start with 1 runner.
   - defensiveWall: DefensiveWall. Starts at 0%
   - turretSpinSpeed: float (degrees per second, how fast the turret spins). Starts 90 degrees per second.
2. Methods:
   - takeDamage(amount: int): Reduces the tower's health by the given amount.
   - upgradeMaximumHealth(amount: int): Increases the tower's maximum health.
   - upgradeHealth(amount: int): Increases the tower's current health.
   - addGun(gun: Gun, position: ClockOrdinal): Adds a new gun to the tower at the specified position.
   - upgradeDefensiveWallArmor(amount: float): Upgrades the defensive wall's armor.
   - addRunner(runner: Runner): Adds a new runner to the tower.
   - upgradeRunnersSpeed(amount: int): Upgrades speed for all the runners.
   - upgradeRunnersHitPoints(amount: int): Upgrades hit points for all the runners.
3. Event Emitters:
   - gameOver: The game is over (tower health = 0)
4. Event Listeners:
   - onEnemyReachedTower: Triggered when an enemy reaches the tower, causing damage.
   - onEnemyDestroyed: Triggered when an enemy is destroyed, potentially dropping a prize.
   - onRunnerReturned: Triggered when a runner returns with a prize.
   - onRunnerDestroyed: Triggered when an enemy destroys a runner. 
   - onMissileHit: Triggered when a missile hits the tower.

### Runner
1. Properties:
   - speed: int
   - hitPoints: int
   - prize: Prize (optional, prize being carried)
   - position: Position (coordinates of the runner)
2. Methods:
   - takeDamage(amount: int): Reduces the runner's hit points by the given amount.
   - upgradeSpeed(amount: int): Increases the runner's speed.
   - upgradeHitPoints(amount: int): Increases the runner's hit points.
   - moveToPrize(prize: Prize): Moves the runner to the prize's location (known from Tower.onEnemyDestroyed event);
   - returnToTower(): Returns to the tower with the collected prize.
   - dropPrize(): Drops the prize if the runner is destroyed or cannot carry it.
3. Event Emitters:
   - runnerDestroyed: Emitted when an enemy destroys a runner. Drops prize and returns the prize so another runner can pick it up.
   - runnerReturned: Emitted when a runner returns to the tower with a prize.
4. Event Listeners:
   - onMissileHit: Triggered when a missile hits the runner.

### EnemyFactory
Generates enemies. Contains the database for those enemies. Has one static method "CreateEnemy"

### Enemy
1. Properties:
   - type: EnemyType (enum, e.g., 'basic', 'fast', 'shooter')
   - hitPoints: int
   - speed: int
   - damage: int
   - gun: EnemyGun (null if enemy cannot shoot)
   - prize: Prize (optional, prize dropped when defeated)
   - position: Position (coordinates of the enemy)
   - type: EnemyType (enum, e.g., 'basic', 'fast', 'shooter')
2. Methods:
   - takeDamage(ammo): Reduces the enemy's hit points by the given amount.
   - move(): Begin moving towards the tower
3. Event Emitters:
   - enemyReachedTower: Emitted when the enemy reaches the tower, causing damage.
   - enemyDestroyed: Emitted when the enemy is destroyed, potentially dropping a prize.
4. Event Listeners:
   - onMissileHit: Triggered when a missile hits the enemy.

### Prize
1. Properties:
   - value: int (points awarded when collected)
   - type: PrizeType (enum, e.g., 'gun', 'tower', 'runner')
   - position: Position (coordinates where the prize is dropped)

### Position
1. Properties:
   - x: int (x-coordinate)
   - y: int (y-coordinate)
2. Methods:
   - clone(). Clones the position object.

### Missile
Best described as "Ammo In Motion".
1. Properties:
   - speed: int
   - ammo: Ammo
   - direction: Position
   - position: Position
2. Event Emitters:
   - missileHit: Emitted when the missile hits its target (Tower | Runner | Enemy | Missile).
3. Event Listeners:
   - onMissileHit: Triggered when a missile hits this missile.

### Card
1. Properties:
   - type: CardType (enum, e.g., 'gun', 'tower', 'runner')
   - upgradeAmount: int (amount of upgrade provided by the card)
   - upgradeType: UpgradeType (enum, e.g., 'damage', 'speed', 'health')
   - upgradeCalculation: Callable (function to calculate the upgrade amount)
   - description: str (description of the card's effect)

### Game
1. Properties:
   - tower: Tower
   - enemies: List[Enemy]
   - current_wave: int
   - maxWaves: int
   - score: int
   - cards: List[Card]
   - gameOver: bool
   - points: int. The number of points earned by the player. Starts at 0. Can be used to purchase upgrades for anything.
   - gunGems: int. Only be used to upgrade/purchase guns. Starts at 0.
   - towerGems: int. Only be used to upgrade the tower health or maximum health. Starts at 0.
   - runnerGems: int. Only be used to upgrade/add runners. Starts at 0.
2. Methods:
    - startNewWave(): Starts a new wave of enemies.
    - endWave(): Ends the current wave and presents cards to the player.
    - applyCard(card: Card): Apply the selected card's upgrade to the tower, runners, or guns.
    - resetGame(): Resets the game state for a new game.
    - getNextCardSet(): Returns the next set of three cards for the player to choose from.
    - generateEnemy(): Generates a new enemy for the current wave.
3. Event Emitters:
    - waveStarted: Emitted when a new wave starts.
    - waveEnded: Emitted when a wave ends and cards are presented.
    - enemyGenerated: Emitted when a new enemy is generated for the wave.
4. Event Listeners:
    - onGameOver: Triggered when the game is over (tower health = 0).
