export default function Navbar(props) {
  return (
    <div>
      <h1>Bienvenido {sessionStorage.getItem("name")}</h1>

    </div>
  );
}