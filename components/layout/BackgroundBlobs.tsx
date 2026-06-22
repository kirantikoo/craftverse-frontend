export default function BackgroundBlobs() {
    return (
      <>
        <div className="fixed top-0 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="fixed top-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="fixed bottom-0 left-0 h-96 w-96 rounded-full bg-green-500/20 blur-[120px]" />
        <div className="fixed bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </>
    );
  }