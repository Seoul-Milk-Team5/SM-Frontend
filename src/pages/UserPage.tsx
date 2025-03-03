import Searchbar from "@/feature/user/ui/Searchbar";
import UserTable from "@/feature/user/ui/UserTable";

function UserPage() {
  return (
    <div className="bg-[#FFF] rounded-[10px] ">
      <Searchbar />
      <UserTable />
    </div>
  )
}

export default UserPage;
