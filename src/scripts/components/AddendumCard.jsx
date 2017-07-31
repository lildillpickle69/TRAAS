import React from 'react';
import { Card } from 'semantic-ui-react';

const AddendumCard = ({link, name, program, modified, description}) => (
  <Card color="blue" href={link} target="_blank" >
    <Card.Content header={name} />
    <Card.Content meta={program} />
    <Card.Content description={description} />
    <Card.Content extra>
      {modified}
    </Card.Content>
  </Card>
);

export default AddendumCard;
