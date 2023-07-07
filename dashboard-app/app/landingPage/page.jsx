import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 max-w-xl px-4">
        <Image
          className="py-4"
          layout="responsive"
          height={500}
          width={500}
          src="/dashboardCalendar1.png"
          alt="Embeded Google Calendar"
        />
        <Image
          className="py-4"
          layout="responsive"
          height={500}
          width={500}
          src="/dashboardToDoBudget1.png"
          alt="To Do and Budget App"
        />
      </div>
      <div className="w-1/2 max-w-2xl px-4">
        <h1 className="text-3xl font-bold pt-4 text-center">
          Poseidon&apos;s Personal Dashboard
        </h1>
        <p className="p-4 indent-8">
          This versatile dashboard brings together various functionalities to
          create a unified, personalized hub designed to assist with your daily
          life and enhance your productivity. Here&apos;s a brief introduction
          to each section of the dashboard:
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">
            Google Calendar Integration:
          </span>{" "}
          This feature allows you to view your Google Calendar directly from the
          dashboard. Never miss another appointment or event. The embedded
          calendar presents your schedule in a convenient and accessible format.
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">To-Do List App:</span> Manage
          your tasks effectively with our intuitive To-Do List app. You can add
          and delete tasks, helping you stay on top of your daily
          responsibilities. Its user-friendly interface ensures easy task
          management.
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">Budget App:</span> Keep track
          of your monthly bills and subscriptions with our Budget App. With this
          feature, you can monitor your spending habits and manage your personal
          finances more effectively.
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">Shopping List:</span>{" "}
          Streamline your grocery shopping with our handy Shopping List feature.
          You can add and delete items to your list and ensure you never forget
          a grocery item again.
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">
            Things My Girlfriend Has Said Twice (TMGFHST) List:
          </span>{" "}
          This unique feature allows you to note and remember things that your
          girlfriend has mentioned twice. It&apos;s a quirky, fun way to keep
          track of important details, potentially improving your communication
          and understanding.
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">
            Dota 2 Pro Match Tracker:
          </span>{" "}
          Are you a Dota 2 fan? This feature is just for you. Keep tabs on
          professional Dota 2 matches, stay updated on your favorite teams&apos;
          performance, and never miss any action from the Dota 2 professional
          scene.
        </p>
        <p className="py-4 px-8">
          <span className="text-2xl font-medium">
            And more apps and features to come!
          </span>{" "}
        </p>
        <p className="p-4 indent-8">
          The dashboard has been carefully designed to be user-friendly and
          efficient, allowing you to manage various aspects of your life from a
          single place. Welcome to your comprehensive personal dashboard.
        </p>
      </div>
    </div>
  );
}
