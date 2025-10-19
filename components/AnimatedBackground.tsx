import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[];
    const particleColor = 'rgba(79, 209, 217, 0.7)';
    const lineColor = 'rgba(79, 209, 217, 0.2)';

    class Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number, radius: number, vx: number, vy: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
          this.vx *= -1;
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
          this.vy *= -1;
        }
      }
    }

    const init = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        particles = [];
        const numberOfParticles = (canvas.height * canvas.width) / 11000;

        for (let i = 0; i < numberOfParticles; i++) {
            const radius = Math.random() * 1.5 + 1;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const vx = (Math.random() - 0.5) * 0.5;
            const vy = (Math.random() - 0.5) * 0.5;
            particles.push(new Particle(x, y, radius, vx, vy));
        }
    };

    const connect = () => {
        if (!ctx) return;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const distance = Math.sqrt(
                    (particles[i].x - particles[j].x) ** 2 +
                    (particles[i].y - particles[j].y) ** 2
                );

                if (distance < 150) {
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connect();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        init();
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default AnimatedBackground;
