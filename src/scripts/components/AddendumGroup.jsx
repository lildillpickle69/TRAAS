import React from 'react';
import { Card, Loader, Segment, Dimmer, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddendumCard from './AddendumCard';

const style2 = { left: '43%', textAlign: 'center' };
const style = { textAlign: 'center' };
<<<<<<< HEAD
// Renders each group of Addendum "cards"
=======
//Grouping all the addendum cards so that there is 6 per row.
>>>>>>> ae258bf581ec4570271430db7480cb0da134de51
const AddendumGroup = ({ cards, loading }) => {
  const cardItems = cards.map((cardInfo) => {
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
        {!loading && cardItems.length === 0 &&
        <div>
          <br />
          <Message compact positive style={style2}>
            <Message.Header style={style}>No Addendums Found</Message.Header>
          </Message>
        </div>}
      </Segment>
    </div>
  );
};

AddendumGroup.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired
};

export default AddendumGroup;
