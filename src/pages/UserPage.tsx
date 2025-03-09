import { UserSearchProvider } from "@/app/providers/UserSearchProvider";
import Searchbar from "@/feature/user/ui/Searchbar";
import UserTable from "@/feature/user/ui/UserTable";

function UserPage() {
  return (
    <UserSearchProvider>
      <div className="bg-[#FFF] rounded-[10px] ">
        <Searchbar />
        <UserTable />
      </div>      
    </UserSearchProvider>
  )
}

export default UserPage;
