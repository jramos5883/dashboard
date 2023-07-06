import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-row justify-center justify-items-center items-center">
      <div className="w-1/2">
        <Image
          className=""
          layout="responsive"
          height={500}
          width={500}
          src="/dashboardCalendar1.png"
          alt="Embeded Google Calendar"
        />
        <Image
          className=""
          layout="responsive"
          height={500}
          width={500}
          src="/dashboardToDoBudget1.png"
          alt="To Do and Budget App"
        />
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl">Welcome to your Personal Dashboard</h1>
        <p>
          This versatile dashboard brings together various functionalities to
          create a unified, personalized hub designed to assist with your daily
          life and enhance your productivity. Here&apos;s a brief introduction
          to each section of the dashboard:
        </p>
        <p>
          Google Calendar Integration: This feature allows you to view your
          Google Calendar directly from the dashboard. Never miss another
          appointment or event. The embedded calendar presents your schedule in
          a convenient and accessible format.{" "}
        </p>
        <p>
          To-Do List App: Manage your tasks effectively with our intuitive To-Do
          List app. You can add, modify, and delete tasks, helping you stay on
          top of your daily responsibilities. Its user-friendly interface
          ensures easy task management.
        </p>

        <p>
          Budget App: Keep track of your income and expenses with our robust
          Budget App. With this feature, you can monitor your spending habits,
          set budgets for different categories, and manage your personal
          finances more effectively.
        </p>
        <p>
          Shopping List: Streamline your grocery shopping with our handy
          Shopping List feature. You can add items to the list, mark them as
          purchased, and ensure you never forget a grocery item again.
        </p>
        <p>
          Things My Girlfriend Has Said Twice (TMGFHST): This unique feature
          allows you to note and remember things that your girlfriend has
          mentioned twice. It&apos;s a quirky, fun way to keep track of
          important details, potentially improving your communication and
          understanding.
        </p>
        <p>
          Dota 2 Pro Match Tracker: Are you a Dota 2 fan? This feature is just
          for you. Keep tabs on professional Dota 2 matches, stay updated on
          your favorite teams&apos; performance, and never miss any action from
          the Dota 2 professional scene.
        </p>
        <p>
          The dashboard has been carefully designed to be user-friendly and
          efficient, allowing you to manage various aspects of your life from a
          single place. Welcome to your comprehensive personal assistant.
        </p>
      </div>
    </div>
  );
}
