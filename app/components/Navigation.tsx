import logo from "../../public/logo-white_cropped_transparent.png";
import CartDrawer from "./CartDrawer";

export default function Navigation() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        maxWidth: "100%",
        position: "sticky",
        top: 0,
        color: "white",
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Search</div>
        <img
          src={logo}
          height={320 / 4}
          width={490 / 4}
          alt="ff logo"
          loading="eager"
        />
        <CartDrawer />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Home</div>
        <div>Men's</div>
        <div>Women's</div>
        <div>Hats</div>
        <div>American Made</div>
        <div>Accessories</div>
      </div>
    </div>
  );
}
