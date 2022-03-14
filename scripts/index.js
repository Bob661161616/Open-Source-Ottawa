class Particle {
    constructor(posx, posy, ctx) {
        this.posx = posx;
        this.posy = posy;
        this.velx = Math.random() + Math.random() - Math.random() - Math.random();
        this.vely = Math.random() + Math.random() - Math.random() - Math.random();
        this.radius = 1;
        this.ctx = ctx;
    }
    move() {
        if (this.posx + this.velx < 0 || this.posx + this.velx > window.innerWidth) {
            this.posx = Math.max(window.innerWidth - this.posx, 0);
        }
        if (this.posy + this.vely < 0 || this.posy + this.vely > window.innerHeight) {
            this.posy = Math.max(window.innerHeight - this.posy, 0);
        }
        this.posx += this.velx;
        this.posy += this.vely;
    }
    static distance(particle1, particle2) {
        return Math.sqrt((particle1.posx - particle2.posx) ** 2 + (particle1.posy - particle2.posy) ** 2);
    }
}
var canvas;
var ctx;
window.onload = function() {
    var particles = [];
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    window.requestAnimationFrame(animate);

    function animate() {
        while (particles.length < window.innerWidth * window.innerHeight / 3000) {
            particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, ctx));
        }
        while (particles.length >= window.innerWidth * window.innerHeight / 3000) {
            particles.pop();
        }
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i in particles) {
            particles[i].move();
        }
        for (let i in particles) {
            for (let j in particles) {
                if (i >= j || Particle.distance(particles[i], particles[j]) > 100) {
                    continue;
                }
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(0,255,0,0.05)";
                ctx.beginPath();
                ctx.moveTo(particles[i].posx, particles[i].posy);
                ctx.lineTo(particles[j].posx, particles[j].posy);
                ctx.stroke();
            }
        }
        setTimeout(function() {
            requestAnimationFrame(animate);
        }, 30);
    }
}

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
