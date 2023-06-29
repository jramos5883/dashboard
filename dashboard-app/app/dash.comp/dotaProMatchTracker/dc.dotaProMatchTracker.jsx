"use client";

import React, { useState, useEffect } from "react";

export default function DotaProMatchTracker() {
  const [matches, setMatches] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [searchedTeamName, setSearchedTeamName] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://api.opendota.com/api/proMatches");
        const data = await response.json();

        // Filter for matches with the specific team if a team name is provided
        const filteredMatches = data.filter((match) => {
          if (!searchedTeamName) {
            return true;
          }
          return (
            match.radiant_name === searchedTeamName ||
            match.dire_name === searchedTeamName
          );
        });

        // Set the matches state
        setMatches(filteredMatches.slice(0, 25));
        // console.log(filteredMatches);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMatches();
  }, [searchedTeamName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedTeamName(teamName);
  };

  return (
    <div>
      <h1>Dota Pro Match Tracker!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Search for a team"
        />
        <button type="submit">Submit</button>
      </form>
      {matches.length ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Match ID</th>
              <th className="px-4 py-2">Pro League</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Radiant Name</th>
              <th className="px-4 py-2">Dire Name</th>
              <th className="px-4 py-2">Radiant Score</th>
              <th className="px-4 py-2">Dire Score</th>
              <th className="px-4 py-2">Winners</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => {
              // Convert duration from seconds to minutes and seconds
              const minutes = Math.floor(match.duration / 60);
              const seconds = match.duration % 60;

              return (
                <tr key={match.match_id}>
                  <td className="border px-4 py-2">{match.match_id}</td>
                  <td className="border px-4 py-2">{match.league_name}</td>
                  <td className="border px-4 py-2">
                    {new Date(match.start_time * 1000).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {`${minutes} minutes ${seconds} seconds`}
                  </td>
                  <td className="border px-4 py-2">{match.radiant_name}</td>
                  <td className="border px-4 py-2">{match.dire_name}</td>
                  <td className="border px-4 py-2">{match.radiant_score}</td>
                  <td className="border px-4 py-2">{match.dire_score}</td>
                  <td className="border px-4 py-2">
                    {match.radiant_win ? match.radiant_name : match.dire_name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>
          The pro team that was searched has not played any official matches
          recently.
        </p>
      )}
    </div>
  );
}
