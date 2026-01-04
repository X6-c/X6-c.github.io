export class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.3  // 减慢速度，让连线更清晰
    this.vy = (Math.random() - 0.5) * 0.3
    this.radius = Math.random() * 1 + 0.5  // 减小粒子大小，突出线条
    this.opacity = Math.random() * 0.3 + 0.1  // 降低粒子透明度，突出连线
    this.color = this.getRandomColor()
  }

  getRandomColor(): string {
    // 使用更柔和的颜色，让线条更突出
    const colors = [
      'rgba(147, 151, 255, ',  // 柔和的蓝色
      'rgba(196, 181, 253, ',  // 柔和的紫色
      'rgba(165, 180, 252, ',  // 柔和的靛蓝色
      'rgba(199, 210, 254, ',  // 很柔和的蓝色
      'rgba(221, 214, 254, ',  // 柔和的紫罗兰
    ]
    const selectedColor = colors[Math.floor(Math.random() * colors.length)]
    return selectedColor || 'rgba(147, 151, 255, '
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.vx
    this.y += this.vy

    // 边界反弹
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy
    }

    // 确保粒子在画布内
    this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x))
    this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y))
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `${this.color}${this.opacity}`
    ctx.fill()
  }
}

export class ParticleSystem {
  particles: Particle[] = []
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  mousePosition = { x: 0, y: 0 }
  time = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Canvas 2D context not available')
    }
    this.ctx = ctx
    this.init()
  }

  init() {
    // 大幅增加粒子数量，确保几何线条铺满全屏
    const particleCount = Math.min(700, Math.floor((this.canvas.width * this.canvas.height) / 6000))

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas))
    }

    // 监听鼠标移动
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect()
      this.mousePosition.x = e.clientX - rect.left
      this.mousePosition.y = e.clientY - rect.top
    })
  }

  connectParticles() {
    const maxDistance = 250  // 进一步增加连线距离，确保几何图形铺满全屏

    for (let i = 0; i < this.particles.length; i++) {
      const particle1 = this.particles[i]
      if (!particle1) continue

      for (let j = i + 1; j < this.particles.length; j++) {
        const particle2 = this.particles[j]
        if (!particle2) continue

        const dx = particle1.x - particle2.x
        const dy = particle1.y - particle2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          // 根据距离调整线条粗细和透明度，形成全屏几何网络
          const normalizedDistance = distance / maxDistance
          const opacity = (1 - normalizedDistance) * 0.8  // 增加线条透明度，让网络更明显
          const lineWidth = (1 - normalizedDistance) * 1.5 + 0.1  // 更细的线条，更密集的网络

          // 使用更多样的渐变色彩，创造丰富的几何图形效果
          const hue = (distance / maxDistance) * 120 + 180  // 更宽的色彩范围
          const saturation = 60 + (1 - normalizedDistance) * 30  // 距离越近饱和度越高

          this.ctx.beginPath()
          this.ctx.strokeStyle = `hsla(${hue}, ${saturation}%, 65%, ${opacity})`
          this.ctx.lineWidth = lineWidth
          this.ctx.lineCap = 'round'
          this.ctx.moveTo(particle1.x, particle1.y)
          this.ctx.lineTo(particle2.x, particle2.y)
          this.ctx.stroke()
        }
      }

      // 增强的鼠标交互效果
      const mouseDistance = Math.sqrt(
        Math.pow(particle1.x - this.mousePosition.x, 2) +
        Math.pow(particle1.y - this.mousePosition.y, 2)
      )

      if (mouseDistance < maxDistance * 0.9) {
        const normalizedMouseDistance = mouseDistance / (maxDistance * 0.9)
        const opacity = (1 - normalizedMouseDistance) * 0.9
        const lineWidth = (1 - normalizedMouseDistance) * 2.5 + 0.3

        // 鼠标附近使用更鲜艳的颜色
        this.ctx.beginPath()
        this.ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`  // 紫色高亮
        this.ctx.lineWidth = lineWidth
        this.ctx.lineCap = 'round'
        this.ctx.moveTo(particle1.x, particle1.y)
        this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y)
        this.ctx.stroke()
      }
    }
  }

  animate() {
    // 添加轻微的拖尾效果
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.time += 0.01

    this.particles.forEach(particle => {
      particle.update(this.canvas)
      particle.draw(this.ctx)
    })

    this.connectParticles()
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}
