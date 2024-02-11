import { useControls } from 'leva'

export default function MyComponent() {
    const {name, aNumber } = useControls({name : 'World', aNumber: 0})

    return (
        <div>
        </div>
    )
}