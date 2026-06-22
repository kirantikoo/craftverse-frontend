export default function GradientButton({
    text,
  }: {
    text: string;
  }) {
    return (
      <button
        className="
        rounded-full
        px-6
        py-3
        font-bold
        text-white
        bg-gradient-to-r
        from-cyan-500
        via-purple-500
        to-pink-500
        shadow-lg
        hover:scale-105
        transition
        "
      >
        {text}
      </button>
    );
  }