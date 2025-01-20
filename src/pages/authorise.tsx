import Authorisation from "@/components/Authorisation";
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function Authorise() {
  return (
    <Authorisation>
      <main className="min-h-screen items-center grid grid-cols-2 justify-center bg-black">
        <Login />
        <Register />
      </main>
    </Authorisation>
  );
}
