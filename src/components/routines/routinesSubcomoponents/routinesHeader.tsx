import { useState } from 'react';

const RoutinesHeader = ({
  allRoutines,
  displayedRoutines,
  setDisplayedRoutines,
  myProfile,
  createWindowOpen,
  setCreateWindowOpen,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchRoutines = (e, searchValue) => {
    e.preventDefault();
    const searchResult = allRoutines.filter(
      (routine) =>
        routine.creatorName.toLowerCase().includes(searchValue.toLowerCase()) ||
        routine.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        routine.goal.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDisplayedRoutines(searchResult);
  };

  return (
    <div id="routines-header">
      <div>
        <p>Returning {displayedRoutines.length} routines...</p>
        <div id="routine-search">
          <form
            action="filter-routines"
            onSubmit={(e) => handleSearchRoutines(e, searchValue)}
          >
            <input
              id="filter-routines-search"
              type="text"
              placeholder="Enter a Keyword to narrow your routine search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button id="filter-routines-button">Filter Routines</button>
          </form>
        </div>
      </div>
      {myProfile.id && (
        <div>
          {!createWindowOpen ? (
            <button
              id="open-close-create-routine"
              onClick={() => setCreateWindowOpen(true)}
            >
              Create New Routine
            </button>
          ) : (
            <button
              id="open-close-create-routine"
              onClick={() => setCreateWindowOpen(false)}
            >
              Cancel Create Routine
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RoutinesHeader;
