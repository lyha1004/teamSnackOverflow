import React from 'react';
import { useControls, Leva } from 'leva';

export default function MyComponent() {
    const { Country } = useControls({ Country: 'Country Name'})
    
    const values = useControls({
        select: {value: 'Filter', options: ['1','2','3']}
    })
    

    return(
        <div>
            <pre>{JSON.stringify(values, null, ' ')}</pre>
        </div>
    )
}
