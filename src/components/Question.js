import React from 'react';
import { Fade, Alert } from 'reactstrap';

/*
"Question" kann die Frage etwas schöner darstellen.
Der eigentliche Text wird über die Property "message" an die Komponente übergeben.
*/
const Question = ({ message }) => (
    <Fade in={true} tag="h1">
        <Alert color="success">
            {message}
        </Alert>
    </Fade>
)

export default Question;
