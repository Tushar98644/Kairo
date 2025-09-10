"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const App = () => {
  return (
    <div>
      <Editor />
    </div>
  );
}

export default App;