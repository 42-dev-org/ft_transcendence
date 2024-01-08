import Matter, {
    Bodies,
    Body,
    Composite,
    Engine,
    Render,
    Runner,
    Vector,
  } from "matter-js";

const HEIGHT = 800;
const WIDTH = 600;

  class GameModel {
    public engine: Matter.Engine;
    private render: Matter.Render;
    private runner: Matter.Runner;
    private bottom: Matter.Body;
    private top: Matter.Body;
    private right: Matter.Body;
    private left: Matter.Body;
    private p1: Matter.Body;
    private p2: Matter.Body;
    private ball: Matter.Body;
    private aspectRatio: number
  
    private width: number;
    private height: number;
  
    constructor(element: HTMLDivElement) {
      // engine creation
      console.log("WIDTH: ", element.clientWidth, " HEIGHT: ", element.clientHeight);
      this.aspectRatio = WIDTH / HEIGHT;
      // this.width = element.clientWidth;
      // this.height = element.clientHeight;
      [this.width, this.height] = this.calculateSize(element);
      this.engine = Engine.create({ gravity: { x: 0, y: 0 } });
      this.render = Render.create({
        element: element,
        engine: this.engine,
        options: {
          background: "#172554",
          width: element.clientWidth,
          height: element.clientHeight,
          wireframes: false,
        },
      });
      // create the engine runner
      this.runner = Runner.create();
  
      // --------------------------- create the game walls ---------------------------
      this.bottom = Bodies.rectangle(
        this.width / 2,
        this.height,
        this.width,
        this.normalise(10, 0, WIDTH, 0, this.width),
        { isStatic: true }
        );
        this.top = Bodies.rectangle(
          this.width / 2,
          0,
          this.width,
          this.normalise(10, 0, WIDTH, 0, this.width),
          { isStatic: true }
          );
          this.right = Bodies.rectangle(
            this.width,
            this.height / 2,
            this.normalise(10, 0, WIDTH, 0, this.width),
            this.height,
            { isStatic: true },
            );
            // Render.setFillStyle(this.render, this.right, "#B2F35F");
            //B2F35F
            this.left = Bodies.rectangle(
              0,
              this.height / 2,
              this.normalise(10, 0, WIDTH, 0, this.width),
              this.height,
              { isStatic: true }
              );
              
              this.right.render.fillStyle = "#B2F35F";
              this.left.render.fillStyle = "#B2F35F";

              this.top.render.fillStyle = "#B2F35F";
              this.bottom.render.fillStyle = "#B2F35F";

      // -------------------------- create the ball and the players ----------------------
      this.p1 = Bodies.rectangle(
        this.width / 2,
        this.normalise(30, 0, HEIGHT, 0, this.height),
        this.normalise(120, 0, WIDTH, 0, this.width),
        this.normalise(20, 0, HEIGHT, 0, this.height),
        { 
          label: "paddle1",
          isStatic: true 
        }
      );
      this.p2 = Bodies.rectangle(
        this.width / 2,
        this.normalise(770, 0, HEIGHT, 0, this.height),
        this.normalise(120, 0, WIDTH, 0, this.width),
        this.normalise(20, 0, HEIGHT, 0, this.height),
        { 
          label: "paddle2",
          isStatic: true 
        }
      );
      this.ball = Bodies.circle(
        this.width / 2,
        this.height / 2,
        10 * this.calculateScale(),
        {
          label: "ball",
          frictionAir: 0,
          friction: 0,
          force: { x: 1, y: 3 },
          inertia: Infinity,
          density: 0.5,
          restitution: 1,
          render: {
            fillStyle: "#B2F35F", // Set the fill color for the circle
          },
        }
      );

      // ------------------------- set up functions ------------------------------------
      // this.beforeUpdate();
      this.fillWorld();
      this.startGame();
    }
  
    // this function maps a given number from one range to another
    // output = output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start)
    map(x: number, maxin: number, maxout: number): number {
      return (maxout / maxin) * x;
    }
  
    fillWorld() {
      Composite.add(this.engine.world, [
        this.p1,
        this.p2,
        this.ball,
        this.bottom,
        this.top,
        this.right,
        this.left,
      ]);
    }
  
    startGame() {
      Render.run(this.render);
    }

      public calculateSize(element: HTMLDivElement): [number, number]{
        let width: number, height: number;
        
        
        if (element.clientHeight > element.clientWidth){
          width = element.clientWidth;
          height = width / this.aspectRatio;
          if (height > element.clientHeight){
            height = element.clientHeight;
            width = height * this.aspectRatio;
          }
        }else{
          height = element.clientHeight;
          width = height * this.aspectRatio;
          if (width > element.clientWidth){
            width = element.clientWidth
            height = width / this.aspectRatio;
          }
        }
        return [width, height]
      }

    private calculateScale(): number {
      let scale: number = this.width / WIDTH;
      let scale2: number = this.height / HEIGHT;

      return Math.min(scale, scale2);
    }

    public normalise(x: number, a: number, b: number, c: number, d: number){
      return c + (d - c) * ((x - a) / (b - a));
  }
  
    movePaddle(data: { x: number; y: number }, index: number) {
      const pos :Vector = {x: this.normalise(data.x, 0, WIDTH, 0, this.width), y: this.normalise(data.y, 0, HEIGHT, 0, this.height)}
      Body.setPosition(index === 1 ? this.p1 : this.p2, pos);
    }
    
    moveBall(data: { x: number; y: number }) {
      const pos :Vector = {x: this.normalise(data.x, 0, WIDTH, 0, this.width), y: this.normalise(data.y, 0, HEIGHT, 0, this.height)}
      Body.setPosition(this.ball, pos);      
    }
  
    destory() {
      Render.stop(this.render);
      this.render.canvas.remove();
    }
  }
  
  export default GameModel;
  