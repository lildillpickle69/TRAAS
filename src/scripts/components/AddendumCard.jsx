import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
// Component that renders each individual addendum "card" on the main menu
=======
//Creation of each "card" of finalized/in progress addendums on the home page
>>>>>>> ae258bf581ec4570271430db7480cb0da134de51
const AddendumCard = ({ link, name, program, modified, description }) => (
  <Card color="blue" href={link} target="_blank" >
    <Card.Content header={name} />
    <Card.Content meta={program} />
    <Card.Content description={description} />
    <Card.Content extra>
      {modified}
    </Card.Content>
  </Card>
);
AddendumCard.defaultProps = {
  name: '',
  description: '',
  program: ''
};
AddendumCard.propTypes = {
  name: PropTypes.string,
  program: PropTypes.string,
  description: PropTypes.string,
  modified: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default AddendumCard;
