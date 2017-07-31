import React from 'react';
import { Card, Loader, Segment, Dimmer } from 'semantic-ui-react';

import AddendumCard from './AddendumCard';

const AddendumGroup = (props) => {
  const { cards, loading, ...otherprops } = props;
  const cardItems = cards.cards.map((cardInfo) => {
    const { link, name, program, ID, modified, description } = cardInfo;
    return (
      <AddendumCard
        key={ID}
        modified={modified}
        link={link}
        name={name}
        program={program}
        description={description}
      />
    );
  });
  return (
    <div>
      <Segment>
        <Dimmer active={loading} inverted>
          <Loader />
        </Dimmer>
        <Card.Group itemsPerRow={6}>{cardItems}</Card.Group>
      </Segment>
    </div>
  );
};

export default AddendumGroup;
