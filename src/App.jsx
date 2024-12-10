import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

const AppWrapper = styled.div`
  background-color: white;
`;

function App() {
  return (
    <AppWrapper className="flex justify-center items-center h-screen w-screen flex-col">
      <div className="w-screen">
        <Scene />
      </div>
    </AppWrapper>
  );
}

export default App;
