export default function App() {
  return (
    <main className="hero">
      <span className="badge">
        <span className="dot" />
        Ready to build
      </span>
      <h1>Your app is live</h1>
      <p className="subtitle">
        This is a working preview. Tell me what you'd like to create and I'll
        build it for you.
      </p>
      <button className="cta" onClick={() => window.location.reload()}>
        Reload preview
      </button>

      <div className="cards">
        <div className="card">
          <h3>Fast</h3>
          <p>Powered by Vite for instant updates as you build.</p>
        </div>
        <div className="card">
          <h3>Connected</h3>
          <p>Supabase is ready for data, auth, and storage when you need it.</p>
        </div>
        <div className="card">
          <h3>Yours</h3>
          <p>Describe your idea and watch it come to life here.</p>
        </div>
      </div>
    </main>
  );
}
