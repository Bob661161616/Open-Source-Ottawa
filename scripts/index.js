class Particle {
	constructor(posx, posy, ctx) {
		this.posx=posx;
		this.posy=posy;
		this.velx=Math.random()+Math.random()-Math.random()-Math.random();
		this.vely=Math.random()+Math.random()-Math.random()-Math.random();
		this.radius=1;
		this.ctx=ctx;
	}
	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.posx, this.posy, this.radius, 0, 2*Math.PI);
		this.ctx.fillStyle="rgba(100,255,100,0.2)";
		this.ctx.fill();
	}
	move() {
		if(this.posx+this.velx<0 || this.posx+this.velx>window.innerWidth){this.posx=window.innerWidth-this.posx}
		if(this.posy+this.vely<0 || this.posy+this.vely>window.innerHeight){this.posy=window.innerHeight-this.posy;}
		this.posx+=this.velx;
		this.posy+=this.vely;
	}
}

window.onload=function() {
	console.log(window.innerWidth);
	console.log(window.innerHeight);
	var particles=[];
	var canvas=document.getElementById("canvas");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	var ctx=canvas.getContext("2d");
	init();

	function init(){
		for(let i=0;i<100;i++){
			particles.push(new Particle(Math.random()*window.innerWidth, Math.random()*window.innerHeight, ctx));
		}
		window.requestAnimationFrame(animate);
	}

	function animate() {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		for(let i in particles){
			particles[i].draw();
			particles[i].move();
		}
		for(let i in particles){
			for(let j in particles){
				if(i>=j){break;}
				ctx.lineWidth=15;
				ctx.beginPath();
				ctx.moveTo(particles[i].posx, particles[i].posy);
				ctx.lineTo(particles[j].posx, particles[j].posy);
				ctx.stroke();
			}
		}
		setTimeout(function() {requestAnimationFrame(animate);}, 30);
	}
}
