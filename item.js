class Item {
    constructor(initialX, initialY) { 
        this.x = initialX; // Sets initial X and Y coordinates for the items. The items should be static, so this is likely not going to change during one level.
        this.y = initialY;
        this.collected = 0;
        this.itemAnimationFrame = 0;
    }

    getCollected() { // Getter method for collected attribute
        return this.collected;
    }

    setCollected() { // Makes item visible (to be used at the start of levels)
        this.collected = 0;
    }

    newPos(newXPos, newYPos) { // Moves item to a new position
        this.x = newXPos;
        this.y = newYPos;
        this.collected = 0;
    }

    draw(images) {
        if (this.collected == 0) { // If the item has been collected it should be hidden to indicate that the player does not need to recollect it.
            imageMode(CENTER);
            image(images[Math.floor(0.5*this.itemAnimationFrame) % images.length], this.x, this.y);
            
        }
    }

    collisionCheck(playerX, playerY) {
        this.dx = this.x - playerX; // dx and dy represent the difference in positioning of the item and the player
        this.dy = this.y - playerY;
        this.differenceInDistance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.itemAnimationFrame = this.itemAnimationFrame + 1;

        if (this.differenceInDistance < 36) {
            this.collected = 1;
        }
    }
}