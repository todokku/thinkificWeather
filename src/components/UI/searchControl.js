import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

//below jsx could be refactored via a map function (time)
//memo prevents same search hit twice
const searchControl = React.memo((props) => {
  const [searchQuery, setSearchQuery] = React.useState('toronto');
  const [searchQueryTwo, setSearchQueryTwo] = React.useState('vancouver');
  return (
    <section className="section">
      <div className="columns is-centered is-mobile">
        <div className="column is-12-mobile is-10-desktop">
          <nav className="panel">
            <div className="panel-block columns is-centered">
              <div className="column is-centered">
                <h3 className="title is-5 has-text-centered">
                  Search First City
                </h3>
                <div className="field has-addons">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search"
                      onChange={(event) => setSearchQuery(event.target.value)}
                      value={searchQuery}
                    />
                    <span className="icon is-left">
                      <MdSearch />
                    </span>
                  </div>
                  <div className="control">
                    <button
                      className="button is-info"
                      onClick={() => props.searchCity('first', searchQuery)}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-block columns is-centered">
              <div className="column is-centered">
                <h3 className="title is-5 has-text-centered">
                  Search Second City
                </h3>
                <div className="field has-addons">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search"
                      value="toronto"
                      onChange={(event) =>
                        setSearchQueryTwo(event.target.value)
                      }
                      value={searchQueryTwo}
                    />
                    <span className="icon is-left">
                      <MdSearch />
                    </span>
                  </div>
                  <div className="control">
                    <a
                      className="button is-info"
                      onClick={() => props.searchCity('second', searchQueryTwo)}
                    >
                      Search
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-block columns is-centered">
              <div className="column is-centered">
                <h3 className="title is-5 has-text-centered">
                  {props.winnner}
                </h3>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
});

export default searchControl;
