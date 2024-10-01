import React, { useState } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import searchClient from "../lib/algolia";
import { BusStage } from "@/constants/types";
import Map from "./Map";

type HitProps = {
  hit: AlgoliaHit<BusStage>;
  onHitClick: (hit: BusStage) => void;
};

const Hit: React.FC<HitProps> = ({ hit, onHitClick }) => (
  <div className="hit" onClick={() => onHitClick(hit)}>
    <h4>{hit.name}</h4>
    <p>{hit.description}</p>
  </div>
);

const Search: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<BusStage | null>(null);

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="bus_stages">
        <SearchBox />
        <Hits
          hitComponent={(props) => (
            <Hit {...props} onHitClick={setSelectedStage} />
          )}
        />
      </InstantSearch>
      <Map selectedStage={selectedStage} />
    </div>
  );
};

export default Search;
