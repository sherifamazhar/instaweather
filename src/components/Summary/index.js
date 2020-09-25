import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date();
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = `${weekday[today.getDay()]} ${today.getDate()}, ${today.getYear()}`;

        this.state = { date: date };
    }

    render() {
        return (
            <div>
                test 2
            </div>
        );
    }
}

export default Summary;