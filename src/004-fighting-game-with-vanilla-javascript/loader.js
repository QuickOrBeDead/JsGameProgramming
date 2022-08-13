class Loader {
    constructor(ctx, onloaded) {
        this.loaded = true;
        this.loadedCount = 0;
        this.totalCount = 0;

        this.onloading = function(l) {
            const canvas = ctx.canvas;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            ctx.save();
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            ctx.fillStyle = "#FFF";
            ctx.font = "12px serif";
            ctx.textAlign = "center";
            ctx.fillText("Loaded " + l.loadedCount + " of " + l.totalCount + " ..", canvas.width / 2, canvas.height / 2);
            
            ctx.restore();
        };
        this.onloaded = onloaded;
    }

    loadImage(src) {
        this.totalCount++;
        this.loaded = false;

        if (this.onloading) {
            this.onloading(this);
        }

        const that = this;
        const image = new Image();
        image.onload = () => that.itemLoaded(that);
        image.src = src;
        return image;
    }

    itemLoaded() {
        this.loadedCount++;

        this.onloading(this);
        
        if (this.loadedCount === this.totalCount) {
            this.loaded = true;

            if (this.onloaded) {
                this.onloaded(this);
            }
        }
    }
}