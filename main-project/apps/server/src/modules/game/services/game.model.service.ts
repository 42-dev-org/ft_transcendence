import { Injectable } from '@nestjs/common';
import Matter, { Bodies, Composite, Engine, Runner, World, Events } from 'matter-js';

export class GameModel {
  public engine: Matter.Engine;
  private runner: Matter.Runner;
  private bottom: Matter.Body;
  private top: Matter.Body;
  private right: Matter.Body;
  private left: Matter.Body;
  public p1: Matter.Body;
  public p2: Matter.Body;
  public ball: Matter.Body;

  public width: number = 600;
  public height: number = 800;

  constructor() {
    this.engine = Engine.create({ gravity: { x: 0, y: 0 } });
    this.runner = Runner.create();

    this.bottom = Bodies.rectangle(
      this.width / 2,
      this.height,
      this.width,
      this.map(10, 800, this.height),
      { isStatic: true },
    );
    this.top = Bodies.rectangle(
      this.width / 2,
      0,
      this.width,
      this.map(10, 800, this.height),
      { isStatic: true },
    );
    this.right = Bodies.rectangle(
      this.width,
      this.height / 2,
      this.map(10, 600, this.width),
      this.height,
      { isStatic: true },
    );
    this.left = Bodies.rectangle(
      0,
      this.height / 2,
      this.map(10, 600, this.width),
      this.height,
      { isStatic: true },
    );

    this.p1 = Bodies.rectangle(
      this.width / 2,
      this.height - this.map(30, 800, this.height),
      this.map(120, 600, this.width),
      this.map(20, 800, this.height),
      {
        label: 'paddle1',
        isStatic: true,
      },
    );

    this.p2 = Bodies.rectangle(
      this.width / 2,
      this.map(30, 800, this.height),
      this.map(120, 600, this.width),
      this.map(20, 800, this.height),
      {
        label: 'paddle2',
        isStatic: true,
      },
    );
    this.ball = Bodies.circle(
      this.width / 2,
      this.height / 2,
      this.map(10, 800, this.height),
      {
        label: 'ball',
        frictionAir: 0,
        friction: 0,
        force: { x: 1, y: 3 },
        inertia: Infinity,
        density: 0.5,
        restitution: 1,
      },
    );

    this.ball.label = 'ball';
    this.fillWorld();
    this.startGame();
  }

  map(x: number, maxin: number, maxout: number): number {
    return (maxout / maxin) * x;
  }

  fillWorld() {
    World.add(this.engine.world, [
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
    // Render.run(this.render);
    Runner.run(this.runner, this.engine);
  }

  destory() {
    // Runner.stop(this.runner);
    Engine.clear(this.engine);
  }
}

export default GameModel;
