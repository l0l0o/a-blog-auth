import useJwtToken from "../hooks/useJwtToken";

const Home = () => {
    const { token } = useJwtToken();
    return (
        <div>
            <h1>Home</h1>
            <p>ton token : {token }</p>
        </div>
    );
}
 
export default Home;