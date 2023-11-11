import HomeGameMain from "../../layouts/game-home/home-game-main/home-game-main";

export default function GameContainer() : JSX.Element {
    return (
      <div className="w-full h-screen bg-black flex justify-center">
        <HomeGameMain />
      </div>
  )
}
