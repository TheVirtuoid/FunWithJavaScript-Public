# Hold That Tower!

A game where a player defends a tower from waves of enemies by upgrading their offensive and defensive capabilities.

## Game Play Summary

1. A wave of enemies approaches the tower. When they reach the tower, the deal damage to it.
2. The player shoots the enemies from a gun on top of the tower, placed in the middle of the playing field.
3. A round ends when all enemies for that round are defeated or the tower is destroyed.
4. During the round, when an enemy is defeated, a prize is dropped. A 'runner' from the tower collects the prize and brings it back to the tower.
5. The prizes allow the player to upgrade their gun, tower, or runners.
6. After the round is over, the player is presented with three cards that can also upgrade their gun, tower, or runners.
7. The object is to survive as many waves as possible, upgrading the tower and its defenses along the way.

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
7. The tower's maximum health can be upgraded.
8. The tower's current health can be upgraded.
9. The tower will have a defensive wall that can absorb damage from enemies before damage is inflicted on the tower.
10. The defensive wall can be upgraded to increase its health and damage absorption.
11. The tower begins with a single gun and no defensive wall.

## The Runners
1. Runners are small characters that run from the tower to collect prizes dropped by defeated enemies.
2. Runners can be upgraded to increase their speed and hit points
3. Enemies can destroy runners. When that happens, they drop whatever they were carrying.
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
    - armorDamage = Always 1% (this may change in the future)
    - towerDamage is returned to the calling function.
    - armor can never go below 0
    - Example 1: armor = .9, damage = 100, towerDamage = 10, armorDamage = .2, final armor = .89
    - Example 2: armor = .5, damage = 100, towerDamage = 50, armorDamage = .5, final armor = .49
    - Example 3: armor = .1, damage = 100, towerDamage = 90, armorDamage = .1, final armor = .09
    - Example 4: armor = 0, damage = 100, towerDamage = 100, armorDamage = 0, final armor = 0

### Gun
1. Properties:
   - damage: int
   - firingRate: float (milliSeconds between shots)
   - speed: int (speed of the bullet)
   - position: ClockOrdinal (position on the tower). Values from 1 to 12, representing the clock face.

### EnemyGun extends Gun
1. Properties:
   - targetPriority: float (a percentage chance to target the tower. If not targeting the tower, it targets the closest runner)
2. Methods:
    - determineTarget(tower: Tower, runners: List[Runner]): Determines the target based on targetPriority.
    - shootAt(target: Tower | Runner): Shoots at a target if it has a missile.
 

### Tower 
1. Properties:
   - health: int
   - maxHealth: int
   - guns: List[Gun]
   - runners: List[Runner]
   - defensiveWall: DefensiveWall
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
   - carryingPrize: Prize (optional, prize being carried)
2. Methods:
   - takeDamage(amount: int): Reduces the runner's hit points by the given amount.
   - upgradeSpeed(amount: int): Increases the runner's speed.
   - upgradeHitPoints(amount: int): Increases the runner's hit points.
   - moveToPrize(prize: Prize): Moves the runner to the prize's location (known from Tower.onEnemyDestroyed event);
   - returnToTower(): Returns to the tower with the collected prize.
   - dropPrize(): Drops the prize if the runner is destroyed or cannot carry it.
3. Event Emitters:
   - runnerDestroyed: Emitted when an enemy destroys a runner.
   - runnerReturned: Emitted when a runner returns to the tower with a prize.
4. Event Listeners:
   - onMissileHit: Triggered when a missile hits the runner.

### Enemy
1. Properties:
   - hitPoints: int
   - speed: int
   - damageInflicted: int
   - gun: EnemyGun (null if enemy cannot shoot)
   - prize: Prize (optional, prize dropped when defeated)
2. Methods:
   - takeDamage(amount: int): Reduces the enemy's hit points by the given amount.
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

### Missile
1. Properties:
   - speed: int
   - damage: int
   - target: Tower | Runner
   - targetPriority: float (a percentage chance to target the tower. If not targeting the tower, it targets the closest runner)
2. Methods:
   - determineTarget(). Determines the target based on targetPriority.
   - move(). Begins moving towards the target.
3. Event Emitters:
   - missileHit: Emitted when the missile hits its target (Tower | Runner | Enemy | Missile).
4. Event Listeners:
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
