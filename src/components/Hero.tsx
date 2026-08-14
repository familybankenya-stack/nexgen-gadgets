export default function Hero() {
  return (
    <div className="w-full mx-auto px-4 md:px-8 pt-2 sm:pt-3 relative z-20">
      <div className="w-full rounded-xl overflow-hidden shadow-sm aspect-[16/9]">
        <div className="w-full h-full overflow-hidden select-none bg-black cursor-pointer shadow-sm rounded-xl relative aspect-[16/9] [transform:translateZ(0)] [will-change:transform]">
          <video
            src="/hero.mp4"
            className="w-full h-full object-cover rounded-xl block [backface-visibility:hidden]"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload"
          />
        </div>
      </div>
    </div>
  );
}
