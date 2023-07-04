export default function LandingPage() {
  return (
    <div className="homepage-container h-screen">
      <h1 className="text-5xl p-4">Landing Page!</h1>
      <p className="text-3xl p-4">Product Description</p>
      <div className="border-2 border-gray-700 flex justify-center justify-items-center items-center">
        <h2 className="p-48">Personal Dashboard Ads Photos Placeholder</h2>
      </div>
      <p className="text-3xl p-4">Dashboard features:</p>
      <ul>
        <li className="text-2xl p-4 px-20">Personal Embeded Google Calendar</li>
        <li className="text-2xl p-4 px-20">
          ToDo, Budget, and Shopping List Apps
        </li>
        <li className="text-2xl p-4 px-20">
          Recent Dota 2 Tournament Match Results Tracker
        </li>
      </ul>
    </div>
  );
}
