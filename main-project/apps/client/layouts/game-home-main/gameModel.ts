import Matter, {
    Bodies,
    Body,
    Composite,
    Engine,
    Render,
    Runner,
  } from "matter-js";
  import { io, Socket } from "socket.io-client";
  
  const socket: Socket = io("http://localhost:8080");
  
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
  
    // private mouse: Matter.Mouse;
    // private mouseConstraint: Matter.MouseConstraint;
  
    private width: number;
    private height: number;
  
    constructor(element: HTMLDivElement) {
      // engine creation
      this.width = element.clientWidth;
      this.height = element.clientHeight;
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
        this.map(10, 800, this.height),
        { isStatic: true }
        );
        this.top = Bodies.rectangle(
          this.width / 2,
          0,
          this.width,
          this.map(10, 800, this.height),
          { isStatic: true }
          );
          this.right = Bodies.rectangle(
            this.width,
            this.height / 2,
            this.map(10, 600, this.width),
            this.height,
            // Replace "#FF5733" with your desired color code
            { isStatic: true },
            );
            // Render.setFillStyle(this.render, this.right, "#B2F35F");
            //B2F35F
            this.left = Bodies.rectangle(
              0,
              this.height / 2,
              this.map(10, 600, this.width),
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
        this.height - this.map(30, 800, this.height),
        this.map(120, 600, this.width),
        this.map(20, 800, this.height),
        { 
          label: "paddle1",
          isStatic: true 
        }
      );
      this.p2 = Bodies.rectangle(
        this.width / 2,
        this.map(30, 800, this.height),
        this.map(120, 600, this.width),
        this.map(20, 800, this.height),
        { 
          label: "paddle2",
          isStatic: true 
        }
      );
      this.ball = Bodies.circle(
        this.width / 2,
        this.height / 2,
        this.map(10, 800, this.height),
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
  
    movePaddle(data: { x: number; y: number }, index: number) {
      Body.setPosition(index === 1 ? this.p1 : this.p2, data);
      console.log("Paddle Pos: ", this.p1.position.x);
    }
  
    moveBall(data: { x: number; y: number }) {
      Body.setPosition(this.ball, data);
      
    }
  
    destory() {
      Render.stop(this.render);
      this.render.canvas.remove();
    }
  }
  
  export default GameModel;
  