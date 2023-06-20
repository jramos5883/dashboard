export default function LandingPage() {
  return (
    <div className="homepage-container bg-red-300 h-screen">
      <h1 className="text-5xl p-4">Landing Page!</h1>
      <p className="text-3xl p-4">Product Description</p>
      <div className="border-2 border-gray-700 flex justify-center justify-items-center items-center">
        <h2 className="p-48">Personal Dashboard Ads Photos Placeholder</h2>
      </div>
      <p className="text-3xl p-4">Dashboard features:</p>
      <ul>
        <li className="text-2xl p-4 px-20">Infinite Scrolling</li>
        <li className="text-2xl p-4 px-20">Google Calendar Api</li>
        <li className="text-2xl p-4 px-20">
          Recent Dota 2 Tournament Match Results
        </li>
      </ul>
    </div>
  );
}
