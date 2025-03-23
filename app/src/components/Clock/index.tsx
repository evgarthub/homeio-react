import * as React from 'react';

export const Clock = () => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        setTimeout(() => setTime(new Date()), 1000);
    });

    return <span>{time.toLocaleString()}</span>;
};
