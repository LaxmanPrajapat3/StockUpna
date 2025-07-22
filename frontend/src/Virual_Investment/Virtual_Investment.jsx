import Hero from "./Hero"
import AuthCheck from "../authCheckfunction/AuthCheck"

export default function Virtual_Investment (){
    return (
        <>

<AuthCheck>

        <Hero/>

</AuthCheck>

        </>
    )
}