export default function BrowserFrame() {
  return (
    <div className="browser-frame-wrapper">
      <div className="browser-frame-glow" />
      <div className="browser-frame">
        <div className="browser-frame-bar">
          <div className="browser-frame-dots">
            <span className="browser-frame-dot browser-frame-dot-red" />
            <span className="browser-frame-dot browser-frame-dot-yellow" />
            <span className="browser-frame-dot browser-frame-dot-green" />
          </div>
          <div className="browser-frame-url">
            <span className="browser-frame-url-text">vize.cloud</span>
          </div>
          <div className="browser-frame-actions" />
        </div>
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="VizEz automatically filling a visa portal form"
        />
      </div>
    </div>
  )
}
