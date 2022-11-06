import Button from "components/atoms/Button";
import MaintenancePage from "components/templates/MaintenancePage";
import { useAuthMethods } from "hooks/authMethods";

export default function Home() {
  const { handleAuthSignOut } = useAuthMethods();
  return (
    <div>
      <MaintenancePage />
      <Button onClick={handleAuthSignOut} value="Temporary Logout Button" className="absolute top-10 right-10 max-w-[150px] rounded-lg" />
    </div>
  )
}

