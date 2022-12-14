class Player {
    constructor() {
        this.x = 75; // Default x coordinate
        this.y = 100; // Default y coordinate
        this.gravityDirection = 1; // Player is initially falling to the ground
        this.onGround = false; // Player is initially assumed to be mid air
        this.ySpeed = 0; // Player is initially at rest vertically
        this.terminalVelocity = 11; // Max falling spede is initially set to 10 pixels per second -> this may be changed later
        this.gravity = 0.7; // Constant falling acceleration value is initially set to 0.35 pixels perfect -> this may be changed later
        this.ableToChangeGravity = true; // Player is initially able to change their gravity
        this.runAnimationFrame = 0;
        this.usedFlipTile = false;
        this.playerSpawnpoint = [100,400,   100,400,   100,400,   50,100,   75,100,   100, 200,   100,700, 50,50]; // X and Y coords where the player spawns at the start of the level
        this.gameMode = 0; // equal to gameMode variable in the main class
        this.reducedGravity = false;
    }

    draw(images, state, facingRight) { // Draw the player's sprite
        imageMode(CENTER); // Draw from the central coordinate of the player, not the top left corner
        if (state == 1) { // If the player is on the ground and moving left or right
            if (this.gravityDirection == 1) { // Draw the player running relative to their X and Y orientation
                if (facingRight == 1) {
                    image(images[Math.floor((this.runAnimationFrame*0.25)) % images.length], this.x, this.y);
                    this.runAnimationFrame++; // This changes the player's sprite to the next frame in their animation once every four  game frames. Changing frame once every game frame makes the animation far too fast, so this slows it down to speed that's more pleasing on the eyes.
                } else {
                    scale(-1, 1); // Rotate the player in the x axis
                    image(images[Math.floor((this.runAnimationFrame*0.25)) % images.length], -this.x, this.y);
                    this.runAnimationFrame++;
                    scale(-1, 1);
                }
            } else {
                if (facingRight == 1) {
                    scale(1, -1); // Rotate the player in the y axis
                    image(images[Math.floor((this.runAnimationFrame*0.25)) % images.length], this.x, -this.y);
                    this.runAnimationFrame++;
                    scale(1, -1);
                } else {
                    scale(-1, -1); // Rotate the player in both axes
                    image(images[Math.floor((this.runAnimationFrame*0.25)) % images.length], -this.x, -this.y);
                    this.runAnimationFrame++;
                    scale(-1, -1);
                }
            }
        } else { // If the player is idle or in mid air
            this.runAnimationFrame = 0;
            if (this.gravityDirection == 1) { // Draw idle/jump sprites relative to the player's X and Y orientation
                if (facingRight == 1) {
                    image(images, this.x, this.y);
                } else {
                    scale(-1, 1);
                    image(images, -this.x, this.y);
                    scale(-1, 1);
                }
            } else {
                if (facingRight == 1) {
                    scale(1, -1);
                    image(images, this.x, -this.y);
                    scale(1, -1);
                } else {
                    scale(-1, -1);
                    image(images, -this.x, -this.y);
                    scale(-1, -1);
                }
            }
        }
    }

    //GETTER METHODS
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getGround() {
        return this.onGround;
    }

    getAbilityToChangeGravity() {
        return this.ableToChangeGravity;
    }

    jump() {
        this.onGround = false;
        this.usedFlipTile = false;
        this.reducedGravity = false;
        this.ySpeed = -10 * this.gravityDirection;
    }

    flipGravity() { // Reverses gravity direction; called when spacebar is pressed
        if(this.ableToChangeGravity == true) {
            this.gravityDirection = this.gravityDirection * -1;
        }
        this.ableToChangeGravity = false;
        this.reducedGravity = false;
    }

    moveX(platforms, direction) {
        if (direction == 1) { // If player is trying to move to the right
            if (this.x < 780) { // If player is not going to move off of the screen\
                this.x = this.x + 3; // Move player right
            } else {
                this.x = 780; // Keep player at the edge of the screen
            }
        } else { // If player is trying to move left
            if (this.x > 20) {
                this.x = this.x - 3;
            } else {
                this.x = 20;
            }
        }

        // HORIZONTAL COLLISION CHECK WITH BLOCKS
        for (let i = 0; i < (platforms.length / 4); i++) {
            this.blockLeftmostPoint = platforms[4*i] - (platforms[4*i+2] / 2) - 20 // Leftmost point of the platform = centre of platform - half of the platform width - 6.
            this.blockRightmostPoint = platforms[4*i] + (platforms[4*i+2] / 2) + 20 // Rightmost point of the platform = centre of platform + half of the platform width + 6.
            this.blockLowestPoint = platforms[4*i+1] + (platforms[4*i+3] / 2) + 20 // Highest point of the platform = centre of platform + half of the platform height + 6.
            this.blockHighestPoint = platforms[4*i+1] - (platforms[4*i+3] / 2) - 20 // Lowest point of the platform = centre of platform - half of the platform width - 6.

            if (this.x > this.blockLeftmostPoint && this.x < this.blockRightmostPoint) { // If player is in horizontal range of block
                if (this.y < this.blockLowestPoint && this.y > this.blockHighestPoint) { // If player is in horizontal range of block
                    if (direction == 1) {
                        this.x = this.blockLeftmostPoint;
                    } else {
                        this.x = this.blockRightmostPoint;
                    }
                }
            }
        }
    }

    moveY(platforms) {
        if (this.y > 20 && this.y < 780) { // If player not explicitly resting on the top or bottom of the screen, set onGround to false - this means that they will not be able to jump using the jump() feature
            this.onGround = false;
        }

        // If the player's increased speed due to gravity exceeds terminal velocity, set their speed to terminal velocity, otherwise increase their speed by the gravity constant.

        if (this.reducedGravity == true) {
            if (this.gameMode == 7) {
                this.gravity = 0.25;
            } else if (this.gameMode == 4) {
                this.gravity = 0.5;
            } else {
                this.gravity = 0.39;
            }
        }
        if (Math.abs(this.ySpeed + (this.gravity*this.gravityDirection) <= this.terminalVelocity)) {
            this.ySpeed = this.ySpeed + (this.gravity*this.gravityDirection);
        } else {
            this.ySpeed = this.terminalVelocity * this.gravityDirection;
        }

        if (Math.abs(this.ySpeed) > this.terminalVelocity) {
            this.ySpeed = this.terminalVelocity * this.gravityDirection;
        }
        // After speed calculations have been made, change their y position by their ySpeed
        this.y = this.y + this.ySpeed;

        // VERTICAL COLLISION CHECK WITH BLOCKS
        for (let i = 0; i < (platforms.length / 4); i++) {
            this.blockLeftmostPoint = platforms[4*i] - (platforms[4*i+2] / 2) - 20 // Leftmost point of the platform = centre of platform - half of the platform width - 6.
            this.blockRightmostPoint = platforms[4*i] + (platforms[4*i+2] / 2) + 20 // Rightmost point of the platform = centre of platform + half of the platform width + 6.
            this.blockLowestPoint = platforms[4*i+1] + (platforms[4*i+3] / 2) + 20 // Highest point of the platform = centre of platform + half of the platform height + 6.
            this.blockHighestPoint = platforms[4*i+1] - (platforms[4*i+3] / 2) - 20 // Lowest point of the platform = centre of platform - half of the platform width - 6.

            if (this.x > this.blockLeftmostPoint && this.x < this.blockRightmostPoint) { // If player is in horizontal range of block
                if (this.y < this.blockLowestPoint && this.y > this.blockHighestPoint) { // If player is in horizontal range of block
                    if (this.gravityDirection == 1) { // Make player land on ceiling / fall from base depending on their movement relative to gravity
                        if (this.ySpeed > 0) {
                            this.y = this.blockHighestPoint;
                            this.ySpeed = 0;
                            this.onGround = true;
                            this.usedFlipTile = false;
                            this.reducedGravity = false;
                            this.ableToChangeGravity = true;
                        } else {
                            this.y = this.blockLowestPoint;
                            this.ySpeed = 0;
                        }
                    } else {
                        if (this.ySpeed > 0) {
                            this.y = this.blockHighestPoint;
                            this.ySpeed = 0;
                        } else {
                            this.y = this.blockLowestPoint;
                            this.ySpeed = 0;
                            this.onGround = true;
                            this.usedFlipTile = false;
                            this.reducedGravity = false;
                            this.ableToChangeGravity = true;
                        }
                    }
                }
            }
        }
        
        if (this.y < 20 || this.y > 780) {
            this.die();
        }
        this.gravity = 0.8;
    }

    spikeCollision(spikes) {
        this.collidedWithSpike = false;
        for (let i = 0; i < (spikes.length / 3); i++) {
            this.dx = this.x - spikes[3*i]; // dx and dy represent the difference in positioning of the spike and the player
            this.dy = this.y - spikes[3*i+1];
            
            this.differenceInDistance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

            if (this.differenceInDistance < 16) { // If player touching spike, reset their physics attributes to their original values
                this.onGround = false;
                this.gravityDirection = 1;
                this.ySpeed = 0;
                this.ableToChangeGravity = true;
                this.gravity = 0.7;

                this.collidedWithSpike = true;
                this.die();
            }
        }
    }

    flipTileCollision(fliptiles) { // Flip player if they touch a flip tile
        if (this.usedFlipTile == false) {
            for (let i = 0; i < (fliptiles.length / 3); i++) {
                if (this.x > fliptiles[3*i] - 63 && this.x < fliptiles[3*i] + 63 && this.y < fliptiles[3*i + 1] + 25 && this.y > fliptiles[3*i + 1] - 25 && this.gravityDirection != fliptiles[3*i+2]) {
                    this.ySpeed = this.terminalVelocity * this.gravityDirection;
                    this.gravityDirection = this.gravityDirection * -1;
                    this.usedFlipTile = true;
                    this.reducedGravity = true;
                }
            }
        }
        if (this.usedFlipTile == true) { // Let the player use more than one flip pad
            this.temp = false;
            for (let i = 0; i < (fliptiles.length / 3); i++) {
                if (this.x > fliptiles[3*i] - 63 && this.x < fliptiles[3*i] + 63 && this.y < fliptiles[3*i + 1] + 25 && this.y > fliptiles[3*i + 1] - 25 && this.gravityDirection != fliptiles[3*i+2]) {
                    this.temp = true;
                }
            }

            if (this.temp == false) {
                this.usedFlipTile = false;
            }
        }
    }

    die() { // Kills the player
        this.x = this.playerSpawnpoint[(this.gameMode - 1) * 2];
        this.y = this.playerSpawnpoint[(this.gameMode - 1) * 2 + 1];
        
        this.onGround = false;
        this.gravityDirection = 1;
        this.ySpeed = 0;
        this.ableToChangeGravity = true;
        this.gravity = 0.7;
    }

    newGameMode(newGameMode) {
        this.gameMode = newGameMode;
    }

    decreaseGravity() { // variable jump height
        if (this.ySpeed * this.gravityDirection < 0) { // If player is rising then
            this.gravity = 0.3; // Decrease gravity
        }
    }
}


